"use client";

import { projects } from "@/app/data/projects";

export default function ProjectsPage() {
  return (
    <section className="py-12 sm:py-14">
      <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
        Projects
      </h1>

      <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
        Selected work demonstrating technical skills, problem-solving, and real-world application.
      </p>

      <div className="mt-8 grid gap-6">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="rounded-[28px] border p-6 sm:p-7 shadow-sm backdrop-blur
              border-black/10 bg-white
              dark:border-white/10 dark:bg-[#0b1220]"
          >
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
                  {p.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-white/60">
                  {p.subtitle}
                </p>
              </div>

              <div className="text-xs text-gray-500 dark:text-white/40">
                {p.year}
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-white/80">
              {p.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                    border-black/10 bg-black/5 text-gray-700
                    dark:border-white/10 dark:bg-white/10 dark:text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Role + Status */}
            <div className="mt-4 flex gap-4 text-xs text-gray-600 dark:text-white/60">
              <span>Role: {p.role}</span>
              <span>Status: {p.status}</span>
            </div>

            {/* Highlights */}
            <div className="mt-6 rounded-2xl border p-5
              border-black/10 bg-black/5
              dark:border-white/10 dark:bg-white/10">
              <div className="text-sm font-semibold text-black dark:text-white">
                Key Contributions
              </div>

              <ul className="mt-3 space-y-1.5 text-sm text-gray-700 dark:text-white/80">
                {p.highlights.map((h, i) => (
                  <li key={i}>• {h}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            {p.features?.length ? (
              <div className="mt-4 text-sm text-gray-700 dark:text-white/80">
                <span className="font-semibold text-black dark:text-white">
                  Features:
                </span>{" "}
                {p.features.join(" • ")}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}