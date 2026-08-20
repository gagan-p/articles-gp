function _1(Plot)
{
  const headline = [
    {metric:"Revenue (US$ bn)",           value:283,  fmt:"$283bn"},
    {metric:"Export share",               value:79,   fmt:"79%"},
    {metric:"Direct employment (mn)",     value:5.80, fmt:"5.80mn"},
    {metric:"Global IT outsourcing share",value:55,   fmt:"~55%"}
  ]

  return Plot.plot({
    marginLeft: 220, marginRight: 80, height: 200,
    x: {label:"->", grid:true, domain:[0, 300]},
    y: {label:null, domain: headline.map(d => d.metric)},
    marks: [
      Plot.barX(headline, {x:"value", y:"metric", fill:"#7f2704"}),
      Plot.text(headline, {x:"value", y:"metric", text:"fmt", dx:6,
                textAnchor:"start", fontSize:13, fontWeight:"bold",
                fill:"#3a3226"}),
      Plot.ruleX([0])
    ]
  })
}


function _2(Plot)
{
  const metrics = [
    {metric:"New developers added", unit:"mn", india:5.2,  us:0.8},
    {metric:"Distinct public repos", unit:"k",  india:405,  us:342},
    {metric:"Contribution share",    unit:"%",  india:12.5, us:31.8}
  ]

  // Flatten with explicit labels
  const data = metrics.flatMap(d => [
    {metric:`${d.metric} (${d.unit})`, country:"India", value:d.india,
     label:`${d.india}${d.unit}`},
    {metric:`${d.metric} (${d.unit})`, country:"US",   value:d.us,
     label:`${d.us}${d.unit}`}
  ])

  // Normalize
  const maxes = {}
  data.forEach(d => maxes[d.metric] = Math.max(maxes[d.metric]||0, d.value))
  const norm = data.map(d => ({...d, pct: d.value/maxes[d.metric]*100}))

  return Plot.plot({
    marginLeft: 220, marginRight: 80, height: 320,
    x: {domain:[0,100], grid:true, label:"← US leads  |  India leads →"},
    y: {label:null},
    color: {
      domain:["India","US"],
      range:["#7f2704","#f16913"],
      legend:true
    },
    fy: {domain: [...new Set(norm.map(d=>d.metric))]},
    marks: [
      Plot.barX(norm, {x:"pct", y:"country", fill:"country", fy:"metric",
                       rx:3}),
      Plot.text(norm, {x:"pct", y:"country", fy:"metric", text:"label",
                       dx:6, fontSize:12, fontWeight:"bold",
                       textAnchor:"start", fill:"country"}),
      Plot.ruleX([0])
    ]
  })
}


function _3(Plot)
{
  const octoverse = [
    {metric:"New developers\nadded (mn)",      country:"India", value:5.2,  label:"5.2mn"},
    {metric:"New developers\nadded (mn)",      country:"US",   value:0.8,  label:"0.8mn"},
    {metric:"Distinct public\nrepos (k)",      country:"India", value:405,  label:"405k"},
    {metric:"Distinct public\nrepos (k)",      country:"US",   value:342,  label:"342k"},
    {metric:"Share of total\ncontributions (%)",country:"India", value:12.5, label:"12.5%"},
    {metric:"Share of total\ncontributions (%)",country:"US",   value:31.8, label:"31.8%"}
  ]

  // Normalize each metric to % of its own max
  const maxByMetric = {}
  for (const d of octoverse)
    maxByMetric[d.metric] = Math.max(maxByMetric[d.metric] || 0, d.value)

  const normalized = octoverse.map(d => ({
    ...d,
    pct: (d.value / maxByMetric[d.metric]) * 100
  }))

  return Plot.plot({
    marginLeft: 200, marginRight: 80, height: 300,
    x: {
      label: "% of category maximum →",
      grid: true,
      domain: [0, 100]
    },
    y: {label: null},
    color: {
      domain: ["India", "US"],
      range:  ["#7f2704", "#f16913"],
      legend: true
    },
    fy: {
      domain: [
        "New developers\nadded (mn)",
        "Distinct public\nrepos (k)",
        "Share of total\ncontributions (%)"
      ]
    },
    marks: [
      Plot.barX(normalized, {
        x: "pct",
        y: "country",
        fill: "country",
        fy: "metric"
      }),
      Plot.text(normalized, {
        x: "pct",
        y: "country",
        fy: "metric",
        text: "label",
        dx: 6,
        fontSize: 12,
        fontWeight: "bold",
        textAnchor: "start",
        fill: "country"
      }),
      Plot.ruleX([0])
    ]
  })
}


function _4(Plot)
{
  const octoverse = [
    {metric:"New developers\n(mn)",   country:"India", value:5.2,  label:"5.2mn"},
    {metric:"New developers\n(mn)",   country:"US",    value:0.8,  label:"0.8mn"},
    {metric:"Public repos\n(k)",      country:"India", value:405,  label:"405k"},
    {metric:"Public repos\n(k)",      country:"US",    value:342,  label:"342k"},
    {metric:"Contribution\nshare(%)", country:"India", value:12.5, label:"12.5%"},
    {metric:"Contribution\nshare(%)", country:"US",    value:31.8, label:"31.8%"}
  ]

  const maxes = {}
  octoverse.forEach(d => maxes[d.metric] = Math.max(maxes[d.metric]||0, d.value))
  const norm = octoverse.map(d => ({...d, pct: d.value/maxes[d.metric]*100}))

  return Plot.plot({
    width: 420, height: 420,      // ← taller: 3 rows need space
    marginLeft: 160, marginTop: 50, marginBottom: 40,
    x: {domain:["India","US"], label:null, axis:"top"},
    y: {
      domain:[
        "New developers\n(mn)",
        "Public repos\n(k)",
        "Contribution\nshare(%)"
      ],
      label:null
    },
    r: {range:[6, 28]},           // ← max 28px: fits in row
    color: {
      domain:["India","US"],
      range:["#7f2704","#f16913"],
      legend:true
    },
    marks: [
      Plot.dot(norm, {
        x:"country", y:"metric",
        r:"pct", fill:"country", fillOpacity:0.85
      }),
      Plot.text(norm, {
        x:"country", y:"metric",
        text:"label",
        fontSize:11, fontWeight:"bold", fill:"white"
      })
    ]
  })
}


function _5(Plot)
{
  const metrics = [
    {metric:"New developers (mn)",   india:5.2,  us:0.8},
    {metric:"Public repos (k)",      india:405,  us:342},
    {metric:"Contribution share (%)",india:12.5, us:31.8}
  ]

  // Normalize to % of max per metric
  const norm = metrics.map(d => {
    const mx = Math.max(d.india, d.us)
    return {
      metric: d.metric,
      indiaRaw: d.india, usRaw: d.us,
      india: d.india/mx*100,
      us:    d.us/mx*100,
      indiaLabel: d.india, usLabel: d.us
    }
  })

  return Plot.plot({
    width: 500, height: 260,
    marginLeft: 180, marginRight: 80,
    x: {domain:[0,100], grid:true, label:"% of category max →"},
    y: {label: null, domain: norm.map(d=>d.metric)},
    marks: [
      // Connecting line (the "dumbbell bar")
      Plot.link(norm, {
        x1: "us", x2: "india",
        y1: "metric", y2: "metric",
        stroke: "#ccc", strokeWidth: 3
      }),
      // US dot
      Plot.dot(norm, {
        x: "us", y: "metric",
        fill: "#f16913", r: 10
      }),
      // India dot
      Plot.dot(norm, {
        x: "india", y: "metric",
        fill: "#7f2704", r: 10
      }),
      // US labels
      Plot.text(norm, {
        x: "us", y: "metric",
        text: d => d.usRaw,
        fill: "white", fontSize: 10, fontWeight: "bold"
      }),
      // India labels
      Plot.text(norm, {
        x: "india", y: "metric",
        text: d => d.indiaRaw,
        fill: "white", fontSize: 10, fontWeight: "bold"
      })
    ]
  })
}


function _6(Plot)
{
  // Each metric normalized to 100% independently
  const metrics = [
    {
      title: "New developers added (mn)",
      rows: [
        {country:"India", value:5.2,  pct:87, label:"5.2mn"},  // 5.2/(5.2+0.8)*100
        {country:"US",    value:0.8,  pct:13, label:"0.8mn"}
      ]
    },
    {
      title: "Distinct public repos (k)",
      rows: [
        {country:"India", value:405, pct:54, label:"405k"},
        {country:"US",    value:342, pct:46, label:"342k"}
      ]
    },
    {
      title: "Contribution share (%)",
      rows: [
        {country:"India", value:12.5, pct:28, label:"12.5%"},
        {country:"US",    value:31.8, pct:72, label:"31.8%"}
      ]
    }
  ]

  // Build flat data: each metric = independent 100% bar
  const flat = metrics.flatMap(m =>
    m.rows.flatMap(r => [
      {title:m.title, country:r.country, segment:r.country, value:r.pct, label:r.label},
      {title:m.title, country:r.country, segment:"rest",    value:100-r.pct, label:""}
    ])
  )

  return Plot.plot({
    width: 520, height: 340,
    marginLeft: 50, marginRight: 100,
    marginTop: 10, marginBottom: 40,
    x: {domain:[0,100], grid:true, label:"Share within metric →"},
    y: {label:null},
    fy: {
      domain: metrics.map(m => m.title),
      label: null
    },
    color: {
      domain:["India","US","rest"],
      range:["#7f2704","#f16913","#e8ddd0"],
      legend:false
    },
    marks: [
      Plot.barX(flat, Plot.stackX({
        x:"value", y:"country", z:"country",
        fill:"segment",
        fy:"title",
        order: d => d.segment === "rest" ? 1 : 0
      })),
      // Value labels inside colored segment
      Plot.text(
        flat.filter(d => d.segment !== "rest"),
        Plot.stackX({
          x:"value", y:"country", z:"country",
          fill:"segment", fy:"title",
          order: d => d.segment === "rest" ? 1 : 0,
          text:"label",
          fontSize:12, fontWeight:"bold",
          fill:"white",
          textAnchor:"middle"
        })
      ),
      // Country labels on right
      Plot.text(
        flat.filter(d => d.segment !== "rest"),
        {
          x:100, y:"country",
          fy:"title",
          text: d => `${d.country} ${d.label}`,
          dx:6, fontSize:11,
          textAnchor:"start",
          fill: d => d.country === "India" ? "#7f2704" : "#f16913"
        }
      ),
      Plot.ruleX([0])
    ]
  })
}


function _7(Plot)
{
  const data = [
    {
      layer:"IT outsourcing delivery",
      india:55, other:45,
      indiaLabel:"India 55%", otherLabel:"Rest of world 45%",
      note:"WHO DOES THE WORK"
    },
    {
      layer:"Total IT services market",
      india:5.5, other:94.5,
      indiaLabel:"India 5.5%", otherLabel:"Rest of world 94.5%",
      note:"WHO CAPTURES THE VALUE"
    }
  ]

  const flat = data.flatMap(d => [
    {layer:d.layer, party:"India",         value:d.india,
     label:d.indiaLabel, note:d.note},
    {layer:d.layer, party:"Rest of world", value:d.other,
     label:d.otherLabel, note:d.note}
  ])

  return Plot.plot({
    width:520, height:160,
    marginLeft:200, marginRight:120, marginTop:30,
    x:{domain:[0,100], grid:true, label:"Share (%) →"},
    y:{label:null},
    color:{
      domain:["India","Rest of world"],
      range:["#7f2704","#d9c4b0"],
      legend:true
    },
    fy:{domain:data.map(d=>d.layer)},
    marks:[
      Plot.barX(flat, Plot.stackX({
        x:"value", y:"party", z:"party",
        fill:"party", fy:"layer"
      })),
      Plot.text(
        flat.filter(d=>d.party==="India"),
        Plot.stackX({
          x:"value", y:"party", z:"party",
          fill:"party", fy:"layer",
          text:"label",
          fontSize:12, fontWeight:"bold",
          fill:"white", textAnchor:"middle"
        })
      ),
      Plot.text(
        flat.filter(d=>d.party==="India"),
        {
          x:100, y:"party", fy:"layer",
          text:"note",
          dx:6, fontSize:10, fontWeight:"bold",
          fill:"#7f2704", textAnchor:"start"
        }
      ),
      Plot.ruleX([0])
    ]
  })
}


function _8(Plot)
{ // Ignore this 
  const gap = [
    {
      metric:"Outsourced IT delivery",
      value:55,
      label:"55%",
      sublabel:"of global outsourcing"
    },
    {
      metric:"Total IT services market",
      value:5.5,
      label:"5.5%",
      sublabel:"of global IT market"
    }
  ]

  return Plot.plot({
    width:480, height:220,
    marginLeft:200, marginRight:80, marginTop:40,
    x:{
      type:"log",
      domain:[1,100],
      grid:true,
      label:"India's share (%) — log scale →",
      ticks:[1,2,5,10,20,50,100]
    },
    y:{label:null, domain:gap.map(d=>d.metric)},
    marks:[
      // Connecting line showing the gap
      Plot.link(
        [{x1:5.5, x2:55, y:"gap"}],
        {
          x1:"x1", x2:"x2",
          y1: _=>"Total IT services market",
          y2: _=>"Outsourced IT delivery",
          stroke:"#ccc", strokeWidth:2,
          strokeDasharray:"4,3"
        }
      ),
      Plot.barX(gap, {
        x:"value", y:"metric",
        fill:"#7f2704", rx:3
      }),
      Plot.text(gap, {
        x:"value", y:"metric",
        text: d=>`${d.label}\n${d.sublabel}`,
        dx:8, fontSize:12, fontWeight:"bold",
        textAnchor:"start", fill:"#3a3226"
      }),
      // "10× gap" annotation
      Plot.text(
        [{x:17, y:"Outsourced IT delivery"}],
        {
          x:"x", y:"y",
          dy: 28,
          text: _=>"← 10× gap between work done and value captured",
          fontSize:10, fill:"#888", fontStyle:"italic"
        }
      ),
      Plot.ruleX([1])
    ]
  })
}


function _9(Plot)
{
  const geo = [
    {region:"United States", share:50.3},
    {region:"Europe", share:31.4},
    {region:"United Kingdom", share:15.5},
    {region:"Rest of world", share:2.8}
  ]
  return Plot.plot({
    marginLeft: 120, marginRight: 60, height: 160,
    x: {label:"export share (%) ->", grid:true, domain:[0, 60]},
    y: {label:null, domain: geo.map(d => d.region)},
    marks: [
      Plot.barX(geo, {x:"share", y:"region", fill:"#7f2704"}),
      Plot.text(geo, {x:"share", y:"region", text:d=>d.share+"%", dx:6,
        textAnchor:"start", fontSize:12, fontWeight:"bold", fill:"#3a3226"}),
      Plot.ruleX([0])
    ]
  })
}


function _10(Plot)
{
  const india = [
    {category:"Computer services (SI2)\napplication, IT, custom software", share:10.5, fmt:"10.5%"},
    {category:"Charges for use of IP (SH)\npackaged software, licensing, royalties", share:0.3, fmt:"0.3%"}
  ]
  return Plot.plot({
    marginLeft: 320, marginRight: 60, height: 160,
    x: {label:"India's share of world exports (%) →", grid:true, domain:[0, 12]},
    y: {label:null, domain: india.map(d => d.category)},
    marks: [
      Plot.barX(india, {x:"share", y:"category", fill:"#7f2704"}),
      Plot.text(india, {x:"share", y:"category", text:"fmt", dx:6,
        textAnchor:"start", fontSize:13, fontWeight:"bold", fill:"#3a3226"}),
      Plot.ruleX([0])
    ]
  })
}


function _11(Plot)
{
  const data = [
    {year:"2023", country:"US", value:58.78},
    {year:"2024", country:"US", value:65.35},
    {year:"2025", country:"US", value:74.05},
    {year:"2023", country:"IN", value:36.92},
    {year:"2024", country:"IN", value:48.41},
    {year:"2025", country:"IN", value:64.07},
    {year:"2023", country:"CN", value:18.70},
    {year:"2024", country:"CN", value:18.87},
    {year:"2025", country:"CN", value:18.40}
  ]
  return Plot.plot({
    marginLeft: 60, marginRight: 60, height: 320,
    x: {label:null, domain:["2023","2024","2025"]},
    y: {label:"Active public repos (millions, Q4)", grid:true, domain:[0, 80]},
    color: {domain:["US","IN","CN"], range:["#7f2704","#f16913","#cc6633"], legend:true},
    marks: [
      Plot.barX(data, {x:"year", y:"value", fill:"country", dx:0}),
      Plot.text(data, {x:"year", y:"value", fill:"country", text:d => d.value.toFixed(1),
                dy:-6, fontSize:11, fontWeight:"bold"}),
      Plot.ruleY([0])
    ]
  })
}


function _12(Plot)
{
  const india = [
    {
      category: "Computer services",
      sublabel: "delivery — application, IT, custom software",
      share: 10.5,
      fmt: "10.5%"
    },
    {
      category: "IP charges",
      sublabel: "ownership — licensing, royalties, packaged software",
      share: 0.3,
      fmt: "0.3%"
    }
  ]

  const width = 640

  return Plot.plot({
    width,
    height: 220,
    marginLeft: 40,
    marginRight: 120,
    marginTop: 60,
    marginBottom: 40,
    x: {
      label: "India's share of world exports (%) →",
      grid: true,
      domain: [0, 12]
    },
    y: {
      label: null,
      domain: india.map(d => d.category)
    },
    marks: [
      // Reference line at 10.5 projected down
      Plot.ruleX([10.5], {
        stroke: "#7f2704",
        strokeDasharray: "3,3",
        strokeOpacity: 0.3
      }),

      // Main dots
      Plot.dot(india, {
        x: "share",
        y: "category",
        r: d => d.share * 2.8,   // area proportional to share
        fill: "#7f2704",
        fillOpacity: 0.85
      }),

      // Value labels right of dot
      Plot.text(india, {
        x: "share",
        y: "category",
        text: "fmt",
        dx: d => d.share * 2.8 + 8,
        fontSize: 14,
        fontWeight: "bold",
        textAnchor: "start",
        fill: "#3a3226"
      }),

      // Sublabels below category
      Plot.text(india, {
        x: 0,
        y: "category",
        text: "sublabel",
        dy: 18,
        fontSize: 10,
        fill: "#888",
        textAnchor: "start"
      }),

      // "35× gap" annotation
      Plot.text([{x: 5.4, y: "IP charges"}], {
        x: "x", y: "y",
        dy: -22,
        text: _ => "← 35× gap between what India delivers and what India owns",
        fontSize: 10,
        fontStyle: "italic",
        fill: "#7f2704",
        textAnchor: "middle"
      }),

      Plot.ruleX([0])
    ]
  })
}


function _13(Plot)
{
  // Show 0.3 as a fraction of 10.5 on a single normalised axis
  const data = [
    {layer: "Delivery", value: 10.5, pct: 100,  fmt: "10.5%  Computer services"},
    {layer: "Ownership", value: 0.3,  pct: 2.86, fmt:  "0.3%  IP & licensing"}
  ]

  return Plot.plot({
    width: 560,
    height: 140,
    marginLeft: 100,
    marginRight: 160,
    x: {
      label: "Relative to India's delivery share →",
      domain: [0, 100],
      ticks: [0, 25, 50, 75, 100],
      tickFormat: d => d === 100 ? "= delivery" : d + "%"
    },
    y: { label: null, domain: data.map(d => d.layer) },
    marks: [
      Plot.barX(data, {
        x: "pct",
        y: "layer",
        fill: d => d.layer === "Delivery" ? "#7f2704" : "#f16913",
        rx: 3
      }),
      Plot.text(data, {
        x: "pct",
        y: "layer",
        text: "fmt",
        dx: 8,
        fontSize: 12,
        fontWeight: "bold",
        textAnchor: "start",
        fill: "#3a3226"
      }),
      Plot.ruleX([0])
    ]
  })
}


function _14(Plot)
{
  const repos = [
    {country:"US", value:74.05, panel:"Active public repos (millions, Q4 2025)"},
    {country:"IN", value:64.07, panel:"Active public repos (millions, Q4 2025)"},
    {country:"CN", value:18.40, panel:"Active public repos (millions, Q4 2025)"},
    {country:"US", value:22,    panel:"Top-100 innovation clusters (GII 2025)"},
    {country:"IN", value:4,     panel:"Top-100 innovation clusters (GII 2025)"},
    {country:"CN", value:24,    panel:"Top-100 innovation clusters (GII 2025)"}
  ]
  return Plot.plot({
    marginLeft: 60, marginRight: 30, height: 240,
    x: {label:null, labelAnchor:"left"},
    y: {label:null, grid:true},
    color: {domain:["US","IN","CN"], range:["#7f2704","#f16913","#cc6633"], legend:true},
    fx: {label:null},
    marks: [
      Plot.barY(repos, {x:"country", y:"value", fill:"country", fx:"panel", dx:0}),
      Plot.text(repos, {x:"country", y:"value", fill:"country", fx:"panel",
                text:d => d.value.toString(), dy:-6, fontSize:11, fontWeight:"bold"}),
      Plot.ruleY([0])
    ]
  })
}


function _15(Plot)
{
  const rows = [
    // Panel 1: Active repos (volume)
    {y:"US", value:74.05, panel:"Active public repos (M, Q4 2025)",       fmt:"74.0M", fill:"#7f2704"},
    {y:"IN", value:64.07, panel:"Active public repos (M, Q4 2025)",       fmt:"64.1M", fill:"#f16913"},
    {y:"CN", value:18.40, panel:"Active public repos (M, Q4 2025)",       fmt:"18.4M", fill:"#cc6633"},

    // Panel 2: GII top-100 clusters (concentration)
    {y:"US", value:22,    panel:"Top-100 innovation clusters (GII 2025)", fmt:"22",    fill:"#7f2704"},
    {y:"IN", value:4,     panel:"Top-100 innovation clusters (GII 2025)", fmt:"4",     fill:"#f16913"},
    {y:"CN", value:24,    panel:"Top-100 innovation clusters (GII 2025)", fmt:"24",    fill:"#cc6633"},

    // Panel 3: Delivery vs Ownership (the 35× gap)
    {y:"Delivery",  value:100,  panel:"India's share of world exports (2025)", fmt:"10.5%", fill:"#7f2704"},
    {y:"Ownership", value:2.86, panel:"India's share of world exports (2025)", fmt:"0.3%",  fill:"#f16913"}
  ]
  return Plot.plot({
    height: 240,
    marginLeft: 180,
    marginRight: 30,
    x: {label: null, grid: true},
    y: {label: null},
    fx: {label: null},
    marks: [
      Plot.barX(rows, {y:"y", x:"value", fill:"fill", fx:"panel", rx: 3}),
      Plot.text(rows, {y:"y", x:"value", text:"fmt", dx:6,
                fontSize:11, fontWeight:"bold", fill:"#3a3226", fx:"panel"}),
      Plot.ruleX([0])
    ]
  })
}


function _16(Plot)
{
  const rows = [
    // Panel 1: Active repos (volume)
    {y:"US", value:74.05, panel:"1. Volume — active public repos (M, Q4 2025)",       fmt:"74.0M", fill:"#7f2704"},
    {y:"IN", value:64.07, panel:"1. Volume — active public repos (M, Q4 2025)",       fmt:"64.1M", fill:"#f16913"},
    {y:"CN", value:18.40, panel:"1. Volume — active public repos (M, Q4 2025)",       fmt:"18.4M", fill:"#cc6633"},

    // Panel 2: GII top-100 clusters (concentration)
    {y:"US", value:22,    panel:"2. Concentration — GII top-100 innovation clusters", fmt:"22",    fill:"#7f2704"},
    {y:"IN", value:4,     panel:"2. Concentration — GII top-100 innovation clusters", fmt:"4",     fill:"#f16913"},
    {y:"CN", value:24,    panel:"2. Concentration — GII top-100 innovation clusters", fmt:"24",    fill:"#cc6633"},

    // Panel 3: Delivery vs Ownership (the 35× gap)
    {y:"Delivery",  value:100,  panel:"3. Core — India's share of world exports (2025)", fmt:"10.5%", fill:"#7f2704"},
    {y:"Ownership", value:2.86, panel:"3. Core — India's share of world exports (2025)", fmt:"0.3%",  fill:"#f16913"}
  ]
  return Plot.plot({
    width: 700,
    height: 360,
    marginLeft: 240,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 30,
    x: {label: null, grid: true},
    y: {label: null},
    fy: {label: null, domain: [
      "1. Volume — active public repos (M, Q4 2025)",
      "2. Concentration — GII top-100 innovation clusters",
      "3. Core — India's share of world exports (2025)"
    ]},
    marks: [
      Plot.barX(rows, {y:"y", x:"value", fill:"fill", fy:"panel", rx: 3}),
      Plot.text(rows, {y:"y", x:"value", text:"fmt", dx:6,
                fontSize:11, fontWeight:"bold", fill:"#3a3226", fy:"panel"}),
      Plot.ruleX([0])
    ]
  })
}


function _17(Plot)
{
  const rows = [
    // Panel 1: Active repos (volume)
    {y:"US", value:74.05, panel:1, fmt:"74.0M", fill:"#7f2704"},
    {y:"IN", value:64.07, panel:1, fmt:"64.1M", fill:"#f16913"},
    {y:"CN", value:18.40, panel:1, fmt:"18.4M", fill:"#cc6633"},

    // Panel 2: GII top-100 clusters (concentration)
    {y:"US", value:22,    panel:2, fmt:"22",    fill:"#7f2704"},
    {y:"IN", value:4,     panel:2, fmt:"4",     fill:"#f16913"},
    {y:"CN", value:24,    panel:2, fmt:"24",    fill:"#cc6633"},

    // Panel 3: Delivery vs Ownership (the 35× gap)
    {y:"Delivery",  value:100,  panel:3, fmt:"10.5%", fill:"#7f2704"},
    {y:"Ownership", value:2.86, panel:3, fmt:"0.3%",  fill:"#f16913"}
  ]

  const panel_titles = [
    {panel:1, title:"1. Active Github Repos"},
    {panel:2, title:"2. Innovation Clusters count"},
    {panel:3, title:"3. Share of Revenue in IT Services and IP based"}
  ]

  return Plot.plot({
    width: 1000,
    height: 260,
    marginLeft: 200,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 30,
    x: {label: null, grid: true},
    y: {label: null},
    fx: {label: null, axis: null, domain: [1, 2, 3]},
    marks: [
      Plot.barX(rows, {y:"y", x:"value", fill:"fill", fx:"panel", rx: 3}),
      Plot.text(rows, {y:"y", x:"value", text:"fmt", dx:6,
                fontSize:11, fontWeight:"bold", fill:"#3a3226", fx:"panel"}),
      Plot.ruleX([0]),
      // Panel titles on the y-axis (left), rotated 90°
      Plot.text(panel_titles, {
        x: 0,
        y: "middle",
        text: "title",
        rotate: -90,
        fontSize: 10,
        fontWeight: "bold",
        textAnchor: "middle",
        fx: "panel"
      })
    ]
  })
}


function _18(Plot)
{
  const rows = [
    {y:"US", value:74.05, panel:1, fmt:"74.0M", fill:"#7f2704"},
    {y:"IN", value:64.07, panel:1, fmt:"64.1M", fill:"#f16913"},
    {y:"CN", value:18.40, panel:1, fmt:"18.4M", fill:"#cc6633"},
    {y:"US", value:22,    panel:2, fmt:"22",    fill:"#7f2704"},
    {y:"IN", value:4,     panel:2, fmt:"4",     fill:"#f16913"},
    {y:"CN", value:24,    panel:2, fmt:"24",    fill:"#cc6633"},
    {y:"Delivery",  value:100,  panel:3, fmt:"10.5%", fill:"#7f2704"},
    {y:"Ownership", value:2.86, panel:3, fmt:"0.3%",  fill:"#f16913"}
  ]

  const panel_titles = [
    {panel:1, title:"1. Active Github Repos"},
    {panel:2, title:"2. Innovation Clusters count"},
    {panel:3, title:"3. Share of Revenue in IT Services and IP based"}
  ]

  return Plot.plot({
    width: 1100,
    height: 260,
    marginLeft: 280,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 30,
    x: {label: null, grid: true},
    y: {label: null},
    fx: {label: null, axis: null, domain: [1, 2, 3]},
    marks: [
      Plot.barX(rows, {y:"y", x:"value", fill:"fill", fx:"panel", rx: 3}),
      Plot.text(rows, {y:"y", x:"value", text:"fmt", dx:6,
                fontSize:11, fontWeight:"bold", fill:"#3a3226", fx:"panel"}),
      Plot.ruleX([0]),
      // Panel titles in the margin (left of y-axis), rotated 90°
      Plot.text(panel_titles, {
        x: 0,
        y: "middle",
        text: "title",
        rotate: -90,
        fontSize: 12,
        fontWeight: "bold",
        textAnchor: "end",
        dx: -15,
        fx: "panel"
      })
    ]
  })
}


function _19(Plot)
{
  const rows = [
    {y:"US", value:74.05, panel:1, fmt:"74.0M", fill:"#7f2704"},
    {y:"IN", value:64.07, panel:1, fmt:"64.1M", fill:"#f16913"},
    {y:"CN", value:18.40, panel:1, fmt:"18.4M", fill:"#cc6633"},
    {y:"US", value:22,    panel:2, fmt:"22",    fill:"#7f2704"},
    {y:"IN", value:4,     panel:2, fmt:"4",     fill:"#f16913"},
    {y:"CN", value:24,    panel:2, fmt:"24",    fill:"#cc6633"},
    {y:"Delivery",  value:100,  panel:3, fmt:"10.5%", fill:"#7f2704"},
    {y:"Ownership", value:2.86, panel:3, fmt:"0.3%",  fill:"#f16913"}
  ]

  const panel_titles = [
    {panel:1, title:"1. # GitHub repos"},
    {panel:2, title:"2. # GII clusters"},
    {panel:3, title:"3. Export share IT Service vs IP Based"}
  ]

  return Plot.plot({
    width: 1100,
    height: 360,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 30,
    x: {label: null, grid: true},
    y: {label: null},
    fx: {label: null, axis: null, domain: [1, 2, 3]},
    marks: [
      Plot.barX(rows, {y:"y", x:"value", fill:"fill", fx:"panel", rx: 3}),
      Plot.text(rows, {y:"y", x:"value", text:"fmt", dx:6,
                fontSize:11, fontWeight:"bold", fill:"#3a3226", fx:"panel"}),
      Plot.ruleX([0]),
      // Panel titles anchored to the left frame of each panel
      Plot.text(panel_titles, {
        frameAnchor: "top-right",
        y: "top",
        text: "title",
        rotate: -90,
        fontSize: 12,
        fontWeight: "bold",
        textAnchor: "top",
        fx: "panel"
      })
    ]
  })
}


function _20(Plot)
{
  // Normalize each panel to its own 0-100 scale
  // so bars are comparable within each panel

  const panels = [
    {
      panel: 1,
      title: "GitHub public repos (mn)",
      rows: [
        {y:"US", value:74.05, raw:"74.0mn"},
        {y:"India", value:64.07, raw:"64.1mn"},
        {y:"China", value:18.40, raw:"18.4mn"}
      ]
    },
    {
      panel: 2,
      title: "GII innovation clusters (#)",
      rows: [
        {y:"China", value:24, raw:"24"},
        {y:"US",    value:22, raw:"22"},
        {y:"India", value:4,  raw:"4"}
      ]
    },
    {
      panel: 3,
      title: "India's world export share (%)",
      rows: [
        {y:"IT delivery\n(computer services)", value:15.8, raw:"~16%"},
        {y:"IP ownership\n(royalties earned)",  value:0.34, raw:"0.3%"}
      ]
    }
  ]

  // Normalize: each row gets pct = value / panel_max × 100
  const colors = {
    "US":    "#7f2704",
    "India": "#f16913",
    "China": "#cc6633",
    "IT delivery\n(computer services)": "#7f2704",
    "IP ownership\n(royalties earned)":  "#f4a460"
  }

  const flat = panels.flatMap(p => {
    const mx = Math.max(...p.rows.map(r => r.value))
    return p.rows.map(r => ({
      panel:    p.panel,
      title:    p.title,
      y:        r.y,
      value:    r.value,
      pct:      r.value / mx * 100,
      raw:      r.raw,
      fill:     colors[r.y] ?? "#7f2704"
    }))
  })

  const titles = panels.map(p => ({panel: p.panel, title: p.title}))

  return Plot.plot({
    width:  900,
    height: 320,
    marginLeft:   90,
    marginRight:  70,
    marginTop:    50,
    marginBottom: 30,

    x: {
      label: null,
      grid: true,
      domain: [0, 100],
      tickFormat: () => ""   // hide x tick labels — raw values shown inside bars
    },
    y: { label: null },
    fx: {
      label: null,
      axis: null,
      domain: [1, 2, 3],
      padding: 0.15
    },

    marks: [
      // Panel title above each facet
      Plot.text(titles, {
        fx: "panel",
        frameAnchor: "top",
        text: "title",
        dy: -30,
        fontSize: 11,
        fontWeight: "bold",
        fill: "#3a3226",
        textAnchor: "middle"
      }),

      // Bars (normalized to panel max)
      Plot.barX(flat, {
        y:    "y",
        x:    "pct",
        fill: "fill",
        fx:   "panel",
        rx:   3
      }),

      // Raw value labels right of each bar
      Plot.text(flat, {
        y:    "y",
        x:    "pct",
        fx:   "panel",
        text: "raw",
        dx:   6,
        fontSize:   11,
        fontWeight: "bold",
        fill:       "#3a3226",
        textAnchor: "start"
      }),

      // Vertical dividers between panels
      Plot.ruleX([0])
    ]
  })
}


function _21(htl)
{
  const rows = [
    {label:"US",           value:74.05, fmt:"74.0mn", fill:"#7f2704", panel:1},
    {label:"India",        value:64.07, fmt:"64.1mn", fill:"#f16913", panel:1},
    {label:"China",        value:18.40, fmt:"18.4mn", fill:"#cc6633", panel:1},
    {label:"China",        value:24,    fmt:"24",     fill:"#cc6633", panel:2},
    {label:"US",           value:22,    fmt:"22",     fill:"#7f2704", panel:2},
    {label:"India",        value:4,     fmt:"4",      fill:"#f16913", panel:2},
    {label:"IT delivery",  value:15.8,  fmt:"~16%",   fill:"#7f2704", panel:3},
    {label:"IP ownership", value:0.34,  fmt:"0.3%",   fill:"#f16913", panel:3}
  ]

  const panelMeta = {
    1: {title:"GitHub public repos (mn)",      max:74.05},
    2: {title:"GII innovation clusters (#)",   max:24},
    3: {title:"India's share of world exports (%)", max:15.8}
  }

  // Group rows by panel
  const byPanel = {}
  rows.forEach(r => {
    if (!byPanel[r.panel]) byPanel[r.panel] = []
    byPanel[r.panel].push(r)
  })

  const BAR_H        = 28   // px height of each bar
  const GAP          = 12   // px gap between bars
  const MIN_INSIDE_W = 60   // bar must be at least this wide to hold inside label
  const SEP_W        = 1    // separator width px
  const PAD          = 20   // horizontal padding between panel content and separator

  // One container per panel; we'll lay them out with CSS grid
  const panels = [1, 2, 3].map(pid => {
    const meta = panelMeta[pid]
    const panelRows = byPanel[pid]

    // Title
    const title = htl.html`<p style="
      font-size:11px;font-weight:500;
      color:#52514e;
      margin:0 0 10px 0;letter-spacing:0.01em;
    ">${meta.title}</p>`

    // Bars
    const barEls = panelRows.map(row => {
      const pct   = row.value / meta.max          // 0–1
      const labelInside = pct >= (MIN_INSIDE_W / 300) // rough threshold

      const bar = htl.html`<div style="
        position:relative;
        width:100%;height:${BAR_H}px;
        background:#f1efe8;
        border-radius:3px;
        margin-bottom:${GAP}px;
      ">
        <div style="
          position:absolute;left:0;top:0;
          height:${BAR_H}px;
          width:${Math.max(3, pct*100)}%;
          background:${row.fill};
          border-radius:3px;
          display:flex;align-items:center;
          overflow:hidden;
        ">
          ${labelInside ? htl.html`<div style="
            display:flex;justify-content:space-between;align-items:center;
            width:100%;padding:0 8px;box-sizing:border-box;
          ">
            <span style="font-size:11px;font-weight:500;color:#fff;opacity:0.95;">
              ${row.label}
            </span>
            <span style="font-size:11px;font-weight:700;color:#fff;">
              ${row.fmt}
            </span>
          </div>` : ''}
        </div>

        ${!labelInside ? htl.html`<div style="
          position:absolute;
          left:calc(${Math.max(3, pct*100)}% + 6px);
          top:50%;transform:translateY(-50%);
          display:flex;align-items:center;gap:5px;
          white-space:nowrap;
        ">
          <span style="font-size:11px;font-weight:500;color:#52514e;">${row.label}</span>
          <span style="font-size:11px;font-weight:700;color:#0b0b0b;">${row.fmt}</span>
        </div>` : ''}
      </div>`

      return bar
    })

    return htl.html`<div style="flex:1;min-width:0;">
      ${title}
      ${barEls}
    </div>`
  })

  // Separator element
  const sep = () => htl.html`<div style="
    width:${SEP_W}px;
    background:#c3c2b7;
    margin: 18px ${PAD}px 0;
    align-self:stretch;
  "></div>`

  // Legend
  const legendItems = [
    {fill:"#7f2704", label:"US / IT delivery"},
    {fill:"#f16913", label:"India / IP ownership"},
    {fill:"#cc6633", label:"China"}
  ]
  const legend = htl.html`<div style="
    display:flex;flex-wrap:wrap;gap:16px;
    margin-top:16px;
    padding-top:10px;
    border-top:0.5px solid #c3c2b7;
    font-size:12px;color:#52514e;
  ">
    ${legendItems.map(l => htl.html`<span style="display:flex;align-items:center;gap:5px;">
      <span style="width:10px;height:10px;border-radius:2px;background:${l.fill};display:inline-block;"></span>
      ${l.label}
    </span>`)}
    <span style="margin-left:auto;font-style:italic;color:#898781;">
      Bars normalised to panel maximum
    </span>
  </div>`

  return htl.html`<div style="font-family:sans-serif;padding:8px 0;">
    <div style="display:flex;align-items:flex-start;">
      ${panels[0]}
      ${sep()}
      ${panels[1]}
      ${sep()}
      ${panels[2]}
    </div>
    ${legend}
  </div>`
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["Plot"], _1);
  main.variable(observer()).define(["Plot"], _2);
  main.variable(observer()).define(["Plot"], _3);
  main.variable(observer()).define(["Plot"], _4);
  main.variable(observer()).define(["Plot"], _5);
  main.variable(observer()).define(["Plot"], _6);
  main.variable(observer()).define(["Plot"], _7);
  main.variable(observer()).define(["Plot"], _8);
  main.variable(observer()).define(["Plot"], _9);
  main.variable(observer()).define(["Plot"], _10);
  main.variable(observer()).define(["Plot"], _11);
  main.variable(observer()).define(["Plot"], _12);
  main.variable(observer()).define(["Plot"], _13);
  main.variable(observer()).define(["Plot"], _14);
  main.variable(observer()).define(["Plot"], _15);
  main.variable(observer()).define(["Plot"], _16);
  main.variable(observer()).define(["Plot"], _17);
  main.variable(observer()).define(["Plot"], _18);
  main.variable(observer()).define(["Plot"], _19);
  main.variable(observer()).define(["Plot"], _20);
  main.variable(observer()).define(["htl"], _21);
  return main;
}
