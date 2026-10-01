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
    // Place the provided logo file at public/partners/deerwalk-logo.png
    logo: "/partners/deerwalk-logo.png",
    description:
      "Deerwalk Training Center is dedicated to providing premier IT and technical skills training, helping individuals build the practical, industry-ready capabilities needed to succeed in technology careers.",
    services: [
      "IT & technical skills training",
      "Industry-oriented courses",
      "Practical, hands-on learning",
    ],
    // TODO: add once you've confirmed the exact official domain
    website: undefined,
  },
  {
    id: "idea-gen",
    name: "Idea Gen",
    category: "Digital & Technology Partner",
    // Place the provided logo file at public/partners/idea-gen-logo.png
    logo: "/partners/idea-gen-logo.png",
    description:
      "Idea Gen focuses on generating innovative, forward-thinking digital solutions, bringing a creative and technology-driven approach to problem solving.",
    services: [
      "Digital solutions",
      "Innovative product thinking",
      "Technology-driven design",
    ],
    // TODO: I could not confidently verify Idea Gen's official website —
    // add the exact confirmed URL here yourself before enabling the link.
    website: undefined,
  },
];