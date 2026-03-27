# Modera Salesfront — Vehicle Publishing Tool
## HiFi Prototype Annotations · v2 (Page 1.2 — 27.03.2026)

---

## 1. Overview

This document annotates the **v2 prototype** of the Vehicle Publishing Tool feature for Modera Salesfront. It reflects the updated design from Figma page **"Page 1.2 – 27.03.2026"** (file `iaEhGu1Guoo4vbQW63BDmz`, root node `33:29723`).

The v2 prototype introduces a redesigned navigation structure, a new modal layout for EP1, updated builder tabs for EP2, and revised inventory sub-tabs for EP3. All three episodes are updated; original `v1` files remain untouched.

### Prototype Entry Points

| File | Purpose |
|------|---------|
| `prototype/ep3-inventory-pipeline-v2.html` | Inventory table · batch publishing (recommended start) |
| `prototype/ep1-vehicle-card-v2.html` | Vehicle card modal · publishing tab (single vehicle) |
| `prototype/ep2-vehicle-builder-v2.html` | Full-page builder · inline publishing panel |

### Navigation Flow (v2)

```
EP3 Inventory  ──[Edit button, Actions column]──→  EP2 Builder
EP3 Inventory  ──[click vehicle row]──────────────→  EP1 Vehicle Card modal
EP2 Builder    ──[← Inventory tab]──────────────→  EP3 Inventory
EP1 modal      ──[B3 · Go to Vehicle Builder]──→  EP2 Builder
```

> **Important:** The Builder (EP2) is entered from EP3 via the **Edit** button in the Actions column. It is NOT launched from the EP1 modal's Publishing tab.

### Quick Start
```bash
python3 server.py
# Opens: http://localhost:8080/prototype/ep3-inventory-pipeline-v2.html
```

---

## 2. What Changed in v2

### 2.1 Navigation — Two-Row Layout

The v1 prototype used a single-row dark nav. In v2 the top navigation is split into **two rows** (88px total):

| Row | Height | Content |
|-----|--------|---------|
| Row 1 (logo bar) | 40px | `modera` wordmark + help text + topnav-right (pill, notifications, user, exit) |
| Row 2 (nav links) | 48px | 11 navigation links (see below), `background: rgba(0,0,0,0.12)` |

**Nav links (all three episodes):**
Dashboard · Pipe · Cars · **Used Cars** (active) · Customers · Tools · Trade-In · Test Drive · Sales · Chat · Queue

Active nav link: `background: var(--page-bg)`, text color `#1e6080`.

**EP2 addition:** A breadcrumb `/ salesfront` appears between the logo and help text in Row 1 (`topnav-breadcrumb` class, 10px, `rgba(255,255,255,0.5)`).

**EP1 treatment:** Because EP1 shows a modal overlay, the two-row nav behind the overlay is rendered at `filter:brightness(0.82);pointer-events:none` — dimmed and non-interactive.

### 2.2 EP1 — New Modal Structure

The v1 modal (`.vc-modal`) is replaced with `.pub-dialog-v2` (860px wide). Key structural changes:

| Element | v1 | v2 |
|---------|----|----|
| Width | ~700px | 860px |
| Header style | gradient blue `.vc-modal__head` | white header with vehicle name + stock# subtitle |
| Tabs | Extras · Trade-In · Notes · Details · Publishing | **Extras · Trade-In · Financing · Notes · Agreement · Publishing** |
| Tab bar background | — | `linear-gradient(180deg,#1e3a52,#1a3347)` dark navy |
| Active tab indicator | — | 2px bottom border `#5bbde0` + blue text |
| Body layout | single column | **two-column**: 200px left (vehicle image + spec table) + flex right (publishing panel) |
| Close button | top-right dialog header | absolute top-right `pub-dialog-v2__close` |

**New tabs added in v2:** `Financing` and `Agreement`. `Details` tab removed (its content moved to builder).

Tab badges (counts): Extras(3) · Trade-In(1) · Financing(1) · Notes(2) · Agreement(—) · Publishing(—).

### 2.3 EP1 + EP2 — New Empty State (A1∅)

In v1, the A1 Idle state always showed 5 channels with "Publish to channels". In v2 both EP1 and EP2 have a **pre-channel state** (`a1e`) for vehicles where no channels have been configured yet.

| Episode | State | Condition | Buttons shown |
|---------|-------|-----------|---------------|
| EP1 | `a1e` — Idle Empty | No channels configured | `[ Add channels ]` only |
| EP1 | `a1` — Idle | Channels configured | `[ Add channels ]` + `[ Publish to channels ]` |
| EP2 | `a1e` — Builder Idle Empty | No channels configured | `[ Add channels ]` only |
| EP2 | `a1` — Builder Idle | Channels configured | `[ Add channels ]` + `[ Publish to channels ]` |

**Rationale:** Users must first select which channels this vehicle should be published on (via "Add channels") before the publish flow is available. Showing "Publish to channels" on a vehicle with no channels configured would be misleading. This applies equally in the modal (EP1) and the full-page builder (EP2).

The state navigator in both episodes shows `A1∅` as an additional entry point for the empty state.

### 2.4 EP1 — "Add channels" button across all states

In v2, an **`[ Add channels ]`** button appears in every publishing panel state where additional channels can still be added. This button opens the channel selection sub-dialog (`ch-select-box`).

States where "Add channels" appears:

| State | Other buttons present |
|-------|-----------------------|
| a1e | — (only button) |
| a1 | Publish to channels |
| a5 (Success) | Unpublish from channels… |
| b1 (Mixed) | Unpublish from channels…, Publish remaining |
| b2 (Error Detail) | Publish remaining |
| b4 (Ready Retry) | Unpublish from channels…, Retry all |
| c1 (All Published) | Unpublish from channels… |
| c4 (Partial Result) | Unpublish from channels…, Publish to channels → |

States where "Add channels" is **absent**: A2, A3, A4 (in-progress flows), C2, C3 (unpublish flows), B3, B3a (builder-redirect flows).

### 2.5 EP2 — New Builder Tabs

Builder tab bar in v2 has an **`← Inventory`** back-link as the leftmost entry (links to `ep3-inventory-pipeline-v2.html`), followed by content tabs with field-count badges:

| Tab | Badge |
|-----|-------|
| ← Inventory | (back link) |
| Details | 74 |
| Extras | 23 |
| Pricing | 5 |
| Trade-In | 5 |
| Financing | 8 |
| Notes | 112 |
| Agreement | 112 |

In v1, the tabs were: Basic Info · Details · Pricing · Trade-In · Notes.

The tab bar background changed from flat white to `linear-gradient(180deg,#ddeef7,#c8dce8)` (light blue).

### 2.6 EP3 — Inventory Sub-tabs (new)

In v2 the inventory view has a **sub-tabs bar** below the main nav (32px, white background, `border-bottom:1px solid var(--border)`):

| Sub-tab | Badge | State |
|---------|-------|-------|
| Inventory | 74 | Active |
| Dealer Stock | 23 | — |
| Unsettled | 5 | — |
| Configurator | 112 | — |
| Offline | 8 | — |

Active tab: 2px bottom border `#5aaed0`.

These sub-tabs replace the v1 subnav which used blue pill-style tabs (`#4a9ec4 → #2e7fa8` gradient).

### 2.7 EP3 — S1 Renamed: Default State (not Hover State)

In v1, `S1` was called "Hover State" and showed hover effects on a table row. In v2 the screen is renamed to **"Default State"** — the table is shown in its neutral rest state with no hover interaction. The row hover interaction has been removed.

### 2.8 EP3 — Right Sidebar Layout

The right sidebar is now 230px (up from 210px in v1) with class `.right-sidebar-v2`. Structure from top to bottom:

1. **Advanced filter** button row (`sidebar-adv-btn`)
2. **Search input** (`sidebar-search-v2`)
3. **"Filter by model"** header label (`sidebar-hdr-v2`)
4. **Model list** — scrollable items with thumbnail, label, count badge; first item (Volkswagen) active by default
5. **Channel status summary** — Published (31 · green), Pending (12 · amber), Errors (7 · red), Not published (24 · gray)

---

## 3. EP1 v2 — Vehicle Card · Publishing Tab

**File:** `prototype/ep1-vehicle-card-v2.html`
**Screens:** `screens2/ep1/`

### State Machine Overview

The v2 state machine is fully **inline** in `ep1-vehicle-card-v2.html` (not loaded from `shared/publishing-panel.js`). All 14 states are addressable via URL hash.

### URL Hash Navigation

```
ep1-vehicle-card-v2.html#a1e → A1∅ Idle Empty (no channels)
ep1-vehicle-card-v2.html#a1  → A1 Idle (channels configured)
ep1-vehicle-card-v2.html#a2  → A2 Channel Select
ep1-vehicle-card-v2.html#b3  → B3 Builder Highlight
ep1-vehicle-card-v2.html#c3  → C3 Confirm Unpublish
```

---

### State A1∅ — Idle (Empty / No channels)

**Screen:** `screens2/ep1/a1-idle.html` (empty-state variant)

**Purpose:** Vehicle has no publishing channels configured. User must first add channels before publishing is possible.

**Key elements:**
- Header: "Publishing channels" + vehicle subtitle
- Body: empty state message "No channels added yet"
- Only CTA: `[ + Add channels ]` → opens channel select sub-dialog

**Design decision:** Removing "Publish to channels" from this state avoids confusion. There is nothing to publish to until channels are configured.

---

### State A1 — Idle (Unpublished)

**Screen:** `screens2/ep1/a1-idle.html`

**Purpose:** Vehicle has channels configured; none are published.

**Key elements:**
- 5 channel rows, all with gray unpublished dots
- Completeness bars per channel (same values as v1: Auto24 96%, Mobile.de 100%, SS.lv 74%, Autoplius 88%, City24 91%)
- CTAs: `[ + Add channels ]` + `[ Publish to channels ]` → A2

---

### State A2 — Channel Select

**Screen:** `screens2/ep1/a2-channel-select.html`

**Purpose:** User selects which channels to publish to. Also serves as entry point for the "Add channels" flow: when triggered from "Add channels" button, all 7 channels are shown (including channels not yet configured).

**Key elements:**
- `ch-select-box` overlay (480px, positioned over the modal)
- "Select all" / "Deselect all" quick links
- 7 channels total in the add-channels dialog (vs. 5 in the publish-select)
- Completeness percentage per channel
- Dynamic CTA: "Publish N channels →" / "Add channels" button

**A2 entry paths:**
- From A1 "Publish to channels" → publish-select dialog
- From any state "Add channels" → add-channels dialog (full 7 channel list)

---

### State A3 — Validation Warnings

**Screen:** `screens2/ep1/a3-validation.html`

No structural changes from v1. Shows pre-flight validation results. SS.lv accepts partial (74%). Autoplius requires 100% — shows missing fields inline with "Go to Vehicle Builder →" button.

---

### State A4 — Publishing in Progress

**Screen:** `screens2/ep1/a4-progress.html`

No structural changes from v1. Auto-advances to A5 on completion.

---

### State A5 — Success

**Screen:** `screens2/ep1/a5-success.html`

**New in v2:** `[ + Add channels ]` button appears alongside `[ Unpublish from channels… ]`. Allows adding more channels after a successful publish without re-entering the full flow.

---

### State B1 — Mixed State

**Screen:** `screens2/ep1/b1-mixed-state.html`

**New in v2:** Both `[ + Add channels ]` and `[ Unpublish from channels… ]` appear in footer alongside `[ Publish remaining → ]`.

---

### State B2 — Error Detail

**Screen:** `screens2/ep1/b2-error-detail.html`

**New in v2:** `[ + Add channels ]` button added. Otherwise same as v1.

---

### State B3 — Builder Highlight

**Screen:** `screens2/ep1/b3-builder-highlight.html`

Navigation buttons: `[ ← Back ]` → B1, `[ Go to Vehicle Builder → ]` → opens `ep2-vehicle-builder-v2.html`.

---

### State B4 — Ready Retry

**Screen:** `screens2/ep1/b4-ready-retry.html`

**New in v2:** `[ + Add channels ]` button added alongside retry actions.

---

### State C1 — All Published

**Screen:** `screens2/ep1/c1-all-published.html`

**New in v2:** `[ + Add channels ]` button appears alongside `[ Unpublish from channels… ]`.

---

### State C2 — Select Unpublish

**Screen:** `screens2/ep1/c2-select-unpublish.html`

No structural changes from v1.

---

### State C3 — Confirm Unpublish

**Screen:** `screens2/ep1/c3-confirm-unpublish.html`

No structural changes from v1. Irreversible-action confirmation step.

---

### State C4 — Partial Result

**Screen:** `screens2/ep1/c4-partial-result.html`

**New in v2:** `[ + Add channels ]` button added. Footer shows: `[ + Add channels ]` + `[ Unpublish from channels… ]` + `[ Publish to channels → ]`.

---

## 4. EP2 v2 — Vehicle Builder · Inline Publishing Panel

**File:** `prototype/ep2-vehicle-builder-v2.html`
**Screens:** `screens2/ep2/`

### Layout

Three-zone layout:
1. **Two-row nav** (88px total, same as EP3/EP1)
2. **Warning banner** (conditionally visible, 36px) — amber gradient, hidden by default
3. **Builder layout** (flex row): form column (flex:1) + panel column (280px)
4. **Builder footer** (44px) — "← Cancel" + autosave label + "Save changes"

### Builder Form Column

- Tab bar: `linear-gradient(180deg,#ddeef7,#c8dce8)`, 8 tabs (← Inventory back-link + 7 content tabs)
- Tab active style: white background + 2px bottom border `#5aaed0`
- Form body: sections with gradient section headers (`linear-gradient(180deg,#eef6fb,#e0edf5)`)

### Builder Panel Column

Width: `var(--panel-sidebar-width)` (280px). Contains:
1. "Publishing" section header
2. `#pub-panel-container` — dynamic panel content (rendered by `renderPanel()`)
3. "Channel status" summary — Published(31) / Pending(12) / Errors(7) / Not published(24)
4. Footer links: "← Vehicle Card" + "Inventory"

### State Machine (inline JS)

State is stored in `let ep2State = 'a1'`. `refreshPubPanel()` calls `renderPanel(ep2State)`.

### URL Hash Navigation

```
ep2-vehicle-builder-v2.html#a1e → Builder Idle (no channels)
ep2-vehicle-builder-v2.html#a1  → Builder Idle
ep2-vehicle-builder-v2.html#a2  → Validation Highlights
ep2-vehicle-builder-v2.html#a3 → Real-time Update
ep2-vehicle-builder-v2.html#a4 → Channel Unlocked
ep2-vehicle-builder-v2.html#a5 → Field in Other Tab
ep2-vehicle-builder-v2.html#a6 → Publishing from Builder
```

---

### State EP2-A1∅ — Builder Idle (Empty / No channels)

**Screen:** `screens2/ep2/a1-builder-idle.html` (empty-state variant)

**Purpose:** Vehicle has no publishing channels configured. Mirrors EP1's A1∅ logic.

- Details tab active
- Panel: empty state message "No channels added yet. Add channels to start publishing."
- Only CTA: `[ + Add channels ]` → opens channel select sub-dialog (same 480px `ch-select-box` flow as EP1)
- No "Publish to channels" button — nothing to publish to yet
- Hash: `#a1e`

---

### State EP2-A1 — Builder Idle

**Screen:** `screens2/ep2/a1-builder-idle.html`

- Details tab active
- Panel: `[ + Add channels ]` button + 5 channel rows with completeness bars + `[ Publish to channels ]`
- No banner visible
- Hash: `#a1`

---

### State EP2-A2 — Validation Highlights

**Screen:** `screens2/ep2/a2-validation-highlights.html`

- Warning banner visible: "Complete these fields to publish on Mobile.de"
- Mileage field + Fuel type field: `highlight-field` class (red border, `#fff8f8` bg, field hint text)
- Panel: "Add channels" + channel rows + warning summary
- Autoplius row shows "→ Tab: Details" jump button (cross-tab navigation aid)
- `oninput` on mileage field → debounced `onMileageChange()` → auto-transition A2→A3 after 800ms

---

### State EP2-A3 — Real-time Update

**Screen:** `screens2/ep2/a3-realtime-update.html`

- Mileage field: resolved (`fieldResolved` green flash animation)
- Fuel type: still highlighted
- Panel: "Add channels" + "1 issue remaining" header + green notification "✓ Mileage saved · Mobile.de: 88% → 94%"
- `onchange` on fuel type select → `onFuelChange()` → A3→A4

---

### State EP2-A4 — Channel Unlocked

**Screen:** `screens2/ep2/a4-channel-unlocked.html`

- No field highlights remaining
- Panel: "Add channels" + "✓ All selected channels ready" (green header) + "Publish 3 channels →"
- Banner hidden

---

### State EP2-A5 — Field in Other Tab

**Screen:** `screens2/ep2/a5-field-in-other-tab.html`

- Details tab active in builder
- Interior color + Doors count fields highlighted
- Panel: "Add channels" + "← you are here (Details)" indicator + channel readiness per portal
- Autoplius still showing warning; Auto24/Mobile.de/SS.lv show "✓ Ready"

---

### State EP2-A6 — Publishing from Builder

**Screen:** `screens2/ep2/a6-publishing-from-builder.html`

- Publishing in progress; Save button disabled; footer shows "Publishing…"
- Panel: progress state with channels updating in sequence (600ms interval)
- **No "Add channels" button in A6** — channels are locked during active publishing operation
- Auto-advances to success state

---

## 5. EP3 v2 — Inventory Pipeline · Batch Publishing

**File:** `prototype/ep3-inventory-pipeline-v2.html`
**Screens:** `screens2/ep3/`

### Layout

```
┌─────────────────────────────────────────────────────┐
│  Two-row nav (88px)                                  │
├───────────────────────────────────────┬─────────────┤
│  Sub-tabs bar (32px)                  │             │
├───────────────────────────────────────┤  Right      │
│  Filter row (28px)                    │  Sidebar    │
├───────────────────────────────────────┤  (230px)    │
│  Inventory table (flex:1, scrollable) │             │
├───────────────────────────────────────┤             │
│  Pagination row (34px)                │             │
└───────────────────────────────────────┴─────────────┘
```

### Inventory Table Columns

☐ | Vehicle | Year | Reg. no. | Price | Mileage | Channels | Status | Actions

**Actions column** contains an **`[ Edit ]`** button per row → `window.open('ep2-vehicle-builder-v2.html', '_blank')`. This is the primary entry point to EP2.

### State Machine

Batch wizard states (B2–B7) are controlled by `shared/batch-flow.js` (unchanged from v1). S1 and S2 are static display states.

### URL Hash Navigation

```
ep3-inventory-pipeline-v2.html#s1 → Default State (no hover)
ep3-inventory-pipeline-v2.html#s2 → Single Vehicle Modal
ep3-inventory-pipeline-v2.html#b1 → Batch Action Bar
ep3-inventory-pipeline-v2.html#b2 → Batch Channel Selector
ep3-inventory-pipeline-v2.html#b3 → Validation Summary
ep3-inventory-pipeline-v2.html#b3a→ Fix Issues (Builder)
ep3-inventory-pipeline-v2.html#b4 → Batch Progress
ep3-inventory-pipeline-v2.html#b5 → Batch Success
ep3-inventory-pipeline-v2.html#b6 → Batch Partial Errors
ep3-inventory-pipeline-v2.html#b7 → Batch All Failed
```

---

### State S1 — Default State

**Screen:** `screens2/ep3/s1-default-state.html`

**Changed from v1:** Renamed from "Hover State" to "Default State". The table is shown in its neutral resting state — no row hover effects. The second-row hover interaction has been removed from the design.

**Purpose:** Shows the inventory table as staff would see it on arrival: sub-tabs, filter row, vehicle list with channel dots and status badges, right sidebar, pagination.

---

### State S2 — Single Vehicle Modal

**Screen:** `screens2/ep3/s2-single-vehicle-modal.html`

EP1-A2 channel select dialog opens over the dimmed inventory table. Demonstrates the quick-publish flow for a single vehicle without opening the full Vehicle Card modal.

---

### State B1 — Batch Action Bar

**Screen:** `screens2/ep3/b1-batch-action-bar.html`

4 rows selected. Batch action bar slides up from bottom (250ms ease-out). Shows: "4 vehicles selected [Deselect all] [Publish selected →]".

UX U3 (batch limit warning) unchanged: if 10+ vehicles selected across pages → amber pill "⚠ 23 selected across 3 pages".

---

### State B2 — Batch Channel Selector (Step 1 of 3)

**Screen:** `screens2/ep3/b2-batch-channel-selector.html`

Wizard modal. Step 1 of 3. Channel list with 3 pre-selected (Auto24, Mobile.de, SS.lv). Dynamic "Next: Validate (N channels) →" button.

---

### State B3 — Validation Summary (Step 2 of 3)

**Screen:** `screens2/ep3/b3-validation-summary.html`

Validation matrix (4 vehicles × 3 channels). Toyota RAV4 and Audi A4 flagged for Mobile.de.

Actions: `[ ← Back ]` → B2 · `[ Fix issues first ]` → B3a · `[ Proceed anyway → ]` → B4

---

### State B3a — Fix Issues Builder

**Screen:** `screens2/ep3/b3a-fix-issues-builder.html`

Inline fix wizard for vehicles with missing fields. "Vehicle 1 of 2 with issues · Mobile.de · Missing 2 fields". Fields highlighted in form. `[ Skip ]` → B3 · `[ Save & Next → ]` → B4.

---

### State B4 — Batch Progress (Step 3 of 3)

**Screen:** `screens2/ep3/b4-batch-progress.html`

Overall progress bar. Live matrix: ✓ done · ⟳ in-progress · · waiting · — skipped. Close button disabled. 600ms interval animation.

---

### State B5 — Batch Success

**Screen:** `screens2/ep3/b5-batch-success.html`

Green header. "10 of 10 operations successful". Matrix all ✓ (Mobile.de skips shown as —). Footer note on 2 skipped combinations. `[ Done ]` closes wizard.

---

### State B6 — Batch Partial Errors

**Screen:** `screens2/ep3/b6-batch-partial-errors.html`

Amber header. "8 of 10 successful · 2 failed". ✕ on BMW 320d → Mobile.de (timeout) and Audi A4 → SS.lv (503). `[ Retry failed → ]`.

---

### State B7 — Batch All Failed

**Screen:** `screens2/ep3/b7-batch-all-failed.html`

Red header. All cells ✕. Network error message. `[ Retry all ]` (red variant).

---

## 6. Shared Components (v2)

### 6.1 Two-Row Nav (`topnav-v2`)

```
.topnav-v2
  .topnav-row1          40px — logo + help + right controls
  .topnav-links         48px — 11 nav links, rgba(0,0,0,0.12) bg
```

All three episodes use the same nav HTML. EP1 applies `filter:brightness(0.82)` to the nav (dimmed behind modal). EP2 adds `.topnav-breadcrumb` between logo and help text.

### 6.2 Sub-tabs Bar (`subnav-bar`)

```
.subnav-bar             32px, white bg, border-bottom
  .subnav-tabs          flex row of tabs
    .subnav-tab-v2      individual tab — 2px bottom border on active (#5aaed0)
    .subnav-badge       count pill (background #dde8f0)
  .subnav-btn-group     optional right-aligned button group
```

### 6.3 Channel Select Sub-dialog (`ch-select-box`)

New in v2. A 480px dialog that overlays the main modal (z-index:200) for selecting/adding channels:

```
.ch-select-dialog       full overlay (rgba(10,20,30,0.6))
  .ch-select-box        480px dialog
    .ch-select-box__head  title + close button
    .ch-select-box__body  scrollable channel list
      .ch-select-row    channel entry with checkbox
    .ch-select-box__footer  confirm / cancel buttons
```

### 6.4 Publishing Status Pill (unchanged from v1)

`#pub-status-pill` in `.topnav-right`. States: Publishing (gray) · ⟳ Publishing… (amber) · ✓ Published (green) · ✕ N errors (red).

---

## 7. UX Improvements (v2 additions)

### U5 — Channel Management from Any State

The "Add channels" button is available in any non-transitional publishing state. This allows staff to expand the channel roster at any time — e.g., adding a newly contracted portal without restarting the publish flow.

**Rationale:** In v1, channel selection only happened at the start of the publish flow (A2). Staff discovered new portals mid-workflow had no path to add them without abandoning progress.

### U6 — Onboarding Empty State (A1∅)

A dedicated empty state before any channels are configured makes the "first use" flow explicit. The single "Add channels" CTA eliminates the ambiguity of having "Publish to channels" available on a vehicle with no configured portals.

**Rationale:** In v1, the A1 state always showed a 5-channel list hardcoded into the prototype. The v2 empty state reflects the realistic first-use scenario for a newly created vehicle listing.

### U7 — "← Inventory" Back Navigation in Builder

The leftmost builder tab is a back-navigation link to the inventory. This is persistent and visible in all builder states, giving staff a clear exit path without using browser back.

**Rationale:** Users arriving from EP3's Edit button need a clear return path. Browser back is unreliable when the builder is opened in a new tab.

---

## 8. State Transition Diagrams

### EP1 v2 Flow

```
A1∅ (Empty — no channels)
  └─[Add channels]──→ ch-select-box ──[confirm]──→ A1

A1 (Idle)
  ├─[Add channels]──→ ch-select-box ──[confirm]──→ A1 (updated)
  └─[Publish to channels]──→ A2 (Channel Select)
                               └─[Publish N →]──→ A3 (Validation)
                                                   ├─[Publish anyway]──→ A4 (Progress) ──→ A5
                                                   └─[Back]──→ A2
                                                   └─[Go to Builder]──→ B3

A5 (Success)
  ├─[Add channels]──→ ch-select-box
  └─[Unpublish from channels]──→ C2
                                  └─[Unpublish N →]──→ C3 ──→ C4
                                                              └─[Publish to channels →]──→ A2

B1 (Mixed State)
  ├─[Add channels]──→ ch-select-box
  ├─[Fix errors]──→ B2 ──→ B3 ──→ [ep2-vehicle-builder-v2.html] ──→ B4 ──→ A4
  └─[Publish remaining]──→ A4

C1 (All Published)
  ├─[Add channels]──→ ch-select-box
  └─[Unpublish from channels]──→ C2
```

### EP3 v2 Batch Flow

```
EP3 Inventory Table
  ├─[Edit, Actions column]──────────────────────────→  EP2 Builder (new tab)
  ├─[click vehicle row / Publish button]────────────→  S2 (Single Vehicle Modal)
  └─[select rows → batch bar]──[Publish selected]──→  B2 (Channel Selector)
                                                         └─[Next: Validate]──→ B3 (Validation)
                                                                                ├─[Proceed anyway]──→ B4 ──┬──→ B5 (Success)
                                                                                ├─[Fix issues]──→ B3a──→ B4 ┼──→ B6 (Partial Error)
                                                                                └─[Back]──→ B2              └──→ B7 (All Failed)
```

---

## 9. Screens Reference

All 29 pixel-accurate screens are in `screens2/`. Generated by `figma_to_screens2.py` from Figma page "Page 1.2 – 27.03.2026".

### EP1 (13 screens)

| Hash | File | Figma Node |
|------|------|------------|
| #a1e | `screens2/ep1/a1-idle.html` (empty variant) | 33:34262 |
| #a1 | `screens2/ep1/a1-idle.html` | 33:34262 |
| #a2 | `screens2/ep1/a2-channel-select.html` | 33:35624 |
| #a3 | `screens2/ep1/a3-validation.html` | 33:43998 |
| #a4 | `screens2/ep1/a4-progress.html` | 33:44588 |
| #a5 | `screens2/ep1/a5-success.html` | 33:32482 |
| #b1 | `screens2/ep1/b1-mixed-state.html` | 33:33051 |
| #b2 | `screens2/ep1/b2-error-detail.html` | 33:33658 |
| #b3 | `screens2/ep1/b3-builder-highlight.html` | 33:34863 |
| #b4 | `screens2/ep1/b4-ready-retry.html` | 33:31249 |
| #c1 | `screens2/ep1/c1-all-published.html` | 33:31854 |
| #c2 | `screens2/ep1/c2-select-unpublish.html` | 33:36284 |
| #c3 | `screens2/ep1/c3-confirm-unpublish.html` | 33:36969 |
| #c4 | `screens2/ep1/c4-partial-result.html` | 33:30166 |

### EP2 (6 screens)

| Hash | File | Figma Node |
|------|------|------------|
| #a1 | `screens2/ep2/a1-builder-idle.html` | 33:39446 |
| #a2 | `screens2/ep2/a2-validation-highlights.html` | 33:37988 |
| #a3 | `screens2/ep2/a3-realtime-update.html` | 33:39081 |
| #a4 | `screens2/ep2/a4-channel-unlocked.html` | 33:37627 |
| #a5 | `screens2/ep2/a5-field-in-other-tab.html` | 33:38717 |
| #a6 | `screens2/ep2/a6-publishing-from-builder.html` | 33:38352 |

### EP3 (10 screens)

| Hash | File | Figma Node |
|------|------|------------|
| #s1 | `screens2/ep3/s1-default-state.html` | 33:29724 |
| #s2 | `screens2/ep3/s2-single-vehicle-modal.html` | 33:30744 |
| #b1 | `screens2/ep3/b1-batch-action-bar.html` | 33:39807 |
| #b2 | `screens2/ep3/b2-batch-channel-selector.html` | 33:40257 |
| #b3 | `screens2/ep3/b3-validation-summary.html` | 33:41356 |
| #b3a | `screens2/ep3/b3a-fix-issues-builder.html` | 33:40770 |
| #b4 | `screens2/ep3/b4-batch-progress.html` | 33:43469 |
| #b5 | `screens2/ep3/b5-batch-success.html` | 33:42413 |
| #b6 | `screens2/ep3/b6-batch-partial-errors.html` | 33:42941 |
| #b7 | `screens2/ep3/b7-batch-all-failed.html` | 33:41885 |

---

## 10. Design System Changes (v2)

### Color additions

| Token | Value | New in v2 |
|-------|-------|-----------|
| `--nav-row2-bg` | `rgba(0,0,0,0.12)` | Nav links row background |
| Active tab border | `#5aaed0` | Sub-tab and dialog-tab active indicator |
| Dialog tab active text | `#5bbde0` | pub-dialog-v2 active tab |
| Builder tab bar | `linear-gradient(180deg,#ddeef7,#c8dce8)` | Builder tab bar background |

### Typography changes

| Element | v1 | v2 |
|---------|----|----|
| Nav links font-size | 12px | 11.5px |
| Tab badges | not present | 9.5–10px, `#dde8f0` bg |
| Breadcrumb | not present | 10px, `rgba(255,255,255,0.5)` |

---

## 11. File Structure

```
Modera/
├── prototype/
│   ├── ep1-vehicle-card.html              # v1 (untouched)
│   ├── ep1-vehicle-card-v2.html           # v2 — new modal, inline state machine
│   ├── ep2-vehicle-builder.html           # v1 (untouched)
│   ├── ep2-vehicle-builder-v2.html        # v2 — new tabs, breadcrumb, inline panel
│   ├── ep3-inventory-pipeline.html        # v1 (untouched)
│   ├── ep3-inventory-pipeline-v2.html     # v2 — sub-tabs, new sidebar, Edit→EP2
│   └── shared/
│       ├── tokens.css                     # Design tokens (shared v1+v2)
│       ├── components.css                 # Component styles (shared v1+v2)
│       ├── animations.css                 # Keyframe animations
│       ├── icons.js                       # Inline SVG icon library
│       ├── publishing-panel.js            # EP1/EP2 v1 state machine
│       └── batch-flow.js                  # EP3 batch wizard (used by v2 as-is)
├── screens/                               # v1 static screens (untouched)
│   ├── ep1/  (13 files)
│   ├── ep2/  (6 files)
│   └── ep3/  (10 files)
├── screens2/                              # v2 pixel-accurate screens (from Figma)
│   ├── ep1/  (13 files)
│   ├── ep2/  (6 files)
│   └── ep3/  (10 files)
├── docs/
│   ├── annotations.md                     # v1 annotations
│   └── annotations-2.md                   # This document (v2)
├── figma_to_screens2.py                   # Figma → screens2/ generation script
└── server.py                              # Local preview server (port 8080)
```

---

*Prototype v2 created from Figma page "Page 1.2 – 27.03.2026" for Modera Salesfront — Vehicle Publishing Tool design review.*
