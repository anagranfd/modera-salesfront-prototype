# Modera Salesfront — Vehicle Publishing Tool
## HiFi Prototype Annotations (Page 1.2 — 27.03.2026)

---

## 1. Overview

This document annotates the HiFi prototype of the Vehicle Publishing Tool feature for Modera Salesfront. It reflects the design from Figma page **"Page 1.2 – 27.03.2026"** (file `iaEhGu1Guoo4vbQW63BDmz`, root node `33:29723`).

**Live prototype:** https://anagranfd.github.io/modera-salesfront-prototype/v3/

The prototype is a React + Vite + Tailwind CSS application covering all three integration points:

| Episode | Entry point | Description |
|---------|-------------|-------------|
| EP1 | Vehicle Card modal | Publishing panel inside the per-vehicle modal dialog |
| EP2 | Vehicle Builder sidebar | Inline publishing panel in the full-page builder |
| EP3 | Inventory Pipeline | Batch publishing wizard from the inventory table |

### Navigation Flow

```
EP3 Inventory  ──[Edit button, Actions column]──→  EP2 Builder
EP3 Inventory  ──[click vehicle row]─────────────→  EP1 Vehicle Card modal
EP2 Builder    ──[← Inventory tab]───────────────→  EP3 Inventory
EP1 modal      ──[B3 · Go to Vehicle Builder]────→  EP2 Builder
```

> **Important:** The Builder (EP2) is entered from EP3 via the **Edit** button in the Actions column. It is not launched from the EP1 modal.

---

## 2. Layout & Navigation

### Two-Row Top Nav (all episodes)

The top navigation uses a two-row layout (88px total):

| Row | Height | Content |
|-----|--------|---------|
| Row 1 (logo bar) | 40px | `modera` wordmark · help text · right controls (pill, notifications, user, exit) |
| Row 2 (nav links) | 48px | 11 navigation links · `rgba(0,0,0,0.12)` background |

**Nav links:** Dashboard · Pipe · Cars · **Used Cars** (active) · Customers · Tools · Trade-In · Test Drive · Sales · Chat · Queue

Active nav link: page background color, text `#1e6080`.

**EP2 only:** A breadcrumb `/ salesfront` appears in Row 1 between the logo and help text (10px, `rgba(255,255,255,0.5)`).

**EP1 treatment:** The nav behind the modal overlay is dimmed (`brightness 0.82`) and non-interactive.

### EP3 Inventory Sub-tabs

A sub-tabs bar (32px) sits below the main nav:

| Sub-tab | Badge |
|---------|-------|
| Inventory | 74 — Active |
| Dealer Stock | 23 |
| Unsettled | 5 |
| Configurator | 112 |
| Offline | 8 |

Active tab: 2px bottom border `#5aaed0`.

---

## 3. EP1 — Vehicle Card · Publishing Tab

### Modal Structure

The modal (`.pub-dialog-v2`, 860px wide) overlays the inventory table with a dimmed backdrop.

| Element | Value |
|---------|-------|
| Width | 860px |
| Header | White · vehicle name + stock number subtitle |
| Tab bar | Dark navy gradient `linear-gradient(180deg,#1e3a52,#1a3347)` |
| Active tab | 2px bottom border `#5bbde0` + blue text |
| Body | Two-column: 200px left (vehicle image + spec table) · flex right (publishing panel) |

**Tabs:** Extras(3) · Trade-In(1) · Financing(1) · Notes(2) · Agreement · **Publishing**

### Publishing Panel States

#### A1∅ — Idle (No channels configured)

**Purpose:** Vehicle has no publishing channels configured. User must add channels before publishing is available.

- Header: "Publishing channels" + vehicle subtitle
- Body: empty state message "No channels added yet"
- Single CTA: `[ + Add channels ]` → opens channel select sub-dialog

**Design decision:** Hiding "Publish to channels" avoids confusion when there is nothing to publish to. The single CTA creates a clear onboarding path.

---

#### A1 — Idle (Unpublished)

**Purpose:** Channels configured; none are published yet.

- 5 channel rows, all gray (unpublished)
- Completeness bars: Auto24 96% · Mobile.de 100% · SS.lv 74% · Autoplius 88% · City24 91%
- CTAs: `[ + Add channels ]` + `[ Publish to channels → ]`

---

#### A2 — Channel Select

**Purpose:** User selects which channels to publish to. Also handles "Add channels" flow (full 7-channel list including unconfigured channels).

- 480px overlay dialog (`ch-select-box`) over the modal
- "Select all" / "Deselect all" quick links
- Completeness percentage per channel
- Dynamic CTA: "Publish N channels →" or "Add channels"

**Entry paths:**
- From A1 "Publish to channels" → publish-select (5 channels)
- From any state "Add channels" → add-channels dialog (all 7 channels)

---

#### A3 — Validation Warnings

Pre-flight validation results. SS.lv accepts partial (74%). Autoplius requires 100% — shows missing fields inline with `[ Go to Vehicle Builder → ]` button.

---

#### A4 — Publishing in Progress

Sequential channel processing. Auto-advances to A5 on completion.

---

#### A5 — Success

All selected channels published (green status dots).

CTAs: `[ + Add channels ]` · `[ Unpublish from channels… ]`

---

#### B1 — Mixed State

Some channels published, some not (or errors).

CTAs: `[ + Add channels ]` · `[ Unpublish from channels… ]` · `[ Publish remaining → ]`

---

#### B2 — Error Detail

One or more channels failed. Per-channel error message shown.

CTAs: `[ + Add channels ]` · `[ Publish remaining → ]`

---

#### B3 — Builder Highlight

Redirect state: missing fields require editing in the builder.

CTAs: `[ ← Back ]` → B1 · `[ Go to Vehicle Builder → ]` → EP2

---

#### B4 — Ready Retry

Errors resolved; ready to retry failed channels.

CTAs: `[ + Add channels ]` · `[ Unpublish from channels… ]` · `[ Retry all ]`

---

#### C1 — All Published

All channels published.

CTAs: `[ + Add channels ]` · `[ Unpublish from channels… ]`

---

#### C2 — Select Unpublish

User selects which channels to unpublish. Checkboxes per channel.

---

#### C3 — Confirm Unpublish

Irreversible-action confirmation step before unpublishing.

---

#### C4 — Partial Result

Some channels unpublished, some remain published.

CTAs: `[ + Add channels ]` · `[ Unpublish from channels… ]` · `[ Publish to channels → ]`

---

### "Add channels" availability

The `[ + Add channels ]` button is present in every non-transitional state:

| State | Also present |
|-------|-------------|
| A1∅ | — (only button) |
| A1 | Publish to channels |
| A5 | Unpublish from channels… |
| B1 | Unpublish…, Publish remaining |
| B2 | Publish remaining |
| B4 | Unpublish…, Retry all |
| C1 | Unpublish from channels… |
| C4 | Unpublish…, Publish to channels → |

**Absent in:** A2, A3, A4 (in-progress flows), C2, C3 (unpublish flows), B3 (builder-redirect state).

---

## 4. EP2 — Vehicle Builder · Inline Publishing Panel

### Layout

Three-zone layout:
1. **Two-row nav** (88px)
2. **Warning banner** (36px, amber gradient — conditionally visible)
3. **Builder area** (flex row): form column (flex:1) · panel column (280px)
4. **Builder footer** (44px): "← Cancel" · autosave label · "Save changes"

### Builder Tabs

Tab bar uses a light blue gradient. `← Inventory` is a persistent back-link (leftmost):

| Tab | Badge |
|-----|-------|
| ← Inventory | (back link to EP3) |
| Details | 74 |
| Extras | 23 |
| Pricing | 5 |
| Trade-In | 5 |
| Financing | 8 |
| Notes | 112 |
| Agreement | 112 |

**Design decision:** The `← Inventory` back-link gives staff a persistent exit path. Browser back is unreliable when the builder is opened from the Actions column Edit button.

### Publishing Panel States

Panel sits in a fixed 280px right column. States mirror EP1 with builder-specific additions.

#### EP2-A1∅ — Builder Idle (No channels)

- Details tab active
- Panel: "No channels added yet. Add channels to start publishing."
- Single CTA: `[ + Add channels ]`

---

#### EP2-A1 — Builder Idle

- Details tab active
- Panel: `[ + Add channels ]` · 5 channel rows with completeness bars · `[ Publish to channels ]`
- No warning banner

---

#### EP2-A2 — Validation Highlights

- Warning banner: "Complete these fields to publish on Mobile.de"
- Mileage + Fuel type fields highlighted (red border, light background, hint text)
- Autoplius row shows `→ Tab: Details` cross-tab jump button
- Typing in the mileage field auto-transitions to A3 after 800ms

---

#### EP2-A3 — Real-time Update

- Mileage field resolved (green flash animation)
- Fuel type still highlighted
- Panel notification: "✓ Mileage saved · Mobile.de: 88% → 94%"
- Changing the fuel type select auto-transitions to A4

---

#### EP2-A4 — Channel Unlocked

- No field highlights remaining
- Panel: "✓ All selected channels ready" (green header) · `[ Publish 3 channels → ]`
- Banner hidden

---

#### EP2-A5 — Field in Other Tab

- Details tab active
- Interior color + Doors count fields highlighted
- Panel: per-portal readiness · "← you are here (Details)" indicator
- Autoplius shows warning; Auto24 / Mobile.de / SS.lv show "✓ Ready"

---

#### EP2-A6 — Publishing from Builder

- Save button disabled; footer shows "Publishing…"
- Panel: sequential channel progress (600ms interval)
- **No "Add channels" button** — channels locked during active publishing

---

## 5. EP3 — Inventory Pipeline · Batch Publishing

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

### Inventory Table

Columns: ☐ | Vehicle | Year | Reg. no. | Price | Mileage | Channels | Status | Actions

**Actions column:** `[ Edit ]` button per row → opens EP2 Builder. This is the primary entry point to EP2.

### Right Sidebar

1. Advanced filter button row
2. Search input
3. "Filter by model" header
4. Model list (thumbnail · label · count badge; Volkswagen active by default)
5. Channel status summary: Published 31 (green) · Pending 12 (amber) · Errors 7 (red) · Not published 24 (gray)

### States

#### S1 — Default State

Inventory table in its neutral resting state: sub-tabs, filter row, vehicle list with channel dots and status badges, right sidebar, pagination. No hover effects.

---

#### S2 — Single Vehicle Modal

Channel select dialog (480px) opens over the dimmed inventory table. Quick-publish flow for a single vehicle without opening the full Vehicle Card modal.

---

#### B1 — Batch Action Bar

4 rows selected. Batch action bar slides up from bottom (250ms ease-out).

Content: "4 vehicles selected · [Deselect all] · [Publish selected →]"

If 10+ vehicles selected across pages: amber pill "⚠ 23 selected across 3 pages".

---

#### B2 — Batch Channel Selector (Step 1 of 3)

Wizard modal. 3 channels pre-selected (Auto24, Mobile.de, SS.lv). Dynamic CTA: "Next: Validate (N channels) →".

---

#### B3 — Validation Summary (Step 2 of 3)

Validation matrix: 4 vehicles × 3 channels. Toyota RAV4 and Audi A4 flagged for Mobile.de.

CTAs: `[ ← Back ]` → B2 · `[ Fix issues first ]` → B3a · `[ Proceed anyway → ]` → B4

---

#### B3a — Fix Issues Builder

Inline fix wizard. "Vehicle 1 of 2 with issues · Mobile.de · Missing 2 fields". Fields highlighted in the builder form.

CTAs: `[ Skip ]` → B3 · `[ Save & Next → ]` → B4

---

#### B4 — Batch Progress (Step 3 of 3)

Overall progress bar. Live matrix: ✓ done · ⟳ in-progress · · waiting · — skipped. Close button disabled. 600ms interval animation.

---

#### B5 — Batch Success

Green header. "10 of 10 operations successful". All matrix cells ✓ (Mobile.de skips shown as —). Note on 2 skipped combinations. `[ Done ]` closes wizard.

---

#### B6 — Batch Partial Errors

Amber header. "8 of 10 successful · 2 failed". BMW 320d → Mobile.de (timeout), Audi A4 → SS.lv (503). `[ Retry failed → ]`.

---

#### B7 — Batch All Failed

Red header. All cells ✗. Network error message. `[ Retry all ]` (red variant).

---

## 6. UX Decisions

### U5 — Channel Management from Any State

`[ + Add channels ]` is available in every non-transitional state. Staff can expand the channel roster at any time — e.g. adding a newly contracted portal mid-workflow without abandoning progress.

### U6 — Empty State Before First Channel (A1∅)

A dedicated empty state before any channels are configured makes the first-use flow explicit. The single "Add channels" CTA eliminates the ambiguity of showing "Publish to channels" on a vehicle with no configured portals.

### U7 — "← Inventory" Back Navigation in Builder

The leftmost builder tab is a persistent back-link to the inventory, visible in all builder states. Gives staff a clear exit path without relying on browser back.

### Vehicle Card as Modal Overlay

The Vehicle Card is implemented as a modal dialog over the inventory table, keeping inventory context visible. Avoids a full navigation step for a quick-check action.

### Publishing Sidebar in Builder

The sidebar is collapsed by default and opened explicitly via "Publish to channels." Closes via ✕ without leaving the builder, preserving form state.

### Completeness Bars are Informational

Channels with low completeness (orange bar) can still be published. The warning informs but doesn't block. Strict validation gates are applied by the channel's own API at publish time.

---

## 7. State Transition Diagrams

### EP1 Flow

```
A1∅ (Empty — no channels)
  └─[Add channels]──→ channel select dialog ──[confirm]──→ A1

A1 (Idle)
  ├─[Add channels]──→ channel select dialog ──[confirm]──→ A1 (updated)
  └─[Publish to channels]──→ A2 (Channel Select)
                               └─[Publish N →]──→ A3 (Validation)
                                                   ├─[Publish anyway]──→ A4 (Progress) ──→ A5
                                                   ├─[Back]──→ A2
                                                   └─[Go to Builder]──→ B3

A5 (Success)
  ├─[Add channels]──→ channel select dialog
  └─[Unpublish from channels]──→ C2
                                  └─[Unpublish N →]──→ C3 ──→ C4
                                                              └─[Publish to channels →]──→ A2

B1 (Mixed State)
  ├─[Add channels]──→ channel select dialog
  ├─[Fix errors]──→ B2 ──→ B3 ──→ EP2 Builder ──→ B4 ──→ A4
  └─[Publish remaining]──→ A4

C1 (All Published)
  ├─[Add channels]──→ channel select dialog
  └─[Unpublish from channels]──→ C2
```

### EP3 Batch Flow

```
EP3 Inventory Table
  ├─[Edit, Actions column]──────────────────────────→  EP2 Builder
  ├─[click vehicle row / Publish button]────────────→  S2 (Single Vehicle Modal)
  └─[select rows → batch bar]──[Publish selected]──→  B2 (Channel Selector)
                                                         └─[Next: Validate]──→ B3 (Validation)
                                                                                ├─[Proceed anyway]──→ B4 ──┬──→ B5 (Success)
                                                                                ├─[Fix issues]──→ B3a──→ B4 ┼──→ B6 (Partial Errors)
                                                                                └─[Back]──→ B2              └──→ B7 (All Failed)
```

---

## 8. Screens Reference (Figma)

All 29 screens from Figma page "Page 1.2 – 27.03.2026" (file `iaEhGu1Guoo4vbQW63BDmz`).

### EP1 (13 screens)

| State | Figma Node |
|-------|------------|
| A1∅ Idle Empty | 33:34262 |
| A1 Idle | 33:34262 |
| A2 Channel Select | 33:35624 |
| A3 Validation | 33:43998 |
| A4 Progress | 33:44588 |
| A5 Success | 33:32482 |
| B1 Mixed State | 33:33051 |
| B2 Error Detail | 33:33658 |
| B3 Builder Highlight | 33:34863 |
| B4 Ready Retry | 33:31249 |
| C1 All Published | 33:31854 |
| C2 Select Unpublish | 33:36284 |
| C3 Confirm Unpublish | 33:36969 |
| C4 Partial Result | 33:30166 |

### EP2 (6 screens)

| State | Figma Node |
|-------|------------|
| A1∅ Builder Idle Empty | — |
| A1 Builder Idle | 33:39446 |
| A2 Validation Highlights | 33:37988 |
| A3 Real-time Update | 33:39081 |
| A4 Channel Unlocked | 33:37627 |
| A5 Field in Other Tab | 33:38717 |
| A6 Publishing from Builder | 33:38352 |

### EP3 (10 screens)

| State | Figma Node |
|-------|------------|
| S1 Default State | 33:29724 |
| S2 Single Vehicle Modal | 33:30744 |
| B1 Batch Action Bar | 33:39807 |
| B2 Batch Channel Selector | 33:40257 |
| B3 Validation Summary | 33:41356 |
| B3a Fix Issues Builder | 33:40770 |
| B4 Batch Progress | 33:43469 |
| B5 Batch Success | 33:42413 |
| B6 Batch Partial Errors | 33:42941 |
| B7 Batch All Failed | 33:41885 |

---

*Modera Salesfront — Vehicle Publishing Tool · HiFi prototype · Page 1.2 – 27.03.2026*
