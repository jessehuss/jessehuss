/**
 * Site copy — edit this file to update headline, bio, and project blurbs.
 * Lines marked EDIT are drafts for Jesse to review.
 */

export const site = {
  name: 'Jesse Huss',
  url: 'https://jessehuss.com',
  emailDisplay: null as string | null, // never put personal Gmail in HTML
  social: {
    github: 'https://github.com/jessehuss',
    linkedin: 'https://www.linkedin.com/in/jhuss',
  },
  /** Path under /public — swap the file to change the photo */
  photo: {
    src: '/images/avatar.jpg',
    alt: 'Portrait of Jesse Huss',
  },
  // EDIT: headline
  headline: 'I build useful software.',
  // EDIT: short supporting line under the headline
  tagline:
    'Personal products and a small consulting practice for businesses that want technology that fits how they actually work.',
  // EDIT: about blurb (used on home + about). Lethbridge is public on hussconsultinggroup.com.
  bio: `I'm Jesse — a builder based in Lethbridge, Alberta. I make tools people actually use, and through Huss Consulting Group I help local businesses get websites and software that match the way they work.`,
  // EDIT: about page extended paragraph
  aboutExtended: `Most of my time goes into shipping: a Bible reading tracker called ScriptureShelf, a golf-with-friends app called Wager, and client work under Huss Consulting Group. I care about clear products, honest scope, and software that stays maintainable after launch.`,
  nav: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export type ProjectStatus = 'live' | 'in-progress';

export type Project = {
  id: string;
  name: string;
  summary: string;
  description: string;
  href: string | null;
  status: ProjectStatus;
  statusLabel: string;
  logo: string;
  logoAlt: string;
  image: string;
  imageAlt: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: 'scriptureshelf',
    name: 'ScriptureShelf',
    // EDIT
    summary: 'A quiet Bible reading tracker — mark chapters and watch a shelf of all 66 books fill.',
    // EDIT
    description:
      'ScriptureShelf is a free reading tracker built around a visual bookshelf of the whole Bible. Mark chapters as you go, keep private notes, and see streaks and history without the noise of a social feed.',
    href: 'https://scriptureshelf.com',
    status: 'live',
    statusLabel: 'Live',
    logo: '/images/logos/scriptureshelf.svg',
    logoAlt: 'ScriptureShelf logo',
    image: '/images/work/scriptureshelf-shot.webp',
    imageAlt: 'ScriptureShelf bookshelf showing Bible books filling as chapters are marked read',
    accent: '#2f4b3a',
  },
  {
    id: 'hcg',
    name: 'Huss Consulting Group',
    // EDIT
    summary: 'Websites, applications, and custom software for businesses — founded in Lethbridge, Alberta.',
    // EDIT
    description:
      'Huss Consulting Group is my consulting practice: websites, applications, automation, and custom software built around how a business actually works. The HCG site has services and selected work.',
    href: 'https://hussconsultinggroup.com',
    status: 'live',
    statusLabel: 'Live',
    logo: '/images/logos/hcg-mark.svg',
    logoAlt: 'Huss Consulting Group mark',
    image: '/images/work/hcg.webp',
    imageAlt: 'Huss Consulting Group website homepage',
    accent: '#17150F',
  },
  {
    id: 'wager',
    name: 'Wager',
    // EDIT
    summary: 'A scorebook for friendly bets with golf (and other) friends — in progress.',
    // EDIT
    description:
      'Wager is a personal app for tracking friendly wagers with friends — golf and beyond. It is actively in progress: usable for our group, not a finished public product yet.',
    href: 'https://wager.jessehuss.com',
    status: 'in-progress',
    statusLabel: 'In progress',
    logo: '/images/logos/wager.svg',
    logoAlt: 'Wager logo',
    image: '/images/work/wager.webp',
    imageAlt: 'Wager brand tile with W mark and pennant',
    accent: '#0A0F1C',
  },
];
