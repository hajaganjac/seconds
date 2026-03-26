import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MapPin, Bookmark, BookmarkCheck, Clock, ChevronRight } from "lucide-react";
import { TIMETABLE, Session } from "../data";
import { useApp } from "../AppContext";

const DAYS = [
  { id: "wed-15", label: "Wed 15", shortLabel: "Wed" },
  { id: "thu-16", label: "Thu 16", shortLabel: "Thu" },
  { id: "fri-17", label: "Fri 17", shortLabel: "Fri" },
];

const TYPE_STYLES: Record<Session["type"], { bg: string; color: string; border: string }> = {
  Keynote: { bg: "rgba(168,85,247,0.15)", color: "#c084fc", border: "rgba(168,85,247,0.3)" },
  Talk: { bg: "rgba(192,38,211,0.12)", color: "#e879f9", border: "rgba(192,38,211,0.25)" },
  Workshop: { bg: "rgba(6,182,212,0.1)", color: "#67e8f9", border: "rgba(6,182,212,0.2)" },
  Panel: { bg: "rgba(234,179,8,0.1)", color: "#fde047", border: "rgba(234,179,8,0.2)" },
  Screening: { bg: "rgba(239,68,68,0.1)", color: "#fca5a5", border: "rgba(239,68,68,0.2)" },
  Social: { bg: "rgba(34,197,94,0.1)", color: "#86efac", border: "rgba(34,197,94,0.2)" },
};

function SessionCard({ session, isMarked, onToggle }: { session: Session; isMarked: boolean; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const style = TYPE_STYLES[session.type];

  return (
    <motion.div
      layout
      className="rounded-[20px] overflow-hidden cursor-pointer"
      style={{ background: "rgba(12,12,16,0.8)", border: `1px solid rgba(255,255,255,${isMarked ? "0.12" : "0.06"})` }}
      onClick={() => setExpanded((e) => !e)}
      whileTap={{ scale: 0.99 }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Time column */}
          <div className="flex-shrink-0 text-center w-12">
            <span className="text-xs font-mono font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>{session.time}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
              >
                {session.type}
              </span>
              <span className="text-[10px] text-white/30">{session.stage}</span>
            </div>
            <h4 className="text-sm font-semibold text-white leading-snug mb-1">{session.title}</h4>
            {session.speaker && (
              <p className="text-xs text-white/45">{session.speaker}</p>
            )}

            <AnimatePresence>
              {expanded && session.description && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">{session.description}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-white/35 text-xs">
                    <Clock size={11} />
                    <span>{session.time} – {session.endTime}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bookmark */}
          <motion.button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            whileTap={{ scale: 0.85 }}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: isMarked ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)" }}
          >
            {isMarked
              ? <BookmarkCheck size={15} style={{ color: "#c084fc" }} />
              : <Bookmark size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
            }
          </motion.button>
        </div>
      </div>

      {isMarked && (
        <div
          className="h-0.5 mx-4 mb-0"
          style={{ background: "linear-gradient(to right, rgba(168,85,247,0.6), transparent)" }}
        />
      )}
    </motion.div>
  );
}

export default function Timetable() {
  const navigate = useNavigate();
  const { markedSessions, toggleSession } = useApp();
  const [activeDay, setActiveDay] = useState("wed-15");
  const sessions = TIMETABLE[activeDay] || [];
  const markedCount = sessions.filter((s) => markedSessions.includes(s.id)).length;

  return (
    <div className="min-h-[100dvh] pb-36 lg:pb-12">
      {/* Header */}
      <div className="pt-14 lg:pt-8 px-5 pb-5">
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft size={18} className="text-white/70" />
          </motion.button>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1
            className="font-display font-black italic text-white mb-2"
            style={{ fontSize: "clamp(2.2rem, 9vw, 3rem)", lineHeight: 0.9, letterSpacing: "-0.02em" }}
          >
            The Art<br />Department.
          </h1>
          <p className="text-sm text-white/50 mb-3">Eindhoven 2026 · 15–17 April</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <MapPin size={12} />
              <span>Klokgebouw, Eindhoven</span>
            </div>
            {markedCount > 0 && (
              <div
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.25)" }}
              >
                {markedCount} saved
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Day tabs */}
      <div className="px-5 mb-5">
        <div
          className="flex gap-2 p-1 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {DAYS.map((day) => (
            <motion.button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative"
              style={{ color: activeDay === day.id ? "white" : "rgba(255,255,255,0.4)" }}
            >
              {activeDay === day.id && (
                <motion.div
                  layoutId="dayTab"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.3),rgba(217,70,239,0.2))", border: "1px solid rgba(168,85,247,0.3)" }}
                />
              )}
              <span className="relative">{day.label} Apr</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sessions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.2 }}
          className="px-4 space-y-2.5"
        >
          {sessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <SessionCard
                session={session}
                isMarked={markedSessions.includes(session.id)}
                onToggle={() => toggleSession(session.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}