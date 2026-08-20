# DeepSeek Repair Summary — renting_the_floor_wip.org

**By:** DeepSeek (acting on Nemotron's repair prompt)
**Date:** 2026-08-20
**Scope:** Edit `articles_original_org/renting_the_floor_wip.org` in place. 4,505 → 4,164 lines (196 insertions, 537 deletions).

---

## What was fixed

### P0 — critical factual errors (all 18)

| Fix | Detail |
|-----|--------|
| GitHub dev rank | "largest / #1 contributor base" → "second-largest (26.7M), behind US (32.4M)"; Paradox figure "#1"→"#2" |
| TPC-C dates | **Left unchanged** — essay already correct (Date Submitted). Kimi 2.6's "corrections" are wrong (confused with System Availability) |
| OceanBase license | "Mulan PL" → "MulanPubL-2.0 (2021) → Apache-2.0 (Mar 2026)" — all 6 sites |
| OceanBase attribution | "Ant Financial built" → "Alibaba initiated 2010; Ant adopted later" — 3 sites |
| Re-domiciliation | Removed YugabyteDB (Sunnyvale 2016) and MinIO (Silicon Valley 2014); Hasura kept as the one genuine case |
| Zoho founding | "Chennai" → "New Jersey, USA, 1996"; timeline ManageEngine 2002, Zoho rename 2009, 100M+ users (2023) |
| GitHub topics table | **Replaced fabricated data** with actual `topics.csv` (India: python/javascript/react/reactjs/nodejs/typescript; China: python/java/blog/vue/typescript/javascript) and rewrote prose to state honestly the topic data does NOT support the "China=systems" claim |
| UPI arithmetic | "~34M TPM / ~150×" → "~2,055M TPM (≈34M TPS) / ~9,000×" |
| Forcing function | Reconciled §6.1, §3.8, §6.8: "India hit walls but answered by assembly; China built greenfield" |
| NASSCOM export | "~86% ($244B)" → "~79% ($224B/$283B)" — body + chart + footnote |
| MapMyIndia | "(now KOO)" → "(Mappls)" — 3 sites |
| Hadoop | "Baidu (Hadoop)" → "Alibaba MaxCompute" |
| Gitee | OpenHarmony "on AtomGit" → "GitCode (migrated 2025)" |
| OceanBase governance | "governed by Apache" → "MulanPubL-2.0 / OpenAtom Foundation, not Apache" (RocketMQ = Apache TLP) — 2 sites |

### P1 — data updates
UPI volumes (₹314L cr FY26; ~645M/day Aug 2025; ~48.5% ACI 2023); World Bank R&D/GDP (China 2.58%, India 0.65%, US 3.45%, Korea 4.94%); WIPO patents (~18×, 1.64M vs 90K); UPI TPS avg-vs-peak; Oracle "bankrupted"→"cost-prohibitive"; Aadhaar 1.39bn.

### P2 — citations added
Three missing footnotes: GitHub Octoverse 2024 (5.2M/yr), NITI Aayog/DAKSH 2021 (66% land disputes), Linux Foundation/LWN (Huawei kernel #1). Fixed footnote 5's topics. Tagged: ShaktiDB "as announced to author (no public repo)", Zepto story and unicorn story "illustrative/composite", Zoho OS "building (announced 2023)".

### P3 — logic
Added Zoho-as-exception paragraph (§5.3): export-first *and* built own floor — founder discipline, no VC pressure.

### P4 — structure
- Converted **5 raw HTML figures** → 4 Mermaid flowcharts (Exec Summary floor, Paradox, Mental Model stack, RBV) + 1 org table (Language ecosystem). Zero `#+begin_export html` remain.
- Fixed 3 `:CHILDREN:` declarations (`.Tab.`→`.FigCode.`).
- Fixed Mental Model Plumbing/Building colour collision (#b07a10 → #008a6d).
- Drove description corrected (replaces Mesos, not a Kubernetes manager) — 2 sites.
- Five-patterns prose list removed (table retained).
- Neutral-custody §7.1 now forward-refs §7.3.

---

## What was NOT done (flag to author/Claude)

1. **Full ~180-line P6 cut not applied.** Only safe cuts done (pattern prose, timeline, user-count). Deep merges (§4.5→§4.2, §6.7→§6.4.4.2, custody consolidation rewrite) are structural and riskier — deferred.
2. **Synthesis "structural upgrades" not added** (Drove full story box, flywheel-as-loop, log-scale TPC-C chart). These are *additions*, not fixes; left for author.
3. **Pre-existing org block imbalance** (`#+begin_story`/`#+begin_questions`/`#+begin_aside`/`#+begin_src` each outnumber their `#+end_*` — e.g. 12 story vs 10 end_story). Present in HEAD before this pass; not in the review's P0–P6 list; left untouched to avoid scope creep. Worth a separate org-syntax pass.
4. **Unverified P2 items** left with inline `[Author judgement]` or "vendor claim" tags rather than fabricated citations (Ola Maps, Bhuvan, CDAC/CDOT adoption failure, GSUB/GPOS, AtomGit compute, PhD brain-drain).

---

## Verification performed

- Primary sources used: TPC-C result pages, GitHub Innovation Graph CSVs (`developers.csv`/`git_pushes.csv`/`topics.csv`), GitHub API (license/created_at for drove/kaf-relay/dungbeetle/kitty/oceanbase/hasura/yugabyte-db/minio), Wikipedia (YugabyteDB/MinIO/Zoho), World Bank R&D/GDP.
- Every replacement applied with exact-match + count assertion (failures re-run and resolved).
- Structural check: 11 top-level sections + Local Variables intact; 100 element headings; export blocks balanced (stack-verified).

## Files changed
- `articles_original_org/renting_the_floor_wip.org` (in-place edits; not yet committed)

---

*End of repair summary.*
