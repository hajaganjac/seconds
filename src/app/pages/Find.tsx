import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, UserPlus, Compass, Navigation, MessageCircle } from "lucide-react";
import { MEMBERS } from "../data";
import { useApp } from "../AppContext";
import { VibeStatusStrip, FlashHangBoard } from "../components/QuirkConnect";

// ── Collab Signal data ─────────────────────────────────────────────────────────
interface CollabSignal {
  id: string;
  memberId: string;
  looking: string;
  tags: string[];
  time: string;
  responded?: boolean;
}

const PRESET_SKILLS = [
  "Houdini artist 🌀", "After Effects wizard ✨", "Unity dev 🎮",
  "Concept artist 🎨", "Sound designer 🎵", "Storyboard partner ✏️",
  "Blender nerd 🍊", "Photo buddy 📸", "Networking pal 🤝",
];

const INITIAL_SIGNALS: CollabSignal[] = [
  { id: "cs1", memberId: "m2", looking: "Looking for a Houdini artist for a short film side project 🎬", tags: ["VFX", "Short Film"], time: "4m ago" },
  { id: "cs2", memberId: "m8", looking: "Anyone want to jam on a Unity prototype this weekend? ⚡", tags: ["Unity", "Game Jam"], time: "12m ago" },
  { id: "cs3", memberId: "m10", looking: "Open to storyboarding with someone — sharing ideas is more fun 🖊️", tags: ["Storyboard", "Collab"], time: "25m ago" },
  { id: "cs4", memberId: "m6", looking: "Looking for a compositing partner for my AE piece 🎨", tags: ["After Effects", "VFX"], time: "1h ago" },
];

// ── CollabSignalBoard ──────────────────────────────────────────────────────────
function CollabSignalBoard() {
  const { startThread } = useApp();
  const navigate = useNavigate();
  const [signals, setSignals] = useState<CollabSignal[]>(INITIAL_SIGNALS);
  const [mySignal, setMySignal] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handlePost = () => {
    const text = selectedTag
      ? `Looking for a ${selectedTag.replace(/[^\w\s]/g, "").trim()} to connect with 🤙`
      : mySignal.trim();
    if (!text) return;
    const newSignal: CollabSignal = {
      id: `cs-${Date.now()}`,
      memberId: "me",
      looking: text,
      tags: selectedTag ? [selectedTag.replace(/[^\w\s]/g, "").trim()] : ["Collab"],
      time: "just now",
    };
    setSignals((prev) => [newSignal, ...prev]);
    setPosting(true);
    setMySignal("");
    setSelectedTag(null);
    setShowForm(false);
    setTimeout(() => setPosting(false), 3000);
  };

  const handleRespond = (signal: CollabSignal) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === signal.id ? { ...s, responded: true } : s))
    );
    const threadId = startThread(signal.memberId);
    setTimeout(() => navigate(`/messages/${threadId}`), 350);
  };

  return (
    <div className="px-5 mb-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-black italic text-white text-2xl">Collab Signals.</h2>
          <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            who's looking for who
          </p>
        </div>
        {!posting && (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setShowForm((v) => !v)}
            className="px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: showForm
                ? "rgba(255,255,255,0.05)"
                : "rgba(168,85,247,0.12)",
              color: showForm ? "rgba(255,255,255,0.4)" : "#c084fc",
              border: showForm
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(168,85,247,0.25)",
            }}
          >
            {showForm ? "Cancel" : "+ Signal"}
          </motion.button>
        )}
        {posting && (
          <span
            className="text-[10px] px-2.5 py-1 rounded-full font-bold"
            style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            ✓ Signal live!
          </span>
        )}
      </div>

      {/* Post form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="signal-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden mb-4"
          >
            <div
              className="p-4 rounded-[20px]"
              style={{
                background: "rgba(11,11,15,0.97)",
                border: "1px solid rgba(168,85,247,0.15)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                Quick pick
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_SKILLS.slice(0, 6).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedTag(selectedTag === skill ? null : skill)}
                    className="px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all"
                    style={
                      selectedTag === skill
                        ? { background: "linear-gradient(135deg,#a855f7,#c026d3)", color: "white" }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.5)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }
                    }
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                Or write your own
              </p>
              <textarea
                value={mySignal}
                onChange={(e) => { setMySignal(e.target.value); setSelectedTag(null); }}
                placeholder="e.g. Looking for a sound designer to collab with at the festival 🎵"
                className="w-full bg-transparent outline-none text-white placeholder:text-white/20 resize-none text-xs leading-relaxed"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "10px 12px",
                  minHeight: 64,
                }}
                maxLength={120}
              />
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handlePost}
                disabled={!selectedTag && !mySignal.trim()}
                className="w-full mt-3 py-2.5 rounded-[14px] text-sm font-bold text-white"
                style={
                  selectedTag || mySignal.trim()
                    ? {
                        background: "linear-gradient(135deg,#a855f7,#d946ef)",
                        boxShadow: "0 4px 18px rgba(168,85,247,0.28)",
                      }
                    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)" }
                }
              >
                📡 Send my Signal
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signal list */}
      <div className="space-y-2.5">
        {signals.map((signal, i) => {
          const member = MEMBERS.find((m) => m.id === signal.memberId);
          const isMe = signal.memberId === "me";
          return (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.055 }}
              className="p-4 rounded-[20px]"
              style={{
                background: "rgba(12,12,16,0.9)",
                border: isMe
                  ? "1px solid rgba(168,85,247,0.2)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: isMe ? "0 0 20px rgba(168,85,247,0.06)" : "none",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
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
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-[11px] font-semibold" style={{ color: isMe ? "#c084fc" : "rgba(255,255,255,0.5)" }}>
                      {isMe ? "You" : member?.name} · {signal.time}
                    </p>
                  </div>
                  <p className="text-sm text-white/80 leading-snug mb-2">{signal.looking}</p>
                  <div className="flex items-center gap-1.5">
                    {signal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {!isMe && (
                  <motion.button
                    whileTap={{ scale: 0.86 }}
                    onClick={() => handleRespond(signal)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full flex-shrink-0 font-bold transition-all"
                    style={{
                      fontSize: 10,
                      background: signal.responded
                        ? "rgba(34,197,94,0.1)"
                        : "rgba(168,85,247,0.1)",
                      color: signal.responded ? "#4ade80" : "#c084fc",
                      border: signal.responded
                        ? "1px solid rgba(34,197,94,0.22)"
                        : "1px solid rgba(168,85,247,0.22)",
                    }}
                  >
                    {signal.responded ? (
                      "✓ Replied!"
                    ) : (
                      <>
                        <MessageCircle size={10} />
                        <span>Reply</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Compass view ───────────────────────────────────────────────────────────────
function CompassView({ name, onBack }: { name: string; onBack: () => void }) {
  const [angle] = useState(() => Math.random() * 360);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center max-w-[430px] left-1/2 -translate-x-1/2"
      style={{ background: "#050505" }}
    >
      <motion.button
        onClick={onBack}
        className="absolute top-14 left-5 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <ArrowLeft size={18} className="text-white/70" />
      </motion.button>

      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Tracking</p>
        <h2 className="font-display font-black italic text-white text-3xl">{name}</h2>
      </div>

      {/* Compass */}
      <div className="relative w-64 h-64 mb-12">
        {[1, 0.7, 0.4].map((opacity, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              inset: `${i * 24}px`,
              borderColor: `rgba(168,85,247,${opacity * 0.2})`,
              background: i === 2 ? "rgba(168,85,247,0.04)" : "transparent",
            }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-1 h-20 rounded-full" style={{ background: "linear-gradient(to bottom,#c084fc,transparent)" }} />
            <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg,#a855f7,#d946ef)", boxShadow: "0 0 20px rgba(168,85,247,0.6)" }} />
            <div className="w-1 h-12 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
        </div>
      </div>

      <div
        className="px-6 py-4 rounded-2xl text-center"
        style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
      >
        <p className="text-2xl font-black font-display italic text-white">~240 m</p>
        <p className="text-xs text-white/40 mt-1">estimated distance</p>
      </div>
    </motion.div>
  );
}

// ── Main Find page ─────────────────────────────────────────────────────────────
export default function Find() {
  const navigate = useNavigate();
  const { friends, toggleFriend } = useApp();
  const [tracking, setTracking] = useState<string | null>(null);

  const friendMembers = MEMBERS.filter((m) => friends.includes(m.id) && !m.isMe);
  const suggestions = MEMBERS.filter((m) => !friends.includes(m.id) && !m.isMe).slice(0, 4);
  const trackingMember = MEMBERS.find((m) => m.id === tracking);

  return (
    <>
      {tracking && trackingMember && (
        <CompassView name={trackingMember.name} onBack={() => setTracking(null)} />
      )}

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

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="font-display font-black italic text-white mb-2"
              style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)", lineHeight: 0.9 }}
            >
              Find<br />Friends.
            </h1>
            <p className="text-sm text-white/50 mt-3">Track friends, find collabs, don't be lonely.</p>
          </motion.div>
        </div>

        {/* ── 1. Live Vibes — who's around right now ── */}
        <VibeStatusStrip />

        {/* ── 2. Flash Hangs — quick meetup spots ── */}
        <FlashHangBoard />

        {/* ── 3. Track your friends ── */}
        <div className="px-5 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            Track friends
          </p>
          {friendMembers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-10 rounded-[24px] text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(168,85,247,0.1)" }}>
                <Compass size={24} style={{ color: "#c084fc" }} />
              </div>
              <p className="text-sm text-white/50">Add friends from circles or messages to track them here.</p>
            </motion.div>
          ) : (
            <div className="space-y-2.5">
              {friendMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setTracking(member.id)}
                  className="flex items-center gap-3 p-4 rounded-[20px] cursor-pointer"
                  style={{ background: "rgba(12,12,16,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}
                  >
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-white/40">{member.discipline}</p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc" }}
                  >
                    <Navigation size={11} />
                    Track
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── 4. Collab Signals ── */}
        <CollabSignalBoard />

        {/* ── 5. Suggested friends ── */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Suggested Friends</h2>
          </div>
          <div className="space-y-2.5">
            {suggestions.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3 p-4 rounded-[20px]"
                style={{ background: "rgba(12,12,16,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {member.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-white/40">{member.discipline}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFriend(member.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)" }}
                >
                  <UserPlus size={15} style={{ color: "#c084fc" }} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}