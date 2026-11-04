export interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  services: string[];
  /**
   * Only set this once you've verified the exact URL yourself.
   * Leave undefined rather than guessing — the UI hides the
   * "Visit Partner" button when this is missing.
   */
  website?: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "deerwalk",
    name: "Deerwalk",
    category: "Strategic Technology Partner",
    logo: "/partners/deerwalk-logo.png",
    description:
      "Deerwalk Training Center is dedicated to providing premier IT and technical skills training, helping individuals build the practical, industry-ready capabilities needed to succeed in technology careers.",
    services: [
      "IT & technical skills training",
      "Industry-oriented courses",
      "Practical, hands-on learning",
    ],
    website: undefined,
  },
  {
    id: "idea-gen",
    name: "Idea Gen",
    category: "Digital & Technology Partner",
    logo: "/partners/idea-gen-logo.png",
    description:
      "Idea Gen focuses on generating innovative, forward-thinking digital solutions, bringing a creative and technology-driven approach to problem solving.",
    services: [
      "Digital solutions",
      "Innovative product thinking",
      "Technology-driven design",
    ],
    website: undefined,
  },
  {
    id: "mindrisers",
    name: "Mindrisers",
    category: "IT Training & Technology Partner",
    logo: "/partners/mindrisers.png",
    description:
      "Mindrisers is an IT training and technology-focused organization providing practical learning, professional development, and digital technology solutions.",
    services: [
      "IT training and education",
      "Professional skill development",
      "Digital technology solutions",
    ],
    website: "https://mindriserstech.com/",
  },
  {
  id: "skillshikshya",
  name: "Skill Shikshya",
  category: "IT Training & Technology Partner",
  logo: "/partners/skillshikshya.png",
  description:
    "Skill Shikshya is a skill development and technology-focused organization providing industry-oriented IT training, practical learning experiences, and professional development opportunities.",
  services: [
    "IT training and skill development",
    "Industry-oriented practical learning",
    "Professional and career development",
    "Technology education and digital skills",
  ],
  website: "https://skillshikshya.com/",
},
{
  id: "techaxis",
  name: "Tech Axis",
  category: "Technology & Digital Solutions Partner",
  logo: "/partners/techaxis.png",
  description:
    "Tech Axis is a technology-focused organization delivering innovative digital solutions, software development services, and technology-driven business solutions.",
  services: [
    "Software development and IT solutions",
    "Digital transformation",
    "Technology consulting",
    "Innovative digital solutions",
  ],
  website: "https://techaxis.com.np/",
},
];
