"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Briefcase,
  Calendar,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Mail,
  Shield,
  Trophy,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const RESUME_URL = "/Paris_Pena_Resume.pdf";

// IMPORTANT: your screenshot shows .htm downloads — so use .htm here.
// Put this file in: /public/Honor_Society_Membership_Letter.htm
const HONOR_LETTER_URL = "/Honor_Society_Membership_Letter.pdf";

const GITHUB_URL = "https://github.com/parisalexa21-debug";
const LINKEDIN_URL = "https://linkedin.com/in/paris-peña-09357820b";
const EMAIL = "papena@kean.edu";

type Experience = {
  type: "Experience" | "Education" | "Honor Society" | "Project";
  title: string;
  org: string;
  date: string;
  location?: string;
  bullets: string[];
  skills?: string[];
  icon?: React.ReactNode;
};

type FeaturedProject = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
  highlight?: string;
  icon?: React.ReactNode;
};

const experience: Experience[] = [
  {
    type: "Education",
    title: "Criminal Justice (B.A.) + Cybersecurity Minor",
    org: "Kean University",
    date: "Current / Recent",
    location: "New Jersey",
    bullets: [
      "Cybersecurity-focused coursework with emphasis on compliance and secure design thinking.",
      "Preparing for graduate-level Computer Science coursework.",
    ],
    skills: ["Cybersecurity", "Compliance", "Documentation"],
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    type: "Project",
    title: "Portfolio Website + AI Resume Assistant",
    org: "Personal Project",
    date: "2026",
    bullets: [
      "Built a modern portfolio using Next.js + Tailwind with responsive UI and theme toggle.",
      "Implemented an AI Resume Assistant via server-side OpenAI API route with streaming responses.",
      "Designed recruiter-friendly UX features (timestamps, copy button, TL;DR summaries).",
    ],
    skills: ["Next.js", "TypeScript", "Tailwind", "OpenAI API"],
    icon: <Shield className="h-4 w-4" />,
  },
  {
    type: "Experience",
    title: "Security Compliance (CSET) — Assessment + Documentation",
    org: "Course / Lab Work",
    date: "2025–2026",
    bullets: [
      "Documented controls and recommendations for a business security scenario.",
      "Focused on risk awareness, compliance alignment, and secure design principles.",
    ],
    skills: ["CSET", "Controls", "Risk", "Documentation"],
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    type: "Honor Society",
    title: "Honor Society Member",
    org: "Membership",
    date: "Active",
    bullets: [
      "Recognized for academic performance and commitment to excellence.",
      "Membership letter available for download below.",
    ],
    skills: ["Leadership", "Academic Excellence"],
    icon: <Trophy className="h-4 w-4" />,
  },
];

const featured: FeaturedProject[] = [
  {
    title: "Portfolio Website + AI Resume Assistant",
    description:
      "Modern Next.js portfolio with a premium AI resume assistant chat experience and theme support.",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI API"],
    repo: GITHUB_URL,
    highlight: "Premium chat UX + AI features",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    title: "Web Programming Labs",
    description:
      "Hands-on labs building interactive pages, consuming APIs, and strengthening front-end foundations.",
    tags: ["JavaScript", "APIs", "UI", "Foundations"],
    highlight: "API integration + clean UI patterns",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    title: "Security Compliance (CSET)",
    description:
      "Compliance assessment and documentation: recommendations, control mapping, and reporting.",
    tags: ["Compliance", "CSET", "Documentation", "Risk"],
    highlight: "Compliance-first mindset + clarity",
    icon: <BadgeCheck className="h-4 w-4" />,
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
        border-black/10 bg-black/5 text-gray-700
        dark:border-white/10 dark:bg-white/10 dark:text-white/80"
    >
      {children}
    </span>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {icon ? (
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border
              border-black/10 bg-white/70
              dark:border-white/10 dark:bg-white/5"
          >
            {icon}
          </span>
        ) : null}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {subtitle ? <p className="mt-2 text-sm muted">{subtitle}</p> : null}
    </div>
  );
}

function SocialButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition
        border-black/10 bg-white/70 text-gray-900 hover:bg-black/5
        dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
    >
      {icon}
      {label}
      {!href.startsWith("mailto:") ? <ExternalLink className="h-4 w-4 opacity-60" /> : null}
    </a>
  );
}

function DownloadButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition
        bg-blue-600 text-white hover:bg-blue-700"
    >
      {icon}
      {label}
    </a>
  );
}

function SoftCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[28px] border p-6 sm:p-7 shadow-sm backdrop-blur
        border-black/10 bg-white/70
        dark:border-white/10 dark:bg-white/5"
    >
      {children}
    </div>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <div
      className="rounded-2xl border p-5 sm:p-6
        border-black/10 bg-white/70
        dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>{item.type}</Pill>
            <span className="inline-flex items-center gap-1 text-xs muted">
              <Calendar className="h-3.5 w-3.5" />
              {item.date}
            </span>
            {item.location ? <span className="text-xs muted">• {item.location}</span> : null}
          </div>

          <div className="mt-3 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </div>
          <div className="mt-1 text-sm muted">{item.org}</div>
        </div>

        <span
          className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl border
            border-black/10 bg-white/70
            dark:border-white/10 dark:bg-white/5"
        >
          {item.icon ?? <Briefcase className="h-4 w-4" />}
        </span>
      </div>

      <ul className="mt-4 space-y-1.5 text-sm muted">
        {item.bullets.map((b, i) => (
          <li key={i}>• {b}</li>
        ))}
      </ul>

      {item.skills?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                border-black/10 bg-black/5 text-gray-700
                dark:border-white/10 dark:bg-white/10 dark:text-white/80"
            >
              {s}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SkillBars({ animate }: { animate: boolean }) {
  const bars = useMemo(
    () => [
      { label: "Next.js / React", value: 84 },
      { label: "TypeScript / JavaScript", value: 82 },
      { label: "Tailwind CSS", value: 80 },
      { label: "APIs + JSON", value: 78 },
      { label: "Security Fundamentals", value: 72 },
      { label: "Git + GitHub", value: 76 },
    ],
    []
  );

  return (
    <div className="space-y-3">
      {bars.map((b) => (
        <div
          key={b.label}
          className="rounded-2xl border p-4
            border-black/10 bg-white/70
            dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {b.label}
            </div>
            <div className="text-xs font-semibold muted">{b.value}%</div>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-out"
              style={{ width: animate ? `${b.value}%` : "0%" }}
            />
          </div>
        </div>
      ))}
      <p className="text-xs muted">
        Percentages are self-assessed and represent comfort/fluency.
      </p>
    </div>
  );
}

function Carousel({ items }: { items: FeaturedProject[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card='true']");
    const w = card?.offsetWidth ?? 360;
    el.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          Featured
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition
              border-black/10 bg-white/70 hover:bg-black/5
              dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition
              border-black/10 bg-white/70 hover:bg-black/5
              dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((p) => (
          <div
            key={p.title}
            data-card="true"
            className="min-w-[320px] sm:min-w-[380px] flex-1"
            style={{ scrollSnapAlign: "start" }}
          >
            <div
              className="h-full rounded-2xl border p-5 sm:p-6 shadow-sm backdrop-blur
                border-black/10 bg-white/70
                dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm muted leading-relaxed">{p.description}</div>
                </div>

                <span
                  className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl border
                    border-black/10 bg-white/70
                    dark:border-white/10 dark:bg-white/5"
                >
                  {p.icon ?? <Briefcase className="h-4 w-4" />}
                </span>
              </div>

              {p.highlight ? (
                <div className="mt-4 rounded-xl border px-4 py-3 text-sm
                  border-black/10 bg-black/5 text-gray-800
                  dark:border-white/10 dark:bg-white/10 dark:text-white/80"
                >
                  <span className="font-semibold">Highlight:</span> {p.highlight}
                </div>
              ) : null}

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

              <div className="mt-5 flex flex-wrap gap-2">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition
                      border-black/10 bg-white/70 text-gray-900 hover:bg-black/5
                      dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    Live <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                ) : null}

                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition
                      border-black/10 bg-white/70 text-gray-900 hover:bg-black/5
                      dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    Repo <ExternalLink className="h-4 w-4 opacity-70" />
                  </a>
                ) : null}

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition
                    bg-blue-600 text-white hover:bg-blue-700"
                >
                  All Projects <ExternalLink className="h-4 w-4 opacity-80" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs muted">
        Tip: Scroll horizontally with trackpad/mouse wheel.
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    const t2 = setTimeout(() => setAnimateBars(true), 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="py-10 sm:py-14">
      {/* Header */}
      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] border shadow-2xl backdrop-blur",
          "border-black/10 bg-white/75",
          "dark:border-white/10 dark:bg-white/5",
          "transition-all duration-700 ease-out",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(900px circle at 20% 10%, rgba(37,99,235,.20), transparent 45%), radial-gradient(850px circle at 85% 30%, rgba(168,85,247,.14), transparent 45%), radial-gradient(750px circle at 55% 90%, rgba(16,185,129,.10), transparent 45%)",
          }}
        />

        <div className="relative p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Pill>
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  Cybersecurity
                </Pill>
                <Pill>Web + AI</Pill>
                <Pill>Secure Design</Pill>
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Paris Peña
              </h1>

              <p className="mt-3 max-w-2xl text-base sm:text-lg muted">
                Cybersecurity-focused student building modern web applications and AI-powered tools.
                Preparing for graduate-level Computer Science coursework.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <DownloadButton href={RESUME_URL} label="Download Resume" icon={<Download className="h-4 w-4" />} />

                <a
                  href={HONOR_LETTER_URL}
                  download
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition
                    border border-black/10 bg-white/70 text-gray-900 hover:bg-black/5
                    dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <Trophy className="h-4 w-4" />
                  Membership Letter
                </a>

                <Link
                  href="/ai"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition
                    bg-blue-600 text-white hover:bg-blue-700"
                >
                  Ask My AI <ExternalLink className="h-4 w-4 opacity-80" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <SocialButton href={GITHUB_URL} label="GitHub" icon={<Github className="h-4 w-4" />} />
                <SocialButton href={LINKEDIN_URL} label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
                <SocialButton href={`mailto:${EMAIL}`} label="Email" icon={<Mail className="h-4 w-4" />} />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div
                className="w-full max-w-[340px] overflow-hidden rounded-[26px] border shadow-xl
                  border-black/10 bg-white
                  dark:border-white/10 dark:bg-white/5"
              >
                <img
                  src="/avatar.jpg"
                  alt="Paris Peña"
                  className="w-full h-[420px] object-cover"
                  style={{ objectPosition: "50% 18%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
        <SoftCard>
          <SectionTitle
            icon={<Briefcase className="h-4 w-4" />}
            title="Experience"
          
          />

          <div className="space-y-4">
            {experience.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "transition-all duration-700 ease-out",
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <ExperienceCard item={item} />
              </div>
            ))}
          </div>
        </SoftCard>

        <div className="space-y-6">
          <SoftCard>
            <SectionTitle
              icon={<BadgeCheck className="h-4 w-4" />}
              title="Featured Projects"
              subtitle="Quick highlights — scroll or use arrows."
            />
            <Carousel items={featured} />
          </SoftCard>

          <SoftCard>
            <SectionTitle
              icon={<Shield className="h-4 w-4" />}
              title="Skills"
              subtitle="Animated proficiency bars (self-assessed)."
            />
            <SkillBars animate={animateBars} />
          </SoftCard>

          <SoftCard>
            <SectionTitle
              icon={<Trophy className="h-4 w-4" />}
              title="Honor Society"
              subtitle="Academic recognition and membership documentation."
            />
            <div className="rounded-2xl border p-5
              border-black/10 bg-white/70
              dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                Membership Letter
              </div>
              <div className="mt-2 text-sm muted">
                Download Paris's membership letter.
              </div>
              <div className="mt-4">
                <a
                  href={HONOR_LETTER_URL}
                  download
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition
                    bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Download Membership Letter
                </a>
              </div>
              <div className="mt-3 text-xs muted">
                <span className="font-semibold">Honor Society Membership letter</span>
              </div>
            </div>
          </SoftCard>
        </div>
      </div>
    </section>
  );
}