import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Home, CalendarDays, Users, Compass, MessageCircle,
  Calendar, Newspaper, ImageIcon, User, Radio,
} from "lucide-react";
import { useApp } from "../AppContext";

const PRIMARY_NAV = [
  { icon: Home,          label: "Home",      path: "/" },
  { icon: CalendarDays,  label: "Schedule",  path: "/timetable" },
  { icon: Users,         label: "Circles",   path: "/discovery" },
  { icon: Compass,       label: "Find",      path: "/find" },
  { icon: MessageCircle, label: "Messages",  path: "/messages", badge: true },
];

const SECONDARY_NAV = [
  { icon: Calendar,   label: "Events",  path: "/events" },
  { icon: Newspaper,  label: "News",    path: "/news" },
  { icon: ImageIcon,  label: "Gallery", path: "/gallery" },
];

export function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { threads, profile } = useApp();

  const unread = threads.filter((t) => {
    const last = t.messages[t.messages.length - 1];
    return last && last.from !== "me";
  }).length;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const displayName = profile.name || "Creative";
  const displayInitials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "C";

  return (
    <aside
      className="hidden lg:flex flex-col flex-shrink-0 w-64 h-full border-r overflow-y-auto"
      style={{
        background: "rgba(5,5,5,0.98)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      {/* ── Logo ── */}
      <div className="px-6 pt-8 pb-6">
        <button onClick={() => navigate("/")} className="block">
          <h1 className="font-display font-black italic text-white tracking-tight" style={{ fontSize: 20 }}>
            PLAYGROUNDS.
          </h1>
          <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            The Art Department · 2026
          </p>
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="mx-6 mb-4 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* ── Primary nav ── */}
      <nav className="px-3 space-y-0.5 flex-1">
        {PRIMARY_NAV.map((item) => {
          const active = isActive(item.path);
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left relative transition-all duration-150"
              style={{
                background: active ? "rgba(168,85,247,0.12)" : "transparent",
                border: active ? "1px solid rgba(168,85,247,0.2)" : "1px solid transparent",
              }}
            >
              {/* Active bar */}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                  style={{ background: "linear-gradient(to bottom,#a855f7,#d946ef)" }}
                />
              )}
              <item.icon
                size={18}
                strokeWidth={active ? 2 : 1.5}
                style={{ color: active ? "#c084fc" : "rgba(255,255,255,0.4)" }}
              />
              <span
                className="text-sm font-medium flex-1"
                style={{ color: active ? "#e9d5ff" : "rgba(255,255,255,0.55)" }}
              >
                {item.label}
              </span>
              {item.badge && unread > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg,#a855f7,#d946ef)" }}
                >
                  {unread}
                </span>
              )}
            </motion.button>
          );
        })}

        {/* ── Divider ── */}
        <div className="my-3 mx-2 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

        {SECONDARY_NAV.map((item) => {
          const active = isActive(item.path);
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-150"
              style={{
                background: active ? "rgba(168,85,247,0.12)" : "transparent",
                border: active ? "1px solid rgba(168,85,247,0.2)" : "1px solid transparent",
              }}
            >
              <item.icon
                size={18}
                strokeWidth={active ? 2 : 1.5}
                style={{ color: active ? "#c084fc" : "rgba(255,255,255,0.35)" }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: active ? "#e9d5ff" : "rgba(255,255,255,0.45)" }}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* ── Live badge ── */}
      <div className="px-3 py-3">
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl"
          style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.1)" }}
        >
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#4ade80" }}
          />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
              15–17 Apr 2026 · Eindhoven
            </p>
            <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>
              791 creatives attending
            </p>
          </div>
          <Radio size={12} style={{ color: "#4ade80", flexShrink: 0 }} />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* ── Profile ── */}
      <div className="p-3">
        <motion.button
          onClick={() => navigate("/profile/me/view")}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,rgba(168,85,247,0.25),rgba(217,70,239,0.18))",
              color: "#c084fc",
              border: "1px solid rgba(168,85,247,0.3)",
            }}
          >
            {displayInitials}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-semibold text-white/75 truncate">{displayName}</p>
            <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
              {profile.discipline}
            </p>
          </div>
          <User size={14} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
        </motion.button>
      </div>
    </aside>
  );
}
