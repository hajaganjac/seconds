import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Calendar, Search, MessageCircle, User, ArrowUpRight,
  Newspaper, ChevronRight, ExternalLink, Zap, X
} from "lucide-react";
import { CIRCLES, UPCOMING_EVENTS, NEWS_ITEMS, IMAGES } from "../data";
import { useApp } from "../AppContext";

// ── Search Overlay ─────────────────────────────────────────────────────────────
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, []);

  const results = query.length > 1
    ? [
        ...CIRCLES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).map((c) => ({ type: "Circle", label: c.name, path: `/circles/${c.id}` })),
        ...UPCOMING_EVENTS.filter((e) => e.title.toLowerCase().includes(query.toLowerCase())).map((e) => ({ type: "Event", label: e.title, path: `/events/${e.id}` })),
        ...NEWS_ITEMS.filter((n) => n.title.toLowerCase().includes(query.toLowerCase())).map((n) => ({ type: "News", label: n.title, path: "/news" })),
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(24px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="pt-16 px-5">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-6"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <Search size={17} style={{ color: "rgba(255,255,255,0.4)" }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search circles, events, sessions…"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30"
            style={{ fontSize: 15 }}
          />
          <button onClick={onClose} className="text-sm font-medium" style={{ color: "#c084fc" }}>
            Cancel
          </button>
        </motion.div>

        {query.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Trending</p>
            <div className="flex flex-wrap gap-2">
              {["Motion Design", "Houdini", "SXSW 2026", "In Motion London", "RePlay"].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="px-3 py-1.5 rounded-full text-sm transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.6)" }}
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {results.length > 0 && (
          <div className="space-y-1.5">
            {results.map((r, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => { navigate(r.path); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left"
                style={{ background: "rgba(255,255,255,0.04)" }}
                whileHover={{ background: "rgba(255,255,255,0.07)" } as any}
              >
                <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc" }}>
                  {r.type}
                </span>
                <span className="text-white/75 text-sm flex-1 truncate">{r.label}</span>
                <ChevronRight size={13} className="text-white/25" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Home ──────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const { profile } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const displayName = profile.name || "Creative";

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className="relative">
      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="min-h-[100dvh] pb-36 lg:pb-12"
      >
        {/* ── Header ── */}
        <motion.div variants={itemVariants} className="flex items-center justify-between px-5 pt-14 lg:pt-8 pb-5">
          <div>
            <h1 className="font-display text-2xl font-black italic tracking-tight text-white">
              PLAYGROUNDS.
            </h1>
            <p className="text-xs text-white/40 mt-0.5">
              Welcome back, <span className="text-white/65">{displayName}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Search size={17} className="text-white/65" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => navigate("/messages")}
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <MessageCircle size={17} className="text-white/65" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg,#a855f7,#d946ef)" }}>4</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => navigate("/profile/me/view")}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.2),rgba(217,70,239,0.15))", border: "1px solid rgba(168,85,247,0.3)" }}
            >
              <User size={17} style={{ color: "#c084fc" }} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Hero Card ── */}
        <motion.div variants={itemVariants} className="px-4 mb-8">
          <motion.div
            onClick={() => navigate("/timetable")}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative cursor-pointer overflow-hidden"
            style={{
              borderRadius: 32,
              height: "min(440px, 52vh)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 60px rgba(168,85,247,0.12)",
            }}
          >
            <img src={IMAGES.hero} alt="Festival" className="absolute inset-0 w-full h-full object-cover" />

            {/* Gradient overlay */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.05) 0%, rgba(5,5,5,0.25) 35%, rgba(5,5,5,0.88) 75%, #050505 100%)" }} />

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)" }} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <div className="flex items-center gap-2 mb-4">
                <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full" style={{ background: "#e879f9" }} />
                <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.35)", color: "#e9a8fd" }}>
                  Upcoming
                </span>
              </div>
              <h2 className="font-display font-black italic text-white mb-2"
                style={{ fontSize: "clamp(2.2rem, 9vw, 3rem)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
                The Art<br />Department.
              </h2>
              <p className="text-sm text-white/65 mb-4 max-w-[280px]">
                Design & craftsmanship in film, animation and games.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-white/55 text-xs">
                  <MapPin size={12} /><span>Eindhoven, NL</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/55 text-xs">
                  <Calendar size={12} /><span>15 – 17 Apr 2026</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* ── About & CTAs ── */}
        <motion.div variants={itemVariants} className="px-5 mb-10">
          <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.52)" }}>
            Playgrounds is an institute and platform that connects and forms international creative communities
            within the fields of illustration, animation, film, games, digital design and art.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: "Upcoming events", path: "/events", primary: true },
              { label: "Festival gallery", path: "/gallery" },
              { label: "Watch RePlay", path: "#", external: true },
            ].map((btn) => (
              <motion.button
                key={btn.label}
                whileTap={{ scale: 0.94 }}
                onClick={() => btn.path !== "#" && navigate(btn.path)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={
                  btn.primary
                    ? { background: "linear-gradient(135deg,#a855f7,#c026d3)", color: "white", boxShadow: "0 4px 18px rgba(168,85,247,0.35)" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)" }
                }
              >
                {btn.external && <ExternalLink size={13} />}
                {btn.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Upcoming Events ── */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center justify-between px-5 mb-4">
            <h3 className="font-display font-black italic text-white text-2xl" style={{ letterSpacing: "-0.01em" }}>
              Upcoming.
            </h3>
            <button onClick={() => navigate("/events")}
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#c084fc" }}>
              All events <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide pb-1">
            {UPCOMING_EVENTS.slice(0, 3).map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                onClick={() => navigate(`/events/${event.id}`)}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 cursor-pointer rounded-[22px] p-4 flex flex-col gap-3"
                style={{
                  minWidth: "min(255px, 70vw)",
                  background: "rgba(14,14,18,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${event.typeColor}1a`, color: event.typeColor, border: `1px solid ${event.typeColor}33` }}>
                    {event.type}
                  </span>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{event.date}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-snug mb-1">{event.title}</h4>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.42)" }}>{event.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs mt-auto" style={{ color: "rgba(255,255,255,0.38)" }}>
                  <MapPin size={11} /><span>{event.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Creative Circles Marquee ── */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center justify-between px-5 mb-5">
            <h3 className="font-display font-black italic text-white"
              style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)", lineHeight: 0.92 }}>
              Creative<br />Circles.
            </h3>
            <button onClick={() => navigate("/discovery")}
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest self-start"
              style={{ color: "#c084fc" }}>
              View all <ChevronRight size={13} />
            </button>
          </div>

          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #050505, transparent)" }} />

            <div className="flex marquee-track gap-3 pl-5">
              {[...CIRCLES, ...CIRCLES].map((circle, i) => (
                <motion.div
                  key={`${circle.id}-${i}`}
                  onClick={() => navigate(`/circles/${circle.id}`)}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-shrink-0 cursor-pointer relative overflow-hidden"
                  style={{
                    width: "min(275px, 78vw)",
                    height: "clamp(200px, 45vw, 228px)",
                    borderRadius: 28,
                    background: "rgba(11,11,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: `0 4px 28px ${circle.glowColor}`,
                  }}
                >
                  <div className="absolute inset-0">
                    <img src={circle.image} alt={circle.name} className="w-full h-full object-cover opacity-18" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(5,5,5,0.6) 0%,transparent 55%)" }} />
                  </div>
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-50"
                    style={{ background: `radial-gradient(circle, ${circle.color}45 0%, transparent 70%)` }} />

                  <div className="relative p-5 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-auto">
                      <span className="text-xs font-mono font-black tracking-widest" style={{ color: circle.color }}>
                        {circle.number}
                      </span>
                      <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.28)" }} />
                    </div>
                    <div className="mt-auto">
                      <h4 className="font-display font-black italic text-white text-xl leading-tight mb-1">{circle.name}</h4>
                      <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.42)" }}>{circle.members} creatives</p>
                      <div className="flex flex-wrap gap-1.5">
                        {circle.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── News ── */}
        <motion.div variants={itemVariants} className="px-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-black italic text-white text-2xl" style={{ letterSpacing: "-0.01em" }}>News.</h3>
            <button onClick={() => navigate("/news")}
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#c084fc" }}>
              All news <ChevronRight size={13} />
            </button>
          </div>
          <div className="space-y-2">
            {NEWS_ITEMS.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => navigate("/news")}
                whileTap={{ scale: 0.98 }}
                className="flex items-start gap-3 p-4 rounded-[20px] cursor-pointer group"
                style={{ background: "rgba(11,11,15,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.18)" }}>
                  <Newspaper size={15} style={{ color: "#c084fc" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2 flex-1">{item.title}</h4>
                    <ArrowUpRight size={13} className="flex-shrink-0 mt-0.5 text-white/18 group-hover:text-white/55 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#c084fc" }}>{item.category}</span>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.28)" }}>· {item.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div variants={itemVariants} className="px-5 mb-6">
          <div className="rounded-[22px] p-5 flex items-center justify-around"
            style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.11)" }}>
            {[{ value: "791", label: "Creatives" }, { value: "7", label: "Circles" }, { value: "21", label: "Sessions" }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-black text-2xl italic" style={{ color: "#c084fc" }}>{s.value}</div>
                <div className="text-[11px] uppercase tracking-widest mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tip ── */}
        <motion.div variants={itemVariants} className="px-5">
          <div className="rounded-[18px] p-4 flex items-start gap-3"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.055)" }}>
            <Zap size={15} style={{ color: "#c084fc" }} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>Festival tip</p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                Join circles to meet like-minded creatives before the festival — the best conversations happen before the doors even open.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}