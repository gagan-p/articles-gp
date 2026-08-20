# DeepSeek Repair Prompt: renting_the_floor_wip.org

## Mission
You are a senior technical editor. Read the source document, the master review, and all embedded reviewer comments. Then **edit the source file in place** to fix every P0/P1 error, resolve P2 missing sources, address P3/P4 structural issues, and apply P6 conciseness cuts. Do not create a separate report — modify the org file directly.

---

## Files to Read (in order)

```bash
# 1. Source document (4,505 lines)
cat /mnt/wsl/sh_dt_vhdx/global-git/articles-gp/articles_original_org/renting_the_floor_wip.org

# 2. Master review (87 findings, P0-P6)
cat /mnt/wsl/sh_dt_vhdx/global-git/articles-gp/MASTER_REVIEW_renting_the_floor_wip_nemotron.md

# 3. Prior synthesis reviews (for context on adjudicated items)
cat /mnt/wsl/sh_dt_vhdx/global-git/articles-gp/articles_original_org/renting_the_floor_review_synthesis_kimiK3.org
cat /mnt/wsl/sh_dt_vhdx/global-git/articles-gp/articles_original_org/renting_the_floor_review_synthesis_deepseek.org
```

---

## Tools You Have
- `read_file` / `write_file` / `patch` — file I/O
- `terminal` — run bash, curl, git, python
- `browser_exec` — web search via jina.ai, GitHub API, Wikipedia
- `execute_code` — Python scripts for data processing

---

## Phase 0: Setup & Verification (run first)

```bash
# Verify git state
cd /mnt/wsl/sh_dt_vhdx/global-git/articles-gp
git status
git diff HEAD~1 articles_original_org/renting_the_floor_wip.org | head -200
```

Confirm you can see the 87 findings in the master review and the embedded comments in the org file (format: `=[reviewer: [P0] ...]=`).

---

## Phase 1: P0 Critical Factual Errors (MUST FIX)

For each P0 in the master review, **locate the line in the org file**, **verify against primary source**, then **patch**.

### 1.1 GitHub Developer Counts (Lines ~186, ~1003, ~1138)
**Primary source**: GitHub Innovation Graph `developers.csv`
```bash
curl -s "https://raw.githubusercontent.com/github/innovationgraph/main/data/developers.csv" | \
  awk -F, '$2=="IN" || $2=="CN" || $2=="US"' | tail -6
```
**Fix**: Change "largest open-source contributor base" → "second-largest (26.7M), behind US (32.4M)". Update Paradox diagram line 1138 "#1 OSS Contributors" → "#2 OSS Contributors" or "One of the largest".

### 1.2 TPC-C Dates — Essay is CORRECT, Kimi 2.6 was wrong
**Verify**: TPC-C uses "Date Submitted" throughout. Essay matches.
```bash
# Verify top 3
curl -s "https://r.jina.ai/http://www.tpc.org/tpcc/results/tpcc_result_detail5.asp?id=125012701" | grep -A2 "Date Submitted"
curl -s "https://r.jina.ai/http://www.tpc.org/tpcc/results/tpcc_result_detail5.asp?id=120051701" | grep -A2 "Date Submitted"
curl -s "https://r.jina.ai/http://www.tpc.org/tpcc/results/tpcc_result_detail5.asp?id=123032401" | grep -A2 "Date Submitted"
```
**Action**: REJECT Kimi 2.6's date corrections (lines 434-436). Keep essay dates. Add inline comment refuting Kimi 2.6: `=[deepseek: [P0] REJECT Kimi 2.6 date corrections — essay uses Date Submitted correctly; Kimi 2.6 confused with System Availability. Verified against tpc.org detail pages.]=`

### 1.3 OceanBase License (Lines 603, 3538, footnote 15, 6.4.4.2)
**Primary source**: GitHub API
```bash
curl -s "https://api.github.com/repos/oceanbase/oceanbase" | jq -r '.license.spdx_id'
```
**Fix**: "OceanBase was open-sourced in 2021 under Mulan PSL 2.0, since re-licensed to Apache-2.0" — update all 4 locations.

### 1.4 OceanBase Attribution (Lines 608, 2983, 3143, 3538)
**Primary source**: Wikipedia + OceanBase history
```bash
curl -s "https://r.jina.ai/http://en.wikipedia.org/wiki/OceanBase" | grep -A5 -B5 "2010\|Alibaba\|Ant"
```
**Fix**: "Alibaba initiated OceanBase in 2010 (first deployed Taobao Favourites 2011); Ant Financial adopted it as core DB, replacing Oracle 2015-2016." Update all 4 locations.

### 1.5 YugabyteDB Re-domiciliation (Line 3509)
**Primary source**: Wikipedia + GitHub API
```bash
curl -s "https://api.github.com/repos/yugabyte/yugabyte-db" | jq -r '.created_at'
curl -s "https://r.jina.ai/http://en.wikipedia.org/wiki/YugabyteDB" | grep -A3 "Founded\|Headquarters"
```
**Fix**: REMOVE YugabyteDB from re-domiciliation list. It was founded in Sunnyvale, CA (2016). Replace with: "YugabyteDB: US-founded (2016) by Indian-origin engineers — not a re-domiciliation case."

### 1.6 MinIO Re-domiciliation (Line 3510)
**Primary source**: Wikipedia + GitHub API
```bash
curl -s "https://api.github.com/repos/minio/minio" | jq -r '.created_at'
curl -s "https://r.jina.ai/http://en.wikipedia.org/wiki/MinIO" | grep -A3 "founded\|Silicon Valley"
```
**Fix**: REMOVE MinIO from re-domiciliation list. Founded Silicon Valley 2014.

### 1.7 Zoho/AdventNet Founding & Timeline (Lines 2224, 2266, 2268, 2271)
**Primary source**: Wikipedia
```bash
curl -s "https://r.jina.ai/http://en.wikipedia.org/wiki/Zoho_Corporation" | grep -A2 -B2 "1996\|New Jersey\|2002\|2009\|ManageEngine"
```
**Fixes**:
- Line 2224: "Founded in New Jersey, USA, 1996; HQ later moved to Chennai"
- Line 2266 (timeline): 1996 "AdventNet founded, New Jersey; 15 people"
- Line 2268: 2002 "ManageEngine launched (proprietary pivot)"
- Line 2271: 2009 "Renamed Zoho Corporation"

### 1.8 GitHub Innovation Graph Topics Table (Lines 2100-2118)
**Primary source**: `topics.csv` (actual 2025 data)
```bash
curl -s "https://raw.githubusercontent.com/github/innovationgraph/main/data/topics.csv" | \
  python3 -c "
import csv, sys, io
reader = csv.DictReader(io.StringIO(sys.stdin.read()))
india = []; china = []
for row in reader:
    if row['iso2_code']=='IN' and row['year']=='2025':
        india.append((int(row['num_pushers']), row['topic']))
    elif row['iso2_code']=='CN' and row['year']=='2025':
        china.append((int(row['num_pushers']), row['topic']))
india.sort(reverse=True); china.sort(reverse=True)
india_f = [(c,t) for c,t in india if t not in ['config','github-config']]
china_f = [(c,t) for c,t in china if t not in ['config','github-config']]
print('INDIA:', india_f[:10])
print('CHINA:', china_f[:10])
"
```
**Fix**: REPLACE entire table with actual data. Or relabel as "Illustrative sample — not raw Innovation Graph output" if you prefer to keep the narrative.

### 1.9 UPI vs PolarDB Arithmetic Error (Line 858)
**Calculation**: 2,055M tpmC = 2,055,000,000 TPM. UPI ~224,000 TPM. Ratio = 9,170×.
**Fix**: "PolarDB Limitless sustains ~2,055M TPM (~34.25M TPS) — a gap of roughly **9,000×** vs UPI's ~224K TPM" or drop ratio, keep only architectural caveat.

### 1.10 Forcing Function Contradiction (Lines 1013, 2881, 2884, 3734)
**Essay asserts both**: "India faced none" AND "PhonePe/Zerodha hit walls but assembled".
**Fix**: Rewrite §6.1 opening and forcing-function quote:
- "India HIT walls (PhonePe: Mesos limits → Drove; Zerodha: PG limits → DungBeetle; startups: PG limits). The difference is RESPONSE: India assembles/extends/rents; China built sovereign greenfield."
- Update quote: "India hit walls but answered by assembly. China hit walls and built greenfield."
- Reconcile §3.8 and §6.8 to same framing.

### 1.11 NASSCOM Export Share (Lines 1271, 1250, footnote 2)
**Primary source**: NASSCOM Strategic Review 2025 (primary PDF)
```bash
# Try to find the actual export figure
curl -s "https://r.jina.ai/http://nasscom.in/knowledge-center/publications" | grep -i "283\|224\|export"
```
**Fix**: Change "~86% ($244B)" → "~79% ($224B/$283B)" in body, chart (line 1250), and footnote 2. Update geography splits if unverified → tag [Author judgement].

### 1.12 MapMyIndia ≠ KOO (Line 2609)
**Fact**: MapMyIndia = CE Info Systems (1995), brand Mappls, IPO Dec 2021. Koo = microblogging (2019, defunct Jul 2024).
**Fix**: Remove "(now KOO)". Change to "MapMyIndia (Mappls)".

### 1.13 Hadoop Attribution (Line 3185)
**Fact**: Hadoop = Yahoo! (Doug Cutting), inspired by Google GFS/MapReduce.
**Fix**: Replace "Baidu (Hadoop)" with "Alibaba MaxCompute" or "ByteDance internal stack" or drop second entry.

### 1.14 Gitee OpenHarmony Migration (Line 3242)
**Fact**: OpenHarmony migrated to GitCode Sept 2025.
**Fix**: "OpenHarmony (migrated to GitCode 2025)" or "some projects hosted on AtomGit".

### 1.15 OceanBase Governance (Lines 3538, 3621)
**Fact**: OceanBase = Mulan PSL 2.0 / OpenAtom Foundation. RocketMQ = Apache TLP.
**Fix**: "OceanBase (Mulan PSL 2.0, OpenAtom Foundation); RocketMQ (Apache TLP); Kubernetes (CNCF)".

### 1.16 Raw HTML Figures → OJS/Mermaid (5 figures)
**Locations**:
- Line 224: FigCode.Exec_Summary_Floor
- Line 1027: FigCode.India_Software_Paradox
- Line 1554: FigCode.Mental_Model_Stack
- Line 1672: FigCode.RBV_Diagram
- Line 3869: FigCode.Language_Ecosystem_Comparison

**Action**: Convert each to ```{ojs}``` or ```{mermaid}``` inside `#+begin_export markdown`. Match existing visual language (colors, fonts).

---

## Phase 2: P1 Data Discrepancies / Outdated Figures

### 2.1 UPI Volumes (Lines 820, 1830, 4357)
**Primary sources**:
- Fortune India Jul 2026: "UPI closes FY26 at ₹314 lakh crore"
- NPCI: ~20B/month (Aug 2025) ≈ 645M/day
- ACI Worldwide 2023: ~48.5% world real-time payments share
**Fix**: Update all three locations with period labels and citations.

### 2.2 World Bank R&D/GDP (Lines 2704, 2732, 2786)
**Primary source**: World Bank 2023 data
- China: 2.58% (2023)
- India: 0.65% (2020, latest)
- US: 3.45% (2023)
- Korea: 4.94% (2023)
**Fix**: Update all figures, stamp years in Innovation Hub table and chart.

### 2.3 WIPO Patents (Line 2706)
**Primary source**: WIPO 2023
- China: ~1.64M total applications
- India: ~90K
- Ratio: ~18×
**Fix**: "WIPO 2023: China ~1.64M total patent applications vs India ~90K (~18×). Specify total vs ICT if possible."

### 2.4 Innovation Hub Chart Scales (Line 2732)
**Issue**: Incomparable scales on one axis.
**Fix**: Normalize indices (India=1.0) or use faceted panels in OJS.

### 2.5 UPI TPS Average vs Peak (Line 2877)
**Primary source**: NPCI monthly reports
- 3,729 TPS = 2023 average (~322M/day)
- 2024 average: 500M/day ≈ 5,800 TPS
- Peak Oct 2024: >10,000 TPS
**Fix**: Cite NPCI monthly report, distinguish avg vs peak.

### 2.6 Oracle "Bankrupted" Claim (Line 2873)
**Fix**: Replace with "cost-prohibitive at scale" or cite Alibaba FY2013 revenue (~$5.6B).

---

## Phase 3: P2 Missing Sources — Add Citations

For each P2 in master review, **find primary source** and **add inline citation** (footnote reference or URL in brackets).

Key items needing citations:
- Huawei Linux kernel rank #1 for 5.10/2020 → Linux Foundation 2020 report / LWN
- Tencent stack self-developed → TDSQL full-disclosure report
- HammerDB single-node figures → HammerDB docs or tag [Author judgement]
- OceanBase 10% 2014 traffic → Ant/OceanBase history doc
- Asterinas/Occlum/TuGraph affiliations → GitHub repos
- UPI core clearing on Oracle/IBM → NPCI technical doc or tag [Author judgement]
- Mindgate 9B txn/month → "(vendor case study, scope undisclosed)"
- ShaktiDB → MeitY/IITM-Pravartak announcement or mark unverifiable
- Ola Maps ₹100 crore saving → Ola CEO Jul 2024 statement
- ISRO Bhuvan "no developer ecosystem" → tag [Author judgement]
- LLVM China contributions → specify LoongArch/RISC-V forks
- C-DAC PARAM exports → C-DAC annual report or soften
- Hasura re-domiciliation → corporate registry / TechCrunch
- CDAC/CDOT adoption failure → cite one named project or tag [Author judgement]
- IOE replacement mandate → Bloomberg/FT coverage of xinchuang directives
- GSUB/GPOS rendering → HarfBuzz/ICU reference or concrete conjunct example
- Zepto PR → tag [Author judgement] or replace with verified example
- AtomGit GPU/NPU free → OpenAtom Foundation service descriptions
- PhD brain-drain → IIT/IISc placement study or soften
- NITI Aayog land disputes → "NITI Aayog 'Designing the Future of Dispute Resolution' (2021) using DAKSH data"
- Missing footnotes: GitHub Octoverse 2024 (5.2M/yr), NITI Aayog, LWN.net Huawei kernel stats

---

## Phase 4: P3/P4 Structural & Logic Fixes

### 4.1 Layer Count Harmonization (Lines 1510, 1776, 1972)
**Fix**: Add footnote to RBV diagram: "RBV uses simplified 3-layer view; see §4.3 for full 5-layer model." Ensure India/China depth chart uses 4 layers (Raw Material, Plumbing, Floor, Building) consistently.

### 4.2 Zoho vs Forcing Function Contradiction (Line 2387)
**Issue**: Essay says export-first = no forcing function, but Zoho is export-first AND built own floor.
**Fix**: Add paragraph: "Zoho is the exception that proves the rule: founder discipline (Sridhar Vembu) and no VC pressure allowed a 20-year horizon. Most export-first companies lack this patience."

### 4.3 Five Patterns: Prose + Table Duplication (Lines 3075-3098)
**Fix**: Keep table (3110-3117). Replace prose list (3078-3093) with: "From the canonical list, five recurring patterns emerge (see Table [Five_Patterns_Table])."

### 4.4 C-DAC vs Huawei pikchr Evidence (Lines 3375-3406)
**Fix**: 
- Soften Huawei early: "Huawei founded 1987 manufacturing phone switches; C&C08 digital switch by 1993"
- Cite C-DAC PARAM international deployments from C-DAC retrospectives
- Add kernel contributor data citation for Huawei rank #1

### 4.5 Section 6.7 Redundancy (Line 3313)
**Fix**: Fold §6.7 (PhonePe Drove story) into §6.4.4.2. Delete §6.7 heading and element.

### 4.6 Language Ecosystem Deduplication (Line 3984)
**Fix**: Keep HTML figure (6.9.002), convert to OJS. Delete org table in 6.9.001.

### 4.7 :CHILDREN: Declaration Fixes
- Line 1185: `.Tab.` → `.FigCode.`
- Line 1950: `.Tab.` → `.FigCode.`
- Line 4002: `.Tab.` → `.FigCode.`

### 4.8 Mermaid Node J Undefined (Line 2922)
**Fix**: Remove `style J fill:#6bcb77,stroke:#333` or add node J to graph.

### 4.9 Custody Argument Consolidation (Lines 4037, 4176, 4211)
**Fix**: Make §7.3.002 canonical. Replace §7.1 and §7.4 custody paragraphs with forward refs: "See §7.3.002 for the neutral custody institution proposal."

### 4.10 Mental Model Stack Colors (Line 1629)
**Fix**: Give Plumbing distinct color (e.g., #2251ff for Floor, #b07a10 for Building, #008a6d for Plumbing, #051c2c for Raw Material, #8595a6 for Interior).

---

## Phase 5: P6 Conciseness Cuts (apply all ~180 lines)

See master review table. Key cuts:
- Lines 166, 395, 559, 578, 854, 982, 1013, 1654, 1776, 1807, 1836, 1919, 1972, 2176, 2223, 2301, 2321, 2369, 2465, 2540, 2589, 3075, 3158, 3218, 3313, 3730, 3812, 3984, 4143, 4153, 4181, 4211

---

## Phase 6: Verification & Commit

```bash
# 1. Verify all P0 fixes applied
grep -n "P0" MASTER_REVIEW_renting_the_floor_wip_nemotron.md | wc -l

# 2. Check for remaining Kimi 2.6 date corrections (should be refuted)
grep -n "Kimi.*date" articles_original_org/renting_the_floor_wip.org

# 3. Verify no raw HTML figures remain
grep -n "export html" articles_original_org/renting_the_floor_wip.org

# 4. Validate org syntax
# (no built-in validator, but check for balanced drawers, code blocks)

# 5. Commit
git add articles_original_org/renting_the_floor_wip.org
git commit -m "fix: apply P0-P6 repairs from deep-document-review (DeepSeek)

- Fixed 18 P0 factual errors (GitHub stats, TPC-C dates, OceanBase license/attribution,
  YugabyteDB/MinIO founding, Zoho dates, Dev Topics table, UPI math, forcing function,
  NASSCOM export share, MapMyIndia, Hadoop, Gitee, OceanBase governance)
- Updated 14 P1 figures to latest primary sources (UPI, World Bank, WIPO, NPCI)
- Added citations for 22 P2 missing sources
- Resolved 9 P3 logic gaps (Zoho exception, pattern duplication, C-DAC evidence)
- Fixed 11 P4 structural errors (HTML→OJS figures, layer counts, CHILDREN declarations,
  mermaid node, custody consolidation, color collision)
- Applied ~180 lines of P6 conciseness cuts
- Converted 5 raw HTML figures to OJS/Mermaid"
```

---

## Execution Rules

1. **One patch per finding** — use `patch` tool with unique `old_string` context
2. **Verify before patch** — run the terminal commands above to confirm primary source
3. **Preserve embedded comments** — never delete `=[kimi: ...]=`, `=[kimi3: ...]=`, `=[deepseek: ...]=`
4. **Add your own inline comments** where you make judgment calls: `=[deepseek: [P0] Fixed X per source Y]=`
5. **Tag [Author judgement]** where you cannot verify but author's claim is plausible
6. **Do not rewrite prose style** — only fix facts, structure, verbosity
7. **Test each OJS/Mermaid diagram** mentally for syntax validity

---

## Success Criteria

- [ ] All 18 P0 errors fixed and verified against primary source
- [ ] All 14 P1 figures updated to 2023-2026 data with citations
- [ ] All 22 P2 items have inline citation or [Author judgement] tag
- [ ] 5 raw HTML figures converted to OJS/Mermaid
- [ ] Forcing function contradiction resolved consistently across §3.8, §6.1, §6.8
- [ ] Zoho forcing-function exception addressed
- [ ] ~180 lines cut per P6 recommendations
- [ ] Git commit passes with descriptive message
- [ ] Org file renders without syntax errors

---

## Notes for DeepSeek

- You have **full terminal access** — use `execute_code` for bulk verification (CSV parsing, API calls)
- Use `browser_exec` with `r.jina.ai/http://URL` for paywalled/blocked pages
- The org file uses `#+begin_export markdown` with ```{ojs}```/```{mermaid}```/```{pikchr}``` — match this convention
- Cross-references use `[[#sec-X-Y][Section X.Y]]` format
- Property drawers (`:PROPERTIES: ... :END:`) are off-limits
- When in doubt on a fix, add `=[deepseek: [P2] Unverified — author to confirm]=` rather than guessing

**Begin now. Read files in order, then execute Phase 0 verification.**