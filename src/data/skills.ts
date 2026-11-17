export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Tailwind CSS'],
  },
  {
    title: 'CMS & e-commerce',
    items: ['WordPress', 'WooCommerce', 'Elementor Pro'],
  },
  {
    title: 'Backend',
    items: ['FastAPI', 'Flask', 'Python', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Tools & ways of working',
    items: ['Git', 'GitHub', 'Vercel', 'Cloudflare', 'Jira', 'Scrum'],
  },
];
