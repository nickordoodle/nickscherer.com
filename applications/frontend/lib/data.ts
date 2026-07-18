export interface Role {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  sector: 'tech' | 'military' | 'education';
  description: string;
  bullets: string[];
  logo?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  link?: string;
  featured?: boolean;
  gradient: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  notes?: string;
}

export interface Publication {
  title: string;
  description: string;
  year?: string;
  link?: string;
  tags: string[];
}

export interface SkillAxis {
  name: string;
  value: number;
  max: number;
}

export interface TechItem {
  name: string;
  category: string;
  years: number;
}

export interface ImpactStat {
  value: string;
  label: string;
  sublabel: string;
  color: string;
}

export interface Award {
  title: string;
  org: string;
  description?: string;
}

// ─── Work History ───────────────────────────────────────────────────────────

export const roles: Role[] = [
  {
    id: 'rostrum-vpe',
    company: 'Rostrum Pacific',
    title: 'Vice President of Engineering',
    startDate: 'March 2026',
    endDate: 'Present',
    location: 'Los Angeles, CA',
    sector: 'tech',
    description:
      'Leading engineering under the Rostrum Pacific umbrella, building SpaceHeater — a modern music distribution and catalog management platform powering labels, distributors, and catalog owners.',
    bullets: [
      'Own platform strategy, architecture, and execution across DSP integrations, DDEX delivery pipelines, and royalty & payment systems',
      'Drive AI-powered capabilities that surface granular insights and streamline music distribution operations',
      'Remain hands-on to solve complex technical challenges and guide system design across the full stack',
    ],
  },
  {
    id: 'rostrum-techlead',
    company: 'Rostrum Pacific',
    title: 'Tech Lead / Lead Software Engineer — Agentic AI',
    startDate: 'August 2024',
    endDate: 'March 2026',
    location: 'United States',
    sector: 'tech',
    description:
      'Led a software development team driving innovation in music technology through agentic AI, natural language data insights, and advanced analytics.',
    bullets: [
      'Architected and shipped natural language data insights platform using LLM agents over music royalty data',
      'Built advanced analytics, label and artist royalty payment systems, and forecasting models',
      'Integrated AI music attribution systems to protect rightsholder IP at scale',
    ],
  },
  {
    id: 'lucky',
    company: 'Lucky (Acquired by SPINS)',
    title: 'Founding / Lead Software Engineer — Generalist',
    startDate: 'May 2022',
    endDate: 'August 2024',
    location: 'San Diego, CA',
    sector: 'tech',
    description:
      '1st USA engineer hire and Lead Engineer at a Seed-stage SaaS startup in the ecommerce / retail data / supply chain space. Led the team through acquisition by SPINS.',
    bullets: [
      'Led implementation of internal Slack app with big data insights (MongoDB, Java 11, AmazonMQ/RabbitMQ, NodeJS) — launched in under 1 month',
      'Stood up Data Engineering & ML pipeline using AWS Step Functions, S3, Glue, and SageMaker',
      'Ported the Lucky application to Salesforce AppExchange — reused 100% of React components, shipped in 3 months',
      'Built CI/CD pipeline with GitHub Actions, CodeStar, CodePipeline, CodeBuild, Docker & S3',
      'Created company-wide internal CLI in Go; reduced AWS cloud costs by ~50% in Q3 via infrastructure audit',
    ],
  },
  {
    id: 'amazon-marketplace',
    company: 'Amazon',
    title: 'Software Engineer — Platform & Emerging Marketplaces',
    startDate: 'February 2022',
    endDate: 'May 2022',
    location: 'Austin, TX',
    sector: 'tech',
    description:
      'Assigned high-priority tasks immediately and unblocked a worldwide launch requirement within the first two weeks.',
    bullets: [
      'Designed customer refund model with highly controlled, rule-based configuration business logic',
      'Launched global-first checkout delivery options in Australia, Egypt, Singapore, Turkey, UAE, and Saudi Arabia',
      'Coordinated with international stakeholders across SDMs, TPMs, PMs, and Systems/Logistics Technicians',
    ],
  },
  {
    id: 'amazon-kindle',
    company: 'Amazon',
    title: 'Software Engineer — Full Stack (Kindle Unlimited)',
    startDate: 'September 2020',
    endDate: 'January 2022',
    location: 'Seattle, WA',
    sector: 'tech',
    description:
      'Delivered a business-critical end-to-end project supporting worldwide marketing operations within the first 5 months.',
    bullets: [
      'Built internal marketing tool (AngularJS + Java Spring MVC) that automated subscription promotion management, saving ~10 hours/week of tech team work',
      'Implemented using RESTful services, DynamoDB, and S3 — changes reached worldwide within 1–2 days',
      'Contributed to 6 services with exposure to ~30 services; owned full delivery lifecycle from design to production',
    ],
  },
  {
    id: 'novetta',
    company: 'Novetta',
    title: 'Cyber Security Engineer',
    startDate: 'April 2020',
    endDate: 'July 2020',
    location: 'Remote',
    sector: 'tech',
    description:
      'Engineered security tooling and assessment infrastructure used in candidate evaluation.',
    bullets: [
      'Built a plug-in test harness framework in Python for evaluating engineering candidates',
      'Developed a network conditioner to stress-test client-server models under packet manipulation conditions using Python, Scapy, TCP, multi-processing, and multi-threading',
    ],
  },
  {
    id: 'army-ops',
    company: 'US Army',
    title: 'Operations Manager (Infantry Officer — 1LT)',
    startDate: 'March 2019',
    endDate: 'April 2020',
    location: 'Fort Hood, TX',
    sector: 'military',
    description:
      'Led and managed complex operations, personnel, and multi-million-dollar equipment inventories for a US Army infantry battalion.',
    bullets: [
      'Directly influenced the Republic of Korea Army\'s decision to purchase $50M in digital training simulators through live capability demonstrations',
      'Led a 42-person team of technicians maintaining 250+ pieces of equipment and 4 vehicles valued at $18M+',
      'Increased overall unit effectiveness by 46% by coordinating 20 large-scale training events; maintained 100% accuracy of 4K records',
    ],
  },
  {
    id: 'army-logistics',
    company: 'US Army',
    title: 'Logistics Manager (Infantry Officer — 1LT)',
    startDate: 'September 2018',
    endDate: 'March 2019',
    location: 'Fort Hood, TX',
    sector: 'military',
    description:
      'Managed large-scale logistics operations for domestic and overseas equipment transport.',
    bullets: [
      'Coordinated transport of 32 vehicles and 14 shipping containers (~$100M in equipment) to US and overseas locations with zero losses',
      'Ensured international legal compliance across all shipments in coordination with government contractors',
    ],
  },
  {
    id: 'army-asst-ops',
    company: 'US Army',
    title: 'Assistant Operations Manager (Infantry Officer — 2LT)',
    startDate: 'May 2017',
    endDate: 'March 2019',
    location: 'Fort Hood, TX',
    sector: 'military',
    description:
      'Developed plans, training, operations, and logistics for an organization of 44 people.',
    bullets: [
      'Developed plans, training, operations, and orders for an organization of ~700 employees and 60 vehicles worth over $100M',
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'avi-ai',
    name: 'Avi AI',
    tagline: 'Conversational AI for everyone',
    description:
      'Creator of Avi AI — a conversational AI platform designed to make advanced AI accessible and intuitive. Built with a focus on natural language interaction and practical utility.',
    techStack: ['Python', 'Node.js', 'React', 'AWS', 'LLMs', 'RAG'],
    link: 'https://avi.ai',
    featured: true,
    gradient: 'from-cyan-500/20 to-purple-600/20',
  },
  {
    id: 'spaceheater',
    name: 'SpaceHeater',
    tagline: 'AI-powered music distribution & catalog management',
    description:
      'Modern music distribution and catalog management platform for labels, distributors, and catalog owners. Features DDEX delivery pipelines, DSP integrations, royalty systems, and AI-powered analytics.',
    techStack: ['Next.js', 'Python', 'AWS', 'DDEX', 'Agentic AI', 'Node.js'],
    featured: true,
    gradient: 'from-purple-500/20 to-pink-600/20',
  },
  {
    id: 'lucky-spins',
    name: 'Lucky → SPINS Acquisition',
    tagline: 'Retail intelligence SaaS — from seed to acquisition',
    description:
      'As the 1st US engineer, built the core platform for a retail data SaaS startup — from Slack-powered data insights to ML pipelines and a Salesforce AppExchange integration — through successful acquisition by SPINS.',
    techStack: ['Java', 'Node.js', 'React', 'AWS', 'MongoDB', 'Go', 'Salesforce'],
    gradient: 'from-emerald-500/20 to-cyan-600/20',
  },
  {
    id: 'immersive-forest',
    name: 'Agentic Narratives — Immersive Forest',
    tagline: 'Published research at UC San Diego',
    description:
      'Published research paper exploring an agentic approach to generating conversational narratives in immersive forest environments — combining NLP, AI agents, and spatial computing.',
    techStack: ['Python', 'LLMs', 'NLP', 'Agentic AI', 'Research'],
    gradient: 'from-green-500/20 to-teal-600/20',
  },
];

// ─── Education ───────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    institution: 'UC San Diego',
    degree: "Master's Degree",
    field: 'Data Science & Engineering',
    startYear: '2023',
    endYear: '2025',
    notes: 'Master of Advanced Studies (MAS) — Data Science and Engineering',
  },
  {
    institution: 'Rutgers University — New Brunswick',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startYear: '2013',
    endYear: '2017',
    notes: 'Distinguished Military Graduate | Army ROTC',
  },
];

// ─── Awards & Certifications ─────────────────────────────────────────────────

export const awards: Award[] = [
  { title: 'Distinguished Military Graduate', org: 'US Army / Rutgers ROTC' },
  { title: 'Army Commendation Medal (×2)', org: 'US Army' },
  { title: 'Army Achievement Medal', org: 'US Army' },
  { title: 'B2C Commerce Developer', org: 'Salesforce Certification' },
];

// ─── Publications ─────────────────────────────────────────────────────────────

export const publications: Publication[] = [
  {
    title:
      'An Agentic Approach to Generate Conversational Narratives on the Immersive Forest',
    description:
      'Explores the use of autonomous AI agents to generate dynamic, context-aware conversational narratives within spatial/immersive forest environments. Combines agentic AI planning, natural language generation, and interactive storytelling.',
    year: '2025',
    tags: ['Agentic AI', 'NLP', 'Conversational AI', 'Spatial Computing', 'LLMs'],
  },
];

// ─── Skills for Radar Chart ───────────────────────────────────────────────────

export const skillAxes: SkillAxis[] = [
  { name: 'Agentic AI / LLMs', value: 90, max: 100 },
  { name: 'Backend Eng.', value: 100, max: 100 },
  { name: 'Cloud & AWS', value: 90, max: 100 },
  { name: 'Data Science / ML', value: 85, max: 100 },
  { name: 'Data Engineering', value: 83, max: 100 },
  { name: 'Frontend / React', value: 75, max: 100 },
  { name: 'Leadership & Mgmt', value: 100, max: 100 },
];

// ─── Tech Bubble Data ─────────────────────────────────────────────────────────

export const techItems: TechItem[] = [
  { name: 'Python', category: 'Languages', years: 7 },
  { name: 'TypeScript', category: 'Languages', years: 5 },
  { name: 'Java', category: 'Languages', years: 6 },
  { name: 'Node.js', category: 'Languages', years: 6 },
  { name: 'SQL', category: 'Languages', years: 8 },
  { name: 'AWS', category: 'Cloud', years: 7 },
  { name: 'S3', category: 'Cloud', years: 7 },
  { name: 'Lambda', category: 'Cloud', years: 5 },
  { name: 'ECS/Fargate', category: 'Cloud', years: 4 },
  { name: 'CloudFront', category: 'Cloud', years: 4 },
  { name: 'DynamoDB', category: 'Cloud', years: 4 },
  { name: 'Next.js', category: 'Frontend', years: 4 },
  { name: 'React', category: 'Frontend', years: 6 },
  { name: 'Angular', category: 'Frontend', years: 2 },
  { name: 'LangChain', category: 'AI/ML', years: 3 },
  { name: 'RAG Systems', category: 'AI/ML', years: 3 },
  { name: 'Terraform', category: 'DevOps', years: 3 },
  { name: 'Docker', category: 'DevOps', years: 5 },
  { name: 'GitHub Actions', category: 'DevOps', years: 4 },
  { name: 'PostgreSQL', category: 'Data', years: 5 },
  { name: 'MongoDB', category: 'Data', years: 4 },
  { name: 'Step Functions', category: 'Data', years: 3 },
  { name: 'RabbitMQ', category: 'Data', years: 3 },
];

// ─── Impact Metrics ───────────────────────────────────────────────────────────

export const impactStats: ImpactStat[] = [
  {
    value: '$50M',
    label: 'Defense Decision Influenced',
    sublabel: 'ROK Army simulator purchase',
    color: '#00d9ff',
  },
  {
    value: '50%',
    label: 'AWS Cost Reduction',
    sublabel: 'Q3 infrastructure audit & optimization',
    color: '#9333ea',
  },
  {
    value: '10 hrs/wk',
    label: 'Automation Savings',
    sublabel: 'Amazon marketing tool',
    color: '#f0a500',
  },
  {
    value: '700',
    label: 'Personnel Led',
    sublabel: 'US Army operations command',
    color: '#22c55e',
  },
  {
    value: '$100M+',
    label: 'Equipment Managed',
    sublabel: 'Army logistics operations',
    color: '#f43f5e',
  },
  {
    value: '46%',
    label: 'Effectiveness Increase',
    sublabel: '20 large-scale Army training events',
    color: '#a78bfa',
  },
];

// ─── Career Timeline Data (for ECharts Gantt) ────────────────────────────────

export const careerTimelineData = [
  { name: 'Army ROTC / NG', start: 2014, end: 2017, sector: 'military' },
  { name: 'US Army (Active)', start: 2017, end: 2020, sector: 'military' },
  { name: 'Novetta', start: 2020, end: 2020.5, sector: 'tech' },
  { name: 'Amazon — Kindle', start: 2020.75, end: 2022, sector: 'tech' },
  { name: 'Amazon — Marketplaces', start: 2022, end: 2022.5, sector: 'tech' },
  { name: 'Lucky → SPINS', start: 2022.5, end: 2024.75, sector: 'tech' },
  { name: 'Rostrum / SpaceHeater', start: 2024.75, end: 2026.5, sector: 'tech' },
];
