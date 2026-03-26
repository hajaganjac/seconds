# Playgrounds Festival App — Figma Design Reference

This document describes the **full layout, design system, content, and structure** of the Playgrounds festival app so Figma AI can replicate it exactly for design iteration.

---

## 1. App purpose and concept

- **Product:** Mobile-first festival app for **Playgrounds** (weareplaygrounds.nl) — an institute that connects creative communities in illustration, animation, film, games, and digital design.
- **Event focus:** The Art Department Eindhoven 2026 (15–17 April), plus other events, circles, timetable, and networking.
- **Tone:** Dark, premium, creative. Serif for headlines, clear hierarchy, fuchsia/purple accents.

---

## 2. Design system

### 2.1 Colors

| Token / use            | Value / description |
|------------------------|----------------------|
| **Background**         | `#050505` (near black) |
| **Card / surface**     | `#0a0a0a`, `#111` on hover |
| **Primary accent**     | Fuchsia: `#a855f7`, `#c026d3`, `#d946ef`; purple `#9333ea` |
| **Text primary**      | White `#fff` |
| **Text secondary**     | `rgba(255,255,255,0.7)` to `0.5` |
| **Text muted**         | `rgba(255,255,255,0.4)` to `0.3` |
| **Borders**           | `border-white/5`, `border-white/10`, `border-fuchsia-500/20` to `/40` |
| **Fuchsia tint (buttons, badges)** | `bg-fuchsia-500/20`, `border-fuchsia-500/30`, `text-fuchsia-300` |

### 2.2 Typography

- **Headlines (hero, section):** Serif, italic, font-black (800), tight tracking, often two lines (e.g. “Creative / Circles”, “The Art / Department”).
- **Screen titles:** e.g. `text-5xl` / `text-4xl`, `font-black`, `font-serif italic`, `tracking-tighter`, `leading-[0.9]`.
- **Body:** Sans, `text-sm` or `text-base`, `font-medium`, `text-white/70` or `/90`.
- **Labels / overlines:** `text-[10px]` or `text-xs`, `font-mono` or `font-bold`, `uppercase`, `tracking-widest` or `tracking-wider`.
- **Small labels (badges, tags):** `text-[11px]` or `text-xs`, `font-semibold`, rounded pills or rounded-xl.

### 2.3 Spacing and layout

- **Page padding (horizontal):** `px-6` (24px); some sections use `pl-[max(1.5rem,env(safe-area-inset-left))]` for notches.
- **Top bar / header:** `pt-16` (64px) to clear status bar; header row `pb-4`.
- **Bottom padding above dock:** `pb-32` (128px) on scrollable content so the dock doesn’t cover it.
- **Section gaps:** `gap-4`, `gap-6`, `gap-8`; between sections often `mb-6`, `mb-8`, `mb-10`.
- **Safe area:** Top and sides use `env(safe-area-inset-*)` where needed; bottom uses `safe-area-bottom` for the dock.

### 2.4 Radii and surfaces

- **Cards:** `rounded-[28px]`, `rounded-[32px]`, or `rounded-2xl` (16px).
- **Hero card:** `rounded-[36px]`.
- **Buttons (icon):** `rounded-full` (40px typical size: `w-10 h-10`).
- **Pills / tags:** `rounded-full`, `rounded-xl`, `rounded-2xl`.
- **Dock:** `border-radius: 1.5rem` (24px).

### 2.5 Effects

- **Glass:** `backdrop-blur-md`, `bg-white/5`, `border border-white/10`.
- **Glow:** Soft fuchsia/purple shadows, e.g. `shadow-[0_0_30px_rgba(168,85,247,0.15)]`, `shadow-[0_0_50px_rgba(217,70,239,0.3)]`.
- **Gradients:** Dark overlays on images: `from-black/20 via-black/20 to-[#050505]/95`; section blurs: `from-[#050505]/98 via-[#050505]/80 to-transparent`.

---

## 3. Global layout structure

### 3.1 Shell (every screen)

- **Outer container:** `min-h-screen min-h-[100dvh] bg-[#050505] flex flex-col safe-area`.
- **Main content:** `flex-1 overflow-hidden flex flex-col min-h-0`; inner scroll: `flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide`.
- **Dock:** Fixed to bottom, centered, above a gradient strip. Gradient: `from-[#050505]/98 via-[#050505]/80 to-transparent`; dock panel: dark glass, rounded, with magnification on hover.

### 3.2 Bottom dock (navigation)

- **Items (left to right):** Home, Timetable, **Contribute** (center, gradient circle icon), Circles, Find.
- **Styling:** Rounded panel, `background rgba(10,10,10,0.92)`, `border 1px solid rgba(255,255,255,0.08)`, `backdrop-filter blur(24px)`, `box-shadow 0 8px 32px rgba(0,0,0,0.4)`.
- **Item:** Base ~42px; center item (Contribute) has gradient fill (purple to fuchsia). Active state: fuchsia tint `rgba(168,85,247,0.2)`, `border-color rgba(168,85,247,0.3)`.
- **Labels:** Optional tooltip above item, small, dark background.

---

## 4. Screen-by-screen layout and content

### 4.1 Home (01. Home)

**Header row (pt-16 pb-4 px-6):**

- Left: Logo **“PLAYGROUNDS.”** — serif italic, text-2xl, font-black, white, mix-blend-difference.
- Right (flex gap-2): Profile avatar (circle 40px, link to profile/me), Search (icon button 40px), Messages (icon button 40px, link to messages).

**Hero card (px-4 mb-10):**

- Full-width card, rounded-[36px], border border-white/5.
- Height: `min(440px, 52vh)`.
- Background: image (abstract/cinematic) with dark gradient overlay bottom; optional subtle noise/veil.
- Overlay content (bottom-left, p-8):
  - Badge: “Upcoming” — small pill, fuchsia border/glow.
  - Title: “The Art / Department” — two lines, text-5xl/6xl, font-black, serif italic, white, uppercase.
  - Subtitle: “Design & craftsmanship in film, animation and games.”
  - Meta row: MapPin “Eindhoven, NL” | Calendar “15 – 17 Apr 2026”.
- Card links to Timetable.

**About + CTAs (px-6 mb-10):**

- Tagline paragraph (ABOUT.tagline): “Playgrounds is an institute and platform that connects and forms international creative communities…”
- Buttons (flex wrap gap-3): “Upcoming events” (fuchsia), “Festival gallery”, “Watch RePlay”.

**Upcoming. (px-6):**

- Section title “Upcoming.” + link “All events” (small, fuchsia, uppercase).
- Horizontal scroll: 3 event cards (min-w-[260px], rounded-2xl, dark bg, date label, title, description).

**Creative Circles (marquee):**

- Section: “Creative / Circles” (two-line title) + “View All” link.
- Horizontal strip: **auto-scrolling marquee** (right-to-left, ~40s loop). Cards in a row, duplicated for seamless loop (no consecutive duplicate: 01…06, then 01…06).
- **Circle cards (each):** min width 280px (or 85vw), height clamp(200px, 45vw, 240px). Rounded-[32px], bg zinc-900/40, border white/10, soft glow per circle. Content: number “01”…“06”, title (e.g. “Motion Design”), “124 creatives”, tag pills (e.g. Cinema 4D, After Effects, Houdini). Each card has a blurred gradient blob (top-right) and subtle glare hover. Links to `/circles/{slug}`.

**Circles list (exact order):**

1. Motion Design — 124 — Cinema 4D, After Effects, Houdini  
2. Concept Art — 86 — Procreate, Photoshop, Blender  
3. 3D Animation — 210 — Maya, Unreal, Rigging  
4. Game Design — 95 — Unity, Design, Prototyping  
5. Storyboarding — 42 — Storyboard, Pre-vis, Layout  
6. Unreal Engine — 156 — Real-time, Blueprint, Niagara  

**News. (px-6):**

- Section title “News.” + “All news” link.
- Vertical list of 3 news items: icon (newspaper), title, excerpt, arrow. Links out to weareplaygrounds.nl.

**Search overlay (full screen when open):**

- Dark overlay, search input (rounded-full, fuchsia accent), results by type (circles, events, news, sessions). Trending / quick links when empty.

---

### 4.2 Timetable

- Back button (top-left).
- Title: “The Art / Department.” Subtitle: “Eindhoven 2026 · 15 – 17 April”. Location: MapPin “Klokgebouw, Eindhoven”. Link: “Full timetable”.
- **Day tabs:** Horizontal pills — “Wed 15 Apr”, “Thu 16 Apr”, “Fri 17 Apr”. Active: fuchsia bg/border.
- **Sessions list:** Each row: time, title, optional speaker/stage, type badge (Keynote, Talk, Workshop, Panel, Screening). Checkmark to “mark” session. Rounded cards, dark bg.

---

### 4.3 Discovery (Explore Circles)

- Back + Filter (top).
- Title: “Explore / Circles.” Subtitle: “Connect through shared creative context.”
- **Circle list (vertical):** Same 7 circles as in data (Motion Design, Concept Art, 3D Animation, Game Design, Storyboarding, Unreal Engine, Visual Storytelling). Each card: index “001”, member count badge, circle name, discipline. Left edge accent on hover. Links to circle detail.
- Filter overlay: “All” and disciplines (Animation & VFX, Illustration, etc.).

---

### 4.4 Circle detail (e.g. /circles/motion-design)

- Back (left), member count badge (right, e.g. “124”).
- Title: circle name with line break (e.g. “Motion / Design.”). Subtitle line.
- **Join Circle** button: full-width, rounded-full; when joined: “Joined” (fuchsia tint).
- **Member list:** Cards in a grid. Each: avatar (56px), name, optional discipline, tags. “Me” card (when joined): no 3-dot menu. Others: 3-dot menu → Connect, Message, View profile.
- Member counts per circle: motion-design 124, concept-art 86, 3d-animation 210, game-design 95, storyboarding 42, unreal-engine 156.

---

### 4.5 Find (Find Friends)

- Back button.
- Title: “Find / Friends.” Subtitle: “See how far your festival friends are and find each other.”
- Empty state: icon, “Add friends from circles or messages to track them here.”
- List: friend rows (icon, name, “Tap to track location”), link to find/:friendId (track screen with arrow/compass).

---

### 4.6 Track friend (/find/:friendId)

- Compass/arrow pointing to friend; optional manual direction dial when no compass. Distance text. Back button.

---

### 4.7 Profile — My Profile edit (/profile/me)

- Back only (top-left).
- **Avatar block (centered):** 128×128 circle, border-4 white/10, “Add photo” state or user image. Under it: **“View my profile”** link (fuchsia, with User icon), centered.
- Form sections: Display name, Discipline/role, Bio, Skills/tags (add/remove), Links (add/remove). Inputs: dark bg, white/10 border, rounded-2xl.

---

### 4.8 Profile — View my profile (/profile/me/view)

- Full-bleed hero image (h-[400px]) with gradient overlay; Back and Share (top).
- **Avatar:** 128×128, centered, below hero, border-[6px] #050505, fuchsia glow shadow.
- Name (large serif italic), discipline pill (fuchsia), bio.
- **Expertise:** Section label “Expertise”, tag pills.
- **Circles:** Section “Circles”, list of joined circle names as links.
- **Portfolio & links:** If any; else hidden.
- **Edit profile** button (to /profile/me).

---

### 4.9 Profile — Other user (/profile/:userId)

- Same layout as “View my profile”: hero, avatar, name, discipline, bio, expertise, circles, links.
- Actions: Connect (overlay), “Send Message” (to messages), Share.

---

### 4.10 Messages

- Back (left), New chat “+” (right).
- Search bar: rounded-full, “Search conversations…”.
- **Thread list:** Avatar (initial or image), name, last message preview, time. “You” at top with “View my profile” only.
- New-chat overlay: Friends list (from mock profiles + You); start chat or view profile.

---

### 4.11 Chat (/messages/:threadId)

- Header: back, name, optional avatar.
- Message bubbles: sent (right, fuchsia tint), received (left, dark). Timestamps.
- Input at bottom: text field + send.

---

### 4.12 Events

- Back. Title: “Upcoming / Events.” Subtitle about festivals/workshops.
- List: event cards (type badge, title, description, date, location, external link arrow). Uses UPCOMING_EVENTS.

---

### 4.13 News

- Back. Title “News.” List of news items (title, excerpt, link). Uses NEWS_ITEMS.

---

### 4.14 Gallery

- Back. Title. Grid of contributed photos (2 columns, rounded, from festival gallery).

---

## 5. Key content data (copy and structure)

### 5.1 About

- **Tagline:** “Playgrounds is an institute and platform that connects and forms international creative communities within the fields of illustration, animation, film, games, digital design and art.”
- **RePlay:** “Watch RePlay” → replay.weareplaygrounds.nl.

### 5.2 Hero

- **Title:** “The Art / Department”
- **Subtitle:** “Design & craftsmanship in film, animation and games.”
- **Place:** Eindhoven, NL · 15 – 17 Apr 2026.

### 5.3 Creative circles (for marquee and discovery)

- Motion Design — 124 — Cinema 4D, After Effects, Houdini  
- Concept Art — 86 — Procreate, Photoshop, Blender  
- 3D Animation — 210 — Maya, Unreal, Rigging  
- Game Design — 95 — Unity, Design, Prototyping  
- Storyboarding — 42 — Storyboard, Pre-vis, Layout  
- Unreal Engine — 156 — Real-time, Blueprint, Niagara  
- (Discovery only) Visual Storytelling — 78 — Direction  

### 5.4 Upcoming events (first 3 on home)

- The Art Department Eindhoven 2026 — 15–17 April 2026 — Festival…  
- The Art Department 2026: In-Depth Day — 15 April 2026 — Extra day…  
- Playgrounds International Film Festival 2026 — 15–19 April 2026 — Film festival…

### 5.5 News (first 3 on home)

- “Pick your partner package and join the Industry Garden!” + excerpt  
- “In Motion is returning in London!” + excerpt  
- “A touch of Next at SXSW 2026” + excerpt  

### 5.6 Timetable days

- Wed 15 Apr, Thu 16 Apr, Fri 17 Apr — sessions with time, title, speaker, stage, type (keynote, talk, workshop, panel, screening).

---

## 6. Components to replicate in Figma

1. **Screen wrapper:** Scrollable area with pt-16 and pb-32; optional device frame (393×852) with Dynamic Island and status bar for previews.
2. **Header row:** Back (circle 40px) + optional right actions (icons 40px, same style).
3. **Primary button (pill):** rounded-full, fuchsia bg/border or white bg (Join).
4. **Secondary button / link:** rounded-full or rounded-2xl, bg-white/5, border-white/10.
5. **Card (list):** rounded-[28px] or rounded-2xl, bg #0a0a0a, border white/5, padding p-5/p-6.
6. **Circle card (marquee):** 280×240 (or responsive), rounded-[32px], gradient blob top-right, number + title + “X creatives” + tag pills.
7. **Dock:** 5 items, center gradient icon, glass panel, hover magnification.
8. **Avatar:** 32–128px circles, border, optional glow; placeholder “?” or initial.
9. **Badge / tag:** small text, rounded-full or rounded-xl, bg fuchsia/10 or white/5, border.
10. **Search bar:** full width, rounded-full, dark bg, fuchsia accent, icon left.

---

## 7. Responsive and mobile-first

- **Target:** Mobile first (≈280px–430px width); also usable on tablet/desktop.
- **Fluid tokens:** Hero height `min(440px, 52vh)`; card min-width `min(280px, 85vw)`; card height `clamp(200px, 45vw, 240px)`; section padding `clamp(0.75rem, 4vw, 1.5rem)`.
- **Safe areas:** Use env(safe-area-inset-*) for top/sides; bottom for dock.
- **Touch:** Minimum tap targets ~44px; spacing so links/buttons aren’t cramped.

---

## 8. Routes (for flow and naming)

- `/` — Home  
- `/timetable` — Timetable  
- `/discovery` — Explore Circles  
- `/events` — Events  
- `/news` — News  
- `/find` — Find Friends  
- `/find/:friendId` — Track friend  
- `/circles/:circleId` — Circle detail  
- `/profile/me` — My profile (edit)  
- `/profile/me/view` — View my profile  
- `/profile/:userId` — Other profile  
- `/messages` — Messages list  
- `/messages/:threadId` — Chat  
- `/gallery` — Gallery  

Use this document to mirror the app’s layout, content, and hierarchy in Figma so designs stay in sync with the live app and you can iterate on the design with accuracy.
