type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">{project.title}</h3>
        {project.link && project.link !== "#" ? (
          <a
            className="text-sm text-gray-600 hover:text-gray-900"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            View →
          </a>
        ) : null}
      </div>

      <p className="mt-2 text-sm text-gray-700">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border px-3 py-1 text-xs text-gray-700"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}