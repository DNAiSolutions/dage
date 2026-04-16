

## Redesign Admin Dashboard to Match Reference Layout

Restructure the dashboard to follow the clean, card-based layout from the reference image, adapted for D.A.G.E.'s data.

### Layout Changes (Dashboard.tsx only)

**1. Stats Row — 4 cards across (instead of 3)**
Cards with label + count on left, colored icon on right. Add a 4th stat: "Waiver Forms" (count of active forms).

```text
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Expected      📍│ │ Completed     ✅│ │ Missing       ⚠️│ │ Waiver Forms  📄│
│ Riders        │ │ Waivers       │ │ Waivers       │ │              │
│ 0             │ │ 0             │ │ 0             │ │ 0            │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

Each card: label top-left, large number bottom-left, colored icon circle top-right. Clean white card with subtle border. Matches the reference exactly.

**2. Two-column section below stats**

Left card: **MVP Progress** — a checklist of project milestones with check/circle icons:
- Homepage & Public Site (done)
- Online Waiver System (done)
- Admin Dashboard (done)
- Parade Applications (pending)
- Volunteer Forms (pending)
- Scholarship Portal (pending)

Right card: **Quick Notes** — status cards showing:
- "Portal Live" with green dot — "Admin portal is now accessible to team members"
- "Next Step" with gold dot — "Launch waiver form and begin collecting submissions"

**3. Remove existing sections**
- Remove the progress bar (redundant with stats)
- Remove the Waiver Management CTA card (already in sidebar nav)
- Remove the Recent Submissions card (moved to Waivers page)
- Remove the Coming Soon grid (already in sidebar)

### Sidebar + Layout — No changes
Keep AdminSidebar and AdminLayout exactly as they are. The sidebar already has the "Coming Soon" locked items and footer links matching the reference pattern.

### Technical Details
- Single file edit: `src/pages/admin/Dashboard.tsx`
- Add one more query to fetch `waiver_forms` count
- MVP Progress items are static (hardcoded milestone list)
- Quick Notes are static for now
- All theme tokens (dark/light) preserved

