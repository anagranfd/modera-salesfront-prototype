# Modera Prototype — Sales Manager Scenarios

*What the prototype demonstrates and how a Sales Manager moves through it.*

---

## Context

Modera is a dealership management platform. The prototype focuses on one specific part of the workflow: **publishing vehicle listings to external marketplaces** (Auto24, Mobile.de, SS.lv, Autoplius, City24).

A Sales Manager uses this part of the platform when they want a vehicle to appear on one or more portals — or when they need to update, retry, or remove an existing listing. The inventory table is the home base. Everything happens either directly from it, or inside a vehicle's detail view.

---

## The Inventory

The main screen shows a table of five used cars:

| Vehicle | Year | Price | Mileage | Fuel |
|---|---|---|---|---|
| Volkswagen Golf 1.6 TDI | 2019 | €14,500 | 78,200 km | Diesel |
| Toyota RAV4 2.0 CVT | 2021 | €24,800 | 32,100 km | Petrol |
| BMW 320d xDrive | 2020 | €28,500 | 45,600 km | Diesel |
| Audi A4 2.0 TFSI | 2018 | €22,900 | 87,300 km | Petrol |
| Skoda Octavia 1.5 TSI | 2022 | €19,900 | 18,500 km | Petrol |

Each row has a checkbox for batch selection and an **Edit** button that opens the vehicle in the Builder.

---

## Scenario 1 — Publishing a vehicle for the first time

*The Sales Manager has a new car ready to sell and wants to put it on the portals.*

**1. Opening the publish dialog**

The manager clicks anywhere on a vehicle row (but not the checkbox or Edit). A dialog slides open on top of the inventory. The dialog shows the car's name, registration, and a small spec summary on the right — year, mileage, fuel type, price.

Inside the dialog there are two sections: the publishing panel on the left, and the spec panel on the right. At this point, the publishing panel shows "Not published" with a note that no channels have been added yet, and an **Add channels** button.

**2. Selecting channels**

Clicking **Add channels** opens the channel selector — a narrower dialog on top. It lists all available portals. The manager can tick any combination: Auto24, Mobile.de, SS.lv, Autoplius, City24.

Each channel shows a completeness bar when selected — this tells the manager how complete the vehicle's data is for that portal. Auto24 and SS.lv show solid green bars (96% and 91%). Mobile.de, Autoplius, and City24 show orange bars with warnings (74%, 88%, 74%), meaning some fields are missing or below that portal's requirements. The manager can still proceed — the warning is informational.

Once at least one channel is ticked, the **Next: Validate** button becomes active. Clicking it closes the selector and returns to the dialog.

**3. Ready to publish**

The dialog now shows the selected channels in the "Not published" panel with their completeness bars. A **Publish to channels** button appears. The manager clicks it.

**4. Progress**

A blue progress bar fills up channel by channel, with a spinner next to each one. The manager can watch the publish happen in real time. Each channel completes in sequence; the bar advances as each one finishes.

**5. Published**

Once all channels complete, the panel switches to "Active channels". Each channel shows a green dot and a timestamp ("Published · Today, 14:32"), plus an external link icon to open the live listing. The manager can now close the dialog.

---

## Scenario 2 — Publishing the BMW: a vehicle with issues

*Some vehicles have data problems on certain portals. The BMW 320d demonstrates what happens when publishing partially fails.*

**Steps 1–3** are identical to Scenario 1. The manager opens the BMW's dialog, adds channels, and clicks Publish.

**4. Progress + partial failure**

The progress animation runs. Auto24 and SS.lv complete successfully. Mobile.de and City24 fail — indicated by red marks. After the animation finishes, the panel splits into two groups:

- **Active channels**: Auto24 and SS.lv, with green dots and publish timestamps.
- **Not published**: Mobile.de and City24, marked with red dots and "✕ Publishing failed".

**5. Viewing error details**

Each failed channel has a small expand arrow. Clicking it opens an inline error detail box that explains what went wrong — typically a specific field that's missing or doesn't meet the portal's requirements.

The error detail also shows two actions:
- **Go to Builder** — opens the vehicle editor where the manager can fix the data.
- A back button to collapse the detail.

**6. Options from this state**

The "Not published" panel has **Add channels** and **Publish to channels** buttons so the manager can retry the failed channels immediately, or add a different one.

The "Active channels" panel has an **Unpublish…** button for removing the successful listings (covered in Scenario 4).

---

## Scenario 3 — Going to the Builder to fix issues

*The manager wants to correct the vehicle data that's causing publishing failures, without losing the context of what went wrong.*

From the expanded error detail in the publish dialog, the manager clicks **Go to Builder**. The dialog closes and the full vehicle editor opens — the BMW's detail view with all tabs (specs, photos, extras, etc.).

The publishing sidebar is already open on the right, showing the same "Active channels / Not published" split from before. The manager can see the error context while editing the form fields.

**In the Builder:**

- The manager edits the fields highlighted as incomplete.
- The sidebar updates in real time as completeness improves.
- When ready, they can publish directly from the sidebar using the same **Publish to channels** button.
- The **Add channels** flow and **Unpublish** flow both work exactly the same as in the main publish dialog.
- A **✕** button next to the "PUBLISHING" header at the top of the sidebar closes the publish panel without leaving the Builder.
- The **← Inventory** link at the top-left returns to the inventory table.

---

## Scenario 4 — Adding more channels to an already-published vehicle

*A vehicle is live on Auto24 and SS.lv. The manager now wants to also put it on Mobile.de.*

The manager opens the dialog for a fully published vehicle. The panel shows "Active channels" with all currently live portals.

Clicking **Add channels** opens the channel selector again — but this time, already-published channels are filtered out. Only unpublished ones appear. The manager selects Mobile.de (and sees its 74% completeness warning), clicks **Next: Validate**, and returns to the dialog.

The panel now shows two groups: "Active channels" (the previously published ones) and "Not published" (the newly added Mobile.de). The manager clicks **Publish to channels** to launch the new listing. The result follows the same success or failure path as before — if it succeeds, Mobile.de moves up to "Active channels"; if it fails, it stays in "Not published" with error details.

---

## Scenario 5 — Unpublishing a vehicle from specific channels

*A vehicle has been sold or the manager needs to pull it from certain portals.*

**From a fully published vehicle (EP1·C2 → C3):**

The manager opens the publish dialog. In the "Active channels" panel, they click **Unpublish…**.

A channel selector opens — similar to the publish selector, but showing only the currently live channels. All channels are pre-selected by default. The manager deselects any they want to keep, then clicks **Unpublish to Channels →**.

A confirmation dialog appears. It lists the specific channels about to be removed and shows a note: "This will remove the listing immediately." Two buttons:
- **Cancel** — goes back to the channel selector.
- **Unpublish now** — executes the removal.

After confirming, the selected channels disappear from the "Active channels" list. If all channels were removed, the vehicle resets to the initial "Not published" state. If some channels remain published and others were only partially published (with errors), the panel reflects the new mixed state.

The same unpublish flow is also accessible from the "Active channels" section when a vehicle is in partial-error state — the manager can unpublish the successful channels while the failed ones are still being fixed.

---

## Scenario 6 — Batch publishing: the fast path

*The manager has prepared several vehicles and wants to push them all at once.*

**1. Selecting vehicles**

On the inventory screen, the manager clicks the checkboxes on multiple rows. Selected rows highlight in light blue. Checking any row replaces the pagination bar at the bottom with a **batch action bar** that shows how many vehicles are selected and two buttons: **Publish selected** and **Cancel**.

**2. Choosing channels**

Clicking **Publish selected** opens the batch channel selector. This works like the single-car selector but applies to all chosen vehicles. The manager picks channels and clicks **Next: Validate**.

**3. Validation summary**

A validation summary dialog shows each vehicle × channel combination as a table. Green checkmarks mean the vehicle's data is complete enough for that portal. Orange warning marks flag combinations that might fail. The manager sees a count of potential issues and can choose:
- **Proceed anyway** — publish everything, accept that some may fail.
- **Fix issues** — jump to the Builder for a specific vehicle to correct data before publishing.

**4. Progress**

A batch progress modal shows each vehicle advancing through the publish queue. A blue progress bar fills as vehicles complete. Each row in the table transitions from a spinner to a checkmark as that vehicle finishes.

**5. Outcomes**

The result depends on which vehicles were selected:

**All succeeded (EP3·B5):**
A green header modal appears with a "Batch publish complete" message. The table shows all vehicles with ✓ marks across all channels. The manager can close and return to the inventory, where the vehicles are now live.

**Partial errors — BMW in the selection (EP3·B6):**
An orange header modal appears. The table shows which specific vehicle × channel combinations failed. For the BMW, Mobile.de and City24 show ✗ marks; the other channels succeeded. A **Retry failed** button lets the manager attempt those combinations again without republishing the successful ones.

**All failed (EP3·B7):**
A red header modal appears. All cells in the table show ✗. This typically happens when the vehicle data has fundamental issues preventing any portal from accepting the listing. A **Retry all** button lets the manager attempt the entire batch again after fixing data.

---

## Scenario 7 — Fixing a batch validation issue before publishing

*During the validation step, the manager spots that Toyota RAV4 and Audi A4 are both missing fields for Mobile.de.*

From the validation summary dialog, the manager clicks **Fix issues (Builder) →**. The builder opens for the affected vehicle with a sidebar showing the validation context. The manager fills in the missing fields, returns to the inventory, re-selects the same vehicles, and repeats the batch flow — this time the validation passes clean.

---

## Summary of interactions available in the prototype

| Action | Where it happens |
|---|---|
| Open publish dialog for a vehicle | Click any row on the inventory table |
| Add channels / change channel selection | "Add channels" button in the publish panel |
| Publish to selected channels | "Publish to channels" button |
| View error details for a failed channel | Expand arrow on any failed channel row |
| Go to Builder from a publish error | "Go to Builder" link inside error detail |
| Unpublish from specific channels | "Unpublish…" button in Active channels panel |
| Open the vehicle Builder directly | "Edit" button on the inventory row |
| Close the publishing sidebar in Builder | ✕ button next to "PUBLISHING" header |
| Return to inventory from Builder | "← Inventory" link |
| Select vehicles for batch publishing | Checkboxes on inventory rows |
| Start batch publish flow | "Publish selected" in the batch action bar |
| Proceed through batch validation | "Proceed anyway →" or "Fix issues (Builder) →" |
| Retry failed batch items | "Retry failed" / "Retry all" in result modal |
