import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Share2, Edit3, User, ExternalLink, Users } from "lucide-react";
import { useApp } from "../AppContext";
import { CIRCLES, IMAGES } from "../data";

export default function ProfileView() {
  const navigate = useNavigate();
  const { profile, joinedCircles } = useApp();
  const joined = CIRCLES.filter((c) => joinedCircles.includes(c.id));
  const displayName = profile.name || "Your Name";
  const displayDiscipline = profile.discipline || "Creative";

  return (
    <div className="min-h-[100dvh] pb-36 lg:pb-12">
      {/* Hero image */}
      <div className="relative z-0" style={{ height: 280 }}>
        <img src={IMAGES.portrait} alt="Profile hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(5,5,5,0.7) 70%, #050505 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top right, rgba(168,85,247,0.2), transparent 60%)" }} />

        {/* Top actions — above overlapping avatar */}
        <div
          className="absolute left-5 right-5 flex items-center justify-between z-30 pointer-events-auto"
          style={{ top: "max(3.5rem, env(safe-area-inset-top, 0px))" }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(5,5,5,0.5)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
          >
            <ArrowLeft size={18} className="text-white" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(5,5,5,0.5)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
          >
            <Share2 size={16} className="text-white" />
          </motion.button>
        </div>
      </div>

      {/* Avatar (centered, overlapping hero — z-20 keeps it under top bar, above hero image) */}
      <div className="relative z-20 flex flex-col items-center -mt-16 px-5 mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
          style={{
            background: "linear-gradient(135deg,rgba(168,85,247,0.25),rgba(217,70,239,0.15))",
            border: "5px solid #050505",
            boxShadow: "0 0 40px rgba(168,85,247,0.3), 0 0 0 1px rgba(168,85,247,0.3)",
          }}
        >
          <User size={48} style={{ color: "rgba(168,85,247,0.7)" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-center">
          <h1 className="font-display font-black italic text-white text-3xl mb-2" style={{ letterSpacing: "-0.01em" }}>
            {displayName}
          </h1>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.25)" }}
          >
            {displayDiscipline}
          </span>

          {profile.bio && (
            <p className="text-sm text-white/55 mt-4 leading-relaxed max-w-[300px] mx-auto">{profile.bio}</p>
          )}
        </motion.div>
      </div>

      {/* Content sections */}
      <div className="px-5 space-y-5">
        {/* Expertise */}
        {profile.skills.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Expertise</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Circles */}
        {joined.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Circles</p>
            <div className="space-y-2">
              {joined.map((circle) => (
                <button
                  key={circle.id}
                  onClick={() => navigate(`/circles/${circle.id}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors"
                  style={{ background: "rgba(12,12,16,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: circle.color }} />
                  <span className="flex-1 text-sm text-white/70 text-left">{circle.name}</span>
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <Users size={11} />
                    {circle.members}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Links */}
        {profile.links.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Links</p>
            {profile.links.map((link) => (
              <a key={link} href={link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-2xl mb-2"
                style={{ background: "rgba(12,12,16,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <ExternalLink size={13} style={{ color: "#c084fc" }} />
                <span className="text-sm text-white/60 truncate flex-1">{link}</span>
              </a>
            ))}
          </motion.div>
        )}

        {/* Edit button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/profile/me")}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
        >
          <Edit3 size={15} /> Edit Profile
        </motion.button>
      </div>
    </div>
  );
}