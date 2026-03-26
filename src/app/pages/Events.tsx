import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, ExternalLink, ArrowUpRight } from "lucide-react";
import { UPCOMING_EVENTS } from "../data";

export default function Events() {
  const navigate = useNavigate();

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

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1
            className="font-display font-black italic text-white mb-2"
            style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)", lineHeight: 0.9 }}
          >
            Upcoming<br />Events.
          </h1>
          <p className="text-sm text-white/50 mt-3">
            Festivals, workshops and showcases across 2026.
          </p>
        </motion.div>
      </div>

      {/* Events list */}
      <div className="px-4 space-y-3">
        {UPCOMING_EVENTS.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="relative overflow-hidden group cursor-pointer rounded-[24px] p-5"
            style={{ background: "rgba(12,12,16,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
            onClick={() => window.open(event.url, "_blank")}
          >
            {/* Accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(to right, ${event.typeColor}, transparent)` }}
            />

            {/* Glow */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${event.typeColor}20, transparent 70%)` }}
            />

            <div className="flex items-start justify-between mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: `${event.typeColor}18`, color: event.typeColor, border: `1px solid ${event.typeColor}28` }}
              >
                {event.type}
              </span>
              <ArrowUpRight size={15} className="text-white/25 group-hover:text-white/60 transition-colors mt-0.5" />
            </div>

            <h3 className="font-display font-black italic text-white text-xl mb-2 leading-tight">{event.title}</h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">{event.description}</p>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <Calendar size={12} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <MapPin size={12} />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}