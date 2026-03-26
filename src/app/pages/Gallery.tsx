import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Camera, ZoomIn, Upload } from "lucide-react";
import { GALLERY_IMAGES } from "../data";

export default function Gallery() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedImg = GALLERY_IMAGES.find((g) => g.id === selected);

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {selected && selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center max-w-[430px] left-1/2 -translate-x-1/2"
            style={{ background: "rgba(5,5,5,0.97)" }}
            onClick={() => setSelected(null)}
          >
            <motion.button
              onClick={() => setSelected(null)}
              className="absolute top-14 right-5 w-10 h-10 rounded-full flex items-center justify-center z-10"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <X size={18} className="text-white" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.url}
                alt={selectedImg.caption}
                className="w-full rounded-[28px] object-cover"
                style={{ maxHeight: "70vh" }}
              />
              <p className="text-center text-sm text-white/50 mt-4">{selectedImg.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: "linear-gradient(135deg,#a855f7,#d946ef)", color: "white" }}
            >
              <Upload size={14} /> Contribute
            </motion.button>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="font-display font-black italic text-white mb-2"
              style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)", lineHeight: 0.9 }}
            >
              Festival<br />Gallery.
            </h1>
            <p className="text-sm text-white/50 mt-3">
              Moments from The Art Department and beyond.
            </p>
          </motion.div>
        </div>

        {/* Contribute prompt */}
        <div className="px-5 mb-6">
          <div
            className="flex items-center gap-3 p-4 rounded-[20px]"
            style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(168,85,247,0.15)" }}
            >
              <Camera size={17} style={{ color: "#c084fc" }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white/70">Add your photos</p>
              <p className="text-xs text-white/40">Share your festival moments with the community.</p>
            </div>
          </div>
        </div>

        {/* Masonry-style 2-col grid */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-2.5">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(img.id)}
                className="relative cursor-pointer group overflow-hidden rounded-[20px]"
                style={{
                  aspectRatio: i % 3 === 0 ? "4/5" : "4/3",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />

                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(5,5,5,0.5)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(168,85,247,0.3)", backdropFilter: "blur(8px)" }}
                  >
                    <ZoomIn size={18} className="text-white" />
                  </div>
                </motion.div>

                {/* Caption */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-2.5"
                  style={{ background: "linear-gradient(to top, rgba(5,5,5,0.8), transparent)" }}
                >
                  <p className="text-[10px] text-white/60 font-medium">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}