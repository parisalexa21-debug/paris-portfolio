"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Role = "user" | "assistant";
type ChatMsg = { id: string; role: Role; content: string; ts: number };

const chips = [
  "What are Paris’s strongest skills?",
  "What projects has Paris built?",
  "What security compliance work has Paris done?",
  "How can I contact Paris?",
];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function formatTime(ts: number) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function TypingDots() {
  return (
    <span className="typing" aria-label="Assistant is typing">
      <span className="bg-gray-500 dark:bg-white/70" />
      <span className="bg-gray-500 dark:bg-white/70" />
      <span className="bg-gray-500 dark:bg-white/70" />
    </span>
  );
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "Hi — I’m Paris’s AI Resume Assistant. Ask about skills, projects, education, or security-focused experience.",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function copyText(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 900);
    } catch {
      // ignore
    }
  }

  function lastAssistantMessage(): ChatMsg | null {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant" && messages[i].content.trim()) return messages[i];
    }
    return null;
  }

  async function sendMessage(text?: string) {
    const value = (text ?? input).trim();
    if (!value || loading) return;

    const now = Date.now();
    setInput("");
    setLoading(true);

    const userMsg: ChatMsg = { id: uid(), role: "user", content: value, ts: now };
    const assistantMsg: ChatMsg = { id: uid(), role: "assistant", content: "", ts: now };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    try {
      // send last ~12 msgs for context
      const history = [...messages, userMsg]
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) break;
        full += decoder.decode(chunk, { stream: true });

        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") {
            copy[copy.length - 1] = { ...last, content: full };
          }
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant") {
          copy[copy.length - 1] = {
            ...last,
            content: "AI assistant error. Please try again.",
          };
        }
        return copy;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  async function summarizeLast() {
    const last = lastAssistantMessage();
    if (!last || loading) return;

    const prompt = `Give a TL;DR summary of the following answer in 3 tight bullets. Keep a cybersecurity-professional tone.

Answer:
${last.content}`;

    await sendMessage(prompt);
  }

  return (
    <div
      className="rounded-3xl border shadow-2xl overflow-hidden
        border-black/10 bg-white/70 backdrop-blur
        dark:border-white/10 dark:bg-white/5"
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between gap-3 border-b px-5 py-4
          border-black/10 bg-white/60
          dark:border-white/10 dark:bg-white/5"
      >
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">AI Chat</div>
        
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={summarizeLast}
            disabled={loading}
            className="rounded-xl border px-3 py-2 text-xs font-semibold transition
              border-black/10 bg-black/5 text-gray-900 hover:bg-black/10
              disabled:opacity-50
              dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            title="Summarize the last assistant answer"
          >
            TL;DR
          </button>

          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium
              border-black/10 bg-black/5 text-gray-700
              dark:border-white/10 dark:bg-white/10 dark:text-white/80"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="min-h-[420px] lg:min-h-[520px]">
        <div className="h-[420px] lg:h-[520px] overflow-y-auto px-4 py-5 space-y-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[92%]">
                  <div
                    className={`rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "bg-black/5 text-gray-900 dark:bg-white/10 dark:text-white"
                    }`}
                  >
                    {m.content || (!isUser && loading ? <TypingDots /> : "")}
                  </div>

                  <div
                    className={`mt-1 flex items-center gap-2 text-[11px]
                      ${isUser ? "justify-end" : "justify-start"}
                      text-gray-500 dark:text-white/50`}
                  >
                    <span>{formatTime(m.ts)}</span>

                    {!isUser && m.content.trim() ? (
                      <>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => copyText(m.content, m.id)}
                          className="underline hover:opacity-80"
                        >
                          {copiedId === m.id ? "Copied" : "Copy"}
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4 border-black/10 dark:border-white/10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask a question… (press Enter)"
              className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition
                border-black/10 bg-white text-gray-900
                focus:ring-2 focus:ring-blue-200
                dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-blue-500/30"
            />

            <button
              onClick={() => sendMessage()}
              disabled={!canSend}
              className="rounded-xl px-5 py-3 text-sm font-semibold transition
                bg-blue-600 text-white hover:bg-blue-700
                disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              Send
            </button>
          </div>

          {/* Chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border px-3 py-1 text-xs font-medium transition
                  border-black/10 bg-black/5 text-gray-800 hover:bg-black/10
                  dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="mt-3 text-xs text-gray-500 dark:text-white/50">
            Tip: visit{" "}
            <Link href="/contact" className="underline hover:opacity-80">
              Contact
            </Link>{" "}
            for email + LinkedIn.
          </div>
        </div>
      </div>
    </div>
  );
}