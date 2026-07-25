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

---

# Partners Shadow Removal QA

- source visual truth path: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\17-partners-shadow-before.png`
- implementation screenshot path: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\18-partners-shadow-after.png`
- viewport: browser CSS viewport `1280x720`, `devicePixelRatio: 1.25`; normalized screenshot output `1268x713`
- source pixels: `1268x713`
- implementation pixels: `1268x713`
- state: homepage dark mode, `#partners` section, resting card state
- full-view comparison evidence: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\19-partners-shadow-comparison.png`
- focused region comparison evidence: the combined comparison crops the first two card rows at equal pixel dimensions, so a separate detail crop was not needed

**Findings**

- No actionable P0, P1, or P2 mismatches remain.
- Fonts and typography: section heading, description, and fallback Logo text are unchanged.
- Spacing and layout rhythm: grid tracks, gaps, card dimensions, border radius, padding, and section spacing are unchanged.
- Colors and visual tokens: card backgrounds and borders are unchanged; only elevation was removed.
- Image quality and asset fidelity: all 14 existing partner Logo assets, sizing rules, and per-Logo scale adjustments are unchanged.
- Copy and content: no text or partner ordering changed.
- Browser verification: all 14 card computed styles report `box-shadow: none`; browser console reported no errors.

**Comparison History**

- Iteration 1 finding: the dark-theme global shadow override gave every partner card a `0 22px 48px rgba(2, 8, 23, 0.38)` shadow.
  Fix: removed the shadow utility from the partner card class while preserving its border, background, radius, and transitions.
  Post-fix evidence: `18-partners-shadow-after.png` and `19-partners-shadow-comparison.png`.

**Open Questions**

- None for this scoped annotation.

**Implementation Checklist**

- Remove only the partner-card shadow utility.
- Preserve layout, card styling, Logo assets, and responsiveness.
- Verify the production build, computed shadows, and browser console.

**Follow-up Polish**

- No P3 follow-up is required.

- final result: passed

---

# Header And Documentation Button QA

- source visual truth path: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\02-docs-home.png`
- normative component source: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\node_modules\fumadocs-ui\dist\components\ui\button.js`
- implementation screenshot paths:
  - `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\12-header-buttons-final-dark.png`
  - `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\14-doc-buttons-final-focus.png`
- viewport: browser CSS viewport `1280x720`, `devicePixelRatio: 1.25`; normalized screenshot output `1268x713`
- source pixels: `1396x984`; original annotated browser viewport `1408x994`
- state: site header in dark mode; documentation shell in its fixed light presentation; theme button and first documentation action focused in separate captures
- full-view comparison evidence: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\16-official-button-alignment.png`
- focused region comparison evidence: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\15-doc-buttons-comparison.png`

**Findings**

- No actionable P0, P1, or P2 mismatches remain.
- Fonts and typography: unchanged Alibaba PuHuiTi project typography; button text remains 14px medium weight and does not wrap.
- Spacing and layout rhythm: header actions are intentionally compact at 36px while content actions are 40px; both use the same medium-radius, compact-padding system without changing surrounding header or document layout.
- Colors and visual tokens: primary actions use AIADC `#0075de`, white foreground, and the Fumadocs primary hover treatment. Outline actions keep the official neutral-border behavior.
- Image quality and asset fidelity: no raster, logo, hero, or icon assets were replaced. Existing Lucide control icons remain sharp and correctly aligned.
- Copy and content: labels and destinations are unchanged.
- Accessibility and interaction: the theme control remains a semantic button and switches between light and dark modes. Both header and documentation actions expose a visible keyboard focus outline. Browser verification measured the focused header control with an active outline and `4px` outer focus shadow; the focused document action exposes the same pattern.
- Browser console: no errors were reported on the verified documentation page.

**Comparison History**

- Iteration 1 finding: documentation actions were 44px pill buttons with a large brand shadow, unlike the official Fumadocs button system.
  Fix: adopted `fumadocs-ui/components/ui/button` `buttonVariants`, reduced content actions to 40px, switched to the official medium radius, and removed the decorative shadow.
  Post-fix evidence: `15-doc-buttons-comparison.png`.
- Iteration 2 finding: `:focus-visible` matched, but the utility ring did not produce a visible computed shadow in the production build.
  Fix: added scoped `.site-header-action` and `.doc-action` focus outlines without changing mouse-resting states.
  Post-fix evidence: `13-header-theme-focus.png` and `14-doc-buttons-final-focus.png`.

**Open Questions**

- None for the scoped button synchronization.

**Implementation Checklist**

- Use Fumadocs `buttonVariants` for MDX document actions.
- Keep the site header actions visually aligned with the same radius, weight, transition, and primary color.
- Preserve compact header height and the existing responsive navigation.
- Verify theme switching, keyboard focus, production build, and console output.

**Follow-up Polish**

- No P3 follow-up is required for this scoped change.

- final result: passed

---

# News Hero Official Overlay QA

- source visual truth path: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\24-official-hero-overlay-reference.png`
- implementation screenshot path: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\25-news-hero-overlay-after.png`
- viewport: browser CSS viewport `1280x720`, `devicePixelRatio: 1.25`; normalized screenshot output `1268x713`
- source pixels: `1268x713`
- implementation pixels: `1268x713`
- state: dark theme, full-bleed PageHero resting state
- full-view comparison evidence: `C:\Users\Administrator\.codex\visualizations\2026\07\26\aiadc-fumadocs-component-audit\26-news-official-overlay-comparison.png`
- focused region comparison evidence: the comparison contains equal-size Hero crops using the same source photograph, so a separate crop was not needed

**Findings**

- No actionable P0, P1, or P2 mismatches remain.
- Fonts and typography: heading family, weight, line height, centered alignment, and wrapping are unchanged; white title and 82%-white description remain readable.
- Spacing and layout rhythm: Hero height, content width, vertical padding, and transition into the filter section are unchanged.
- Colors and visual tokens: the news Hero now uses the same `rgba(33,49,131)` gradient stops and `0.78 / 0.64 / 0.72` opacity values as the accepted official PageHero reference.
- Image quality and asset fidelity: the original news background photograph, crop, positioning, and resolution are unchanged; the lower-opacity overlay reveals more photographic detail.
- Copy and content: eyebrow, title, description, filters, and article content are unchanged.
- Interaction: the `通知公告` category filter still activates correctly and the `全部` filter restores the default state.
- Browser console: no errors were reported.

**Comparison History**

- Iteration 1 finding: the news Hero used the shared dark default overlay at `0.92 / 0.82 / 0.86`, creating a much heavier, more saturated blue mask than the official reference.
  Fix: added the accepted official PageHero overlay class to the news page only.
  Post-fix evidence: `25-news-hero-overlay-after.png` and `26-news-official-overlay-comparison.png`.

**Open Questions**

- None for the scoped overlay adaptation.

**Implementation Checklist**

- Reuse the accepted official overlay values.
- Preserve the source image, content, layout, and filters.
- Verify dark-theme contrast, production build, filter interaction, and console output.

**Follow-up Polish**

- No P3 follow-up is required.

- final result: passed
