// Perfil (con tu info)
export const profile = {
  name: "Ian Marco Arango Velez",
  headline: "Ingeniero de Sistemas | Frontend/Backend | Cloud",
  location: "Cali, Colombia",
  email: "ian.m28615@gmail.com",
  resumeUrl: "#",
  whatsapp: "https://wa.me/573215767455",
  socials: {
    github: "https://github.com/DevIan28",
    linkedin: "https://www.linkedin.com/in/ian-marco-arango-velez/",
    // Dejo X/Twitter por compatibilidad con componentes que lo referencian
    twitter: "https://x.com",
  },
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
  images?: string[];
};

export const projects: Project[] = [
  {
    id: "videospotify",
    title: "VideoSpotify",
    description: "Clon tipo Spotify enfocado en video. HTML/SASS/Bootstrap/JS.",
    tags: ["frontend", "bootstrap", "javascript"],
    repo: "https://github.com/DevIan28/videospotify",
    demo: "https://devian28.github.io/videospotify",
    images: [
      "https://picsum.photos/seed/videospotify-1/1200/800",
      "https://picsum.photos/seed/videospotify-2/1200/800",
      "https://picsum.photos/seed/videospotify-3/1200/800",
    ],
  },
  {
    id: "duosigns",
    title: "DuoSigns",
    description: "App tipo Duolingo para lengua de señas con reconocimiento de gestos.",
    tags: ["mobile", "ai", "cv"],
    repo: "https://github.com/DevIan28/duosigns",
    images: [
      "https://picsum.photos/seed/duosigns-1/1200/800",
      "https://picsum.photos/seed/duosigns-2/1200/800",
      "https://picsum.photos/seed/duosigns-3/1200/800",
    ],
  },
  {
    id: "pricat-api",
    title: "Pricat API",
    description: "API REST .NET Clean Architecture + MySQL para catálogo de precios.",
    tags: ["backend", ".net", "mysql"],
    repo: "https://github.com/DevIan28/pricat",
    images: [
      "https://picsum.photos/seed/pricat-1/1200/800",
      "https://picsum.photos/seed/pricat-2/1200/800",
      "https://picsum.photos/seed/pricat-3/1200/800",
    ],
  },
];

/**
 * EXPERIENCIA (timeline)
 * - Técnico SENA (2021–2022)
 * - Prácticas 2022 en Restrepo y Londoño
 * - Ingeniería de Sistemas USB Cali (2022–Presente)
 */
export const experience = [
  {
    role: "Estudiante de Ingeniería de Sistemas",
    company: "Universidad San Buenaventura, Cali",
    period: "2022 — Presente",
    bullets: [
      "Énfasis en desarrollo full-stack, bases de datos y fundamentos de cloud.",
      "Proyectos académicos con React, Node/Express y .NET.",
    ],
  },
  {
    role: "Practicante de Desarrollo",
    company: "Restrepo y Londoño",
    period: "2022",
    bullets: [
      "Apoyo en desarrollo y pruebas funcionales.",
      "Documentación técnica y soporte al equipo.",
    ],
  },
  {
    role: "Técnico en Programación de Software",
    company: "SENA",
    period: "2021 — 2022",
    bullets: [
      "Lógica de programación, POO y fundamentos web.",
      "Proyectos formativos y trabajo colaborativo.",
    ],
  },
];

// Skills / radar / boards
export const skills = [
  "React",
  "TypeScript",
  "Node.js",
  ".NET",
  "Java",
  "Spring Boot",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
  "CI/CD",
];

export const skillsRadar = [
  { area: "Frontend", level: 82 },
  { area: "Backend", level: 76 },
  { area: "DB/SQL", level: 70 },
  { area: "Cloud", level: 60 },
  { area: "QA/Tests", level: 65 },
  { area: "DevOps", level: 58 },
];

// === Grupos para SkillsBoard ===
export const skillGroups = [
  { title: "Lenguajes", items: ["TypeScript", "JavaScript", "C#", "Java", "Python"] },
  { title: "Frontend", items: ["React", "Vite", "TailwindCSS", "Framer Motion"] },
  { title: "Backend", items: ["Node.js", "ASP.NET Core", "Spring Boot"] },
  { title: "Bases de Datos", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "Cloud", items: ["AWS (EC2, S3, RDS)", "Docker"] },
  { title: "DevOps", items: ["GitHub Actions", "CI/CD", "Docker Compose"] },
  { title: "QA", items: ["Playwright", "Cypress", "Jest/RTL"] },
];

// === Testimonios (para Home) ===
export const testimonials = [
  {
    name: "Ana Pérez",
    role: "PM · Empresa Tech",
    quote: "Entrega puntual y calidad impecable. Su criterio técnico nos ahorró semanas.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Carlos López",
    role: "CTO · Startup X",
    quote: "Automatizó pruebas y montó CI/CD en pocos días. Excelente comunicación.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "María García",
    role: "Diseñadora · Equipo Producto",
    quote: "Se adaptó perfecto a UI/UX y propuso mejoras de performance.",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
];

// === Certificaciones (enlaces externos opcionales) ===
export const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    badgeUrl: "https://img.shields.io/badge/AWS%20Cloud%20Practitioner-232F3E?logo=amazonaws&logoColor=white",
    verifyUrl: "https://aws.amazon.com/certification/",
  },
  {
    title: "Scrum Foundation",
    issuer: "Scrum.org",
    year: "2023",
    badgeUrl: "https://img.shields.io/badge/Scrum-111111?logo=scrumalliance&logoColor=white",
    verifyUrl: "https://www.scrum.org/",
  },
  {
    title: "Git & GitHub",
    issuer: "Coursera",
    year: "2022",
    badgeUrl: "https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white",
    verifyUrl: "https://www.coursera.org/",
  },
];
