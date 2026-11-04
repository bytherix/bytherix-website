import oneForAll from "../../../../../../assets/products/one for all.jpeg";
import pam from "../../../../../../assets/products/pam.jpeg";
import founder from "../../../../../../assets/products/founder.jpeg";

export const AZURE_BLUE = "#3157d5";
export const VIVID_RED = "#fd3b30";
export const SOFT_TEAL = "#29bcae";
export const FEATURE_GREEN = "#188670";

export interface BuilderFeature {
  title: string;
  body: string;
}

export interface BuilderSlide {
  image: string;
  label: string;
  title: string;
  body: string;
  features: BuilderFeature[];
}

export const BUILDER_SLIDES: BuilderSlide[] = [
  {
    image: oneForAll,
    label: "All-in-One Platform",
    title: "One Platform. Every Business.",
    body: `Manage your businesses, branches, employees,
inventory, customers, finances, and operations
from one powerful platform.`,
    features: [
      {
        title: "Centralized Management",
        body: "Seamlessly oversee multiple business branches, inventory, and employees from a single unified dashboard.",
      },
      {
        title: "Secure Access",
        body: "Ensure complete control over your business data with role-based user permissions and encrypted data safety.",
      },
      {
        title: "Scalable Operations",
        body: "Track real-time analytics, revenue reports, and daily sales performance designed to grow with your business.",
      },
    ],
  },

  {
    image: founder,
    label: "Action RPG Game",
    title: "The Beginning of Journey.",
    body: `A boy, a tragedy, and a journey to find
the one who destroyed his world. Experience
epic boss fights, dark dungeons, and elemental mastery.`,
    features: [
      {
        title: "Dynamic Combat & Arsenal",
        body: "Wield traditional weapons like the Khukuri and Katana paired with unique skill trees and gear upgrades.",
      },
      {
        title: "Elemental Powers",
        body: "Master natural elements—Fire, Water, Earth, Wind, and Lightning—to defeat dark forces and boss fights.",
      },
      {
        title: "Story-Driven Quest",
        body: "Progress through immersive chapters, defeat powerful bosses, and track your rank on the global leaderboard.",
      },
    ],
  },

  {
    image: pam,
    label: "Healthcare Monitoring System",
    title: "Smarter Monitoring | Healthier Tomorrow",
    body: `Real-time health tracking and intelligent assistance
delivering precise vital monitoring, continuous ECG logs,
and instant clinical alerts for better patient care.`,
    features: [
      {
        title: "Comprehensive Vitals",
        body: "Monitor continuous Heart Rate, SpO2, Body Temperature, Blood Pressure, and Respiratory Rate in real time.",
      },
      {
        title: "Live ECG & Logging",
        body: "Track real-time Lead-I ECG waveforms alongside automated data logging for accurate patient diagnostic records.",
      },
      {
        title: "Smart Alerts & Connectivity",
        body: "Receive immediate automated health alerts via seamless Bluetooth and Wi-Fi sync directly to your monitoring dashboard.",
      },
    ],
  },
];