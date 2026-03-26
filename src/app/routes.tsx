import { createBrowserRouter } from "react-router";
import Shell from "./components/Shell";
import Home from "./pages/Home";
import Timetable from "./pages/Timetable";
import Discovery from "./pages/Discovery";
import CircleDetail from "./pages/CircleDetail";
import Find from "./pages/Find";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileView from "./pages/ProfileView";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Events from "./pages/Events";
import News from "./pages/News";
import Gallery from "./pages/Gallery";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-8 text-center">
      <p className="font-display font-black italic text-white/20 text-6xl mb-4">404.</p>
      <p className="text-white/40 text-sm">This page doesn't exist.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Shell,
    children: [
      { index: true, Component: Home },
      { path: "timetable", Component: Timetable },
      { path: "discovery", Component: Discovery },
      { path: "circles/:circleId", Component: CircleDetail },
      { path: "find", Component: Find },
      { path: "profile/me", Component: ProfileEdit },
      { path: "profile/me/view", Component: ProfileView },
      { path: "messages", Component: Messages },
      { path: "messages/:threadId", Component: Chat },
      { path: "events", Component: Events },
      { path: "events/:eventId", Component: Events },
      { path: "news", Component: News },
      { path: "gallery", Component: Gallery },
      { path: "*", Component: NotFound },
    ],
  },
]);
