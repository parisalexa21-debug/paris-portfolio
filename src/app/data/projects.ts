export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  role: "Solo" | "Team";
  status: "Shipped" | "In Progress";
  year: string;

  highlights: string[];
  features?: string[];
};

export const projects: Project[] = [
  {
    slug: "portfolio-ai",
    title: "Portfolio Website + AI Resume Assistant",
    subtitle: "Next.js portfolio with AI integration",
    description:
      "A modern portfolio website featuring a floating AI assistant that answers questions about my skills, projects, and education. Built with a focus on usability, performance, and professional presentation.",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI API"],
    role: "Solo",
    status: "Shipped",
    year: "2026",

    highlights: [
      "Developed the full UI using Next.js App Router and Tailwind CSS.",
      "Implemented a secure server-side API route to communicate with the OpenAI API.",
      "Designed an interactive floating chat widget with typing indicators and quick prompts.",
      "Added downloadable resume and academic membership documentation.",
    ],

    features: [
      "AI assistant integration",
      "Dark/Light mode",
      "Responsive design",
      "Professional portfolio layout",
    ],
  },

  {
    slug: "web-database-design-cps3740",
    title: "Web Database Design Project",
    subtitle: "CPS 3740 — Database Applications",
    description:
      "Designed and modeled a relational database for a dynamic web application, including schema design, SQL implementation, and user interaction flow.",
    tags: ["SQL", "Database Design", "ER Modeling", "PHP", "HTML"],
    role: "Team",
    status: "Shipped",
    year: "2025",

    highlights: [
      "Designed an ER diagram with multiple entities and relationships.",
      "Wrote SQL statements to create tables, define primary and foreign keys, and support data operations.",
      "Modeled user interactions and workflows using HTML and PHP pseudo-code.",
      "Collaborated in a team of four to refine requirements and database structure.",
    ],

    features: [
      "Relational schema design",
      "Keys and relationships",
      "User interaction modeling",
      "Team collaboration",
    ],
  },

  {
    slug: "security-compliance-cset",
    title: "Security Compliance Assessment (CSET)",
    subtitle: "Risk & controls documentation project",
    description:
      "Conducted a structured security compliance assessment for a business scenario, identifying risks, evaluating controls, and recommending mitigation strategies.",
    tags: ["Security", "Compliance", "Risk Assessment", "Documentation"],
    role: "Solo",
    status: "Shipped",
    year: "2025–2026",

    highlights: [
      "Evaluated security controls and identified vulnerabilities in a simulated business environment.",
      "Mapped findings to risk impact and priority levels.",
      "Produced remediation recommendations with clear implementation steps.",
      "Created documentation suitable for both technical and non-technical audiences.",
    ],
  },

  {
    slug: "graph-algorithms-java",
    title: "Graph Algorithms Implementation",
    subtitle: "Java — Data Structures coursework",
    description:
      "Implemented and tested core graph algorithms using city-based datasets, including traversal, minimum spanning tree, and shortest path techniques.",
    tags: ["Java", "Data Structures", "Graphs", "Algorithms"],
    role: "Solo",
    status: "Shipped",
    year: "2025",

    highlights: [
      "Implemented DFS and BFS traversal algorithms with validation tests.",
      "Developed MST and shortest-path algorithms for weighted graphs.",
      "Tested correctness using multiple graph configurations.",
      "Focused on clean structure and maintainable code.",
    ],
  },

  {
    slug: "web-programming-labs",
    title: "Web Programming Labs",
    subtitle: "Interactive front-end coursework",
    description:
      "Completed a series of hands-on web programming labs focused on building interactive pages, working with APIs, and strengthening front-end development skills.",
    tags: ["JavaScript", "HTML", "CSS", "APIs"],
    role: "Solo",
    status: "Shipped",
    year: "2024–2025",

    highlights: [
      "Built responsive pages with dynamic content and user interaction.",
      "Integrated external APIs to retrieve and display real-time data.",
      "Applied modern layout techniques and accessibility considerations.",
      "Improved debugging and problem-solving skills through iterative development.",
    ],
  },
];