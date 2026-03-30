

## Two Changes

### 1. Move Checklist to Bottom-Right Chat Bubble

Reposition the floating toggle button from `top-4 right-4` to `bottom-6 right-6` so it sits like a chat bubble. The panel will pop up from the bottom-right instead of sliding from the top-right.

**File:** `src/components/ProjectChecklist.tsx`
- Change button position to `fixed bottom-6 right-6`
- Make the button circular (round shape, larger)
- Panel opens upward from bottom-right (anchored to bottom, max-height ~80vh)
- Keep the glow animation

### 2. Add Login/Portal Link to Navbar

Add a small "Portal" or login link in the navbar so you can access `/auth` to log into the backend.

**File:** `src/components/Navbar.tsx`
- Add a "Portal" link next to the Donate button (desktop: icon + text, mobile: in menu)
- Links to `/auth` route which already exists

### Technical Details
- No new dependencies
- No database changes
- Two file edits total

