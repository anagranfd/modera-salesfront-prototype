# Modera Salesfront — Vehicle Publishing Tool
## HiFi Prototype Annotations

---

## 1. Overview

This prototype covers the **Vehicle Publishing Tool** feature of Modera Salesfront, an automotive CRM platform. The feature enables dealership staff to publish vehicle listings to multiple automotive portals (channels) simultaneously, manage publishing status, resolve validation errors, and perform batch operations across the inventory.

### Prototype Entry Points

| File | Purpose |
|------|---------|
| `prototype/ep3-inventory-pipeline.html` | Main inventory table with batch publishing (recommended start) |
| `prototype/ep1-vehicle-card.html` | Vehicle card modal with publishing tab (single vehicle flow) |
| `prototype/ep2-vehicle-builder.html` | Full-page builder with inline publishing panel |

### Quick Start
```bash
python3 server.py
# Opens: http://localhost:8080/prototype/ep3-inventory-pipeline.html
```

---

## 2. Design System Reference

### Color Tokens
All colors defined in `prototype/shared/tokens.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--nav-dark` | `#1e3a52` | Top nav background base |
| `--page-bg` | `#dce8f0` | Page/content area background |
| `--content-bg` | `#f4f8fb` | Form/builder area |
| `--status-pub` | `#2d8a4e` | Published status (green) |
| `--status-pend` | `#b07820` | Pending/warning status (amber) |
| `--status-err` | `#b03030` | Error status (red) |
| `--status-unpub` | `#8a9aaa` | Unpublished status (gray) |

### Visual Style Reference
- **Era**: jQuery UI + Bootstrap 2.x (~2013–2015)
- **Font**: Segoe UI, 12px base
- **Buttons**: gradient backgrounds, 1px solid border, 3px border-radius, subtle inner glow
- **Navigation**: dark navy gradient top bar (`#2a4f6e → #1a3347`) + blue subnav tabs (`#4a9ec4 → #2e7fa8`)
- **Modals**: jQuery UI dialog style with gradient blue header

### Channel Status Dots
9px circles with radial gradients applied:
- **Published**: `radial-gradient(circle at 35% 35%, #5cd47a, #1d7a3a)`
- **Pending**: `radial-gradient(circle at 35% 35%, #f5c060, #b07820)`
- **Error**: `radial-gradient(circle at 35% 35%, #f07070, #b03030)`
- **Unpublished**: `radial-gradient(circle at 35% 35%, #ccdde8, #8aabbd)`

---

## 3. EP1 — Vehicle Card · Publishing Tab

The publishing panel lives inside the Vehicle Card modal (Publishing tab). It is controlled by a state machine in `publishing-panel.js`.

### URL Hash Navigation
Each state is addressable via URL hash:
- `ep1-vehicle-card.html#a1` → A1 Idle
- `ep1-vehicle-card.html#b2` → B2 Error Detail
- `ep1-vehicle-card.html#c3` → C3 Confirm Unpublish

---

### State A1 — Idle (Unpublished)

**Screen**: `screens/ep1/a1-idle.html`

**Purpose**: Default state when vehicle has never been published.

**Key elements**:
- Header: "Publishing channels" with vehicle name subtitle
- 5 channel rows, all with gray unpublished dots
- Each row shows completeness bar (UX U2 — proactive readiness):
  - Auto24: 96% green bar
  - Mobile.de: 100% full green bar
  - SS.lv: 74% amber bar + ⚠ warning icon
  - Autoplius: 88% amber bar + ⚠ warning icon
  - City24: 91% green bar
- Primary CTA: `[ Publish to channels ]` → navigates to A2

**Rationale for UX U2**: Showing completeness bars in the idle state gives staff a preview of channel readiness before clicking Publish. They can see which channels might have issues without waiting for the validation step, enabling proactive data entry in the builder.

---

### State A2 — Channel Select

**Screen**: `screens/ep1/a2-channel-select.html`

**Purpose**: User selects which channels to publish to.

**Key elements**:
- "Select all" / "Deselect all" quick links
- All 5 channels listed with checkboxes; City24 unchecked by default
- Completeness percentage shown per channel
- Dynamic CTA button: "Publish N channels →" updates as selection changes
- Selecting 0 channels disables the button (`.jq-btn--disabled`)

**Interaction**: Clicking row label toggles checkbox. Checkbox change recalculates count.

---

### State A3 — Validation Warnings

**Screen**: `screens/ep1/a3-validation.html`

**Purpose**: Show pre-flight validation results before committing to publish.

**Key elements**:
- Orange header icon indicating warnings
- Auto24: ✓ Ready (96%)
- Mobile.de: ✓ Ready (100%)
- SS.lv: ✓ Accepts partial (74% — this portal has a lower threshold)
- Autoplius: ⚠ Requires 100% — shows missing fields inline
  - "Interior color" and "Doors count"
  - Inline `[ Go to Vehicle Builder → ]` button (deep link to relevant fields)
- Actions: `[ ← Back ]` (→ A2) and `[ Publish anyway (3 of 4) → ]` (→ A4)

**Design decision**: "Publish anyway" wording is intentional — it lets staff skip the incomplete channel and publish to the 3 ready ones, without losing their progress.

---

### State A4 — Publishing in Progress

**Screen**: `screens/ep1/a4-progress.html`

**Purpose**: Show real-time progress as listings are submitted to each portal.

**Key elements**:
- Header shows live count "Publishing… (N/total)"
- Overall progress bar with percentage
- Channel rows update sequentially with 800ms intervals
- Status flow per channel: Waiting → ⟳ Sending → ✓ Published
- All action buttons disabled during progress
- Auto-transitions to A5 when complete

**Technical**: `setInterval(fn, 800)` advances through channels. Progress bar uses CSS transition.

---

### State A5 — Success

**Screen**: `screens/ep1/a5-success.html`

**Purpose**: Confirmation that publishing succeeded.

**Key elements**:
- Green-tinted header: "✓ Published successfully"
- All published channels show ● Published + timestamp
- **UX U4 — Live listing links**: Each published channel row reveals `[ ↗ View ]` button on hover (opacity transition). Opens live portal URL in new tab. Tooltip: "View live listing on [Channel]"
- Only action: `[ Unpublish from channels… ]` → C2 (or C1 if all channels published)

**UX U4 rationale**: Deep linking from the CRM to the live portal listing is a key workflow for sales staff who need to verify the listing looks correct on the portal.

---

### State B1 — Mixed State

**Screen**: `screens/ep1/b1-mixed-state.html`

**Purpose**: Vehicle was partially published previously. Some channels have errors.

**Key elements**:
- Summary line: "2 errors · 2 published · 1 pending"
- Channel statuses:
  - Auto24: ● Published
  - Mobile.de: ✕ Error (clickable to expand)
  - SS.lv: ● Published
  - Autoplius: ○ Not published
  - City24: ✕ Error (collapsed)
- Error rows have `[ › ]` expand toggle button
- Footer: `[ Fix errors ]` (→ B2) and `[ Publish remaining → ]` (→ A4)

---

### State B2 — Error Detail

**Screen**: `screens/ep1/b2-error-detail.html`

**Purpose**: Show expanded error details to help user fix them.

**Key elements**:
- Mobile.de error expanded inline showing:
  - "Publishing failed" headline
  - Missing fields: Mileage (km), Fuel type
  - `[ Go to Vehicle Builder → ]` button (→ B3)
  - `[ Retry this channel ]` button
- City24 collapsed with toggle `[ › ]`
- Navigation: `[ ← Back ]` (→ B1), `[ Go to Vehicle Builder → ]` (→ B3)

---

### State B3 — Builder Highlight

**Screen**: `screens/ep1/b3-builder-highlight.html`

**Purpose**: User is redirected to builder to fix missing fields. Builder highlights the problematic fields.

**Key elements**:
- Warning banner: "⚠ Complete these fields to publish on Mobile.de"
- Builder form shown with Mileage and Fuel type fields highlighted (red border + `#fff8f8` bg)
- Right panel shows compact list of what needs fixing
- `[ ← Back to Publishing ]` → B1
- `[ Save & Return to Publishing ]` → B4

---

### State B4 — Ready Retry

**Screen**: `screens/ep1/b4-ready-retry.html`

**Purpose**: After fixing fields, channels that had errors now show "Ready to retry."

**Key elements**:
- Header: "✓ Fields updated · Ready to republish" (green)
- Mobile.de and City24: "○ Ready to retry" with individual `[ Retry ]` buttons
- Primary: `[ Retry all failed channels ]` → A4

---

### State C1 — All Published

**Screen**: `screens/ep1/c1-all-published.html`

**Purpose**: All 5 channels are published. Celebratory state.

**Key elements**:
- Green gradient header: "✓ Published on all channels"
- All 5 rows: ● Published with timestamp
- UX U4 hover links on each row
- Action: `[ Unpublish from channels… ]` → C2

---

### State C2 — Select Unpublish

**Screen**: `screens/ep1/c2-select-unpublish.html`

**Purpose**: User selects which channels to remove the listing from.

**Key elements**:
- None checked by default (contrast with A2 where all are checked)
- Autoplius and City24 pre-checked in demo
- Dynamic "Unpublish N channels →" button (red variant)
- `[ Cancel ]` → C1

---

### State C3 — Confirm Unpublish

**Screen**: `screens/ep1/c3-confirm-unpublish.html`

**Purpose**: Destructive action confirmation.

**Key elements**:
- Warning box listing affected channels by name + URL
- "This will remove the listing immediately."
- `[ ← Cancel ]` → C2
- `[ Unpublish now ]` (red) → C4

**Design rationale**: Unpublishing is irreversible from a user perspective (portal de-index can take time to reverse). Confirmation step prevents accidental removals.

---

### State C4 — Partial Result

**Screen**: `screens/ep1/c4-partial-result.html`

**Purpose**: Show result after selective unpublishing.

**Key elements**:
- Summary: "3 published · 2 unpublished"
- 3 channels: ● Published
- 2 channels: ○ Unpublished
- Action: `[ Publish to channels → ]` → A2 (re-publish flow)

---

## 4. EP2 — Vehicle Builder · Inline Publishing Panel

The builder is a full-page form (`ep2-vehicle-builder.html`). The publishing panel is a fixed 280px right column. The state machine controls both the panel content and field highlights in the form.

### URL Hash Navigation
- `ep2-vehicle-builder.html#a1` → Builder Idle
- `ep2-vehicle-builder.html#a2` → Validation Highlights (fields highlighted)
- `ep2-vehicle-builder.html#a5` → Details tab active, Autoplius fields highlighted

---

### State EP2-A1 — Builder Idle

**Screen**: `screens/ep2/a1-builder-idle.html`

**Purpose**: Default state — builder open, panel shows channel readiness.

- Basic Info tab active
- Panel shows A1 state (all unpublished)
- `[ Publish to channels ]` in panel triggers validation

---

### State EP2-A2 — Validation Highlights

**Screen**: `screens/ep2/a2-validation-highlights.html`

**Purpose**: After clicking Publish, validation runs and problematic fields are highlighted.

- Banner appears at top: "Complete these fields to publish on Mobile.de"
- Mileage field: red border + "Required by Mobile.de" hint text
- Fuel type select: red border + hint
- Panel shows warning state with all channels and their completeness
- Autoplius row shows "→ Tab: Details" button to jump to other form tab

---

### State EP2-A3 — Real-time Update

**Screen**: `screens/ep2/a3-realtime-update.html`

**Purpose**: User filled in Mileage; panel updates in real-time.

- Mileage field: resolved state (green flash animation: `fieldResolved`)
- Mileage hint: "✓ Saved"
- Fuel type field: still highlighted
- Panel: "1 issue remaining" header
- Mobile.de bar: updated from 88% to 94%
- Green notification in panel: "✓ Mileage saved · Mobile.de: 88% → 94%"
- Banner updated to "1 field remaining"

**Technical**: `oninput` on mileage field triggers `onMileageChange()` which uses 800ms debounce.

---

### State EP2-A4 — Channel Unlocked

**Screen**: `screens/ep2/a4-channel-unlocked.html`

**Purpose**: Both fields filled → all selected channels ready.

- No field highlights remaining
- Panel header: "✓ All selected channels ready" (green)
- Button: `[ Publish 3 channels → ]`

---

### State EP2-A5 — Field in Other Tab

**Screen**: `screens/ep2/a5-field-in-other-tab.html`

**Purpose**: Some issues are in the Details tab, not Basic Info.

- Details tab is now active in builder
- Interior color and Doors count fields highlighted
- Panel shows "← you are here (Details)" indicator
- Autoplius still showing warning in panel
- Other channels (Auto24, Mobile.de, SS.lv) show "✓ Ready"

---

### State EP2-A6 — Publishing from Builder

**Screen**: `screens/ep2/a6-publishing-from-builder.html`

**Purpose**: Publishing is in progress while builder is still visible.

- Builder form remains readable (not dimmed)
- Save button disabled during publishing
- Footer shows "Publishing…" status
- Right panel shows progress with channels updating
- Auto-advances to success state

---

## 5. EP3 — Inventory Pipeline · Batch Publishing

The inventory table with row selection, batch action bar, and full wizard modal.

### URL Hash Navigation
- `ep3-inventory-pipeline.html#s1` → Hover state on second row
- `ep3-inventory-pipeline.html#b1` → 4 rows selected, batch bar visible
- `ep3-inventory-pipeline.html#b3` → Skip to validation step

---

### State S1 — Hover State

**Screen**: `screens/ep3/s1-hover-state.html`

Toyota RAV4 row hovered. Action buttons appear inline: `[ Publish ]` and (for error rows) `[ Fix errors ]`. No modal or batch bar.

---

### State S2 — Single Vehicle Modal

**Screen**: `screens/ep3/s2-single-vehicle-modal.html`

Single-vehicle publishing modal (EP1-A2 state) opens over dimmed inventory table. Demonstrates the "quick publish" flow for a single vehicle from the inventory row.

---

### State B1 — Batch Action Bar

**Screen**: `screens/ep3/b1-batch-action-bar.html`

4 rows selected (VW Golf, Toyota RAV4, BMW 320d, Audi A4):
- Selected rows: blue-tinted background + left blue border
- Batch action bar slides up from bottom (250ms ease-out animation)
- Shows: "4 vehicles selected [Deselect all] [Publish selected →]"
- UX U3: If 10+ vehicles selected → amber pill "⚠ 23 selected across 3 pages"

---

### State B2 — Batch Channel Selector (Step 1 of 3)

**Screen**: `screens/ep3/b2-batch-channel-selector.html`

Wizard modal Step 1:
- "Publish 4 vehicles · Step 1 of 3: Select channels"
- Wizard steps indicator at top of dialog header
- Channel list: 3 checked (Auto24, Mobile.de, SS.lv), 2 unchecked
- Selected channels have blue border + light blue background
- Dynamic button: "Next: Validate (3 channels) →"

---

### State B3 — Validation Summary (Step 2 of 3)

**Screen**: `screens/ep3/b3-validation-summary.html`

Wizard modal Step 2 showing the validation matrix:

| Vehicle | Auto24 | Mobile.de | SS.lv |
|---------|--------|-----------|-------|
| VW Golf | ✓ Ready | ✓ Ready | ✓ Ready |
| Toyota RAV4 | ✓ Ready | ⚠ Missing 2 | ✓ Ready |
| BMW 320d | ✓ Ready | ✓ Ready | ✓ Ready |
| Audi A4 | ✓ Ready | ⚠ Missing 1 | ✓ Ready |

Warning banner: "Toyota RAV4 and Audi A4 will be skipped for Mobile.de"

Actions:
- `[ ← Back ]` → B2
- `[ Fix issues first ]` → B3a
- `[ Proceed anyway → ]` → B4

---

### State B3a — Fix Issues Builder

**Screen**: `screens/ep3/b3a-fix-issues-builder.html`

Inline fix wizard for Toyota RAV4:
- "Vehicle 1 of 2 with issues · Mobile.de · Missing 2 fields"
- Mileage and Fuel type fields highlighted in form
- `[ Skip this vehicle ]` → back to B3
- `[ Save & Next vehicle → ]` → B4 (or next vehicle with issues)

---

### State B4 — Batch Progress (Step 3 of 3)

**Screen**: `screens/ep3/b4-batch-progress.html`

Publishing in progress:
- Overall progress bar (80% shown in frozen state)
- Live matrix updating: ✓ for done, ⟳ for in-progress, · for waiting, — for skipped
- Close button disabled
- Operations proceed at 600ms interval

---

### State B5 — Batch Success

**Screen**: `screens/ep3/b5-batch-success.html`

Green header: "✓ Batch publish complete"
- "10 of 10 operations successful"
- Matrix: all ✓ with — for Mobile.de skips
- Footer note about 2 skipped vehicle-channel combinations
- Only action: `[ Done ]` (closes wizard)

---

### State B6 — Batch Partial Errors

**Screen**: `screens/ep3/b6-batch-partial-errors.html`

Amber header: "⚠ Batch publish: partial results"
- "8 of 10 operations successful · 2 failed"
- Matrix shows ✕ for BMW 320d → Mobile.de (network timeout) and Audi A4 → SS.lv (server error 503)
- `[ Retry failed → ]` re-runs only failed operations

---

### State B7 — Batch All Failed

**Screen**: `screens/ep3/b7-batch-all-failed.html`

Red header: "✕ Batch publish failed"
- All cells show ✕
- Error message: "Connection timed out. Please check your network and try again."
- Prominent `[ Retry all ]` button (red variant)

---

## 6. UX Improvements

### U1 — Publishing Status Widget (Topnav)

A small pill-shaped indicator in the top navigation bar, visible from any page:
- `Publishing` (gray) — idle
- `⟳ Publishing…` (amber) — operation in progress
- `✓ Published` (green) — last operation succeeded
- `✕ 2 errors` (red) — last operation had errors

**Location**: `#pub-status-pill` element in `modera-topnav__right`

**Rationale**: Staff often have the Vehicle Card or Builder open in a background tab. The persistent topnav indicator lets them see publishing status without switching to the Publishing tab.

---

### U2 — Proactive Channel Readiness in A1 (Idle)

In the A1 Idle state, completeness bars are shown for each channel before the user initiates publishing. Channels below threshold show ⚠ icons.

**Rationale**: Instead of discovering issues after clicking "Publish", staff see readiness upfront. This reduces the A1 → A2 → A3 → [back to builder] → A3 → A4 round trip for vehicles with obvious missing data.

**Implementation**: Completeness values are stored per channel (96%, 100%, 74%, 88%, 91%) and shown with appropriate color coding (green ≥95%, amber ≥80%, red <80%).

---

### U3 — Batch Limit Warning

When 10+ vehicles are selected across multiple table pages, an amber pill appears in the toolbar: "⚠ 23 selected across 3 pages"

**Rationale**: Batch publishing many vehicles to multiple channels can generate significant API load. The warning makes cross-page selection visible and encourages staff to review their selection before submitting.

---

### U4 — View Live Listing Deep Links

In any published state (A5, C1), hovering a channel row reveals a `[ ↗ View ]` button that opens the live portal listing URL in a new tab.

**Rationale**: After publishing, QA verification is a common workflow. Deep links eliminate the need to navigate to the portal, find the search, and locate the specific listing. The hover-reveal interaction keeps the UI uncluttered.

---

## 7. Accessibility Notes

- All interactive elements are keyboard-accessible (native `<button>`, `<input>`, `<select>` elements)
- Status dots use both color and shape/icon for status indication (not color-only)
- Error states use red borders + text hints (not solely red color)
- Completeness bars include percentage text labels
- Channel status text includes both dot and written status ("● Published", "○ Not published")
- Modals use semantic structure with visible close buttons
- Focus management: modal opens with first interactive element in focus
- Tooltips shown on hover for icon-only actions (UX U4 view buttons)

---

## 8. State Transition Diagrams

### EP1 Flow

```
A1 (Idle)
  └─[Publish to channels]──→ A2 (Channel Select)
                               └─[Publish N →]──→ A3 (Validation)
                                                   ├─[Publish anyway]──→ A4 (In Progress) ──→ A5 (Success)
                                                   └─[Back]──→ A2
                                                   └─[Go to Builder]──→ B3

A5 (Success)
  └─[Unpublish from channels]──→ C2 (Select Unpublish)
                                  └─[Unpublish N →]──→ C3 (Confirm) ──→ C4 (Partial Result)
                                                                          └─[Publish to channels →]──→ A2

B1 (Mixed State)
  ├─[Fix errors]──→ B2 (Error Detail) ──→ B3 (Builder Highlight) ──→ B4 (Ready Retry) ──→ A4
  └─[Publish remaining]──→ A4

C1 (All Published)
  └─[Unpublish from channels]──→ C2
```

### EP3 Batch Flow

```
Inventory Table
  └─[Select rows]──→ Batch Bar visible
                      └─[Publish selected →]──→ B2 (Channel Select)
                                                  └─[Next: Validate →]──→ B3 (Validation Matrix)
                                                                           ├─[Proceed anyway →]──→ B4 (Progress) ──┬──→ B5 (Success)
                                                                           ├─[Fix issues first]──→ B3a (Fix)──→ B4 ─┤──→ B6 (Partial Error)
                                                                           └─[Back]──→ B2                           └──→ B7 (All Failed)
```

---

## 9. File Structure

```
Modera/
├── prototype/
│   ├── ep1-vehicle-card.html          # Interactive EP1 (13 states via hash)
│   ├── ep2-vehicle-builder.html       # Interactive EP2 (6 states + shared)
│   ├── ep3-inventory-pipeline.html    # Interactive EP3 (batch wizard)
│   └── shared/
│       ├── tokens.css                 # CSS custom properties / design tokens
│       ├── components.css             # All component styles
│       ├── animations.css             # Keyframe animations
│       ├── icons.js                   # Inline SVG icon library
│       ├── publishing-panel.js        # EP1/EP2 state machine
│       └── batch-flow.js              # EP3 batch wizard state machine
├── screens/
│   ├── ep1/  (13 static frozen states)
│   ├── ep2/  (6 static frozen states)
│   └── ep3/  (10 static frozen states)
├── docs/
│   └── annotations.md                 # This document
└── server.py                          # Local HTTP preview server (port 8080)
```

---

*Prototype created for Modera Salesfront — Vehicle Publishing Tool feature design review.*
