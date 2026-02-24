import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle ? <p className="mt-3 text-gray-600">{subtitle}</p> : null}
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}