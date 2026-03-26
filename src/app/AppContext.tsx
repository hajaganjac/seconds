import { createContext, useContext, useState, ReactNode } from "react";
import { Thread, THREADS, Message } from "./data";

export interface UserProfile {
  name: string;
  discipline: string;
  bio: string;
  skills: string[];
  links: string[];
  avatarUrl?: string;
}

interface AppState {
  profile: UserProfile;
  joinedCircles: string[];
  markedSessions: string[];
  friends: string[];
  threads: Thread[];
}

interface AppContextValue extends AppState {
  updateProfile: (update: Partial<UserProfile>) => void;
  toggleCircle: (circleId: string) => void;
  toggleSession: (sessionId: string) => void;
  toggleFriend: (memberId: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  startThread: (participantId: string) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    discipline: "Creative",
    bio: "Tell the community about yourself and your creative practice.",
    skills: ["Motion Design", "After Effects"],
    links: [],
  });
  const [joinedCircles, setJoinedCircles] = useState<string[]>(["motion-design"]);
  const [markedSessions, setMarkedSessions] = useState<string[]>(["s1", "s3"]);
  const [friends, setFriends] = useState<string[]>(["m1", "m2"]);
  const [threads, setThreads] = useState<Thread[]>(THREADS);

  const updateProfile = (update: Partial<UserProfile>) => {
    setProfile((p) => ({ ...p, ...update }));
  };

  const toggleCircle = (circleId: string) => {
    setJoinedCircles((prev) =>
      prev.includes(circleId) ? prev.filter((id) => id !== circleId) : [...prev, circleId]
    );
  };

  const toggleSession = (sessionId: string) => {
    setMarkedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId]
    );
  };

  const toggleFriend = (memberId: string) => {
    setFriends((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const sendMessage = (threadId: string, text: string) => {
    const msg: Message = {
      id: `msg-${Date.now()}`,
      from: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, messages: [...t.messages, msg] } : t))
    );
  };

  const startThread = (participantId: string): string => {
    const existing = threads.find((t) => t.participantId === participantId);
    if (existing) return existing.id;
    const newThread: Thread = {
      id: `t-${Date.now()}`,
      participantId,
      messages: [],
    };
    setThreads((prev) => [...prev, newThread]);
    return newThread.id;
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        joinedCircles,
        markedSessions,
        friends,
        threads,
        updateProfile,
        toggleCircle,
        toggleSession,
        toggleFriend,
        sendMessage,
        startThread,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
