import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Send, Smile } from "lucide-react";
import { MEMBERS } from "../data";
import { useApp } from "../AppContext";

export default function Chat() {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { threads, sendMessage } = useApp();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const thread = threads.find((t) => t.id === threadId);
  const participant = thread ? MEMBERS.find((m) => m.id === thread.participantId) : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages.length]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || !threadId) return;
    sendMessage(threadId, text);
    setInput("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  if (!thread || !participant) {
    return <div className="pt-20 px-5 text-white/50">Conversation not found.</div>;
  }

  const messages = thread.messages;

  return (
    <div style={{ minHeight: "100dvh", paddingBottom: 100 }}>
      {/* Sticky header */}
      <div
        className="sticky top-0 z-20 flex items-center gap-3 px-5 pt-14 pb-4"
        style={{
          background: "rgba(5,5,5,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/messages")}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <ArrowLeft size={18} className="text-white/70" />
        </motion.button>

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.25)" }}
        >
          {participant.initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{participant.name}</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{participant.discipline}</p>
        </div>

        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: "#86efac", boxShadow: "0 0 8px rgba(134,239,172,0.6)" }}
        />
      </div>

      {/* Messages */}
      <div className="px-4 py-5 space-y-3">
        {/* Date marker */}
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
            Today
          </span>
        </div>

        {messages.map((msg, i) => {
          const isSent = msg.from === "me";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.025, type: "spring", stiffness: 400, damping: 30 }}
              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
            >
              {!isSent && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mr-2 self-end mb-1"
                  style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc" }}
                >
                  {participant.initials}
                </div>
              )}
              <div style={{ maxWidth: "75%" }}>
                <div
                  className="px-4 py-3 text-sm leading-relaxed"
                  style={
                    isSent
                      ? {
                          background: "linear-gradient(135deg,rgba(168,85,247,0.42),rgba(192,38,211,0.38))",
                          color: "rgba(255,255,255,0.92)",
                          borderRadius: "20px 20px 5px 20px",
                          border: "1px solid rgba(168,85,247,0.3)",
                        }
                      : {
                          background: "rgba(18,18,24,0.95)",
                          color: "rgba(255,255,255,0.82)",
                          borderRadius: "20px 20px 20px 5px",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }
                  }
                >
                  {msg.text}
                </div>
                <p className={`text-[10px] mt-1 ${isSent ? "text-right" : "text-left"} px-1`}
                  style={{ color: "rgba(255,255,255,0.28)" }}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Fixed input at bottom */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-7 pt-3 z-30"
        style={{
          background: "rgba(5,5,5,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2 rounded-2xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message…"
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30"
            />
            <button className="hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.3)" }}>
              <Smile size={17} />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleSend}
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={
              input.trim()
                ? { background: "linear-gradient(135deg,#a855f7,#d946ef)", boxShadow: "0 4px 18px rgba(168,85,247,0.45)" }
                : { background: "rgba(255,255,255,0.06)" }
            }
          >
            <Send size={16} style={{ color: input.trim() ? "white" : "rgba(255,255,255,0.28)" }} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
