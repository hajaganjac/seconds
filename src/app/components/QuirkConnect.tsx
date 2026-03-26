import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock } from "lucide-react";
import { useApp } from "../AppContext";
import { MEMBERS } from "../data";

// ── Types ──────────────────────────────────────────────────────────────────────
interface FlashHang {
  id: string;
  memberId: string;
  location: string;
  duration: string;
  time: string;
  locEmoji: string;
  joined?: boolean;
}

// ── Static Data ────────────────────────────────────────────────────────────────
const VIBE_DATA = [
  { memberId: "m1",  emoji: "☕", status: "At coffee corner" },
  { memberId: "m2",  emoji: "🔥", status: "Hype mode"       },
  { memberId: "m3",  emoji: "🌿", status: "Garden chillin'" },
  { memberId: "m4",  emoji: "🎯", status: "Networking mode" },
  { memberId: "m5",  emoji: "😅", status: "Totally not lost"},
  { memberId: "m6",  emoji: "🎧", status: "In a session"    },
  { memberId: "m7",  emoji: "🍕", status: "Grabbing food"   },
  { memberId: "m8",  emoji: "🤝", status: "Open to chat!"   },
  { memberId: "m9",  emoji: "🤯", status: "Mind = blown"    },
  { memberId: "m10", emoji: "✏️", status: "Sketching ideas" },
];

const ICEBREAKERS = [
  { question: "Cinema 4D or Blender?",        optA: "Cinema 4D 🎬",      optB: "Blender 🍊",         votesA: 234, votesB: 89  },
  { question: "Festival vibe check:",          optA: "Front row energy 🙋", optB: "Back row lurker 🕵️", votesA: 156, votesB: 201 },
  { question: "Preferred creative fuel:",      optA: "☕ Coffee",           optB: "🍺 Beer",             votesA: 312, votesB: 145 },
  { question: "Dream collab partner:",         optA: "Houdini wizard 🌀",  optB: "AE wizard ✨",        votesA: 178, votesB: 195 },
  { question: "Render farm or bust?",          optA: "Real-time only ⚡",  optB: "Offline render 🏔️",  votesA: 220, votesB: 130 },
  { question: "How do you carry your laptop?", optA: "Backpack 🎒",        optB: "Tote bag 🛍️",         votesA: 290, votesB: 160 },
  { question: "Festival mode:",                optA: "Plan every session 📋", optB: "Vibe it out 🌊",   votesA: 145, votesB: 275 },
];

const LOCATIONS = [
  { label: "🌿 Garden",    value: "Festival Garden" },
  { label: "☕ Coffee Bar", value: "Coffee Bar"      },
  { label: "🎯 Studio A",  value: "Studio A"        },
  { label: "🎪 Main Stage",value: "Main Stage"      },
  { label: "🍕 Food Court",value: "Food Court"      },
  { label: "🛋️ Chill Zone",value: "Chill Zone"      },
];

const DURATIONS = ["10 min", "20 min", "30 min", "1 hr"];

const INITIAL_HANGS: FlashHang[] = [
  { id: "fh1", memberId: "m11", location: "Festival Garden", duration: "20 min", time: "2m ago",  locEmoji: "🌿" },
  { id: "fh2", memberId: "m9",  location: "Coffee Bar",      duration: "15 min", time: "5m ago",  locEmoji: "☕" },
  { id: "fh3", memberId: "m4",  location: "Main Stage",      duration: "30 min", time: "11m ago", locEmoji: "🎪" },
];

// ── VibeStatusStrip ────────────────────────────────────────────────────────────
export function VibeStatusStrip() {
  const { startThread: _startThread } = useApp();
  const [wavedAt, setWavedAt] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const handleWave = (memberId: string, firstName: string) => {
    if (wavedAt.has(memberId)) return;
    setWavedAt((prev) => new Set([...prev, memberId]));
    setToast(`👋 Waved at ${firstName}!`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="mb-10 relative">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 8, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.88 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full text-xs font-bold text-white pointer-events-none whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg,#a855f7,#d946ef)",
              boxShadow: "0 4px 20px rgba(168,85,247,0.45)",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section header */}
      <div className="flex items-center justify-between px-5 mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ background: "#4ade80" }}
          />
          <h3 className="font-display font-black italic text-white text-2xl">Live Vibes.</h3>
        </div>
        <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>
          who's around
        </span>
      </div>

      {/* Scroll row */}
      <div className="flex gap-3.5 px-5 overflow-x-auto scrollbar-hide pb-2">
        {VIBE_DATA.map((vs, i) => {
          const member = MEMBERS.find((m) => m.id === vs.memberId);
          if (!member) return null;
          const waved = wavedAt.has(vs.memberId);
          const firstName = member.name.split(" ")[0];

          return (
            <motion.div
              key={vs.memberId}
              initial={{ opacity: 0, scale: 0.7, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.055, type: "spring", stiffness: 240, damping: 20 }}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
              style={{ minWidth: 72 }}
            >
              {/* Avatar + emoji badge */}
              <div className="relative mb-0.5">
                <div
                  className="w-13 h-13 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    width: 52,
                    height: 52,
                    background: waved
                      ? "linear-gradient(135deg,rgba(168,85,247,0.3),rgba(217,70,239,0.2))"
                      : "rgba(168,85,247,0.1)",
                    color: "#c084fc",
                    border: waved
                      ? "2px solid rgba(168,85,247,0.55)"
                      : "2px solid rgba(168,85,247,0.2)",
                    boxShadow: waved ? "0 0 16px rgba(168,85,247,0.28)" : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {member.initials}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2"
                  style={{ background: "#0a0a0f", borderColor: "#050505", fontSize: 13 }}
                >
                  {vs.emoji}
                </div>
              </div>

              <p
                className="text-white/75 text-center font-semibold truncate w-full"
                style={{ fontSize: 10.5 }}
              >
                {firstName}
              </p>
              <p
                className="text-center text-white/32 leading-tight w-full"
                style={{ fontSize: 9 }}
              >
                {vs.status}
              </p>

              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => handleWave(member.id, firstName)}
                className="px-2 py-1 rounded-full font-bold transition-all"
                style={{
                  fontSize: 9.5,
                  background: waved ? "rgba(34,197,94,0.1)" : "rgba(168,85,247,0.1)",
                  color: waved ? "#4ade80" : "#c084fc",
                  border: waved
                    ? "1px solid rgba(34,197,94,0.3)"
                    : "1px solid rgba(168,85,247,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                {waved ? "✓ Waved!" : "👋 Wave"}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── IcebreakerCard ─────────────────────────────────────────────────────────────
export function IcebreakerCard() {
  // Cycle through questions based on day of week + hour so it feels fresh
  const idx = (new Date().getDay() * 3 + new Date().getHours()) % ICEBREAKERS.length;
  const today = ICEBREAKERS[idx];

  const [voted, setVoted] = useState<"a" | "b" | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const totalVotes = today.votesA + today.votesB + (voted ? 1 : 0);
  const votesA = today.votesA + (voted === "a" ? 1 : 0);
  const votesB = today.votesB + (voted === "b" ? 1 : 0);
  const pctA = Math.round((votesA / totalVotes) * 100);
  const pctB = 100 - pctA;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          key="icebreaker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -10 }}
          className="mx-5 mb-8 rounded-[24px] overflow-hidden relative"
          style={{
            background: "rgba(11,11,15,0.97)",
            border: "1px solid rgba(168,85,247,0.15)",
            boxShadow: "0 0 48px rgba(168,85,247,0.06), 0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* Ambient glow top-right */}
          <div
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)" }}
          />

          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontSize: 11 }}
          >
            ✕
          </button>

          <div className="p-5">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="text-xl">🎲</div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#c084fc" }}>
                  Daily Icebreaker
                </p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.28)" }}>
                  See what the festival thinks
                </p>
              </div>
            </div>

            <h3
              className="font-display font-black italic text-white mb-4"
              style={{ fontSize: "clamp(1.15rem,5vw,1.4rem)", lineHeight: 1.15 }}
            >
              {today.question}
            </h3>

            {/* Pre-vote */}
            {!voted && (
              <div className="grid grid-cols-2 gap-2.5">
                {(["a", "b"] as const).map((side) => (
                  <motion.button
                    key={side}
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setVoted(side)}
                    className="py-3.5 px-3 rounded-[16px] text-xs font-semibold text-white text-center leading-snug"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {side === "a" ? today.optA : today.optB}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Post-vote results */}
            {voted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {[
                  { label: today.optA, pct: pctA, side: "a" as const },
                  { label: today.optB, pct: pctB, side: "b" as const },
                ].map(({ label, pct, side }) => (
                  <div key={side}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="text-xs font-medium text-white/75 truncate">{label}</span>
                        {voted === side && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0"
                            style={{ background: "rgba(168,85,247,0.18)", color: "#c084fc" }}
                          >
                            You
                          </span>
                        )}
                      </div>
                      <span
                        className="text-sm font-black font-display italic flex-shrink-0 ml-2"
                        style={{ color: voted === side ? "#c084fc" : "rgba(255,255,255,0.32)" }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            voted === side
                              ? "linear-gradient(90deg,#a855f7,#d946ef)"
                              : "rgba(255,255,255,0.14)",
                        }}
                      />
                    </div>
                  </div>
                ))}
                <p
                  className="text-[10px] text-center pt-0.5"
                  style={{ color: "rgba(255,255,255,0.22)" }}
                >
                  {totalVotes.toLocaleString()} festival creatives voted today
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── FlashHangBoard ─────────────────────────────────────────────────────────────
export function FlashHangBoard() {
  const [hangs, setHangs] = useState<FlashHang[]>(INITIAL_HANGS);
  const [selectedLoc, setSelectedLoc] = useState<string | null>(null);
  const [selectedDur, setSelectedDur] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [myHangActive, setMyHangActive] = useState(false);

  const handleDrop = () => {
    if (!selectedLoc || !selectedDur) return;
    const locObj = LOCATIONS.find((l) => l.value === selectedLoc);
    const newHang: FlashHang = {
      id: `fh-${Date.now()}`,
      memberId: "me",
      location: selectedLoc,
      duration: selectedDur,
      time: "just now",
      locEmoji: locObj?.label.split(" ")[0] || "⚡",
    };
    setHangs((prev) => [newHang, ...prev]);
    setMyHangActive(true);
    setExpanded(false);
  };

  const handleJoin = (hangId: string) => {
    setHangs((prev) =>
      prev.map((h) => (h.id === hangId ? { ...h, joined: true } : h))
    );
  };

  return (
    <div className="px-5 mb-10">
      <div
        className="rounded-[24px] overflow-hidden"
        style={{
          background: "rgba(11,11,15,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 p-4 cursor-pointer select-none"
          onClick={() => !myHangActive && setExpanded((e) => !e)}
        >
          <div
            className="w-9 h-9 rounded-[12px] flex items-center justify-center text-base flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,rgba(168,85,247,0.18),rgba(217,70,239,0.12))",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            ⚡
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white">Flash Hangs</h3>
            <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.32)" }}>
              "I'm at [X] for a bit — who's joining?"
            </p>
          </div>
          {myHangActive ? (
            <span
              className="text-[10px] px-2.5 py-1 rounded-full font-bold flex-shrink-0"
              style={{
                background: "rgba(34,197,94,0.1)",
                color: "#4ade80",
                border: "1px solid rgba(34,197,94,0.22)",
              }}
            >
              ✓ You're live!
            </span>
          ) : (
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
              className="px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0"
              style={{
                background: "rgba(168,85,247,0.12)",
                color: "#c084fc",
                border: "1px solid rgba(168,85,247,0.25)",
              }}
            >
              + Drop
            </motion.button>
          )}
        </div>

        {/* Expand form */}
        <AnimatePresence>
          {expanded && !myHangActive && (
            <motion.div
              key="form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div
                className="px-4 pb-5 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Where are you?
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.value}
                      onClick={() => setSelectedLoc(loc.value)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={
                        selectedLoc === loc.value
                          ? { background: "linear-gradient(135deg,#a855f7,#c026d3)", color: "white" }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              color: "rgba(255,255,255,0.5)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>

                <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                  For how long?
                </p>
                <div className="flex gap-2 mb-5">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDur(d)}
                      className="flex-1 py-2 rounded-[12px] text-xs font-semibold transition-all"
                      style={
                        selectedDur === d
                          ? { background: "linear-gradient(135deg,#a855f7,#c026d3)", color: "white" }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              color: "rgba(255,255,255,0.48)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDrop}
                  disabled={!selectedLoc || !selectedDur}
                  className="w-full py-3 rounded-[16px] text-sm font-bold text-white"
                  style={
                    selectedLoc && selectedDur
                      ? {
                          background: "linear-gradient(135deg,#a855f7,#d946ef)",
                          boxShadow: "0 4px 20px rgba(168,85,247,0.32)",
                        }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)" }
                  }
                >
                  ⚡ Drop my Flash Hang
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active hangs */}
        {hangs.length > 0 && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {hangs.map((hang, i) => {
              const member = MEMBERS.find((m) => m.id === hang.memberId);
              const isMe = hang.memberId === "me";

              return (
                <motion.div
                  key={hang.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{
                    borderBottom: i < hangs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={
                      isMe
                        ? {
                            background: "linear-gradient(135deg,rgba(168,85,247,0.28),rgba(217,70,239,0.18))",
                            color: "#c084fc",
                            border: "1px solid rgba(168,85,247,0.35)",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(255,255,255,0.09)",
                          }
                    }
                  >
                    {isMe ? "Me" : member?.initials || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/80 truncate">
                      {hang.locEmoji} {hang.location}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={9} style={{ color: "rgba(255,255,255,0.22)" }} />
                      <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)" }}>
                        {isMe ? "You" : member?.name?.split(" ")[0]} · {hang.duration} · {hang.time}
                      </span>
                    </div>
                  </div>
                  {!isMe && (
                    <motion.button
                      whileTap={{ scale: 0.86 }}
                      onClick={() => handleJoin(hang.id)}
                      className="px-2.5 py-1.5 rounded-full font-bold flex-shrink-0 transition-all"
                      style={{
                        fontSize: 10,
                        background: hang.joined ? "rgba(34,197,94,0.1)" : "rgba(168,85,247,0.1)",
                        color: hang.joined ? "#4ade80" : "#c084fc",
                        border: hang.joined
                          ? "1px solid rgba(34,197,94,0.22)"
                          : "1px solid rgba(168,85,247,0.22)",
                      }}
                    >
                      {hang.joined ? "✓ Joining!" : "Join! 🙌"}
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
