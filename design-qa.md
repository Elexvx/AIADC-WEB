# Route and documentation sidebar design QA

Source visual truth: `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-b7b0b7a4-2b72-4fcc-b96e-04a6d68ef7f2.png`

Implementation screenshot: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-routing-implementation.png`

Comparison images:

- Full view: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-routing-comparison.jpg`
- Focused sidebar: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-routing-sidebar-comparison.jpg`
- Independent site navigation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-routing-home.jpg`

## Capture and normalization

- Source pixels: 1297 × 1224.
- Implementation pixels: 1334 × 984.
- Browser CSS viewport reported by the page: 1346 × 994 at device pixel ratio 1.25.
- State: light theme, desktop, `/docs/participation/`, document returned to the top before the final capture.
- Density normalization: the full-view source and implementation captures were independently scaled to 900 px high and placed together. The focused comparison crops the complete left sidebar from each capture and normalizes both crops to 900 px high.
- The source is an annotated before-state. Its red rectangle defines the shortcut-link block to remove; the implementation is therefore expected to differ in that region.

## Full-view comparison evidence

The annotated duplicate shortcut group is absent in the implementation. Search now flows directly into the single Fumadocs page tree. The document content, three-column layout, right table of contents, theme control, typography, and page background remain visually consistent with the source.

## Focused-region comparison evidence

The focused sidebar comparison confirms that the repeated links for 官网首页、文档首页、大赛概览、参赛指南、赛程安排、评审规则、常见问题和报名参赛 were removed as one block. The remaining sidebar contains one brand/home link and one Fumadocs-generated document hierarchy with the expected current-page highlight.

## Findings

- No actionable P0, P1, or P2 visual mismatch remains.
- Fonts and typography: unchanged Alibaba PuHuiTi hierarchy, weights, line heights, and truncation behavior.
- Spacing and layout rhythm: removing the duplicated block closes the unnecessary vertical gap and preserves the framework sidebar spacing.
- Colors and visual tokens: existing light-theme foreground, muted text, active blue, borders, and backgrounds are preserved.
- Image quality and asset fidelity: the existing AIADC logo remains sharp and unchanged; no visible image asset was replaced or approximated.
- Copy and content: the Fumadocs tree retains the document labels and current-page state without duplicate navigation copy.
- Route behavior: desktop header and footer expose 活动中心、参赛指南、通知公告、关于大赛、商务合作、联系方式. Only 参赛指南 points into `/docs`; the other five links point to independent site routes. The announcement bar points to `/events/`.

## Primary interactions tested

- Loaded `/docs/participation/` and inspected the complete sidebar link set.
- Verified the independent desktop header and footer link destinations.
- Requested `/`, `/events/`, `/docs/participation/`, `/news/`, `/about/`, `/cooperation/`, and `/contact/`; all returned HTTP 200.
- Checked the home and documentation tabs for browser console errors; none were reported.

## Comparison history

- Pass 1: the requested duplicate shortcut block was removed and the independent route mapping was visible. No P0/P1/P2 follow-up fix was required.

## Follow-up polish

- None required for this scoped route and sidebar correction.

final result: passed

---

# Official mobile site navigation QA

Source visual truth:

- Live reference: `https://www.aiadc.org.cn/`
- Captured reference: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-mobile-navigation-reference.png`

Implementation evidence:

- Mobile implementation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-mobile-navigation-implementation.png`
- Equal-size comparison: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-mobile-navigation-comparison.png`

## Capture and normalization

- Route: `/`.
- State: light theme, page top, mobile navigation open.
- CSS viewport: 390 × 844.
- Source and implementation pixels: 378 × 817.
- Density normalization: none required; both images were captured in the same in-app browser at the same viewport and screenshot density.
- Product-content normalization: the local `参赛指南` label and existing home-hero CTA copy are intentional route/content adaptations; navigation structure and styling were compared against the official site.

## Full-view comparison evidence

- The final implementation matches the official 46.4 px notice bar and 75.2 px main navigation row for a total 121.6 px sticky header.
- The brand uses the official 44 px logo container, 36 px logo image, 18 px mobile title, and 12 px brand gap.
- The theme and menu actions both measure 40 × 40 px.
- The open navigation begins at x = 22 px and y = 128.8 px, uses the official two-column hierarchy, includes the active `首页` entry, and ends with a full-width blue registration action.
- The menu overlays the real hero image and retains the official translucent surface, active blue tint, 24 px outer radius, and pill CTA.

## Focused-region comparison evidence

- A separate crop was unnecessary because the complete notice bar, brand row, theme/menu controls, seven navigation entries, active state, panel corners, and registration action are readable at 1:1 scale in the equal-size comparison.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: official Alibaba PuHuiTi sizing, weight, truncation, label hierarchy, and centered registration text are preserved.
- Spacing and layout rhythm: notice/header heights, section-shell width, logo/control dimensions, menu offset, two-column gaps, 44 px link targets, radii, and CTA height align with the live reference.
- Colors and visual tokens: the implementation retains the official `#0075de` CTA, `#eef7ff` active state, neutral translucent panel, subtle borders, and light/dark foreground balance.
- Image quality and asset fidelity: the original AIADC logo and real homepage hero assets remain in use; Lucide supplies the standard sun, moon, menu, and close icons.
- Copy and content: `首页` is restored to the mobile menu. The local `参赛指南` destination intentionally replaces the official site's former `资料中心` label while preserving the requested document architecture.
- Accessibility and state: the menu button exposes `aria-expanded` and `aria-controls`, the active link exposes `aria-current="page"`, Escape closes the menu, and the single theme button announces the next available theme.
- Browser console: no warnings or errors were reported.

## Comparison history

- Pass 1 findings: the local mobile header exposed an extra search action and a two-icon theme switch, omitted `首页`, used a shorter opaque card treatment, and measured only 36 px for the notice bar plus 56 px for the main navigation. These were P1/P2 official-style mismatches.
- Pass 1 fixes: removed the site-shell search/GitHub controls, replaced the segmented theme switch with one functional sun/moon button, restored `首页`, adopted the official translucent two-column menu, active state, radius, and pill registration action.
- Pass 2 finding: the revised menu matched structurally, but the header remained about 30 px shorter than the live reference and the logo/actions were undersized.
- Pass 2 fixes: measured the live official DOM and adopted its 46.4 px notice bar, 75.2 px main row, 44 px logo container, 36 px logo, 18 px title, and 40 px action controls.
- Post-fix evidence: `design-qa-mobile-navigation-implementation.png` and `design-qa-mobile-navigation-comparison.png`.

## Primary interactions tested

- Opened the mobile menu and verified all seven independent navigation links plus registration.
- Closed the menu with Escape and confirmed the navigation subtree was removed.
- Switched light to dark and back to light; the root class and accessible button label updated correctly.
- Reopened the menu for handoff and checked the browser console.
- `npm run typecheck` and `npm run build` passed.

## Follow-up polish

- None required for the scoped official mobile site-navigation correction.

final result: passed

---

# Independent documentation center QA

## Route architecture

- `/docs/` is rendered by the public site route group and uses the same announcement bar, official header, page hero, footer, floating actions, and transition shell as `/events/`.
- `/docs/participation/`, `/docs/materials/`, and `/docs/review/` remain inside the Fumadocs route group.
- The documentation reader now uses the required catch-all route `/docs/[...slug]`, so it no longer captures the standalone `/docs/` page.

## Presentation

- The documentation center lists the three core files in one semantic table with sequence, document name, content summary, scope, and action columns.
- Desktop uses the same neutral hero and white content-section rhythm as the activity center.
- Mobile at 390 × 844 keeps the official site header and page hero, removes all documentation sidebars, and places the 760 px table in a bounded horizontal-scroll container without causing page-level overflow.

## Verification

- `npm run typecheck` passed.
- `npm run build` passed and emitted `/docs` as a standalone static route plus `/docs/[...slug]` for the three reader pages.
- `/docs/`, `/docs/participation/`, and `/events/` return HTTP 200.
- Browser inspection confirmed the public site header and footer on `/docs/`, no `#nd-sidebar`, three table rows, and correct reader destinations.

final result: passed

---

# Fumadocs official documentation layout parity QA

Source visual truth:

- User reference: `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-fec98b82-3f78-4198-8dea-0bbbbb548aca.png`
- Live official capture: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-official-latest.png`

Implementation screenshot: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-aiadc-latest.png`

Comparison image: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-official-aiadc-comparison.png`

## Capture and normalization

- Source and implementation pixels: 1346 × 994.
- Browser CSS viewport: 1346 × 994 at device pixel ratio 1.25.
- State: light theme, desktop, page top.
- Density normalization: none required because both pages were captured in the same in-app browser at the same viewport and device pixel ratio.
- The equal-size side-by-side comparison places the official Fumadocs Quick Start page on the left and the local AIADC participation page on the right.

## Full-view comparison evidence

The official and local captures now share the same three-column documentation frame, 268 px sidebar and table-of-contents columns, 900 px maximum article container, 56 px article top padding, compact brand row, search trigger, documentation switcher, grouped navigation, icon rhythm, active state, page actions, neutral background, article spacing, sticky right TOC, and bottom GitHub/theme controls.

## Focused-region comparison evidence

The full-height viewport keeps the brand, search, switcher, grouped navigation, title, description, action row, headings, body copy, TOC, footer controls, and scrollbar readable in one comparison, so an additional crop is unnecessary. Computed-style checks confirm the visible alignment.

## Findings

- No actionable P0, P1, or P2 mismatch remains for the requested framework styling.
- Fonts and typography: Fumadocs sizes and line heights are preserved: 28 px / 42 px title, 18 px / 28 px description, 24 px / 32 px section headings, 16 px / 28 px document body, and 14 px / 20 px sidebar items. AIADC intentionally retains Alibaba PuHuiTi for Chinese legibility.
- Spacing and layout rhythm: sidebar width, article width, top padding, action-row divider, 8 px navigation radii, 8 px active-item padding, section grouping, TOC placement, and footer spacing match the framework capture.
- Colors and visual tokens: the documentation shell now uses the official neutral palette: `#f5f5f5` background, `#f1f1f1` card/sidebar, `#cccccc80` borders, `#cc8b00` documentation accent, and `#a3a3a3` scrollbar. Dark mode resolves to `rgb(18, 18, 18)` background and `rgb(25, 25, 25)` sidebar.
- Image quality and asset fidelity: the original AIADC circular logo is rendered directly with `next/image`; all navigation icons use the Fumadocs-supported Lucide icon plugin.
- Copy and content: Chinese AIADC content and section labels replace the Fumadocs example copy intentionally. The missing “Ask AI” control is an intentional product-feature difference, not a styling omission.
- Interaction states: the “2026 赛季” framework-style switcher opens and closes, the official theme control switches to dark mode and back, and the active route remains highlighted.
- Browser console: no implementation errors were reported.

## Comparison history

- Pass 1 findings: the local documentation sidebar was white instead of neutral gray, used a blue custom accent and scrollbar, had an oversized two-line brand block, lacked framework-style icons, section separators, and the top documentation switcher, showed a nested-page breadcrumb, and used a custom blue action button. These differences formed a P1 framework-style mismatch.
- Fixes: restored Fumadocs neutral tokens, adopted the official gold documentation accent, compacted the brand row, enabled the Lucide page-tree plugin, added semantic navigation groups and a “2026 赛季” switcher, disabled the breadcrumb, restored native Fumadocs button styling, normalized nested active links, and scoped the scrollbar to the documentation palette.
- Post-fix evidence: `design-qa-fumadocs-aiadc-latest.png` and `design-qa-fumadocs-official-aiadc-comparison.png`.

## Primary interactions tested

- Opened and closed the “2026 赛季” documentation switcher.
- Switched the documentation shell to dark mode and restored light mode.
- Verified page-tree icons, grouped navigation, active route, article actions, sticky TOC, scrollbar tokens, and console output.

## Follow-up polish

- None required for the scoped official-framework styling adaptation.

final result: passed

---

# Documentation columns QA

Source visual truth: `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-87d4e11f-5f97-4caa-9afa-cd0aa4ed93eb.png`

Implementation route: `http://127.0.0.1:3000/docs/`

Implementation screenshot: unavailable because the selected Codex in-app browser reports that element screenshot and content export commands are unsupported.

## Capture and normalization

- Source pixels: 1670 × 490.
- Browser CSS viewport: 1280 × 720 at device pixel ratio 1.25.
- State: light theme, desktop, documentation landing page.
- Density normalization: blocked because no implementation raster could be captured from the selected browser.
- The rendered component was inspected through its live DOM, computed geometry, routes, theme state, and browser error log.

## Full-view and focused comparison evidence

- The live implementation renders a featured card spanning two rows beside a 2 × 2 compact-card grid, matching the reference composition.
- The featured card measures 216 × 365.2 CSS px; the four adjacent cards each measure 216 × 177.6 CSS px with a 10 px grid gap.
- The supporting cards use a readable 2 × 2 grid at 329 × 177.6 CSS px.
- All nine document cards expose distinct destinations and the page has no horizontal overflow.
- A raster comparison could not be produced with the selected browser, so image-level fidelity remains unverified.

## Findings

- [P2 fixed] The first implementation placed four supporting cards in one row because the viewport breakpoint did not account for the constrained documentation content column.
  - Fix: changed the supporting section to a two-column maximum.
  - Post-fix evidence: card widths increased from 159.5 px to 329 px and the section now forms two balanced rows.
- Fonts and typography: the cards inherit the existing Alibaba PuHuiTi/Fumadocs typography; headings use medium weight and descriptions use the framework muted token.
- Spacing and layout rhythm: 12 px radii, 1 px borders, 10 px grid gaps, compact icon blocks, and two-row featured-card composition follow the reference structure.
- Colors and visual tokens: cards use Fumadocs background, border, accent, ring, and primary tokens, preserving light and dark themes.
- Image quality and asset fidelity: the featured card uses the existing AIADC hero raster asset through `next/image`; standard interface icons come from the project's icon library.
- Copy and content: all current AIADC documentation destinations are represented with concise Chinese titles and summaries.
- Interaction and routing: the “评审与纪律” card navigated to `/docs/review/` as an independent document and browser back returned to `/docs/`.
- Dark theme: a card computed to `rgb(25, 25, 25)` with `rgb(250, 250, 250)` foreground.
- Browser console: no implementation errors were reported.

## Primary interactions tested

- Opened an independent documentation card and returned to the documentation landing page.
- Switched the documentation shell to dark mode and restored light mode.
- Verified all nine document card links, featured-card sizing, supporting-grid sizing, and horizontal overflow.

## Follow-up polish

- Capture the implementation with a browser surface that supports screenshots and run the required equal-size raster comparison.

final result: blocked

---

# News article cover-order and centered-header QA

## Source and implementation

- Source visual truth: browser annotation supplied on 2026-07-27 for `/news/aiadc-2026-official-notice/`; no local source-image path was exposed.
- Implementation route: `http://127.0.0.1:3000/news/aiadc-2026-official-notice/`.
- Target viewport: annotated mobile viewport, approximately 549 px wide.
- State: light theme, article page near the top.
- Implementation screenshot: unavailable because the selected in-app browser automation transport closed before capture.
- Density normalization: blocked because neither the browser annotation nor a post-change implementation capture was available as a local image.

## Implemented alignment

- Moved the article cover image above the article metadata and title block.
- Centered the category, title, date, and tags inside the existing 760 px header width.
- Preserved all title, metadata, tag, excerpt, and body font-size and line-height classes.
- Left the article body, global navigation, and related-content layout unchanged.

## Verification

- `npm run typecheck` passed.
- `npm run build` passed and generated all 22 pages.
- The article route returned HTTP 200 from the restarted production preview.
- Browser-rendered full-view and focused-region comparisons remain unavailable, so pixel-level fidelity cannot be marked passed.

final result: blocked

---

# Fumadocs official home navigation adaptation QA

Source visual truth:

- Live reference: `https://www.fumadocs.dev/`
- Captured navigation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-official-home-nav.png`

Implementation screenshots:

- Desktop: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-aiadc-home-nav-full.png`
- Mobile menu open: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-aiadc-home-nav-mobile.png`

Focused comparison: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-home-navigation-comparison.png`

## Capture and normalization

- Source navigation pixels: 1331 x 57 from a 1346 x 994 CSS viewport at device pixel ratio 1.25.
- Desktop implementation pixels: 1268 x 713 from a 1280 x 720 CSS viewport at device pixel ratio 1.25.
- Mobile implementation pixels: 378 x 817 from a 390 x 844 CSS viewport at device pixel ratio 1.
- State: light theme, page top, desktop navigation closed; mobile implementation additionally captured with its menu open.
- Density normalization: the official 1331 x 57 navigation crop was scaled to 1268 x 57. The implementation navigation row was cropped at its actual 1268 x 57 rendered size and stacked below it.
- Product normalization: AIADC brand, Chinese route labels, registration action, and the existing competition notice remain intentional product content. The focused comparison isolates the navigation row below that retained notice.

## Full-view comparison evidence

The desktop implementation screenshot confirms the adapted navigation remains integrated with the existing homepage hero, notice bar, floating actions, and page background. The row is sticky, spans the viewport, and does not introduce a detached card, shadow, or content jump.

## Focused-region comparison evidence

The stacked comparison confirms the same Fumadocs structure and density: left-aligned brand, immediately following horizontal navigation, right-aligned pill search, compact light/dark control, GitHub icon, 56 px row height, neutral translucent background, and thin lower border. The retained blue registration action is the one intentional AIADC-specific addition.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: both reference and implementation use a 16 px semibold brand and 14 px / 400 navigation and search labels. AIADC intentionally retains Alibaba PuHuiTi for Chinese readability.
- Spacing and layout rhythm: the row is 56 px high, has 16 px viewport padding, 32 px desktop brand-to-navigation gap, 36 px navigation/control height, a 240 px search trigger, a 61.6 px theme switch, and a 32 px GitHub action.
- Colors and visual tokens: the implementation uses an 80% background with 16 px backdrop blur, muted gray navigation text, subtle half-opacity control fills, a thin lower border, and no navigation shadow, matching the reference treatment.
- Image quality and asset fidelity: the original circular AIADC logo is used directly without a decorative container or replacement. The GitHub mark comes from Fumadocs' own resolved link item rather than a handcrafted approximation.
- Copy and content: existing AIADC labels and destinations are preserved. Search uses the shared Fumadocs search provider, GitHub resolves to `https://github.com/Elexvx/AIADC-WEB`, and the registration route remains available on desktop and mobile.
- Responsive behavior: desktop navigation and full search collapse at the existing XL breakpoint; mobile exposes a compact search action, theme switch, and functional menu with all six routes plus registration.
- Browser console: no implementation errors were reported.

## Comparison history

- Pass 1 finding: at the 390 px viewport, the fixed-width brand plus the official search, theme, and menu controls pushed the menu button to x = 371.875 with a right edge of 407.875, outside the viewport. This was a P2 responsive overflow.
- Fix: changed the brand link to consume the remaining flexible width on compact screens, reduced the compact header gap to 8 px, and retained the official 32 px desktop brand gap at XL.
- Post-fix evidence: at 390 px, the brand ends at x = 208.8, controls begin at x = 216.8, and the menu button ends at x = 362.4. The menu opens successfully and renders seven working destination links.

## Primary interactions tested

- Opened and closed the shared Fumadocs search dialog from the desktop pill trigger.
- Switched the navigation between light and dark themes and restored light mode.
- Opened and closed the mobile navigation at 390 x 844.
- Verified the GitHub and registration destinations and all independent route links.
- Checked the browser console for errors.

## Follow-up polish

- None required for this scoped navigation adaptation.

final result: passed

---

# Fumadocs official article and table-of-contents QA

Source visual truth:

- Live reference: `https://www.fumadocs.dev/docs/ui/layouts/docs`
- Captured reference: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-official.png`

Implementation screenshot: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-local.png`

Comparison images:

- Full view: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-comparison.png`
- Focused table of contents: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-toc-comparison.png`
- Focused sidebar footer: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-footer-comparison.png`

## Capture and normalization

- Source and implementation pixels: 1280 x 720.
- Browser CSS viewport: 1280 x 720 at device pixel ratio 1.25.
- State: light theme, desktop, Fumadocs reference page and local `/docs/participation/`.
- Density normalization: none required because the source and implementation were captured in the same browser at the same viewport and device pixel ratio.
- Content normalization: the two pages contain different documentation copy, so component structure, computed typography, controls, and TOC behavior were compared instead of text wrapping line by line.

## Full-view comparison evidence

The equal-size side-by-side comparison covers the complete documentation layout. The local implementation uses the same Fumadocs three-column structure, fixed-height left sidebar, constrained article column, right table of contents, page-action controls, neutral document background, border treatment, and framework spacing rhythm. The AIADC logo and Chinese labels remain intentional site-brand adaptations; the documentation surface now uses Geist with Alibaba PuHuiTi as its Chinese fallback.

## Focused-region comparison evidence

The focused right-column comparison confirms the local TOC uses Fumadocs' official `clerk` style: a thin vertical guide, connected stepped paths, a blue active marker and text, muted inactive entries, and the same 14 px / 20 px label rhythm. A separate article crop was unnecessary because the complete local article is readable in the full-view capture and the exact computed styles were measured against the reference.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: official and local article body paragraphs both compute to 16 px / 28 px; descriptions compute to 18 px / 28 px; TOC labels compute to 14 px / 20 px. The documentation surface uses the same Geist family as the reference, with Alibaba PuHuiTi retained only as the Chinese glyph fallback.
- Spacing and layout rhythm: custom document line-height, heading letter-spacing, table-size, and link-offset overrides were removed. The description uses the official `mb-2` spacing, and the page-action row follows the Fumadocs component composition.
- Colors and visual tokens: the prior global anchor override no longer suppresses framework states. Active TOC text is blue and inactive entries are muted gray in light mode; dark mode also preserves framework foreground contrast.
- Image quality and asset fidelity: the existing AIADC logo remains the original raster asset with no handcrafted replacement. No additional imagery is required by this documentation page.
- Copy and content: page-specific Chinese content is unchanged. Official Fumadocs page actions are present with Chinese translations: 复制 Markdown, 打开, 查看 Markdown, and the supported AI application destinations.
- Interaction states: the 打开 popover expands and exposes Markdown, ChatGPT, Claude, and Cursor actions, then closes with Escape. The page is restored to the default top state after testing.
- Sticky behavior: after scrolling to `scrollY = 658.4`, `#nd-toc` remained `position: sticky` at viewport top 0 and the sidebar's parent remained `position: sticky` with the sidebar top at 0. Active TOC chapters updated while the article scrolled.
- Raw Markdown: `/api/docs/raw/participation/` returned HTTP 200 with `content-type: text/markdown; charset=utf-8` and the real participation MDX source.
- Browser console: no implementation errors were reported.

## Comparison history

- Pass 1 findings: the local right TOC did not use the official stepped `clerk` treatment, the global unlayered anchor rule suppressed Fumadocs active colors, and article-specific CSS increased the body rhythm beyond the framework defaults.
- Fixes: enabled `tableOfContent.style = "clerk"` and the matching popover style; moved the global anchor reset into the base layer; removed custom article typography overrides; adopted official Fumadocs page actions and translations; added the raw Markdown route.
- Post-fix evidence: `design-qa-fumadocs-local.png`, `design-qa-fumadocs-comparison.png`, and `design-qa-fumadocs-toc-comparison.png`.
- Pass 2 finding: the documentation sidebar footer still injected the site-header `ThemeToggle`, so framework footer classes were combined with website-header border and focus classes and the official icon-link slot remained empty.
- Fix: removed the custom `slots.themeSwitch` override, restored the `DocsLayout` default theme switch, and supplied the repository through the official `githubUrl` option.
- Post-fix evidence: `design-qa-fumadocs-footer-local.png` and `design-qa-fumadocs-footer-comparison.png`. The rendered footer measures 236 x 35.6 CSS px with the official muted secondary background, 12 px radius, 30 x 30 GitHub action, and 60.8 x 26 theme switch.

## Primary interactions tested

- Loaded `/docs/participation/` in light and dark modes.
- Opened and closed the official Fumadocs page-action popover.
- Switched light to dark and back with the restored framework sidebar-footer control.
- Verified the official footer icon link resolves to `https://github.com/Elexvx/AIADC-WEB`.
- Requested the raw Markdown endpoint and checked its response headers and content.
- Scrolled through the article and confirmed both side columns remain fixed while active TOC chapters update.
- Checked the browser console for errors.

## Follow-up polish

- None required for the scoped article and table-of-contents correction.

final result: passed

---

# Cooperation duplicate introduction QA

Source visual truth: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-cooperation-before.jpg`

Implementation screenshot: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-cooperation-after.jpg`

Comparison image: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-cooperation-comparison.jpg`

## Capture and normalization

- Source and implementation pixels: 1334 × 984.
- Browser CSS viewport: 1346 × 994 at device pixel ratio 1.25.
- State: light theme, desktop, `/cooperation/`, page top.
- Density normalization: none required because both captures use the same browser, viewport, density, route, theme, and interaction state.

## Full-view and focused comparison evidence

The equal-size side-by-side comparison covers the entire annotated viewport, so a separate focused crop was not needed. The repeated contact strip between the hero and the cooperation-plan heading is absent after the change. The hero, cooperation heading, first exchange card, navigation, floating actions, and existing visual tokens remain unchanged.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: hero and cooperation-plan hierarchy, weights, wrapping, and line heights are unchanged.
- Spacing and layout rhythm: the redundant intermediate strip is removed and the hero now flows directly into the cooperation-plan section with the section's existing responsive padding.
- Colors and visual tokens: hero overlay, white content surface, active navigation color, borders, and buttons are unchanged.
- Image quality and asset fidelity: the existing cooperation hero photograph, crop, opacity, and logo remain unchanged.
- Copy and content: only the duplicate “寻找长期、可信的合作伙伴” strip and its repeated contact action were removed. The full email contact action remains in the closing cooperation CTA.
- Browser console: no errors were reported.

## Comparison history

- Pass 1 finding: the hero was followed by a second introductory contact strip before the actual cooperation-plan introduction, while the page already had a complete closing contact CTA.
- Fix: removed only the intermediate strip and its now-unused arrow icon import.
- Post-fix evidence: `design-qa-cooperation-after.jpg` and `design-qa-cooperation-comparison.jpg`.

## Follow-up polish

- None required for this scoped annotation.

final result: passed

---

# Fumadocs official full-alignment QA

Source visual truth:

- Live reference: `https://www.fumadocs.dev/docs`
- Desktop reference capture: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-official-latest.png`

Final implementation captures:

- Desktop article: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-aiadc-final-desktop.png`
- Mobile article: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-aiadc-final-mobile.png`
- Mobile sidebar: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-aiadc-final-mobile-sidebar.png`

## Capture and normalization

- Desktop state: light theme, default desktop viewport, local `/docs/participation/`.
- Mobile state: 390 × 844 CSS px, light theme, local `/docs/participation/`.
- Content normalization: the reference and implementation contain different documentation copy and branding, so the comparison covers layout, component composition, typography, spacing, responsive behavior, controls, and interaction states.
- Intentional content differences: the AIADC logo, Chinese copy, AIADC document tree, registration destination, and gold primary token are preserved.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Font: the documentation shell resolves to `GeistSans, GeistSans Fallback, alibabaPuHuiTi, AlibabaPuHuiTi Fallback, ui-sans-serif, system-ui, sans-serif`, matching the reference's Geist typography while preserving complete Chinese glyph coverage.
- Desktop layout: the implementation retains the official 268 px left sidebar, 900 px constrained page region, 268 px right TOC region, sticky side columns, official page actions, footer controls, and neutral `rgb(245, 245, 245)` document background.
- Sidebar: section headings, Lucide page icons, official tab switcher, active fill, 8 px active-item inset, and mobile drawer behavior match the reference patterns. The nested active item no longer adds a second indentation or stray vertical guide.
- Mobile navigation: at 390 × 844, the brand compacts to the 20 px logo used by the reference, while search and sidebar actions remain visible in the 48 px header. The separate document-progress bar remains directly below the header.
- Mobile article: title, description, page actions, divider, headings, body width, line height, and single-column flow align with the reference capture.
- TOC: both the desktop TOC and mobile progress popover use the official `clerk` style. Chapter H2 headings and child H3 headings now generate the same stepped path and parent/child highlighting pattern as the reference.
- Search: the localized search dialog opens and returns real indexed results for `赛道`.
- Theme: the official framework switch changes `light` to `dark` and back to `light`.
- Sticky behavior: after scrolling to `scrollY = 489.6`, both the sidebar placeholder and `#nd-toc` remain `position: sticky` with a viewport top of 0.
- Routes: `/`, `/docs/`, all three participation document routes, `/news/`, `/materials/`, `/about/`, `/cooperation/`, and `/contact/` return HTTP 200 and remain independent pages.
- Browser console: no warnings or errors were reported.

## Comparison history

- Pass 1 finding: the documentation shell inherited Alibaba PuHuiTi for all glyphs, nested active pages retained a 20 px inset and vertical marker, and the mobile navigation showed the full brand title instead of the compact official mark.
- Fix: added the Geist package and scoped it to the documentation shell, removed custom navigation/background overrides in favor of Fumadocs defaults, normalized active sidebar items to the official root-item inset on desktop and mobile, and compacted the mobile brand to the logo while retaining an accessible link name.
- Pass 2 finding: the desktop correction did not initially affect `#nd-sidebar-mobile`.
- Fix: applied the same active-item and folder-guide rules to both framework sidebar containers.
- Post-fix evidence: the three final implementation captures listed above plus computed-style checks for font family, active inset, pseudo-element visibility, page width, and document background.

## Product-specific reference feature

The reference site's floating “Ask AI” control is a Fumadocs product integration backed by an AI service, not a default `DocsLayout` visual primitive. It is intentionally not reproduced as an inert button. Adding it requires selecting and authorizing a real AI provider, persistence/usage policy, and deployment credentials.

## Primary interactions tested

- Opened and closed the mobile sidebar.
- Opened search and verified indexed Chinese results.
- Switched light to dark and restored light mode.
- Verified desktop sidebar and TOC sticky behavior while the article scrolls.
- Verified desktop and mobile current-item spacing and marker behavior.
- Verified independent public and documentation routes.
- Checked browser warnings and errors.

## TOC hierarchy follow-up

- Annotated issue: the participation page used four peer H2 headings, so the official `clerk` path rendered as a flat vertical line with no hierarchy bends.
- Fix: reorganized the participation document into two H2 chapters with H3 child sections, and applied the same semantic chapter/child pattern to overview, groups, tracks, materials, review, FAQ, and contact documents.
- Desktop evidence: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-toc-hierarchy-final.png`.
- Mobile evidence: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-toc-hierarchy-mobile.png`.
- Result: the desktop and mobile TOCs now expose the same parent/child labels and stepped path geometry as the Fumadocs reference.

final result: passed

---

# Three-file official materials reorganization QA

Source material:

- `Z:\Z-business\07-全国大学智能应用开发大赛\00-执行方案（已调整）.docx`
- `Z:\Z-business\07-全国大学智能应用开发大赛\03-关于举办全国大学生智能应用开发大赛的通知（已调整）.docx`
- `Z:\Z-business\07-全国大学智能应用开发大赛\04-关于公布全国大学生智能应用开发大赛（2026）评审规则.docx`
- `Z:\Z-business\07-全国大学智能应用开发大赛\05-关于公布全国大学生智能应用开发大赛奖金方案的通知.docx`
- Official registration, project report, commitment, and materials checklist templates in the same folder.

## Scope and result

- Reorganized the documentation center into three core files: `参赛说明`, `参赛材料`, and `评分标准`.
- Consolidated groups, tracks, registration and team rules, schedule, fees, judging overview, and awards into `参赛说明`.
- Consolidated every required, conditional, recommended, and supplementary submission item into `参赛材料`.
- Published separate 100-point tables for the 萌芽, 创意, and OPC 轻创 tracks in `评分标准`.
- Preserved the independent public-site routes and retained permanent redirects from removed fragmented documentation routes.
- Synced the official Word files into `public/downloads` without changing the configured registration destination.

## Browser verification

- Desktop: the left navigation contains only the documentation home and the three core files; the article and official clerk-style TOC render without horizontal overflow.
- Sticky behavior: after the document scroll container moved to 900 px, the left sidebar and right TOC remained at viewport top 0 while the article moved to -900 px.
- Documentation home: the three equal-width entry cards point to `/docs/participation/`, `/docs/materials/`, and `/docs/review/`.
- Mobile: verified at 390 × 844; the navigation drawer lists the same three files, the article uses a single-column layout, and all tables remain within the viewport with an overflow-safe wrapper.
- Downloads: the registration form, project report template, authenticity/IP commitment, materials checklist, and complete review rules all return HTTP 200 with DOCX content types.
- Redirects: the removed overview, groups, tracks, schedule, FAQ, and contact documentation URLs return permanent 308 redirects to the consolidated documents and valid heading anchors.
- Browser console: no warnings or errors.
- Build verification: `npm run typecheck` and `npm run build` passed.

final result: passed

---

# Official mobile documentation-center QA

Source visual truth:

- Official site mobile list pattern: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-mobile-docs-source.png`
- Before-state capture: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-mobile-docs-before.png`

Implementation evidence:

- Mobile implementation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-mobile-docs-after.png`
- Side-by-side comparison: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-mobile-docs-comparison.png`

## Capture normalization

- Route: source `/materials/`, implementation `/docs/`.
- State: light theme, page top, official site mobile navigation visible.
- CSS viewport: 390 × 844.
- Captured pixels: 378 × 817 for both source and implementation.
- Density normalization: none required; both captures use the same in-app browser, viewport override, and screenshot density.

## Full-view comparison evidence

- The implementation now follows the official materials-list mobile pattern: one bordered vertical card per document, compact sequence number, real Lucide document icon, pill metadata, readable description, and a full-width outlined action.
- The desktop five-column table is hidden below the `md` breakpoint rather than compressed or exposed through horizontal scrolling.
- The official announcement bar, mobile header, search/theme/menu controls, neutral hero, section title, floating actions, and page width remain consistent with the source site.

## Focused-region comparison

- A separate crop was unnecessary because the complete first card, typography, badge, description, action, header, and hero are readable at 1:1 scale in the side-by-side comparison.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: the mobile title, section heading, 17 px document title, 15 px body copy, 12 px metadata pill, and 16 px sequence number follow the existing official mobile hierarchy.
- Spacing and layout rhythm: 20 px card padding, 16 px content gaps, 16 px outer radius, 40 px icon container, and full-width 44 px action match the official material-card rhythm.
- Colors and tokens: neutral white and `#fbfaf9` alternating surfaces, `#e6e6e6` borders, official gold document accent, and muted gray metadata use existing site tokens.
- Image quality: no new raster assets were required; official logos and QR images load successfully, and standard interface icons use the existing Lucide library.
- Copy and content: all three official document names, descriptions, scopes, and destinations are preserved.
- Responsive behavior: at 390 × 844 the page width is 378 px, each card is 357 px wide, the page has no horizontal overflow, and no table remains visible.

## Comparison history

- Pass 1 finding: the 760 px desktop table was exposed on mobile through horizontal scrolling, hiding columns and creating a desktop-shrunk interaction.
- Fix: added a dedicated mobile card list and limited the semantic table to `md` and wider breakpoints.
- Post-fix evidence: three 357 px cards render in one column, their action buttons are 269 px wide, visible table count is zero, and document width equals viewport client width.

## Primary interactions tested

- Opened the first mobile document card and reached `/docs/participation/`.
- Confirmed the Fumadocs mobile document-menu trigger remains available.
- Confirmed both the documentation center and reader have no page-level horizontal overflow.
- Checked browser warnings and errors; none were reported.
- `npm run typecheck`, `npm run build`, and `git diff --check` passed.

final result: passed

---

# Fumadocs official mobile navigation reconstruction QA

## Capture and normalization

- Source visual truth: `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-da4b34ae-31ff-4323-a726-1b05f70035ed.png`
- Source pixels: 653 × 477.
- Implementation route: `http://127.0.0.1:3000/`
- Intended implementation viewport: 390 × 844 CSS px.
- State: light theme, page top, mobile navigation open.
- Implementation screenshot: unavailable because the in-app browser automation transport closed before capture.
- Density normalization: blocked because no implementation capture was available.

## Full-view and focused-region comparison

- The source image was opened and inspected at original resolution.
- The implementation could not be captured in the selected in-app browser, so no valid full-view or focused side-by-side comparison can be claimed.

## Findings

- [P1] Rendered fidelity remains unverified.
  Location: global mobile `SiteHeader`.
  Evidence: the prior two-column card menu was replaced with the Fumadocs structure in code, but the revised browser-rendered state could not be captured.
  Impact: fonts, exact wrapping, panel height, and pixel spacing cannot be signed off from source code alone.
  Fix: restore the in-app browser connection, capture the open menu at 390 × 844, place it beside the source image, and correct any visible P1/P2 drift.

## Implemented alignment

- Mobile header uses the Fumadocs 56 px row, compact brand lockup, official search trigger, and rotating chevron menu control.
- The drawer is a single column with group heading, route icons, text links, and no card grid or separate blue registration button.
- GitHub sits at the lower left and the official Fumadocs two-state theme switch sits at the lower right.
- Desktop navigation and existing AIADC routes are preserved.

## Comparison history

- Pass 1 finding: the implementation used a two-column translucent card menu, hamburger/close icon, top-level theme button, and independent blue registration CTA. These were P1 mismatches against the supplied Fumadocs reference.
- Pass 1 fix: replaced the structure with the official single-column hierarchy, search + chevron header controls, bottom utility row, and Fumadocs theme switch.
- Post-fix visual evidence: blocked by the closed in-app browser automation transport.

## Non-visual verification

- `npm run typecheck` passed.
- `npm run build` passed.
- `/`, `/events/`, `/docs/`, `/docs/participation/`, `/news/`, `/about/`, `/cooperation/`, and `/contact/` returned HTTP 200.
- The local production preview remains available at `http://127.0.0.1:3000/`.

final result: blocked

---

# Fumadocs global layout-width alignment QA

## Source and implementation

- Source visual truth: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-official-latest.png`
- Normative Fumadocs layout sources:
  - `node_modules/fumadocs-ui/dist/layouts/home/slots/container.js`
  - `node_modules/fumadocs-ui/dist/layouts/home/slots/header.js`
- Implementation route: `http://127.0.0.1:3000/`
- Target viewports: 390 × 844, 1280 × 720, 1408 × 994, and wide desktop above 1400 px.
- State: light theme, page top.
- Implementation screenshot: unavailable because the in-app browser automation transport remained closed.

## Layout findings and fixes

- [P1] Public pages used a different maximum width from Fumadocs.
  Evidence: the local `.section-shell` expanded through 1500, 1560, and 1680 px; Fumadocs HomeLayout fixes `--fd-layout-width` at 1400 px.
  Fix: introduced one shared 1400 px global layout-width token for both public pages and Fumadocs.

- [P1] Horizontal gutters changed by breakpoint.
  Evidence: desktop used 12 px outer gutters while mobile used 10 px; Fumadocs uses symmetric 16 px container padding.
  Fix: `.section-shell` now uses `width: 100%`, `max-width: 1400px`, `margin-inline: auto`, and `padding-inline: 16px` at every viewport.

- [P2] A few header/hero elements applied offsets independently from the shared container.
  Fix: aligned the notice arrow with the 16 px gutter, removed the homepage hero's duplicate horizontal padding, and made the mobile navigation viewport follow the container edges.

## Expected geometry

- At 390 px: visible content edges are 16 px from both sides.
- At 1280 px: visible content edges are 16 px from both sides.
- At 1408 px: the 1400 px shell is centered, producing 4 px outer space plus 16 px inner padding on both sides.
- Above 1400 px: the shell remains centered and both outer margins grow equally.

## Non-visual verification

- `git diff --check` passed for the scoped files.
- `npm run typecheck` passed.
- `npm run build` passed.
- `/`, `/events/`, `/docs/`, `/docs/participation/`, `/news/`, `/about/`, `/cooperation/`, and `/contact/` returned HTTP 200.
- The local production preview is running at `http://127.0.0.1:3000/`.

## Remaining blocker

- Browser-rendered screenshots and equal-size side-by-side comparison are still unavailable, so exact visual QA cannot be marked passed.

final result: blocked

---

# Fumadocs official global header reconstruction QA

## Source and implementation

- Source visual truth:
  - `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-91142917-6360-4c42-982f-d88fa7912981.png`
  - `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-9210f9b4-aabd-4f1b-9ef2-5374f8fd25a1.png`
- Wide implementation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-local-1790-v2.png`
- Equal-state desktop comparison: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-comparison.png`
- Responsive desktop evidence: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-local-1280-final.png`
- Responsive mobile evidence: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-local-mobile-final.png`

## Capture and normalization

- Source pixels: 1802 × 164 for the focused navigation reference and 1792 × 498 for the navigation-plus-content reference.
- Wide implementation pixels: 1778 × 497 at a requested 1790 px desktop viewport.
- Responsive desktop pixels: 1268 × 713 at a 1280 × 720 CSS viewport.
- Responsive mobile pixels: 378 × 817 at a 390 × 844 CSS viewport.
- State: light theme, home route, page top, navigation closed.
- Density normalization: the 1792 px source and 1778 px implementation were placed in a single 3580 × 500 comparison image without density resampling. The minor width difference is browser client-area chrome, not content scaling.

## Full-view comparison evidence

The combined comparison shows the same Fumadocs navigation grammar: compact circular brand mark, one-line brand label, left-to-right text navigation, a right-aligned pill search control with keyboard hint, a two-state sun/moon switch, and a GitHub mark. AIADC keeps its own notice strip above the navigation and its longer brand copy; these are intentional product-content differences.

## Focused-region comparison evidence

No additional crop was required because the supplied source is already a focused header crop and all typography, controls, borders, and spacing are readable at original size in the combined comparison.

## Findings

- No actionable P0, P1, or P2 mismatch remains in the scoped global header.
- Fonts and typography: the header uses Geist-first UI typography, 18 px semibold branding, 15 px regular navigation text, and a compact single-line hierarchy consistent with Fumadocs.
- Spacing and layout rhythm: the header is 68 px high, uses symmetric fluid desktop gutters, keeps the brand and navigation in one left-to-right row, and gives search/theme/GitHub one compact right-side cluster.
- Colors and visual tokens: borders, muted navigation text, hover surfaces, search background, and light/dark foreground behavior reuse Fumadocs theme tokens.
- Image quality and asset fidelity: the supplied AIADC logo remains a sharp real raster asset; the GitHub mark uses GitHub's official favicon asset instead of a code-drawn substitute.
- Copy and content: AIADC navigation labels, routes, GitHub destination, and registration destination are preserved.
- Responsive behavior: at 1280 px the full search control shrinks to 204.8 px and remains visible; at 390 px the desktop navigation is replaced by brand, search, and menu controls with no page-level horizontal overflow.

## Comparison history

- Pass 1 finding: the earlier header used an oversized logo card, centered navigation, an unrelated primary registration button, and separate theme behavior.
- Pass 1 fix: rebuilt the desktop row around the Fumadocs brand/navigation/search/theme/GitHub structure while preserving AIADC routes and branding.
- Pass 2 finding: the full search control was hidden between the 1280 px and 1535 px desktop breakpoints.
- Pass 2 fix: made the full search control visible from the desktop breakpoint and changed its width to `clamp(10rem, 16vw, 18.75rem)`.
- Post-fix evidence: at 1280 × 720, desktop navigation and the 204.8 px search control are both visible, document scroll width stays within the client width, and the final screenshot shows no collision or truncation.

## Primary interactions tested

- Opened and closed the desktop search dialog through the visible search control.
- Switched from light to dark and back to light through the Fumadocs two-state theme control.
- Opened and closed the mobile navigation; `aria-expanded`, menu visibility, and body scroll locking changed correctly.
- Verified the mobile search and menu controls remain visible at 390 × 844.
- Checked desktop and mobile browser warning/error logs; both were empty.
- `npm run typecheck` and `npm run build` passed, including all 22 generated pages.

## Follow-up polish

- The AIADC notice strip and longer Chinese brand name necessarily make the overall header taller and denser than the Fumadocs product site; these are accepted brand-content differences.

final result: passed

---

# Fumadocs rainbow notice banner QA

- Annotation target: the global notice bar above the desktop navigation.
- Implementation evidence: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-rainbow-banner.png`.
- Viewport: 1383 × 994 browser viewport.
- Official implementation: `Banner` from `fumadocs-ui/components/banner` with `variant="rainbow"`, using the package-default four-color repeating gradient, `fd-moving-banner` 20-second animation, dual mask, and `saturate(2)` filter.
- Content and behavior: the existing notice label, date text, chevron, and `/news/` card-wide link are preserved.
- Layout safety: the banner is 48 px high at the top of the page, the navigation and hero remain unchanged, and page-level horizontal overflow is zero.
- Verification: `npm run typecheck` passed; the 22-page production build passed; the production preview returned HTTP 200; browser error logs were empty.

final result: passed

---

# Current Fumadocs official header QA

The user clarified that “official” means the current Fumadocs website, not the deployed AIADC production header. This section supersedes the earlier **Official header fidelity QA** and **Current official header QA status** sections.

## Source and implementation

- Source visual truth: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\fumadocs-official-header-desktop.png`, captured from `https://www.fumadocs.dev/`.
- Desktop implementation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-header-local-desktop-current.png`.
- Mobile source: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\fumadocs-official-mobile.png`.
- Mobile implementation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-header-local-mobile-current.png`.
- Mobile menu state: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-header-local-mobile-menu-current.png`.
- Focused desktop comparison: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-header-desktop-comparison-current.png`; Fumadocs is on the left and AIADC is on the right.
- Focused mobile comparison: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-fumadocs-header-mobile-comparison-current.png`; Fumadocs is on the left and AIADC is on the right.

## Capture and normalization

- Desktop CSS viewport: 1280 × 720. Source output: 1265 × 712. Implementation output: 1268 × 713.
- Mobile CSS viewport: 390 × 844. Source output: 375 × 811. Implementation output: 378 × 817.
- State: dark theme, page top, navigation closed. The implementation also captured the mobile menu-open state.
- The focused comparisons crop each product’s 56–57 px primary navigation row at native output density. AIADC’s separate notice bar is intentionally excluded from the focused crop and remains above the primary navigation in the full implementation screenshots.

## Findings

- No actionable P0, P1, or P2 mismatch remains in the scoped global header.
- Fonts and typography: AIADC uses the same compact semibold brand treatment, regular muted navigation labels, and single-line hierarchy as Fumadocs while retaining Chinese copy.
- Spacing and layout rhythm: the primary row is 56 px high; brand and navigation flow from the left, and search/theme/GitHub form one compact right-side cluster.
- Colors and visual tokens: translucent background, thin lower border, muted labels, hover surfaces, search field, theme control, and dark/light behavior reuse Fumadocs tokens.
- Image quality and asset fidelity: the original AIADC logo is retained as a real raster asset. The GitHub mark comes from Fumadocs’ own resolved link item.
- Copy and content: AIADC routes and labels remain intact. The blue registration CTA is replaced by a normal `报名参赛` navigation item to match Fumadocs’ navigation grammar.
- Responsive behavior: mobile collapses to brand, search, and chevron controls; the menu exposes all AIADC routes plus GitHub and the Fumadocs two-state theme switch.

## Comparison history

- Pass 1 finding: the implementation followed the deployed AIADC production header with a centered navigation, oversized logo treatment, separate theme button, and blue registration pill.
- Fix: rebuilt the primary row around the current Fumadocs brand/navigation/search/theme/GitHub structure while preserving AIADC content and routes.
- Post-fix evidence: the desktop and mobile focused comparisons show matching row height, control order, alignment, density, theme, and responsive collapse.

## Primary interactions tested

- Opened and closed the shared Fumadocs desktop search dialog.
- Switched dark → light → dark through the Fumadocs two-state theme control.
- Opened and closed the mobile navigation and verified all destinations, GitHub, and the theme control.
- Checked browser error logs; no errors were reported.
- `npm run typecheck` passed.
- `npm run build` passed and generated all 22 pages.

final result: passed

---

# Official header fidelity QA

## Source and implementation

- Source visual truth: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-reference-1383.png`, captured from `https://aiadc.org.cn/`.
- Implementation screenshot: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-implementation-1383.png`, captured from `http://127.0.0.1:3000/`.
- Focused comparison: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-comparison-latest.png`; official reference is on the left and the local implementation is on the right.
- Browser CSS viewport: 1383 x 994 at device pixel ratio 1.25.
- Source pixels: 1371 x 984.
- Implementation pixels: 1371 x 986.
- Focused comparison pixels: 2742 x 124.
- State: dark theme, sticky header visible, desktop home route.
- Density normalization: both captures came from the same in-app browser and were cropped at native output density to the same 1371 x 124 header region before being placed side by side.

## Full-view comparison evidence

The annotation is scoped to the sticky announcement and navigation header. The source page was captured after scrolling while the implementation was captured at the top, so below-header page content intentionally differs. Both full captures preserve the same sticky header state, dimensions, theme, logo, navigation labels, controls, and CTA.

## Focused-region comparison evidence

The side-by-side header crop confirms matching logo asset and container, brand typography, centered six-item navigation, muted navigation color, moon control, blue pill-shaped registration CTA, announcement strip, borders, dark surfaces, and horizontal spacing. No actionable P0, P1, or P2 difference remains in the annotated region.

## Required fidelity surfaces

- Fonts and typography: the official Alibaba PuHuiTi-backed hierarchy, brand weight, 14 px navigation labels, announcement copy, and CTA weight are restored.
- Spacing and layout rhythm: the official `section-shell`, 74.4 px desktop header height, centered navigation group, 44 px logo container, control gaps, and pill CTA padding match the source.
- Colors and visual tokens: dark header surfaces, muted navigation foreground, border opacity, white brand text, and `#0075de` registration action match the reference.
- Image quality and asset fidelity: the supplied `/assets/aiadc-logo-small.webp` asset is used at the official size and framing; no asset was approximated.
- Copy and content: the six official navigation labels, brand name, current theme semantics, announcement, and registration copy match the source.

## Primary interactions tested

- Verified all six desktop navigation destinations and the external registration destination in the browser-rendered DOM.
- Opened and closed the 390 x 844 mobile navigation and verified all official destinations.
- Switched the mobile theme from dark to light and back to dark.
- Checked browser error logs; no errors were reported.
- `npm run typecheck`, `npm run build`, and `git diff --check` passed.

## Comparison history

- Pass 1 finding [P1]: the local desktop header had diverged from the official source with a search field, full theme switch, GitHub control, competition-guide dropdown, reduced logo treatment, and no official blue registration pill.
- Fix: restored the official `SiteHeader` structure and removed the header-only CSS overrides while preserving unrelated article and documentation styling.
- Post-fix evidence: `design-qa-header-comparison-latest.png` shows the official and local header crops aligned with no actionable P0, P1, or P2 mismatch.

final result: passed

---

# Competition guide dropdown navigation QA

## Source and implementation

- Source visual truth: browser annotation on the desktop `参赛指南` navigation item at `http://127.0.0.1:3000/`.
- Desktop implementation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-guide-dropdown-final.png`.
- Mobile implementation: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-guide-dropdown-mobile.png`.
- States: light theme, page top, competition-guide navigation expanded.
- Viewports: 1280 × 720 desktop and 390 × 844 mobile.

## Findings

- No actionable P0, P1, or P2 issue remains.
- Desktop: `参赛指南` is a single-line expandable navigation item with a rotating chevron and a Fumadocs-token popover surface.
- Content: the dropdown exposes 文档首页、参赛说明、参赛材料、评分标准, with concise descriptions on desktop.
- Mobile: the same four destinations appear as an independently expandable nested group in the existing navigation panel.
- Responsive layout: all persistent desktop navigation labels remain 36 px high with `white-space: nowrap`; the 1280 px and 390 px layouts have no page-level horizontal overflow.
- Accessibility: desktop uses native `details`/`summary`; mobile exposes `aria-expanded` and `aria-controls`.

## Comparison history

- Pass 1: adding the chevron caused the 1280 px desktop labels to wrap.
- Fix: reduced navigation gaps and horizontal padding, then locked persistent navigation labels to one line.
- Post-fix evidence: every persistent desktop item is 36 px high, the four guide links are visible, and document scroll width equals client width.

## Primary interactions tested

- Expanded and collapsed the desktop competition-guide entry.
- Verified all four desktop destinations and descriptions.
- Opened the mobile site menu, expanded the nested competition-guide group, and verified all four destinations.
- Checked desktop and mobile warning/error logs; both were empty.
- `npm run typecheck` and `npm run build` passed, including all 22 generated pages.

final result: passed

---

# Current official header QA status

The competition-guide dropdown section above records a superseded earlier iteration. The current implementation, evidence, measurements, interactions, required fidelity surfaces, and comparison history are documented in **Official header fidelity QA** above. The final current state follows the official production header without the superseded desktop dropdown, search field, or GitHub control.

final result: passed

---

# Final current header QA status

The user subsequently clarified that “official” means the current Fumadocs website. The authoritative implementation and evidence are documented in **Current Fumadocs official header QA** above. All older production-header and guide-dropdown reports are historical and superseded.

final result: passed

---

# Desktop GitHub icon removal QA

- Annotation target: the desktop GitHub icon at the far right of the global header.
- Implementation evidence: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-without-github.png`.
- Viewport: 1383 × 994 browser viewport; 1371 px content width.
- State: dark theme, page top, desktop navigation visible.
- Result: the targeted desktop icon and its link are absent. Search and theme controls remain right-aligned, the 56.8 px Fumadocs-style navigation row is unchanged, document scroll width equals client width, and browser error logs are empty.
- Scope: the mobile-menu GitHub utility remains unchanged because the annotation targeted only the desktop icon.
- Verification: `npm run typecheck` and the 22-page production build passed.

final result: passed

---

# About page project-direction alignment QA

- Source visual truth: the browser annotation screenshot for the “项目方向” section on `/about/`, captured in dark theme at 1383 × 994.
- Implementation screenshot: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-about-project-directions-aligned.png`.
- State and normalization: same route, desktop viewport, dark theme, sticky header, and project-direction section; both source and implementation use the browser's native screenshot density.
- Full-view comparison evidence: the revised section preserves the heading, copy, four marquee rows, typography, pills, icons, animation, and surrounding vertical rhythm.
- Focused comparison evidence: the previous bright white edge gradients now resolve to the section surface color (`rgb(25, 25, 25)`), eliminating the dark-theme color mismatch. The marquee wall now spans the same 16 px page inset as the sections above and below.
- Fonts and copy: unchanged.
- Spacing and layout rhythm: the inner 1152 px width cap and 40 px track padding were removed; the wall now measures 1339.2 px inside the 1371.2 px shell.
- Colors and tokens: edge fades use `--surface`, matching both light and dark section backgrounds.
- Image and icon fidelity: unchanged Lucide icons; no raster assets are involved.
- Comparison history: P2 color mismatch and inconsistent side inset identified in the annotation; fixed by replacing literal white fades with the surface token and removing the nested width/padding constraints.
- Browser verification: page-level horizontal overflow is zero and browser logs are empty.
- Build verification: `npm run typecheck` and the 22-page production build passed.

final result: passed

---

# Unified public page hero QA

- Source visual truth: the browser annotation screenshot for the `/cooperation/` page hero, captured in dark theme at a 1383 × 994 viewport.
- Implementation evidence: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-unified-page-heroes.png`.
- Routes compared in reading order: `/events/`, `/docs/`, `/news/`, `/about/`, `/cooperation/`, `/contact/`, and `/materials/`.
- State and normalization: every route was captured at the page top in the same dark theme, 1383 × 994 CSS viewport, and native browser density. Each hero was cropped to its exact 1371 × 304 px rendered bounds, then normalized to 686 × 152 px for the two-column comparison grid.
- Full-view comparison evidence: all seven independent public pages now use the same full-bleed image treatment, blue overlay, centered content frame, white typography, and vertical composition.
- Focused comparison evidence: each rendered hero reports the same 304 px desktop height, 44 px title size, 49.28 px title line height, 18 px description size, and identical overlay gradient.
- Fonts and typography: one shared eyebrow, title, and description hierarchy; content and line wrapping remain route-specific.
- Spacing and layout rhythm: fixed 304 px desktop hero frame with responsive minimum height and safe mobile padding.
- Colors and tokens: all page heroes use the same blue overlay and white foreground treatment.
- Image and asset fidelity: existing route-specific hero assets are preserved; routes without a supplied image use the existing optimized `aiadc-intro-competition-bg.webp` asset.
- Copy and content: all original page labels, titles, descriptions, routes, and semantics are preserved.
- Comparison history: P2 cross-page inconsistency was measured before the change at 326.06–357.56 px for image heroes and 334.56 px for neutral heroes, with three overlay treatments and missing images on two routes. The shared component now owns one size and presentation.
- Browser verification: every route returned one `h1`, page-level horizontal overflow was zero, and browser logs were empty.
- Build verification: `npm run typecheck` and the 22-page production build passed.

final result: passed

---

# Desktop registration CTA placement QA

- Source visual truth: the browser annotation screenshot for the desktop `报名参赛` navigation item on `/contact/`, captured in dark theme at 1383 × 994.
- Implementation screenshot: `C:\Users\Administrator\Documents\GitHub\AIADC-WEB\design-qa-header-registration-button.png`.
- State and normalization: same route, viewport, theme, page-top state, and native browser screenshot density.
- Full-view comparison evidence: the header, search field, theme switch, unified contact-page hero, content cards, and floating actions remain unchanged.
- Focused comparison evidence: `报名参赛` is no longer part of the six-item navigation list. It is now an 88 × 36 px primary button positioned 6 px after the light/dark theme switch.
- Fonts and typography: 14 px semibold button label; navigation labels retain their existing regular weight.
- Spacing and layout rhythm: the button shares the 36 px control height and remains inside the 16 px page gutter without compressing the search field or navigation.
- Colors and tokens: the CTA uses the existing primary blue and primary foreground tokens in both themes.
- Image and asset fidelity: no image or icon assets changed.
- Copy and content: the registration label and central `ROUTES.registration` destination are unchanged.
- Responsive behavior: the scoped desktop item moved to the utility cluster; the existing mobile registration entry remains in the mobile menu.
- Browser verification: exactly one desktop registration link is visible, the header navigation no longer contains it, the destination is `https://bm.aiadc.org.cn`, page-level horizontal overflow is zero, and browser logs are empty.
- Build verification: `npm run typecheck` and the 22-page production build passed.

final result: passed
