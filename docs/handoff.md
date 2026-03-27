# Vehicle Publishing Tool — Engineering Handoff

**Feature:** Publishing vehicles to external sales channels (Auto24, Mobile.de, SS.lv, Autoplius, City24)
**Role covered:** Used Car Sales Manager
**Prototype:** https://anagranfd.github.io/modera-salesfront-prototype/v3/

---

## 1. Feature Overview

The Publishing Tool lets a Sales Manager control the visibility of each vehicle across external marketplaces. It is accessible from three entry points in the CRM, each with a slightly different context. The core publishing interaction (selecting channels, watching progress, handling errors, unpublishing) is identical in all three — only the surrounding layout differs.

---

## 2. Entry Points

| Entry Point | How to access | Layout |
|---|---|---|
| **EP1 — Vehicle Card** | Click any row in the Inventory table | Modal dialog overlays the inventory |
| **EP2 — Vehicle Builder** | "Edit" button in Inventory row, or "Go to Builder" from EP1 error | Full-page form; publishing in collapsible right sidebar |
| **EP3 — Inventory Pipeline** | Inventory table with multi-select + batch action bar | Batch wizard: sequential full-page steps |

### Navigation between entry points

```
Inventory table
  ├─ [click row]        → EP1 Vehicle Card modal (opens over inventory)
  ├─ [Edit button]      → EP2 Vehicle Builder (full page)
  └─ [checkboxes]       → EP3 Batch Action Bar

EP1 modal
  └─ [Go to Builder]    → EP2 Builder (modal closes, builder opens with sidebar already open)

EP2 Builder
  └─ [← Inventory]      → Inventory table
  └─ [✕ on PUBLISHING]  → Sidebar collapses, builder stays open
```

---

## 3. Publishing Panel — States

The publishing panel appears in both EP1 (right side of modal) and EP2 (right sidebar). It has the following states:

### 3.1 State: Empty (no channels configured)

**Condition:** Vehicle has no publishing channels assigned yet.

**UI:**
- Header: "Not published"
- Body message: "No channels added yet"
- Single CTA: `[ + Add channels ]`

**Transitions:**
- `[ Add channels ]` → opens Channel Select overlay

---

### 3.2 State: Unpublished (channels configured, none published)

**Condition:** Channels have been added but none have been published.

**UI:**
- Header: "Not published"
- Channel list: each channel shown with gray dot + completeness bar
- CTAs: `[ + Add channels ]` + `[ Publish to channels ]`

**Channel row anatomy:**
```
● (gray dot)   Channel name   [completeness bar   XX%  ⚠]
```
- Green bar: completeness ≥ 90%, no warning icon
- Orange bar + ⚠ icon: completeness below threshold for that channel

**Completeness values (prototype fixture data):**

| Channel | % | Bar color | Warning |
|---|---|---|---|
| Auto24 | 96% | Green | No |
| Mobile.de | 74% | Orange | Yes |
| SS.lv | 91% | Green | No |
| Autoplius | 88% | Orange | Yes |
| City24 | 74% | Orange | Yes |

> **Note for Engineering:** Completeness % should come from the vehicle data completeness score calculated against each channel's validation rules. The prototype uses static fixture values.

**Transitions:**
- `[ + Add channels ]` → Channel Select overlay
- `[ Publish to channels ]` → Progress state

---

### 3.3 State: Progress (publishing in progress)

**Condition:** Publish has been triggered; system is processing channels sequentially.

**UI:**
- Blue progress bar at top (fills left-to-right as channels complete)
- Channel list with per-channel spinner → transitions to ✓ or ✗ per result
- No action buttons visible during progress (non-interactive)

**Timing (prototype):**
- Each channel completes in ~900ms
- Progress bar advances proportionally: 1 channel = 1/N of total bar width

**Auto-transition on completion:**
- All channels succeeded → Published state
- Some channels failed → Partial Error state

---

### 3.4 State: Published (all channels active)

**Condition:** All configured channels are live.

**UI:**
- Header: "Active channels"
- Channel list: each channel with green dot + publish timestamp + external link icon
- CTAs: `[ + Add channels ]` + `[ Unpublish… ]`

**Channel row anatomy:**
```
● (green dot)   Channel name   Published · Today, HH:MM   [↗ external link]
```

**Transitions:**
- `[ + Add channels ]` → Channel Select overlay (already-published channels filtered out)
- `[ Unpublish… ]` → Unpublish Select overlay

---

### 3.5 State: Partial Error (some channels failed)

**Condition:** Publishing completed with mixed results — some channels succeeded, some failed.

**UI:**
- Two groups in the channel list:
  - **Active channels** group: green dot + timestamp + external link (succeeded)
  - **Not published** group: red dot + "✕ Publishing failed" label (failed)
- Expand arrow (▸) on each failed channel row → opens inline error detail
- CTAs: `[ + Add channels ]` + `[ Publish to channels ]` (retries failed channels) + `[ Unpublish… ]`

**Error detail (expanded):**
```
▾ Channel name
  [Error description — specific field or rule that failed]
  [ Go to Builder → ]
```

**Transitions:**
- Expand arrow → toggles inline error detail (per channel, independent)
- `[ Go to Builder → ]` → EP2 Builder opens with sidebar showing same state
- `[ Publish to channels ]` → Progress state (retries failed channels only)
- `[ + Add channels ]` → Channel Select overlay
- `[ Unpublish… ]` → Unpublish Select overlay

**Prototype fixture: BMW 320d behavior**
- Auto24 → succeeds
- SS.lv → succeeds
- Mobile.de → fails ("Missing engine displacement field")
- City24 → fails ("Price format not accepted")
- Autoplius → not attempted (not in selected channels in this scenario)

---

## 4. Overlay: Channel Select

Opens over the publishing panel. Used for both "initial channel selection" and "add more channels."

**UI:**
- Header: "Select channels to publish"
- Channel list: checkbox per channel + completeness bar
- Already-published channels are filtered out when opened from "Add channels" in Published or Partial Error state
- `[ Cancel ]` → closes overlay, returns to previous state
- `[ Next: Validate → ]` → activates once ≥1 channel is checked; closes overlay, returns to panel with selected channels added

**Behavior:**
- Channels with orange/warning bars can still be selected — warning is informational only
- "Select all" / "Deselect all" convenience links

---

## 5. Overlay: Unpublish Select (C2)

Opens when user clicks `[ Unpublish… ]` from Published or Partial Error state.

**UI:**
- Orange header (`#c87820 → #8a4a10` gradient)
- Channel list: only currently-published (active) channels shown
- All channels pre-selected (red checkboxes) by default
- `[ Cancel ]` → closes, returns to previous state
- `[ Unpublish to Channels → ]` → opens Unpublish Confirm dialog

---

## 6. Overlay: Unpublish Confirm (C3)

Confirmation step before executing unpublish.

**UI:**
- Orange header
- Alert box (`background: #eef2f5`, `border: 1px solid #e0c060`)
- Alert contains:
  - Title: "Confirm unpublish"
  - Bullet list of channels about to be unpublished
  - Note: "This will immediately remove the listing from the selected channels."
- `[ Cancel ]` → back to Unpublish Select (C2)
- `[ Unpublish now ]` → executes unpublish

**Post-unpublish state (determined by what remains):**

| Remaining after unpublish | Result state |
|---|---|
| No channels remain active | Empty state (reset) |
| Some channels still active, no failures | Published state |
| Some active + some with errors | Partial Error state |

---

## 7. EP2 — Vehicle Builder Publishing Sidebar

The sidebar is the same publishing panel (states 3.1–3.5) mounted in the right sidebar of the Builder.

**Additional behavior:**

- Sidebar is **collapsed by default** when entering the Builder normally (Edit button from inventory)
- Sidebar is **open by default** when entering via "Go to Builder" from EP1 error detail
- `[ Publish to channels ]` button in the top-right of the Builder header opens the sidebar if collapsed
- `[ ✕ ]` button next to "PUBLISHING" title collapses the sidebar (builder stays open)
- All publish, add channels, and unpublish flows work identically to EP1

---

## 8. EP3 — Batch Publishing Wizard

For publishing multiple vehicles at once from the Inventory Pipeline.

### Steps

**Step 1 — Vehicle Selection (S1)**
- User ticks checkboxes on inventory rows
- Selected rows highlight in `#dce8f0`
- Batch Action Bar replaces the pagination row at the bottom of the table
- Bar shows: "N vehicles selected · `[ Publish selected ]` · `[ Cancel ]`"

**Step 2 — Channel Selection (B2)**
- Same channel list as EP1 Channel Select
- Applies to all selected vehicles
- `[ Cancel ]` → returns to inventory (selection cleared)
- `[ Next: Validate → ]` → Validation Summary

**Step 3 — Validation Summary (B3)**
- Vehicle × Channel matrix table
- ✓ green = vehicle data complete enough for that channel
- ⚠ orange = vehicle has missing fields for that channel
- Shows count of potential issues
- `[ Fix issues (Builder) → ]` → opens Builder for affected vehicle; after fixing, user returns to inventory and re-selects
- `[ Proceed anyway → ]` → Batch Progress

**Step 4 — Batch Progress (B4)**
- Full-page modal
- Blue progress bar (advances per vehicle)
- Per-vehicle table rows: spinner → ✓ or ✗
- Processes vehicles sequentially

**Step 5 — Result (B5 / B6 / B7)**

| Result | Header color | Condition (prototype fixture) |
|---|---|---|
| B5 · Success | Green | No BMW in selection, or BMW with no failing channels selected |
| B6 · Partial Errors | Orange | BMW 320d in selection (Mobile.de + City24 fail for BMW) |
| B7 · All Failed | Red | Selection is exactly: VW Golf + Audi A4 + Skoda Octavia |

**B6 (Partial Errors):**
- Table shows per-vehicle per-channel result: ✓ or ✗
- `[ Retry failed ]` → reruns only failed vehicle × channel combinations
- `[ Close ]` → returns to inventory

**B7 (All Failed):**
- `[ Retry all ]` → reruns entire batch
- `[ Close ]` → returns to inventory

---

## 9. Copy Reference

### Publishing panel headers

| State | Header text |
|---|---|
| Empty | "Not published" |
| Unpublished | "Not published" |
| Progress | (no header — progress bar is full width) |
| Published | "Active channels" |
| Partial Error (active group) | "Active channels" |
| Partial Error (failed group) | "Not published" |

### Button labels

| Button | Context |
|---|---|
| `+ Add channels` | All states except during progress |
| `Publish to channels` | Unpublished state + Partial Error retry |
| `Unpublish…` | Published + Partial Error |
| `Unpublish to Channels →` | Unpublish Select overlay |
| `Unpublish now` | Confirm Unpublish dialog |
| `Go to Builder →` | Error detail inline expand |
| `Next: Validate →` | Channel Select overlay |
| `Cancel` | Any overlay |
| `Proceed anyway →` | Batch Validation Summary |
| `Fix issues (Builder) →` | Batch Validation Summary |
| `Retry failed` | Batch Partial Errors result |
| `Retry all` | Batch All Failed result |

### Status labels per channel row

| Status | Dot color | Text |
|---|---|---|
| Not configured | — | (not shown) |
| Configured, not published | Gray | (channel name + completeness bar) |
| In progress | — | Spinner |
| Published | Green | "Published · Today, HH:MM" |
| Failed | Red | "✕ Publishing failed" |

---

## 10. Edge Cases

| Scenario | Expected behavior |
|---|---|
| User closes dialog during progress (EP1) | Not covered in prototype — implementation decision: allow or block close |
| All channels unpublished → panel resets | Empty state (no channels configured) |
| Adding channels to already-published vehicle | Channel Select shows only non-published channels |
| Retry in Partial Error: all channels now succeed | Transitions to Published state |
| Retry in Partial Error: some still fail | Stays in Partial Error state (updated groups) |
| BMW in batch + BMW fail channels not selected | Returns B5 Success (not B6) |
| Validation warnings (orange bar) | Informational only — user can proceed |
| Go to Builder from EP1 error | Builder opens with sidebar pre-open showing same error state |

---

## 11. Figma Source

- **File ID:** `iaEhGu1Guoo4vbQW63BDmz`
- **Page:** "Page 1.2 – 27.03.2026" (node `33:29723`)
- **All 29 frame IDs:** see `/docs/ia-v2/` IA diagrams and plan file

---

## 12. Supporting Documents

| Document | Location | Contents |
|---|---|---|
| Scenario walkthroughs | `docs/scenarios.md` | 7 user-facing scenarios with step-by-step flow |
| IA overview | `docs/ia-v2/01-overview.mmd` | Full system map (Mermaid diagram) |
| EP1 state machine | `docs/ia-v2/02-ep1-states.mmd` | All panel states + transitions |
| EP2 state machine | `docs/ia-v2/03-ep2-states.mmd` | Builder sidebar states + transitions |
| EP3 state machine | `docs/ia-v2/04-ep3-states.mmd` | Batch wizard steps + outcome routing |
| User scenario flows | `docs/ia-v2/05-user-scenarios.mmd` | SC1–SC6 as sequential flow diagrams |
