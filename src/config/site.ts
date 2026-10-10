export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  features: string[];
}

export const siteContent = {
  name: "Forma",
  description: "A clear place for your next idea. A sample landing page you can make your own.",
  contactEmail: "hello@example.com",
  title: "Forma — Room for your next idea",
  navigation: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Questions", href: "/#faq" },
  ],
  contactLabel: "Say hello",
  sections: {
    features: {
      eyebrow: "Make space for good work",
      title: "Small pieces.\nA clearer picture.",
      description: "Simple building blocks for a more considered way to work.",
    },
    pricing: {
      eyebrow: "Choose your pace",
      title: "Room to start.\nSpace to grow.",
      description: "Explore the example plans, then shape them around your own offer.",
      disclaimer: "Illustrative plans and prices for a fictional product.",
    },
    faq: { eyebrow: "A few useful answers", title: "Before you begin." },
    contact: { eyebrow: "The next chapter is yours", title: "Let’s make room\nfor your idea." },
  },
  footer: { tagline: "A little room for what comes next.", emailLabel: "Email us" },
  artwork: {
    hero: {
      src: "/workspace.svg",
      alt: "An illustrated project workspace with a weekly plan, idea notes, and progress cards",
    },
    social: { src: "/social-card.png", alt: "Forma: give your next idea room to grow" },
  },
  hero: {
    eyebrow: "Less noise. More possibility.",
    title: "Give your next idea room to grow.",
    description: "Bring your work, your people, and your next step into one considered space.",
    primaryAction: { label: "Find your space", href: "#pricing" },
    secondaryAction: { label: "Take a closer look", href: "#features" },
    note: "A fictional product. A real starting point.",
  },
  features: [
    {
      title: "A place to begin",
      description: "Collect the ideas that matter and give each one a clear next step.",
      label: "Plan",
    },
    {
      title: "A shared perspective",
      description: "Keep the conversation close to the work, so everyone sees what is next.",
      label: "Connect",
    },
    {
      title: "Progress with purpose",
      description: "Make room for focused work and celebrate the small steps along the way.",
      label: "Move",
    },
  ],
  plans: [
    {
      name: "Essential",
      description: "Room for your first chapter.",
      monthlyPrice: 12,
      annualMonthlyPrice: 10,
      features: ["Personal workspace", "Project notes", "Weekly overview"],
    },
    {
      name: "Together",
      description: "A little more space to collaborate.",
      monthlyPrice: 24,
      annualMonthlyPrice: 20,
      features: ["Shared workspaces", "Team conversations", "Project overview"],
    },
  ] satisfies PricingPlan[],
  questions: [
    {
      question: "Can I make this page my own?",
      answer:
        "Yes. Replace the name, copy, colors, illustrations, and contact details with your own.",
    },
    {
      question: "Are these real products and prices?",
      answer:
        "No. Forma is a fictional product. The plans and prices are examples for this landing-page starter.",
    },
    {
      question: "How do I get in touch?",
      answer: "Use the email link below. Replace the example address before publishing your site.",
    },
  ],
};
