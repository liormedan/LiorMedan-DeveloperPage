export type SkillCategory = "Core" | "React & Next.js" | "UI & Styling" | "3D & Graphics" | "Backend & Database" | "Tooling & DevOps";

export type Skill = {
  name: string;
  category: SkillCategory;
  url: string;
};

export const skills: Skill[] = [
  // Core
  { name: "HTML5", category: "Core", url: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" },
  { name: "CSS3", category: "Core", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript (ES6+)", category: "Core", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "TypeScript", category: "Core", url: "https://www.typescriptlang.org/" },

  // React & Next.js
  { name: "React", category: "React & Next.js", url: "https://react.dev/" },
  { name: "Next.js", category: "React & Next.js", url: "https://nextjs.org/" },
  { name: "Zustand", category: "React & Next.js", url: "https://github.com/pmndrs/zustand" },
  { name: "Redux Toolkit", category: "React & Next.js", url: "https://redux-toolkit.js.org/" },

  // UI & Styling
  { name: "Tailwind CSS", category: "UI & Styling", url: "https://tailwindcss.com/" },
  { name: "shadcn/ui", category: "UI & Styling", url: "https://ui.shadcn.com/" },
  { name: "Radix UI", category: "UI & Styling", url: "https://www.radix-ui.com/" },
  { name: "Framer Motion", category: "UI & Styling", url: "https://www.framer.com/motion/" },

  // 3D & Graphics
  { name: "Three.js", category: "3D & Graphics", url: "https://threejs.org/" },
  { name: "@react-three/fiber", category: "3D & Graphics", url: "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction" },
  { name: "@react-three/drei", category: "3D & Graphics", url: "https://github.com/pmndrs/drei" },
  { name: "Spline", category: "3D & Graphics", url: "https://spline.design/" },

  // Backend & Database
  { name: "Node.js", category: "Backend & Database", url: "https://nodejs.org/" },
  { name: "Python", category: "Backend & Database", url: "https://www.python.org/" },
  { name: "Firebase", category: "Backend & Database", url: "https://firebase.google.com/" },
  { name: "Supabase", category: "Backend & Database", url: "https://supabase.com/" },

  // Tooling & DevOps
  { name: "Git", category: "Tooling & DevOps", url: "https://git-scm.com/" },
  { name: "Vercel", category: "Tooling & DevOps", url: "https://vercel.com/" },
  { name: "pnpm", category: "Tooling & DevOps", url: "https://pnpm.io/" },
  { name: "ESLint", category: "Tooling & DevOps", url: "https://eslint.org/" },
];
