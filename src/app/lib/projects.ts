export type Project = {
  title: string;
  description: string;
  tags: string[];
  codeUrl?: string;
  liveUrl?: string;
  // Optional: if you later add images in /public/projects/...
  image?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Mars Weather App",
    description:
      "React/Next app that displays weather-style info using NASA Mars Rover data (and a clean UI).",
    tags: ["Next.js", "React", "Tailwind", "APIs"],
    codeUrl: "https://github.com/yourusername/mars-weather",
    liveUrl: "https://your-live-demo-link.vercel.app",
  },
  {
    title: "SpaceX + NASA Explorer",
    description:
      "Browse launches and space content with filters, responsive layout, and polished components.",
    tags: ["JavaScript", "APIs", "UI/UX"],
    codeUrl: "https://github.com/yourusername/spacex-nasa",
    liveUrl: "https://your-live-demo-link.vercel.app",
  },
  {
    title: "Security Compliance (CSET)",
    description:
      "Cybersecurity compliance assessment work: documenting infrastructure controls and risk findings.",
    tags: ["Security", "Compliance", "CSET"],
    codeUrl: "https://github.com/yourusername/cset-report",
  },
];

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    title: "Graph Algorithms (Java)",
    description:
      "DFS, BFS, MST, and shortest path testing using city-based graphs (Data Structures).",
    tags: ["Java", "Graphs", "Algorithms"],
    codeUrl: "https://github.com/yourusername/graphs-java",
  },
  {
    title: "Firewall Rule Design",
    description:
      "Designed rule sets with ports/protocols, inbound/outbound constraints, and testing plan.",
    tags: ["Networking", "Security", "Firewalls"],
  },
];