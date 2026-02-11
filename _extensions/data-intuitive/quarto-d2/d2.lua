-- d2.lua: Quarto filter for rendering D2 diagrams
-- Based on data-intuitive/quarto-d2 extension

local system = require 'pandoc.system'

-- Default values
local default_theme = "NeutralDefault"
local default_layout = "elk"
local default_format = "svg"
local default_pad = 100
local default_embed_mode = nil  -- Will be set based on output format

-- Global options from document metadata
local global_options = {}

-- Counter for generating unique filenames
local diagram_counter = 0

function setup_global_options(meta)
  if meta.d2 then
    global_options = meta.d2
  end
end

function get_option(attr, name, default)
  -- Priority: 1. Code block attribute, 2. Global option, 3. Default
  if attr[name] then
    return attr[name]
  elseif global_options[name] then
    return pandoc.utils.stringify(global_options[name])
  else
    return default
  end
end

function render_d2_diagram(code, attr)
  diagram_counter = diagram_counter + 1
  
  -- Get options
  local theme = get_option(attr, "theme", default_theme)
  local layout = get_option(attr, "layout", default_layout)
  local format = get_option(attr, "format", default_format)
  local pad = get_option(attr, "pad", tostring(default_pad))
  local folder = attr.folder
  local filename = attr.filename or ("diagram_" .. diagram_counter)
  local file_param = attr.file
  local embed_mode = attr.embed_mode or default_embed_mode
  
  -- Handle external file reference
  local d2_code = code
  if file_param then
    local f = io.open(file_param, "r")
    if f then
      d2_code = f:read("*all")
      f:close()
    else
      return pandoc.Div({pandoc.Para({pandoc.Str("Error: Could not read file " .. file_param)})})
    end
  end
  
  -- Create temporary input file
  local tmp_dir = system.get_working_directory() .. "/_d2_tmp"
  os.execute("mkdir -p " .. tmp_dir)
  local input_file = tmp_dir .. "/input_" .. diagram_counter .. ".d2"
  local f = io.open(input_file, "w")
  f:write(d2_code)
  f:close()
  
  -- Determine output location
  local output_path
  if folder then
    os.execute("mkdir -p " .. folder)
    output_path = folder .. "/" .. filename .. "." .. format
  else
    output_path = tmp_dir .. "/" .. filename .. "." .. format
  end
  
  -- Build d2 command
  local cmd = string.format(
    "d2 --theme=%s --layout=%s --pad=%s %s %s",
    theme,
    layout,
    pad,
    input_file,
    output_path
  )
  
  -- Execute d2
  local result = os.execute(cmd)
  
  -- Clean up input file
  os.remove(input_file)
  
  if result ~= 0 and result ~= true then
    return pandoc.Div({pandoc.Para({pandoc.Str("Error: D2 rendering failed")})})
  end
  
  -- Create image element
  local img_attr = pandoc.Attr(
    attr.label or "",
    {},
    {}
  )
  
  -- Handle width and height
  if attr.width then
    img_attr.attributes.width = attr.width
  end
  if attr.height then
    img_attr.attributes.height = attr.height
  end
  
  -- Create figure with caption if provided
  if attr["fig-cap"] then
    local caption = {pandoc.Str(attr["fig-cap"])}
    local img = pandoc.Image(caption, output_path, "", img_attr)
    return pandoc.Figure({pandoc.Plain({img})}, caption, img_attr)
  else
    local img = pandoc.Image({}, output_path, "", img_attr)
    return pandoc.Para({img})
  end
end

function CodeBlock(block)
  if block.classes:includes("d2") then
    return render_d2_diagram(block.text, block.attributes)
  end
end

return {
  {Meta = setup_global_options},
  {CodeBlock = CodeBlock}
}
