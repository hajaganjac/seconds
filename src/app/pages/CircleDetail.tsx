import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Users, Check, UserPlus, MessageCircle, MoreHorizontal, User, X } from "lucide-react";
import { CIRCLES, MEMBERS } from "../data";
import { useApp } from "../AppContext";

function MemberCard({
  member,
  circleColor,
  onMessage,
  onConnect,
}: {
  member: (typeof MEMBERS)[0];
  circleColor: string;
  onMessage: () => void;
  onConnect: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      layout
      className="relative rounded-[20px] p-4 flex flex-col items-center gap-2 text-center group"
      style={{ background: "rgba(12,12,16,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold relative"
        style={{
          background: member.isMe
            ? `linear-gradient(135deg,${circleColor},rgba(168,85,247,0.5))`
            : "rgba(255,255,255,0.08)",
          border: member.isMe ? "2px solid rgba(168,85,247,0.4)" : "2px solid rgba(255,255,255,0.08)",
          boxShadow: member.isMe ? `0 0 20px ${circleColor}40` : "none",
          color: member.isMe ? "white" : "rgba(255,255,255,0.7)",
        }}
      >
        {member.isMe ? <User size={22} className="text-white" /> : member.initials}
      </div>

      <div className="w-full">
        <p className="text-xs font-semibold text-white leading-tight truncate">
          {member.isMe ? "You" : member.name}
        </p>
        <p className="text-[10px] text-white/40 truncate">{member.discipline}</p>
      </div>

      {/* Tags */}
      {member.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {member.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action menu (not for self) */}
      {!member.isMe && (
        <motion.button
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
          whileTap={{ scale: 0.85 }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <MoreHorizontal size={13} className="text-white/60" />
        </motion.button>
      )}

      <AnimatePresence>
        {menuOpen && !member.isMe && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-8 right-2 z-20 rounded-2xl overflow-hidden py-1 min-w-[140px]"
            style={{ background: "rgba(20,20,26,0.98)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)" }}
          >
            <button onClick={() => { onConnect(); setMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              <UserPlus size={13} /> Connect
            </button>
            <button onClick={() => { onMessage(); setMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              <MessageCircle size={13} /> Message
            </button>
            <button onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              <User size={13} /> View profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CircleDetail() {
  const { circleId } = useParams<{ circleId: string }>();
  const navigate = useNavigate();
  const { joinedCircles, toggleCircle, startThread } = useApp();

  const circle = CIRCLES.find((c) => c.id === circleId);
  if (!circle) return <div className="pt-20 px-5 text-white/50">Circle not found.</div>;

  const isJoined = joinedCircles.includes(circle.id);
  const members = [
    MEMBERS[0], // "Me"
    ...MEMBERS.filter((m) => m.circleIds.includes(circle.id) && !m.isMe),
  ].slice(0, 12);

  const handleMessage = (memberId: string) => {
    const threadId = startThread(memberId);
    navigate(`/messages/${threadId}`);
  };

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

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
          >
            <Users size={13} />
            {circle.members} members
          </div>
        </div>

        {/* Hero image strip */}
        <div
          className="relative h-32 rounded-[24px] overflow-hidden mb-6"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <img src={circle.image} alt={circle.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(5,5,5,0.8) 100%)" }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${circle.color}25, transparent 60%)` }} />
          <div
            className="absolute bottom-3 left-3 text-xs font-mono font-black"
            style={{ color: circle.color }}
          >
            {circle.number}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1
            className="font-display font-black italic text-white mb-2"
            style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)", lineHeight: 0.9 }}
          >
            {circle.name.includes(" ")
              ? <>{circle.name.split(" ")[0]}<br />{circle.name.split(" ").slice(1).join(" ")}.</>
              : `${circle.name}.`}
          </h1>
          <p className="text-sm text-white/50 mt-3 mb-5 leading-relaxed">{circle.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {circle.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${circle.color}15`, color: circle.color, border: `1px solid ${circle.color}30` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Join button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => toggleCircle(circle.id)}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300"
          style={
            isJoined
              ? { background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc" }
              : { background: `linear-gradient(135deg,${circle.color},${circle.color}cc)`, color: "white", boxShadow: `0 4px 24px ${circle.glowColor}` }
          }
        >
          {isJoined ? <><Check size={16} /> Joined Circle</> : <><UserPlus size={16} /> Join Circle</>}
        </motion.button>
      </div>

      {/* Members section */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white text-base">Members</h2>
          <span className="text-xs text-white/40">{members.length} showing</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <MemberCard
                member={member}
                circleColor={circle.color}
                onMessage={() => handleMessage(member.id)}
                onConnect={() => {}}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}