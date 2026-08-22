# WELL AP Reviewer

Offline-capable study app for the **WELL AP exam**, built from the WELL Building
Standard v2, **Q4 2020 addenda** — the edition IWBI publishes for exam prep.

**Live:** https://plpmonfort.github.io/WELL-AP/

## What it contains

- **120 features** across the 10 concepts plus Innovations, **24 preconditions**
- **225 Parts** with requirement text in SI units, applies-to space types and WELL Core guidance
- **65 threshold tables** recovered from the source PDF (sound pressure levels, PMV ranges, circadian tiers)
- **648 blankable values** for active recall
- **315 flashcards** generated from the data

## Views

| View | Purpose |
|---|---|
| Plan | Exam blueprint, where the marks are, and the values worth memorising |
| Study | All features by concept, expandable to Parts |
| Preconditions | The 24 mandatory features on their own |
| Thresholds | Every quantity in the standard, with context |
| Points | Certification vs WELL Core points, plus scoring rules |
| Certify | WELL Certification and Portfolio guidebooks — the largest exam domain |
| Drill | Flashcards, weighted toward the densest concepts |

## Controls

`b` or **Blank numbers** hides every quantity — tap one to reveal it. `/` focuses
search. Filters for preconditions-only, unmastered-only and beta. Per-feature
progress (Reviewing / Mastered) is stored in `localStorage` on the device.

## Beta features

12 of the 120 features are beta (`W09 N14 V11 T08 T09 S07 S08 X12 C15–C18`).
IWBI states beta features are **not assessed on the WELL AP exam**, so they are
hidden by default and excluded from the progress count.

## Exam weighting

Built around IWBI's published blueprint: 115 questions, 150 minutes, 170 of 125–200 to
pass; 100 scored plus 15 unmarked pilot questions. Concepts are tagged **high yield** or
**low yield** by questions-per-examinable-feature — Sound is 1.33, Community 0.64.

## Known gaps

- **L04** — its Part heading is corrupt in the source PDF's text layer (two copies
  interleaved). Requirements captured, heading not. Flagged in the app.
- **No verification matrix** — the Q4 2020 PDF does not carry per-part verification
  methods (only 6 of 225 Parts have any signal). Not fabricated.

## Deploying

The app is one self-contained `index.html` (~1 MB) plus icons and self-hosted
IBM Plex fonts. Nothing is fetched from a CDN, so it works fully offline.

**Every deploy must bump `CACHE_NAME` in `sw.js`** (`wellap-v2` → `wellap-v3`, …)
or returning devices keep serving the cached old build.

Regenerate from the parsed data with:

```
python3 build_app.py
```

## Source

Exam blueprint and logistics from the WELL AP Candidate Handbook. Certification and
Portfolio content parsed from the Q3–Q4 2020 and Q4 2020 guidebooks, both listed as
exam references. Feature content parsed directly from `WELL_v2_Q4-2020_WELL-AP_Exam_Version.pdf` (374 pp), from
IWBI's exam prep page. Requirement text reduced to SI units.
