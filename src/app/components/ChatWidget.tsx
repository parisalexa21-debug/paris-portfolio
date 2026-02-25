"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const starters = [
  "What are Paris’s strongest skills?",
  "What projects has Paris built?",
  "What is Paris studying?",
  "How can I contact Paris?",
];

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m Paris’s AI Resume Assistant. Ask me anything about skills, projects, education, or interests.",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: msg, ts: Date.now() }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json().catch(() => ({}));
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "AI assistant error. Please try again.";

      setMessages((m) => [...m, { role: "assistant", content: reply, ts: Date.now() }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "AI assistant error. Please try again.", ts: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I’m Paris’s AI Resume Assistant. Ask me anything about skills, projects, education, or interests.",
        ts: Date.now(),
      },
    ]);
  }

  return (
    <div
      className="rounded-3xl border overflow-hidden shadow-sm
        border-black/10 bg-white/70
        dark:border-white/10 dark:bg-white/5"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-black/10 dark:border-white/10">
        <div>
          <div className="font-semibold text-black dark:text-white">AI Resume Assistant</div>
          <div className="text-xs text-gray-600 dark:text-white/60">
            Cybersecurity tone • concise answers
          </div>
        </div>
        <button
          onClick={clearChat}
          className="btn btn-ghost !px-4 !py-2"
          type="button"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div ref={listRef} className="h-[420px] sm:h-[520px] overflow-y-auto px-4 sm:px-5 py-4 space-y-3">
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                  ${
                    isUser
                      ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                      : "bg-black/5 text-gray-900 dark:bg-white/10 dark:text-white"
                  }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
                <div className={`mt-1 text-[11px] opacity-70 ${isUser ? "text-white/70 dark:text-black/60" : ""}`}>
                  {formatTime(m.ts)}
                </div>
              </div>
            </div>
          );
        })}

        {loading ? (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 text-sm bg-black/5 dark:bg-white/10">
              <div className="flex items-center gap-2">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                  <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
                </span>
                <span className="text-xs opacity-70">Typing…</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Composer */}
      <div className="border-t border-black/10 dark:border-white/10 px-4 sm:px-5 py-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder="Ask a question…"
            className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none
              border-black/10 bg-white
              dark:border-white/10 dark:bg-[#0f1a2e] dark:text-white"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="btn btn-primary !px-5 !py-2 disabled:opacity-50"
            type="button"
          >
            Send
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {starters.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full border px-3 py-1 text-[11px] font-semibold transition
                border-black/10 bg-black/5 hover:bg-black/10
                dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
              type="button"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}