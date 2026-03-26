import { useLocation, Outlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Dock } from "./Dock";
import { DesktopSidebar } from "./DesktopSidebar";

export default function Shell() {
  const location = useLocation();

  return (
    <div
      className="flex h-dvh overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Ambient background dot grid (desktop only) ── */}
      <div
        className="pointer-events-none fixed inset-0 hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(168,85,247,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          zIndex: 0,
        }}
      />

      {/* ── Desktop sidebar ── */}
      <DesktopSidebar />

      {/* ── Main content area ── */}
      <main className="relative flex-1 overflow-hidden" style={{ zIndex: 1 }}>
        {/* Ambient top glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-48 opacity-40"
          style={{
            background: "radial-gradient(ellipse at top, rgba(168,85,247,0.12) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Scrollable page content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-hide desktop-scroll-root"
            style={{ zIndex: 1 }}
          >
            {/*
              Mobile/tablet: full width, natural page width
              Desktop (lg): centre-constrain content to a comfortable reading width
            */}
            <div className="w-full min-h-full lg:max-w-4xl lg:mx-auto">
              <Outlet />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom dock — mobile + tablet only ── */}
      <Dock />
    </div>
  );
}