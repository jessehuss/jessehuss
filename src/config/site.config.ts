export type SiteConfig = {
  siteName: string;
  tagline?: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  contactEmail: string;
  domain: string;
  showBlog: boolean;
  template: 'base' | 'modern' | 'minimal' | 'gradient' | 'dark' | 'playful' | 'professional' | 'portfolio' | 'tech';
  nav: Array<{ label: string; href: string }>;
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  hero?: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
  };
  services?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  about?: {
    title: string;
    description: string;
    image?: string;
  };
};

const siteConfig: SiteConfig = {
  siteName: "Jesse Huss",
  tagline: "Full Stack Engineer & Freelance Developer",
  logo: "/assets/logos/jessehusssmall.png",
  primaryColor: "#3B82F6",
  secondaryColor: "#8B5CF6",
  accentColor: "#10B981",
  contactEmail: "admin@jessehuss.com",
  domain: "jessehuss.com",
  showBlog: false,
  template: "tech",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/contact" }
  ],
  social: {
    github: "https://github.com/jessehuss",
    linkedin: "https://linkedin.com/in/jessehuss"
  },
  hero: {
    headline: "Custom Software Solutions for Your Business",
    subheadline: "Full-stack development, modern web applications, and scalable cloud solutions. Turning your ideas into reality, one line of code at a time.",
    ctaText: "Start a Project",
    ctaLink: "/contact"
  },
  services: [
    {
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies like React, Next.js, and Astro",
      icon: "💻"
    },
    {
      title: "Full Stack Solutions",
      description: "End-to-end development from database design to API development and frontend implementation",
      icon: "⚡"
    },
    {
      title: "Cloud Architecture",
      description: "Scalable cloud solutions using AWS, Vercel, and modern deployment practices for production-ready apps",
      icon: "☁️"
    },
    {
      title: "Code Consulting",
      description: "Technical reviews, refactoring, and architecture guidance to improve your existing codebase",
      icon: "🔍"
    }
  ],
  about: {
    title: "Experienced Developer, Reliable Partner",
    description: "I'm a full-stack engineer specializing in modern web technologies and cloud-native applications. With expertise in JavaScript, TypeScript, and various frameworks, I help businesses build robust software solutions. Whether you need a new application, API integration, or technical consultation, I deliver clean, maintainable code that scales with your business needs.",
    image: "/assets/images/about.jpg"
  }
};

export default siteConfig;

