export const site = {
  title: 'Ben Vanderberg',
  description: 'Ben Vanderberg is a Creative Technologist with over 20 years of experience in media technologies. He is currently Executive Creative Technologist at Adobe and Director of the Creative Technology Lab.',
  author: 'Ben Vanderberg',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Events', href: '/events/' },
    { label: 'Videos', href: '/videos/' },
    { label: 'Search', href: '/search/' },
  ],
};

export type AppEntry = {
  name: string;
  description: string;
  href?: string;
  status?: string;
};

export const apps: AppEntry[] = [
  {
    name: 'Sample App',
    description: 'Short description of what this app does and why it exists.',
    href: '#',
    status: 'In development',
  },
];

export const plugins: AppEntry[] = [
  {
    name: 'Sample Plugin',
    description: 'Short description of the plugin and the host it targets.',
    href: '#',
    status: 'Released',
  },
];
