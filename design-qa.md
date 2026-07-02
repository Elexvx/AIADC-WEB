# Materials Table QA

- source visual truth path: `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-821fcde4-afb7-4ed0-b592-50c2b0c43043.png`
- implementation screenshot path: `C:\Users\ADMINI~1\AppData\Local\Temp\materials-table-desktop-official.png`
- viewport: desktop default browser viewport, plus `390x844` mobile verification
- state: `/materials/` table resting state, first page, no interaction overlays
- full-view comparison evidence: `C:\Users\ADMINI~1\AppData\Local\Temp\materials-table-comparison.png`
- focused region comparison evidence: `C:\Users\ADMINI~1\AppData\Local\Temp\materials-table-desktop-clipped.png`

**Findings**
- No actionable P0, P1, or P2 mismatches remain for this adaptation pass.
- [P3] Domain content creates taller rows than the reference.
  Location: `src/components/materials/components/material-table.tsx`
  Evidence: the official reference uses short single-line English cells, while the materials dataset contains long Chinese document titles and descriptions that wrap to two lines.
  Impact: the table cannot match the compact row height of the reference exactly without harming readability.
  Fix: acceptable as-is for this content model. If a denser version is desired later, reduce title size further or clamp descriptions.

**Open Questions**
- The official reference includes a checkbox column and multi-page pagination. This implementation keeps the existing AIADC information structure and only adopts the visual system, not the selection pattern.

**Implementation Checklist**
- Adopt warm canvas header and footer bands.
- Alternate row backgrounds between white and `#f6f5f4`.
- Tone down action buttons to utility-button treatment.
- Add a functional footer pager with previous, current page, and next controls.
- Keep mobile as stacked rows while preserving the same token system.

**Follow-up Polish**
- Tighten desktop title column width if you want the left side to feel even closer to the official ops-table rhythm.
- If future material counts exceed one page, we can expand the pager window from the current compact mode to a fuller numbered set.

- patches made since the previous QA pass: shifted the table from card-heavy styling to official data-table styling, added alternating rows, semantic pill tones, and footer pagination; removed the louder blue emphasis from row numbering and actions.
- final result: passed
