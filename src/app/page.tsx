import Link from "next/link";

const GITHUB_URL = "https://github.com/parisalexa21-debug";
const LINKEDIN_URL = "https://linkedin.com/in/paris-peña-09357820b";
const EMAIL = "Paris.alexa21@gmail.com";

export default function Home() {
  return (
    <section className="py-10 sm:py-14">
      <div
        className="relative overflow-hidden rounded-[28px] border shadow-2xl
          border-black/10 bg-white/75 backdrop-blur
          dark:border-white/10 dark:bg-[#07101b]/60"
      >
        {/* Glow layer (changes by theme automatically because opacity looks different on bg) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(900px circle at 15% 10%, rgba(37,99,235,.20), transparent 45%), radial-gradient(850px circle at 85% 30%, rgba(168,85,247,.16), transparent 45%), radial-gradient(700px circle at 45% 90%, rgba(16,185,129,.10), transparent 45%)",
          }}
        />

        {/* Subtle grid inside the card */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10] dark:opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.35) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden dark:block opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative grid gap-10 px-8 py-10 sm:px-14 sm:py-14 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-white/60">
              Portfolio
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="text-gray-900 dark:text-white">Hey, I’m </span>
              <span className="text-blue-600 dark:text-blue-400">Paris</span>{" "}
              <span className="text-blue-600 dark:text-blue-400">Peña.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base sm:text-lg muted leading-relaxed">
              I build clean web apps and security-focused projects — with an AI assistant
              that can answer questions about my resume.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full px-6 py-3 text-sm font-semibold transition
                  bg-blue-600 text-white hover:bg-blue-700"
              >
                View Projects
              </Link>

              <Link
                href="/ai"
                className="rounded-full px-6 py-3 text-sm font-semibold border transition
                  bg-black/5 text-gray-900 border-black/10 hover:bg-black/10
                  dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15"
              >
                Ask My AI
              </Link>

              <Link
                href="/contact"
                className="rounded-full px-6 py-3 text-sm font-semibold border transition
                  bg-black/5 text-gray-900 border-black/10 hover:bg-black/10
                  dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15"
              >
                Contact
              </Link>
            </div>

            {/* Social */}
            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="muted hover:text-gray-900 dark:hover:text-white transition"
              >
                GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="muted hover:text-gray-900 dark:hover:text-white transition"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="muted hover:text-gray-900 dark:hover:text-white transition"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center lg:items-end">
            <div
              className="w-full max-w-[420px] overflow-hidden rounded-[26px] border shadow-xl
                border-black/10 bg-white
                dark:border-white/10 dark:bg-white/5"
            >
              <img
                src="/avatar.jpg"
                alt="Paris Peña"
                className="h-[320px] sm:h-[360px] w-full object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
            </div>

            <div
              className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold
                border-black/10 bg-white/70 text-gray-700
                dark:border-white/10 dark:bg-white/10 dark:text-white/80"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Next.js • Tailwind • AI
            </div>
          </div>
        </div>
      </div>

      {/* 3 CARDS */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[
          { title: "Focus", body: "Cybersecurity • Web Development • AI" },
          { title: "Built With", body: "Next.js • React • Tailwind" },
          { title: "AI Element", body: "Resume Assistant Chat (Q&A about me)" },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border p-6 shadow-sm transition backdrop-blur
              border-black/10 bg-white/70 hover:shadow-md
              dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {card.title}
            </div>
            <div className="mt-2 muted">{card.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

