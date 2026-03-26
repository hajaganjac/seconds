import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, SlidersHorizontal, Users, ArrowUpRight, Search } from "lucide-react";
import { CIRCLES } from "../data";
import { useApp } from "../AppContext";
import { IcebreakerCard } from "../components/QuirkConnect";

const FILTERS = ["All", "Animation & VFX", "Illustration", "Games", "Film", "Real-time"];

const CIRCLE_CATEGORIES: Record<string, string> = {
  "motion-design": "Animation & VFX",
  "concept-art": "Illustration",
  "3d-animation": "Animation & VFX",
  "game-design": "Games",
  "storyboarding": "Film",
  "unreal-engine": "Real-time",
  "visual-storytelling": "Film",
};

export default function Discovery() {
  const navigate = useNavigate();
  const { joinedCircles } = useApp();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filtered = CIRCLES.filter((c) => {
    const matchesFilter = activeFilter === "All" || CIRCLE_CATEGORIES[c.id] === activeFilter;
    const matchesSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-[100dvh] pb-36 lg:pb-12">
      {/* Header */}
      <div className="pt-14 lg:pt-8 px-5 pb-5">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft size={18} className="text-white/70" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSearch((s) => !s)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: showSearch ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.06)", border: showSearch ? "1px solid rgba(168,85,247,0.3)" : "1px solid rgba(255,255,255,0.1)" }}
            >
              <Search size={17} style={{ color: showSearch ? "#c084fc" : "rgba(255,255,255,0.6)" }} />
            </motion.button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1
            className="font-display font-black italic text-white mb-2"
            style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)", lineHeight: 0.9 }}
          >
            Explore<br />Circles.
          </h1>
          <p className="text-sm text-white/50 mt-3">Connect through shared creative context.</p>
        </motion.div>

        {/* Search bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Search size={15} style={{ color: "rgba(255,255,255,0.35)" }} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search circles…"
                  className="bg-transparent flex-1 outline-none text-sm text-white placeholder:text-white/30"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter pills */}
      <div className="px-5 mb-5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveFilter(filter)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                activeFilter === filter
                  ? { background: "linear-gradient(135deg,#a855f7,#c026d3)", color: "white", boxShadow: "0 4px 16px rgba(168,85,247,0.3)" }
                  : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }
              }
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Community Icebreaker ── */}
      <IcebreakerCard />

      {/* Circles list */}
      <div className="px-4 space-y-3">
        <AnimatePresence>
          {filtered.map((circle, i) => {
            const joined = joinedCircles.includes(circle.id);
            return (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/circles/${circle.id}`)}
                className="relative cursor-pointer overflow-hidden group"
                style={{
                  borderRadius: 24,
                  background: "rgba(12,12,16,0.9)",
                  border: `1px solid ${joined ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl transition-opacity duration-300"
                  style={{ background: `linear-gradient(to bottom, ${circle.color}, transparent)`, opacity: joined ? 1 : 0 }}
                />

                {/* Background image */}
                <div className="absolute inset-0 opacity-10">
                  <img src={circle.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,5,5,0.8), transparent)" }} />
                </div>

                <div className="relative flex items-center gap-4 p-4 pl-5">
                  {/* Number */}
                  <div className="flex-shrink-0 text-center w-10">
                    <span className="text-2xl font-mono font-black" style={{ color: circle.color, opacity: 0.5 }}>
                      {circle.number}
                    </span>
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-black italic text-white text-lg leading-tight">{circle.name}</h3>
                      {joined && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc" }}>
                          Joined
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/40 mb-2">
                      <Users size={11} />
                      <span>{circle.members} members</span>
                      <span>·</span>
                      <span>{CIRCLE_CATEGORIES[circle.id]}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {circle.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <ArrowUpRight size={15} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/30 text-sm">No circles match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}