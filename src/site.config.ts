export const site = {
  title: 'Ben Vanderberg',
  description: 'Personal site, blog, apps, and plugins.',
  author: 'Ben Vanderberg',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Events', href: '/events/' },
    { label: 'Videos', href: '/videos/' },
    { label: 'Apps', href: '/apps/' },
    { label: 'Plugins', href: '/plugins/' },
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
