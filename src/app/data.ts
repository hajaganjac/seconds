// ── Images ────────────────────────────────────────────────────────────────────
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1747504858849-fde086e3680a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  motion: "https://images.unsplash.com/photo-1763970540972-9479a63d6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  anim3d: "https://images.unsplash.com/photo-1759950616499-a7aa1b108f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  game: "https://images.unsplash.com/photo-1770320187495-4048d6be7f5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  portrait: "https://images.unsplash.com/photo-1768818653161-0ad28dede131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  crowd: "https://images.unsplash.com/photo-1765210057733-54800ed95354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  digitalArt: "https://images.unsplash.com/photo-1764258057684-eade7d1615eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  storyboard: "https://images.unsplash.com/photo-1730641884360-0f6bb86e70e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  unreal: "https://images.unsplash.com/photo-1726500087541-086687ae0391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
};

// ── Circles ───────────────────────────────────────────────────────────────────
export interface Circle {
  id: string;
  number: string;
  name: string;
  members: number;
  tags: string[];
  description: string;
  color: string;
  glowColor: string;
  image: string;
}

export const CIRCLES: Circle[] = [
  {
    id: "motion-design",
    number: "01",
    name: "Motion Design",
    members: 124,
    tags: ["Cinema 4D", "After Effects", "Houdini"],
    description: "A circle for motion designers, animators and VFX artists pushing the boundaries of time-based visuals.",
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.25)",
    image: "https://images.unsplash.com/photo-1763970540972-9479a63d6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "concept-art",
    number: "02",
    name: "Concept Art",
    members: 86,
    tags: ["Procreate", "Photoshop", "Blender"],
    description: "World builders and visual development artists defining the look of tomorrow's games and films.",
    color: "#c026d3",
    glowColor: "rgba(192,38,211,0.25)",
    image: "https://images.unsplash.com/photo-1764258057684-eade7d1615eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "3d-animation",
    number: "03",
    name: "3D Animation",
    members: 210,
    tags: ["Maya", "Unreal", "Rigging"],
    description: "Character animators, riggers, and technical directors bringing digital beings to life.",
    color: "#7c3aed",
    glowColor: "rgba(124,58,237,0.25)",
    image: "https://images.unsplash.com/photo-1759950616499-a7aa1b108f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "game-design",
    number: "04",
    name: "Game Design",
    members: 95,
    tags: ["Unity", "Design", "Prototyping"],
    description: "Designers, programmers and producers crafting interactive experiences that captivate players.",
    color: "#9333ea",
    glowColor: "rgba(147,51,234,0.25)",
    image: "https://images.unsplash.com/photo-1770320187495-4048d6be7f5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "storyboarding",
    number: "05",
    name: "Storyboarding",
    members: 42,
    tags: ["Storyboard", "Pre-vis", "Layout"],
    description: "Visual storytellers who translate scripts into compelling sequences before a single frame is rendered.",
    color: "#d946ef",
    glowColor: "rgba(217,70,239,0.25)",
    image: "https://images.unsplash.com/photo-1730641884360-0f6bb86e70e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "unreal-engine",
    number: "06",
    name: "Unreal Engine",
    members: 156,
    tags: ["Real-time", "Blueprint", "Niagara"],
    description: "Real-time creators leveraging Unreal Engine for film, broadcast, architectural vis, and games.",
    color: "#a21caf",
    glowColor: "rgba(162,28,175,0.25)",
    image: "https://images.unsplash.com/photo-1726500087541-086687ae0391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "visual-storytelling",
    number: "07",
    name: "Visual Storytelling",
    members: 78,
    tags: ["Direction", "Cinematography", "Editing"],
    description: "Directors, cinematographers and editors who harness the power of visuals to tell human stories.",
    color: "#6d28d9",
    glowColor: "rgba(109,40,217,0.25)",
    image: "https://images.unsplash.com/photo-1765210057733-54800ed95354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

// ── Members ───────────────────────────────────────────────────────────────────
export interface Member {
  id: string;
  name: string;
  initials: string;
  discipline: string;
  tags: string[];
  isMe?: boolean;
  circleIds: string[];
}

export const MEMBERS: Member[] = [
  { id: "me", name: "You", initials: "Y", discipline: "Creative", tags: [], isMe: true, circleIds: [] },
  { id: "m1", name: "Alex Chen", initials: "AC", discipline: "Motion Designer", tags: ["Cinema 4D", "AE"], circleIds: ["motion-design", "3d-animation"] },
  { id: "m2", name: "Lena Müller", initials: "LM", discipline: "Animator", tags: ["After Effects", "Houdini"], circleIds: ["motion-design", "storyboarding"] },
  { id: "m3", name: "Jordan Park", initials: "JP", discipline: "VFX Artist", tags: ["Houdini", "Nuke"], circleIds: ["motion-design", "unreal-engine"] },
  { id: "m4", name: "Mia Santos", initials: "MS", discipline: "Art Director", tags: ["Cinema 4D", "Redshift"], circleIds: ["motion-design", "concept-art"] },
  { id: "m5", name: "Theo Williams", initials: "TW", discipline: "3D Generalist", tags: ["Blender", "AE"], circleIds: ["3d-animation", "concept-art"] },
  { id: "m6", name: "Sofia Patel", initials: "SP", discipline: "Concept Artist", tags: ["Procreate", "PS"], circleIds: ["concept-art", "storyboarding"] },
  { id: "m7", name: "Riku Tanaka", initials: "RT", discipline: "Rigger", tags: ["Maya", "Python"], circleIds: ["3d-animation"] },
  { id: "m8", name: "Chiara Rossi", initials: "CR", discipline: "Game Designer", tags: ["Unity", "Figma"], circleIds: ["game-design"] },
  { id: "m9", name: "Finn Meyer", initials: "FM", discipline: "Unreal Dev", tags: ["Blueprint", "Niagara"], circleIds: ["unreal-engine", "game-design"] },
  { id: "m10", name: "Amara Diallo", initials: "AD", discipline: "Storyboard Artist", tags: ["Layout", "Pre-vis"], circleIds: ["storyboarding", "visual-storytelling"] },
  { id: "m11", name: "Leo Nakamura", initials: "LN", discipline: "Director", tags: ["Direction", "DaVinci"], circleIds: ["visual-storytelling"] },
  { id: "m12", name: "Priya Sharma", initials: "PS", discipline: "Technical Artist", tags: ["Unreal", "Houdini"], circleIds: ["unreal-engine", "3d-animation"] },
];

// ── Upcoming Events ───────────────────────────────────────────────────────────
export interface Event {
  id: string;
  type: string;
  typeColor: string;
  title: string;
  description: string;
  date: string;
  location: string;
  url: string;
}

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "e1",
    type: "Festival",
    typeColor: "#a855f7",
    title: "The Art Department Eindhoven 2026",
    description: "Three days of talks, workshops, screenings, and networking across film, animation, and games. The flagship Playgrounds event.",
    date: "15–17 April 2026",
    location: "Klokgebouw, Eindhoven",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "e2",
    type: "Workshop",
    typeColor: "#c026d3",
    title: "The Art Department 2026: In-Depth Day",
    description: "An extra day of deep-dive workshops and masterclasses for serious practitioners wanting to go beyond the surface.",
    date: "15 April 2026",
    location: "Klokgebouw, Eindhoven",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "e3",
    type: "Film Festival",
    typeColor: "#7c3aed",
    title: "Playgrounds International Film Festival 2026",
    description: "Five days celebrating the best in animated film, short film, and experimental cinema from studios around the world.",
    date: "15–19 April 2026",
    location: "Various venues, Eindhoven",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "e4",
    type: "Talk",
    typeColor: "#d946ef",
    title: "In Motion: London Edition",
    description: "A curated evening of motion design talks and screenings in the heart of London, featuring leading studios.",
    date: "28 May 2026",
    location: "London, UK",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "e5",
    type: "Exhibition",
    typeColor: "#9333ea",
    title: "Visual Futures: SXSW 2026",
    description: "Playgrounds presents a special exhibition and curated program at South by Southwest in Austin, Texas.",
    date: "8–15 March 2026",
    location: "Austin, TX",
    url: "https://weareplaygrounds.nl",
  },
];

// ── News ──────────────────────────────────────────────────────────────────────
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  url: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n1",
    title: "Pick your partner package and join the Industry Garden!",
    excerpt: "This year's Industry Garden brings together the best studios, publishers, and agencies. Find your perfect creative partner at the heart of the festival.",
    date: "10 Feb 2026",
    category: "Industry",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "n2",
    title: "In Motion is returning in London!",
    excerpt: "After a sold-out edition in Amsterdam, In Motion brings its curated showcase of motion design and visual culture to the UK capital this spring.",
    date: "22 Jan 2026",
    category: "Events",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "n3",
    title: "A touch of Next at SXSW 2026",
    excerpt: "Playgrounds is bringing the Next showcase to Austin this March — expect talks, hands-on workshops, and a special edition of the RePlay film programme.",
    date: "8 Jan 2026",
    category: "Festival",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "n4",
    title: "Announcing the 2026 Jury: Film & Animation Track",
    excerpt: "Meet the world-class jury that will be selecting the best in animated short film, experimental cinema, and immersive storytelling at this year's festival.",
    date: "5 Jan 2026",
    category: "Announcement",
    url: "https://weareplaygrounds.nl",
  },
  {
    id: "n5",
    title: "Early Bird tickets now live — save 30%",
    excerpt: "Limited early bird tickets for The Art Department Eindhoven 2026 are now available. Get yours before they sell out. Festival + In-Depth Day bundles included.",
    date: "20 Dec 2025",
    category: "Tickets",
    url: "https://weareplaygrounds.nl",
  },
];

// ── Timetable ─────────────────────────────────────────────────────────────────
export interface Session {
  id: string;
  time: string;
  endTime: string;
  title: string;
  speaker?: string;
  stage: string;
  type: "Keynote" | "Talk" | "Workshop" | "Panel" | "Screening" | "Social";
  description?: string;
}

export const TIMETABLE: Record<string, Session[]> = {
  "wed-15": [
    { id: "s1", time: "09:00", endTime: "10:00", title: "Opening Keynote: The Future of Creative Technology", speaker: "Jan de Graaf", stage: "Main Stage", type: "Keynote", description: "The state of the industry and where creative technology is heading in the next decade." },
    { id: "s2", time: "10:30", endTime: "11:30", title: "3D in Motion: Real-time Animation Workflows", speaker: "Alex Chen", stage: "Studio A", type: "Talk", description: "How to bridge the gap between 3D and motion design in a real-time pipeline." },
    { id: "s3", time: "11:00", endTime: "13:00", title: "Advanced Houdini VFX", speaker: "Jordan Park", stage: "Workshop Space", type: "Workshop", description: "Deep dive into Houdini proceduralism and VFX simulation techniques." },
    { id: "s4", time: "13:30", endTime: "14:30", title: "AI & the Creative Process: Friend or Foe?", speaker: "Mia Santos · Theo Williams", stage: "Main Stage", type: "Panel", description: "Industry leaders debate the role of AI tools in professional creative practice." },
    { id: "s5", time: "14:30", endTime: "15:30", title: "Screening: RePlay 2025 Highlights", stage: "Cinema Room", type: "Screening", description: "The best work from the previous year's Playgrounds festival, curated for 2026." },
    { id: "s6", time: "15:00", endTime: "17:00", title: "Unreal Engine 5 Masterclass", speaker: "Finn Meyer", stage: "Workshop Space", type: "Workshop", description: "Nanite, Lumen, and the full real-time pipeline from concept to final frame." },
    { id: "s7", time: "16:30", endTime: "17:30", title: "Game Design for Non-Gamers", speaker: "Chiara Rossi", stage: "Studio B", type: "Talk", description: "What film and animation creatives can learn from game design principles." },
    { id: "s8", time: "18:30", endTime: "21:00", title: "Opening Night: Creative Circles Gathering", stage: "Festival Ground", type: "Social", description: "Meet your circles, new friends, and industry legends in the festival garden." },
  ],
  "thu-16": [
    { id: "s9", time: "09:30", endTime: "10:30", title: "Storyboarding for Features: The Pre-vis Pipeline", speaker: "Amara Diallo", stage: "Studio A", type: "Talk" },
    { id: "s10", time: "10:30", endTime: "12:30", title: "Concept Art with AI Tools", speaker: "Sofia Patel", stage: "Workshop Space", type: "Workshop", description: "Practical techniques for using generative AI alongside traditional concept art workflows." },
    { id: "s11", time: "11:30", endTime: "12:30", title: "Keynote: New Frontiers in Film Animation", speaker: "Lena Müller", stage: "Main Stage", type: "Keynote", description: "A deep exploration of how animated storytelling is evolving across platforms and formats." },
    { id: "s12", time: "14:00", endTime: "15:00", title: "Indie Game Dev in 2026: The State of Play", speaker: "Chiara Rossi · Finn Meyer", stage: "Studio B", type: "Panel", description: "Four indie studios share what's working (and what isn't) in the current market." },
    { id: "s13", time: "15:30", endTime: "16:30", title: "Motion Design Showcase: 2025 Reels", stage: "Cinema Room", type: "Screening", description: "The year's best motion design work, selected by the Playgrounds jury." },
    { id: "s14", time: "16:30", endTime: "18:30", title: "Blueprint & Niagara in Production", speaker: "Finn Meyer", stage: "Workshop Space", type: "Workshop", description: "Visual scripting and particle effects for cinematic and game-ready results in Unreal Engine 5." },
    { id: "s15", time: "18:30", endTime: "21:00", title: "Studio After Hours", stage: "Festival Ground", type: "Social", description: "An evening of music, food, and conversation in the festival's outdoor space." },
  ],
  "fri-17": [
    { id: "s16", time: "10:00", endTime: "11:00", title: "Final Day Keynote: Craft in the Digital Age", speaker: "Leo Nakamura", stage: "Main Stage", type: "Keynote", description: "Why craft, intention, and human touch matter more than ever in an automated world." },
    { id: "s17", time: "11:30", endTime: "13:30", title: "Pre-vis & Layout: From Page to Picture", speaker: "Amara Diallo", stage: "Workshop Space", type: "Workshop", description: "How to communicate complex visual ideas before you pick up a camera or open a render farm." },
    { id: "s18", time: "14:00", endTime: "15:00", title: "From Student to Studio: Building a Creative Career", speaker: "Riku Tanaka · Priya Sharma", stage: "Studio A", type: "Talk", description: "Honest conversations about breaking into the industry and growing a sustainable creative career." },
    { id: "s19", time: "15:00", endTime: "16:00", title: "Panel: The Future of VFX", speaker: "Jordan Park · Priya Sharma", stage: "Main Stage", type: "Panel", description: "How advances in real-time and AI are reshaping the visual effects industry for artists." },
    { id: "s20", time: "16:30", endTime: "17:30", title: "Closing Ceremony & Awards 2026", stage: "Main Stage", type: "Keynote", description: "Celebrating the best work and people of The Art Department Eindhoven 2026." },
    { id: "s21", time: "18:30", endTime: "23:00", title: "Festival Closing Party", stage: "Festival Ground", type: "Social", description: "Send off The Art Department 2026 in style. Music, drinks, and good company." },
  ],
};

// ── Messages ──────────────────────────────────────────────────────────────────
export interface Message {
  id: string;
  from: string; // member id
  text: string;
  time: string;
}

export interface Thread {
  id: string;
  participantId: string;
  messages: Message[];
}

export const THREADS: Thread[] = [
  {
    id: "t1",
    participantId: "m1",
    messages: [
      { id: "msg1", from: "m1", text: "Hey! Are you attending the Houdini workshop on Wednesday?", time: "10:20" },
      { id: "msg2", from: "me", text: "Definitely! Really excited about it. Are you going too?", time: "10:22" },
      { id: "msg3", from: "m1", text: "Yes! Let's meet up beforehand — grab a coffee at the festival garden?", time: "10:24" },
    ],
  },
  {
    id: "t2",
    participantId: "m2",
    messages: [
      { id: "msg4", from: "m2", text: "Did you see the lineup for the Motion Design Showcase? So good!", time: "Yesterday" },
      { id: "msg5", from: "me", text: "Yes! The reel from Studio Aka alone is worth the whole trip.", time: "Yesterday" },
    ],
  },
  {
    id: "t3",
    participantId: "m6",
    messages: [
      { id: "msg6", from: "m6", text: "Welcome to the Concept Art circle! Are you bringing any work to show?", time: "Mon" },
    ],
  },
  {
    id: "t4",
    participantId: "m11",
    messages: [
      { id: "msg7", from: "m11", text: "Loved your portfolio — the texture work on your showreel is incredible.", time: "Sun" },
      { id: "msg8", from: "me", text: "Thank you so much Leo, that genuinely means a lot!", time: "Sun" },
      { id: "msg9", from: "m11", text: "If you're free on Friday after the closing, join us for dinner. The whole Circles crew.", time: "Sun" },
    ],
  },
];

// ── Gallery ───────────────────────────────────────────────────────────────────
export const GALLERY_IMAGES = [
  { id: "g1", url: "https://images.unsplash.com/photo-1747504858849-fde086e3680a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "The Art Department 2025" },
  { id: "g2", url: "https://images.unsplash.com/photo-1763970540972-9479a63d6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Motion Design Workshop" },
  { id: "g3", url: "https://images.unsplash.com/photo-1759950616499-a7aa1b108f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "3D Animation Showcase" },
  { id: "g4", url: "https://images.unsplash.com/photo-1770320187495-4048d6be7f5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Game Design Sprint" },
  { id: "g5", url: "https://images.unsplash.com/photo-1765210057733-54800ed95354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Opening Night" },
  { id: "g6", url: "https://images.unsplash.com/photo-1764258057684-eade7d1615eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Digital Art Exhibition" },
  { id: "g7", url: "https://images.unsplash.com/photo-1730641884360-0f6bb86e70e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Storyboard Masterclass" },
  { id: "g8", url: "https://images.unsplash.com/photo-1726500087541-086687ae0391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Unreal Engine Session" },
  { id: "g9", url: "https://images.unsplash.com/photo-1768818653161-0ad28dede131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", caption: "Community Portraits" },
];
