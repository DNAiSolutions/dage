

## Add Project Checklist Widget

A floating checklist panel for tracking content, photos, and decisions across all site sections.

### Steps

1. **Create `src/components/ProjectChecklist.tsx`** — paste the provided component code as-is.

2. **Update `src/pages/Index.tsx`** — import and render `<ProjectChecklist />` alongside existing content so the floating button appears on the homepage.

3. **Update `src/App.tsx`** — alternatively, add `<ProjectChecklist />` at the app root level (outside `<Routes>`) so it appears on every page, not just the homepage.

### Technical Notes
- Component is self-contained with localStorage persistence (`dage-project-checklist` key)
- Uses lucide-react icons already in the project
- Fixed positioning with z-index 9997-9999, won't conflict with existing layout
- No new dependencies required

