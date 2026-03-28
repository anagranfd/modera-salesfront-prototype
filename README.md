# Vehicle Publishing Tool — UX Design

**Test assignment · Modera Salesfront CRM**
**Designer:** Evgeniy Yatskov · March 2026

---

## What is this?

A UX design for the **Vehicle Publishing Tool** — a feature inside the Modera Salesfront CRM that lets Used Car Sales Managers publish, monitor, and unpublish vehicle listings across external marketplaces (Auto24, Mobile.de, SS.lv, Autoplius, City24).

The design covers all three integration points specified in the brief:
- Publishing from the **Vehicle Card** (per-vehicle modal dialog)
- Publishing from the **Vehicle Builder** (full-page form with sidebar)
- **Batch publishing** from the Inventory Pipeline (multi-select wizard)

---

## Live Prototype

**[→ Open interactive prototype](https://anagranfd.github.io/modera-salesfront-prototype/v3/)**

The prototype is a fully interactive React application. All publishing flows are clickable.

### How to navigate

The prototype opens on the Inventory screen. Start any scenario from there:

| Scenario | How to start |
|---|---|
| Publish a vehicle for the first time | Click any row (except BMW) |
| Publishing with errors (BMW) | Click the BMW 320d row |
| Unpublish from channels | Publish any vehicle first, then click "Unpublish…" |
| Open the Vehicle Builder | Click "Edit" on any row |
| Batch publish | Tick checkboxes on multiple rows → "Publish selected" |
| Batch with partial errors | Select BMW + 1 other vehicle |
| Batch all-failed | Select VW Golf + Audi A4 + Skoda Octavia |

---

## Figma

**[→ Open Figma file](https://www.figma.com/design/Rtl5gUhZ1dBA3tHRRb14jS/Modera---Design-Task---Vehicle-Publishing-Tool?node-id=81-908)**

---

## Deliverables

### Interactive prototype
- Built with React + Vite + Tailwind CSS from Figma source
- Pixel-accurate to Figma designs
- Full state machine: all publishing panel states, overlays, batch wizard steps

### Documentation

| Document | Description |
|---|---|
| [`docs/annotations-2.md`](docs/annotations-2.md) | **HiFi prototype annotations v2** — screen-by-screen breakdown of all states and interactions |
| [`docs/handoff.md`](docs/handoff.md) | **Engineering handoff spec** — all states, copy, transitions, edge cases |
| [`docs/scenarios.md`](docs/scenarios.md) | User-facing scenario walkthroughs (7 scenarios) |
| [`docs/ia-v2/01-overview.mmd`](docs/ia-v2/01-overview.mmd) | Full system IA — Sales Manager → all 3 entry points |
| [`docs/ia-v2/02-ep1-states.mmd`](docs/ia-v2/02-ep1-states.mmd) | EP1 state machine (Vehicle Card modal) |
| [`docs/ia-v2/03-ep2-states.mmd`](docs/ia-v2/03-ep2-states.mmd) | EP2 state machine (Builder sidebar) |
| [`docs/ia-v2/04-ep3-states.mmd`](docs/ia-v2/04-ep3-states.mmd) | EP3 state machine (Batch wizard) |
| [`docs/ia-v2/05-user-scenarios.mmd`](docs/ia-v2/05-user-scenarios.mmd) | 6 scenario flows as diagrams |

---

## Scope Covered

| Brief requirement | Status |
|---|---|
| Publish vehicle to selected channels | ✓ |
| Unpublish vehicle from channel(s) | ✓ |
| View status: unpublished / pending / published / error | ✓ |
| Sequential channel processing with per-channel status | ✓ |
| Entry from Vehicle Card | ✓ EP1 modal |
| Entry from Vehicle Builder | ✓ EP2 sidebar |
| Entry from Inventory Pipeline | ✓ EP3 table |
| Batch publish (multi-vehicle) | ✓ EP3 wizard |
| Channel-specific validation logic (completeness bars) | ✓ |
| Error detail + path to fix data | ✓ Go to Builder flow |
| Engineering handoff documentation | ✓ `docs/handoff.md` |

---

## Design Decisions

**Vehicle Card as modal overlay** — The brief describes the Vehicle Card as "a view that displays the vehicle at a glance." The design implements this as a modal dialog over the inventory table, keeping the inventory context visible. This avoids a full navigation step for a quick-check action.

**Publishing sidebar in Builder** — The sidebar is collapsed by default and opened explicitly via "Publish to channels." It closes via ✕ without leaving the builder, preserving form state.

**No status column in inventory table** — Publishing status per vehicle is accessible on-demand via the modal rather than always shown in the table. This keeps the inventory table scannable. In a production implementation, a status indicator column (e.g. colored dot or channel count badge) could be added to the table row.

**Completeness bars are informational** — Channels with low completeness (orange bar) can still be published. The warning informs but doesn't block. Strict validation gates are only applied by the channel's own API at publish time.

