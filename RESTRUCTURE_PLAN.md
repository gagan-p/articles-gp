# Restructure Plan — renting_the_floor_wip.org

**Phase 2 after the P0–P6 repair pass. Goal: collapse the Governed-TOC into a clean, section-level element structure.**

---

## 1. Objective

Transform ~100 fine-grained elements (`a.b.Seq_TypeSeq.Type.Name`) into ~61 section-level elements (`a`, `a.b`, `a.b.c`, `a.b.c.d`), each titled and carrying its own property drawer. Clean doc: no inline reviewer comments, no naming-convention meta, no AI instructions. References verified, verbosity reduced.

---

## 2. Current → Target mapping

### Element identity
| | Current | Target |
|---|---|---|
| Element unit | one per text / table / figure / story | one per section (`a.b.c.d` deepest) |
| ID form | `<HeadingPath>.<Seq>_<TypeSeq>.<Type>.<Name>` | the section number itself (`3.1`) |
| Status | `:STATUS: completed/not_started` in drawer | org TODO/DONE keyword on the heading |
| Tables/figures | separate elements | inline `#+NAME:` + `#+caption:` inside the section |
| Containers | `:CHILDREN:` on every section | `:CHILDREN:` kept **only at parent level** (sections that have children) |

### Target tree (61 elements)

```
1  Executive Summary
2  Notes and Assumptions
3  Discovery Story
   3.1 The CBDC Question
   3.2 Realization: Chinese DBs Are Ruling TPC
   3.3 Wonder: Open-Source DBs Are Not There
   3.4 Appreciation: It's Not Just Software — It's the System
   3.5 Who Made PolarDB? What Other DBs Have They Made?
   3.6 OceanBase Is Open-Sourced — What Else Is Ant Building?
   3.7 General Appreciation of Foundational Software Work in China
   3.8 The Paradox
4  What Type of Work Do We Do in India?
   4.1 India's Software Story Is a Success
   4.2 Success Is at the Application and Application Support Layer
   4.3 The Mental Model (5 layers)
   4.4 Hypothesis Refined: RBV
   4.5 What We Are Building, and for Which Markets
   4.6 DPI: The Protocol & Mandate Floor
5  The Comparison: Data and Evidence
   5.1 Compare at Each Layer
   5.2 Establish: There Is Not Much Foundational Software from India
      5.2.1 Dig Deeper — Is It Really the Case?
      5.2.2 The Exceptions — Zoho/AdventNet Story
   5.3 What Are Indian / Other Asian Companies Building?
   5.4 Consumer Applications — Messaging and Others
      5.4.1 What Is Excluded, and Why
      5.4.2 How Consumer Apps Become Successful
         5.4.2.1 Success Routes + Unicorn failure
         5.4.2.2 Map Apps Comparison
   5.5 Innovation Hub Data
6  Why?
   6.1 The Forcing Condition — The Wall
   6.2 The Patterns: How Foundational Software Gets Built
      6.2.1 List Canonical Projects
      6.2.2 Analyze a Few (SQLite, PostgreSQL)
      6.2.3 Theorize: Five Recurring Patterns
      6.2.4 Story: Kubernetes & OceanBase
   6.3 Revisit India/China — Add the Five Patterns
   6.4 The Story of Gitee   ← own body (Gitee_Intro + Gitee_China_Forge) + children below
      6.4.1 Why Don't We Have an Indian Code Hosting Platform?
      6.4.2 Is This Because of the Hyped Jugaad Culture?
      6.4.3 Explore Indian Exceptions
      6.4.4 Identify Problems with Adoption
         6.4.4.1 Re-domiciliation (Hasura / YugabyteDB / MinIO)
         6.4.4.2 Trapped: WebNMS + Drove/kaf-relay/DungBeetle   ← merges TWO current elements
         6.4.4.3 CDAC / CDOT failure
   6.5 Why China Is Successful
   6.6 Models in Other Countries
   6.7 Story: PhonePe Drove
   6.8 Today: CDAC and IITM Database/OS Attempts
   6.9 Indian Language Computing
7  Conclusion
   7.1 Our Innovation Ecosystem Is Not Working
   7.2 Suggest: SME + Local Academic Goals
      7.2.1 Case for SME (medium-term)
      7.2.2 Case for Government (very long-term)
   7.3 Go Back to Zoho's Case
   7.4 We Failed on Governance, Not Talent
   7.5 Future Action Items
8  Footnotes
9  Annexures
```

Counts: `a` = 9 · `a.b` = 33 · `a.b.c` = 14 · `a.b.c.d` = 5 → **61 elements**.

### Merge notes (edge cases)
- **6.4.4.2** merges two current elements (`Trapped_WebNMS_Proprietary` + `Trapped_Drove_kaf_relay_DungBeetle`) into one.
- **6.4** is the only section with *both* direct body content (Gitee_Intro + Gitee_China_Forge) *and* child sections (6.4.1–6.4.4).
- **5.2, 5.4.2, 6.2, 6.4.4, 7.2** are pure containers (no direct body; only children) — they keep a drawer + `:CHILDREN:` but carry no merged content of their own.
- **5.4.2.1 / 5.4.2.2** and **6.4.4.1–6.4.4.3** are currently *virtual* heading-paths encoded in element IDs (no real headings). They become real `a.b.c.d` headings.
- **Section 0 (Metadata)** duplicates the org header (`#+TITLE`/`#+AUTHOR`/`#+DATE`) → **delete**.

---

## 3. Element scheme (decisions locked)

### Heading = titled element, with org TODO state in the title itself
```
** DONE 3.1. The CBDC Question
```
- Title → heading text. Status → TODO/DONE keyword in the heading line (org's built-in; cycled with `C-c C-t`).
- Completed sections → `DONE`; not-started (Executive Summary, Annexures) → `TODO`.
- Export caveat: pandoc (not Emacs org-export) renders the keyword as a visible `[DONE]` tag → add one CSS rule to `renting_the_floor.css`: `span.done, span.DONE, span.todo, span.TODO { display:none; }`.

### Property drawer — minimal
```
:PROPERTIES:
:CUSTOM_ID: 3.1
:END:
```
- `:CUSTOM_ID:` = the bare section number (`3.1`, `6.4.4.1`) — the **single global identifier**.
- No `:DESCRIPTION:`, no `:CHILDREN:`, no `:STATUS:` (status is the TODO keyword; children are implicit in the heading tree).

### Cross-references (all via `:CUSTOM_ID:`)
- Sections: `[[#3.2][Section 3.2]]` → exports to a working `[Section 3.2](#3.2)` link.
- Tables/figures: keep `#+NAME:` + `#+caption:` for **labelling only**; they are not cross-ref targets (pandoc drops `#+NAME:` on ojs/mermaid figures; only tables get a usable `{#name}` id).
- Existing links `[[#sec-3-2][…]]` are remapped to `[[#3.2][…]]`; element-level `:CUSTOM_ID:` targets (`sec-6-4-4-1`) become `[[#6.4.4.1][…]]`.

---

## 4. Cleanup tasks

1. Delete the `Instructions to Reviewer` `:noexport:` block (L11–77).
2. Delete the `Naming Convention` `#+begin_comment` block (L84–103).
3. Delete the `Note on the TOC` `#+begin_comment` block (L106–133). **CONFIRMED.**
4. Delete **all** inline reviewer comments (`=[kimi suggestion: …]=`, `[kimi3: …]`, `[deepseek: …]`), including adjudication notes.
5. Delete Section 0 (Metadata) — redundant with header.
6. Replace the old element drawers (`:ID:`/`:TYPE:`/`:NAME:`/`:STATUS:`/`:DESCRIPTION:`) with the new minimal drawer (`:CUSTOM_ID:` + `:DESCRIPTION:`, `:CHILDREN:` at parent level only).

---

## 5. Content tasks

1. **Verify every reference** against primary sources (TPC-C, GitHub API/Innovation Graph, NASSCOM, World Bank, IMF BOP, WIPO, NPCI, Wikipedia). Repair pass already fixed known P0/P1 errors; this pass re-checks remaining `[Author judgement]` / vendor-claim tags and any citation lacking a source.
2. **Reduce verbosity** during the merge: drop framing/ceremony sentences, duplicate metaphors, repeated thesis restatements (the P6 list from the master review). Target ~10–15% line reduction beyond the merge's natural shrinkage.

---

## 6. Execution order

1. Snapshot the current heading tree (done).
2. One top-to-bottom pass building the new file: merge each section's child elements' content in document order; strip their headings/drawers; keep `#+NAME:`/`#+caption:` on tables & figures; drop all comments.
3. Write new headings (number + title + TODO state) and new drawers (`:CUSTOM_ID:`, `:DESCRIPTION:`, `:CHILDREN:` where parent).
4. Remap cross-links to minimal identifiers.
5. Delete meta blocks + Section 0.
6. Verify references (targeted web/API checks for remaining unverified claims).
7. Verbosity pass.
8. Validate: heading tree, balanced org blocks, every cross-link target resolves, TODO keywords valid.

---

## 7. Decisions log

| # | Question | Decision |
|---|----------|----------|
| 1 | Cross-ref identifier | `:CUSTOM_ID:` is the single global identifier — sections cross-ref via `[[#3.2][…]]`. Tables/figures keep `#+NAME:` for labelling only. |
| 2 | "Note on the TOC" | Delete. |
| 3 | Drawer content | Minimal: `:CUSTOM_ID:` only. No `:DESCRIPTION:`, no `:CHILDREN:`, no `:STATUS:`. |
| 4 | Status | org TODO/DONE keyword in the heading title; hidden in export via CSS (pandoc leaks it as a `[DONE]` span). |
| 5 | Footnotes / Annexures numbering | Keep numbered (`8.`, `9.`). |

---

*Plan ready. Awaiting your go-ahead to execute the merge.*
