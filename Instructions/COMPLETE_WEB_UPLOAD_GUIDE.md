# 📤 **COMPLETE WEB UPLOAD GUIDE: D2 Setup Without Command Line**

Follow these exact steps. No terminal needed!

---

## 📦 **STEP 1: Get Extension Files 


### **Extension Files** (2 files):
```
✅ _extension.yml
✅ d2.lua
```

### **Config Files** (2 files):
```
✅ github-workflow-with-d2.yml
```


## 🔧 **STEP 2: Upload Extension Files**

### **Create Folder Structure:** 

1. Go to: **https://github.com/gagan-p/articles-gp** ==>  root_of_the_content_uplod_dir_main_branch

2. Click: **[Add file ▼]** → **[Create new file]**

3. In the "Name your file..." box, type **EXACTLY**:
   ```
   _extensions/data-intuitive/quarto-d2/_extension.yml
   ```
   
   **CRITICAL**: The slashes `/` create folders automatically!

4. Open your downloaded **_extension.yml** file in Notepad/TextEdit

5. Copy ALL the content (Ctrl+A, Ctrl+C)

6. Paste into the GitHub editor

7. Scroll down, add commit message:
   ```
   Add D2 extension metadata
   ```

8. Click **[Commit new file]**

### **Upload the Lua Filter:**

1. Click: **[Add file ▼]** → **[Create new file]**

2. Type EXACTLY:
   ```
   _extensions/data-intuitive/quarto-d2/d2.lua
   ```

3. Open your downloaded **d2.lua** file

4. Copy ALL content

5. Paste into GitHub editor

6. Commit message:
   ```
   Add D2 Lua filter
   ```

7. Click **[Commit new file]**

---

## ⚙️ **STEP 3: Update Workflow File**

### **Replace render.yml:**

1. Navigate to: **`.github/workflows/`** folder

2. Click on: **`render.yml`**

3. Click: **[✏️ Edit this file]** (pencil icon, top right)

4. **Delete EVERYTHING** in the editor (Ctrl+A, Delete)

5. Open  **github-workflow-with-d2.yml**

6. Copy ALL content

7. Paste into the now-empty GitHub editor

8. Commit message:
   ```
   Update workflow to install D2
   ```

9. Click **[Commit changes]**

---



## 🎯 **STEP 4: Watch It Build!**

### **Monitor GitHub Actions:**

1. Go to: **https://github.com/gagan-p/articles-gp/actions**

2. You should see a new workflow run starting

3. **Status indicators:**
   - 🟠 **Orange dot** = Building (wait 3-4 minutes)
   - ✅ **Green checkmark** = Success!
   - ❌ **Red X** = Failed (check logs)

4. Click on the workflow run to see detailed logs

5. Wait for **ALL steps** to complete

---

## ✨ **STEP 5: View Your Live Site**

Once you see the green checkmark:

1. Visit: **https://gagan-p.github.io/articles-gp/articles/<uploaded_article.html>**

2. Scroll to:
   - **Section: 
