import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, Plus, User, X, MessageCircle } from "lucide-react";
import { MEMBERS } from "../data";
import { useApp } from "../AppContext";

export default function Messages() {
  const navigate = useNavigate();
  const { threads, startThread, profile } = useApp();
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);

  const getMember = (id: string) => MEMBERS.find((m) => m.id === id);

  const filteredThreads = threads.filter((t) => {
    const member = getMember(t.participantId);
    return !search || member?.name.toLowerCase().includes(search.toLowerCase());
  });

  const lastMsg = (threadId: string) => {
    const t = threads.find((th) => th.id === threadId);
    const msgs = t?.messages || [];
    return msgs[msgs.length - 1];
  };

  return (
    <div className="min-h-[100dvh] pb-36 lg:pb-12">
      {/* Header */}
      <div className="pt-14 lg:pt-8 px-5 pb-5">
        <div className="flex items-center justify-between mb-5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft size={18} className="text-white/70" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNew(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#a855f7,#d946ef)", boxShadow: "0 4px 16px rgba(168,85,247,0.35)" }}
          >
            <Plus size={18} className="text-white" />
          </motion.button>
        </div>

        <h1 className="font-display font-black italic text-white text-3xl mb-4" style={{ letterSpacing: "-0.01em" }}>
          Messages.
        </h1>

        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-3"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <Search size={15} style={{ color: "rgba(255,255,255,0.35)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={14} className="text-white/30" />
            </button>
          )}
        </div>
      </div>

      {/* My profile quick link */}
      <div className="px-5 mb-4">
        <motion.button
          onClick={() => navigate("/profile/me/view")}
          className="w-full flex items-center gap-3 p-4 rounded-[20px]"
          style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.3),rgba(217,70,239,0.2))", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <User size={18} style={{ color: "#c084fc" }} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-white">You</p>
            <p className="text-xs" style={{ color: "#c084fc" }}>View my profile</p>
          </div>
        </motion.button>
      </div>

      {/* Thread list */}
      <div className="px-5 space-y-2">
        <AnimatePresence>
          {filteredThreads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <MessageCircle size={36} className="text-white/15" />
              <p className="text-sm text-white/35">No conversations yet. Start one!</p>
            </div>
          ) : (
            filteredThreads.map((thread, i) => {
              const member = getMember(thread.participantId);
              const last = lastMsg(thread.id);
              if (!member) return null;
              return (
                <motion.button
                  key={thread.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/messages/${thread.id}`)}
                  className="w-full flex items-center gap-3 p-4 rounded-[20px] text-left"
                  style={{ background: "rgba(12,12,16,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}
                  >
                    {member.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-semibold text-white">{member.name}</span>
                      {last && <span className="text-[11px] text-white/30 flex-shrink-0">{last.time}</span>}
                    </div>
                    {last && (
                      <p className="text-xs text-white/45 truncate">
                        {last.from === "me" ? "You: " : ""}{last.text}
                      </p>
                    )}
                  </div>
                </motion.button>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* New chat overlay */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col max-w-[430px] left-1/2 -translate-x-1/2"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center justify-between px-5 pt-14 pb-5">
              <h2 className="font-display font-black italic text-white text-2xl">New Chat</h2>
              <button onClick={() => setShowNew(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)" }}>
                <X size={18} className="text-white/70" />
              </button>
            </div>
            <div className="px-5 space-y-2 overflow-y-auto">
              {MEMBERS.filter((m) => !m.isMe).map((member, i) => (
                <motion.button
                  key={member.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    const id = startThread(member.id);
                    setShowNew(false);
                    navigate(`/messages/${id}`);
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-[20px] text-left"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc" }}>
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-white/40">{member.discipline}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}