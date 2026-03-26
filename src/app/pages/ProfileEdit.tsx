import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Camera, Plus, X, Eye, User } from "lucide-react";
import { useApp } from "../AppContext";

const DISCIPLINE_OPTIONS = [
  "Motion Designer", "Animator", "3D Artist", "Concept Artist", "Game Designer",
  "Director", "VFX Artist", "Illustrator", "Art Director", "Technical Artist",
];

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useApp();
  const [form, setForm] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState("");
  const [newLink, setNewLink] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const addSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm((f) => ({ ...f, skills: [...f.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== skill) }));
  };

  const addLink = () => {
    if (newLink.trim() && !form.links.includes(newLink.trim())) {
      setForm((f) => ({ ...f, links: [...f.links, newLink.trim()] }));
      setNewLink("");
    }
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
            style={
              saved
                ? { background: "rgba(34,197,94,0.2)", color: "#86efac", border: "1px solid rgba(34,197,94,0.3)" }
                : { background: "linear-gradient(135deg,#a855f7,#c026d3)", color: "white" }
            }
          >
            {saved ? "Saved ✓" : "Save"}
          </motion.button>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8 px-5">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer mb-3"
          style={{
            background: "linear-gradient(135deg,rgba(168,85,247,0.15),rgba(217,70,239,0.1))",
            border: "3px solid rgba(168,85,247,0.3)",
            boxShadow: "0 0 30px rgba(168,85,247,0.15)",
          }}
        >
          <User size={40} style={{ color: "rgba(168,85,247,0.5)" }} />
          <div
            className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#a855f7,#d946ef)", border: "2px solid #050505" }}
          >
            <Camera size={15} className="text-white" />
          </div>
        </motion.div>
        <button onClick={() => navigate("/profile/me/view")} className="flex items-center gap-1.5 text-sm" style={{ color: "#c084fc" }}>
          <Eye size={14} /> View my profile
        </button>
      </div>

      {/* Form */}
      <div className="px-5 space-y-5">
        {/* Display name */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
            Display Name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="w-full px-4 py-3.5 rounded-2xl text-sm text-white outline-none placeholder:text-white/25 transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(168,85,247,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        {/* Discipline */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
            Discipline / Role
          </label>
          <div className="flex flex-wrap gap-2">
            {DISCIPLINE_OPTIONS.map((d) => (
              <motion.button
                key={d}
                whileTap={{ scale: 0.93 }}
                onClick={() => setForm((f) => ({ ...f, discipline: d }))}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={
                  form.discipline === d
                    ? { background: "linear-gradient(135deg,#a855f7,#c026d3)", color: "white" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }
                }
              >
                {d}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3.5 rounded-2xl text-sm text-white outline-none placeholder:text-white/25 resize-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
            Skills & Tools
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {form.skills.map((skill) => (
              <motion.span
                key={skill}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-white/80 transition-colors">
                  <X size={11} />
                </button>
              </motion.span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add a skill…"
              className="flex-1 px-4 py-3 rounded-2xl text-sm text-white outline-none placeholder:text-white/25"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={addSkill}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)" }}
            >
              <Plus size={16} style={{ color: "#c084fc" }} />
            </motion.button>
          </div>
        </div>

        {/* Links */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: "rgba(255,255,255,0.4)" }}>
            Links
          </label>
          <div className="space-y-2 mb-3">
            {form.links.map((link) => (
              <div key={link} className="flex items-center gap-2 px-4 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="flex-1 text-sm text-white/60 truncate">{link}</span>
                <button onClick={() => setForm((f) => ({ ...f, links: f.links.filter((l) => l !== link) }))}>
                  <X size={14} className="text-white/30 hover:text-white/60 transition-colors" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLink()}
              placeholder="https://yourportfolio.com"
              className="flex-1 px-4 py-3 rounded-2xl text-sm text-white outline-none placeholder:text-white/25"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={addLink}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)" }}
            >
              <Plus size={16} style={{ color: "#c084fc" }} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}