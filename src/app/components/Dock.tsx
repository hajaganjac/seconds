import { useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, CalendarDays, Users, Compass, Plus } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CalendarDays, label: "Schedule", path: "/timetable" },
  { icon: Plus, label: "Contribute", path: "/gallery", isCenter: true },
  { icon: Users, label: "Circles", path: "/discovery" },
  { icon: Compass, label: "Find", path: "/find" },
];

export function Dock() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide dock on chat screen
  const hideDock = /^\/messages\/.+/.test(location.pathname);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <AnimatePresence>
      {!hideDock && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 pointer-events-none lg:hidden">
          {/* Fade gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.95) 40%, transparent 100%)",
            }}
          />
          {/* Dock panel */}
          <div className="relative px-4 pb-6 pt-2 pointer-events-auto">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
              className="flex items-center justify-around rounded-3xl px-2 py-3"
              style={{
                background: "rgba(10,10,10,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05) inset",
              }}
            >
              {navItems.map((item) => {
                const active = isActive(item.path);
                if (item.isCenter) {
                  return (
                    <motion.button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.08 }}
                      className="relative flex flex-col items-center gap-1 -mt-4"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #a855f7, #d946ef)",
                          boxShadow: "0 4px 20px rgba(168,85,247,0.5), 0 0 0 3px rgba(168,85,247,0.15)",
                        }}
                      >
                        <item.icon size={22} className="text-white" strokeWidth={2.5} />
                      </div>
                      <span
                        className="text-[10px] tracking-wider uppercase"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {item.label}
                      </span>
                    </motion.button>
                  );
                }
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    whileTap={{ scale: 0.88 }}
                    className="flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all duration-200"
                    style={{
                      background: active ? "rgba(168,85,247,0.15)" : "transparent",
                      border: active ? "1px solid rgba(168,85,247,0.25)" : "1px solid transparent",
                    }}
                  >
                    <item.icon
                      size={22}
                      strokeWidth={active ? 2 : 1.5}
                      style={{ color: active ? "#c084fc" : "rgba(255,255,255,0.45)" }}
                    />
                    <span
                      className="text-[10px] tracking-wider uppercase font-medium"
                      style={{ color: active ? "#c084fc" : "rgba(255,255,255,0.4)" }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}