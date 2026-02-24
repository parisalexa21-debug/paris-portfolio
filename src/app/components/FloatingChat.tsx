"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ChatMsg = {
  role: "assistant" | "user";
  content: string;
  ts: number;
};

const quickQs = [
  "What are Paris’s strongest skills?",
  "What projects has Paris built?",
  "What is Paris studying?",
  "How can I contact Paris?",
];

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<ChatMsg[]>(() => [
    {
      role: "assistant",
      content:
        "Hi! I’m Paris’s AI Resume Assistant. Ask me about skills, projects, education, or interests.",
      ts: Date.now(),
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  }, [open, messages, loading]);

  const canSend = input.trim().length > 0 && !loading;

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

      setMessages((m) => [
        ...m,
        { role: "assistant", content: reply, ts: Date.now() },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "AI assistant error. Please try again.",
          ts: Date.now(),
        },
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
          "Hi! I’m Paris’s AI Resume Assistant. Ask me about skills, projects, education, or interests.",
        ts: Date.now(),
      },
    ]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {/* Bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group relative flex items-center gap-2 rounded-full px-4 py-3 shadow-2xl
          bg-blue-600 text-white hover:bg-blue-700 transition"
        aria-label="Open AI chat"
      >
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-sm" />
        <span className="font-semibold">AI</span>

        {/* Cute tooltip */}
        <span
          className="pointer-events-none absolute -top-11 right-0 opacity-0 translate-y-1
            rounded-full px-3 py-1 text-xs font-semibold shadow-lg
            bg-black text-white transition
            group-hover:opacity-100 group-hover:translate-y-0"
        >
          Ask my AI ✨
        </span>
      </button>

      {/* Corner panel */}
      {open ? (
        <div
          className="mt-3 w-[360px] sm:w-[390px] overflow-hidden rounded-3xl border shadow-2xl
            border-black/10 bg-white text-gray-900
            dark:border-white/10 dark:bg-[#0b1220] dark:text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-black/10 dark:border-white/10">
            <div>
              <div className="font-semibold">AI Resume Assistant</div>
              <div className="text-xs text-gray-600 dark:text-white/60">
                Cybersecurity • Projects • Education
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="rounded-xl border px-3 py-1.5 text-xs font-semibold
                  border-black/10 bg-black/5 hover:bg-black/10
                  dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border px-3 py-1.5 text-xs font-semibold
                  border-black/10 bg-black/5 hover:bg-black/10
                  dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="h-[320px] overflow-y-auto px-4 py-4 space-y-3"
          >
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                      ${
                        isUser
                          ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                          : "bg-black/5 text-gray-900 dark:bg-white/10 dark:text-white"
                      }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                    <div
                      className={`mt-1 text-[11px] opacity-70 ${
                        isUser ? "text-white/70 dark:text-black/60" : ""
                      }`}
                    >
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

          {/* Input */}
          <div className="border-t border-black/10 dark:border-white/10 px-4 py-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Type a question…"
                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none
                  border-black/10 bg-white
                  dark:border-white/10 dark:bg-[#0f1a2e] dark:text-white"
              />
              <button
                onClick={() => send()}
                disabled={!canSend}
                className="rounded-xl px-4 py-2 text-sm font-semibold transition
                  bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
              >
                Send
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {quickQs.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border px-3 py-1 text-[11px] font-semibold transition
                    border-black/10 bg-black/5 hover:bg-black/10
                    dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-2 text-xs text-gray-500 dark:text-white/50">
              Tip: You can also visit the{" "}
              <Link href="/contact" className="underline">
                Contact
              </Link>{" "}
              page.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}