import ChatWidget from "@/app/components/ChatWidget";

export default function AIPage() {
  return (
    <section className="py-10 sm:py-14">
      {/* Premium header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold
              border-black/10 bg-black/5 text-gray-700
              dark:border-white/10 dark:bg-white/10 dark:text-white/80"
          >
            AI
          </span>
          <span className="text-xs text-gray-500 dark:text-white/50">
            Streaming chat • Portfolio Q&amp;A
          </span>
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          AI Resume Assistant
        </h1>

        <p className="mt-3 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-white/70">
          Ask about Paris’s skills, projects, education, and interests. Responses stream in real-time.
        </p>
      </div>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
        <ChatWidget />

        {/* Right panel */}
        <aside className="hidden lg:block space-y-5">
          <div className="rounded-3xl border p-5 shadow-sm
            border-black/10 bg-white/70 backdrop-blur
            dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Suggested prompts
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-white/70">
              <div>• “What are Paris’s strongest skills?”</div>
              <div>• “Tell me about her projects and tech stack.”</div>
              <div>• “What is she studying and what are her goals?”</div>
              <div>• “How can I contact Paris?”</div>
            </div>
          </div>

          <div className="rounded-3xl border p-5 shadow-sm
            border-black/10 bg-white/70 backdrop-blur
            dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Pro tip
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-white/70">
              Ask specific questions like “What did Paris build with Next.js?” or
              “What security compliance work has she done?”
            </p>
          </div>

          <div className="rounded-3xl border p-5 shadow-sm
            border-black/10 bg-white/70 backdrop-blur
            dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Works everywhere
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-white/70">
              You can also use the floating chat bubble on any page.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}