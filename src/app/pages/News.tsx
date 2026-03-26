import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { NEWS_ITEMS } from "../data";

export default function News() {
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
            className="font-display font-black italic text-white"
            style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)", lineHeight: 0.9 }}
          >
            News.
          </h1>
          <p className="text-sm text-white/50 mt-3">
            Stories, announcements and updates from Playgrounds.
          </p>
        </motion.div>
      </div>

      {/* News list */}
      <div className="px-4 space-y-3">
        {NEWS_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => window.open(item.url, "_blank")}
            className="rounded-[24px] p-5 cursor-pointer group"
            style={{ background: "rgba(12,12,16,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#c084fc" }}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-white/30">·</span>
                  <span className="text-[10px] text-white/30">{item.date}</span>
                </div>
                <h3 className="font-semibold text-white text-base leading-snug mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.excerpt}</p>
              </div>
              <ArrowUpRight
                size={16}
                className="flex-shrink-0 mt-0.5 text-white/20 group-hover:text-white/60 transition-colors"
              />
            </div>

            <div
              className="mt-4 pt-4 flex items-center gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <ExternalLink size={12} style={{ color: "#c084fc" }} />
              <span className="text-xs" style={{ color: "#c084fc" }}>Read on weareplaygrounds.nl</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}