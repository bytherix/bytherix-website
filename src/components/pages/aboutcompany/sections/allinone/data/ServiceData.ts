
import web from "../../../../../../assets/icons/allinone/web.svg";
import app from "../../../../../../assets/icons/allinone/app.svg";
import security from "../../../../../../assets/icons/allinone/security.svg";
import cloud from "../../../../../../assets/icons/allinone/cloud.svg";
import ui from "../../../../../../assets/icons/allinone/ui.svg";
import digital from "../../../../../../assets/icons/allinone/digital.svg";
import ai from "../../../../../../assets/icons/allinone/ai.svg";

import type { ServiceCardProps } from "../types/types";

export const serviceData: ServiceCardProps[] = [
  {
    id: 1,
    icon: web,
    title: "Web Development",
    description:
      "Fast, secure, and scalable websites built with modern tech for peak performance.",
    highlightWords: ["websites", "peak performance."],
    tags: [
      "Business websites",
      "Portfolio",
      "Education websites",
      "E-commerce",
    ],
    linkUrl: "/services/web-development",
  },
  {
    id: 2,
    icon: app,
    title: "App Development",
    description:
      "High-performance app development engineered for total security, rapid loading, and smooth user experiences.",
    highlightWords: [
      "total security, rapid loading, and smooth user experiences",
    ],
    tags: [
      "E-Commerce Apps",
      "EdTech Apps",
      "SaaS & Productivity Apps",
      "Cross Platform",
    ],
    linkUrl: "/services/app-development",
  },
  {
    id: 3,
    icon: security,
    title: "Security Audit",
    description:
      "Identifying critical security gaps and providing actionable, prioritized remediation roadmaps.",
    highlightWords: [
      "actionable, prioritized remediation roadmaps.",
    ],
    tags: [
      "Penetration Testing",
      "Network security",
      "IOT/OT Penetration",
      "Cloud security",
    ],
    linkUrl: "/services/security-audit",
  },
  {
    id: 4,
    icon: cloud,
    title: "Cloud Solutions",
    description:
      "Scalable and reliable cloud infrastructure designed to help your business grow efficiently.",
    highlightWords: ["your business grow efficiently."],
    tags: [
      "Cloud Migration",
      "AWS Solutions",
      "Azure",
      "Cloud Infrastructure",
    ],
    linkUrl: "/services/cloud-solutions",
  },
  {
    id: 5,
    icon: ui,
    title: "UI/UX Design",
    description:
      "Modern and intuitive digital experiences designed around your users and business goals.",
    highlightWords: ["your users and business goals."],
    tags: [
      "Web Design",
      "Mobile UI",
      "Prototyping",
      "Design Systems",
    ],
    linkUrl: "/services/ui-ux-design",
  },
  {
    id: 6,
    icon: digital,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that help your brand reach the right audience and grow online.",
    highlightWords: ["reach the right audience and grow online."],
    tags: [
      "SEO",
      "Social Media",
      "Content Marketing",
      "Analytics",
    ],
    linkUrl: "/services/digital-marketing",
  },
  {
    id: 7,
    icon: ai,
    title: "AI Solutions",
    description:
      "Smart AI-powered solutions that automate workflows and turn business data into useful insights.",
    highlightWords: [
      "automate workflows and turn business data into useful insights.",
    ],
    tags: [
      "AI Integration",
      "Machine Learning",
      "Chatbots",
      "Automation",
    ],
    linkUrl: "/services/ai-solutions",
  },
];
