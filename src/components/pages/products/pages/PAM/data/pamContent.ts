import {
  Activity,
  BatteryCharging,
  Bell,
  BadgeCheck,
  ClipboardCheck,
  CloudSun,
  Droplets,
  FileCheck,
  FlaskConical,
  Footprints,
  Gauge,
  HardDrive,
  HeartPulse,
  LayoutDashboard,
  type LucideIcon,
  Thermometer,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * Every value in this file is taken from the Bytherix "ARCK 103 PAM"
 * Product Requirements and Technical Specification (v1.0, September 13,
 * 2026). Nothing here is invented. The source is a specification for a
 * proof-of-concept prototype, so capabilities are phrased as designed /
 * planned / optional exactly where the document does so. Internal bill-of-
 * materials cost estimates are intentionally NOT surfaced: they are
 * engineering cost notes, not customer pricing.
 */

export interface UserNeed {
  audience: string;
  story: string;
  icon: LucideIcon;
}

export interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ArchitectureLayer {
  name: string;
  detail: string;
}

export interface ModuleGroup {
  title: string;
  items: string[];
  icon: LucideIcon;
}

export interface BpMethod {
  name: string;
  principle: string;
  badge?: string;
  points: string[];
}

export interface AlertExample {
  parameter: string;
  title: string;
  message: string;
  note: string;
}

export interface ComplianceArea {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface RoadmapPhase {
  phase: string;
  weeks: string;
  title: string;
  deliverables: string[];
}

export const productName = "ARCK 103 PAM";
export const productTagline =
  "Advanced Real-Time Patient Assistance & Monitoring System";
export const heroHeadline = "Real-time patient monitoring in one portable device";
export const heroSummary =
  "A compact, standalone multi-parameter patient monitor being developed by Bytherix Technology. It tracks ECG, heart rate, SpO2, pulse and body temperature, processes the signals on the device and shows live vitals, patient profiles and alerts on its own color touchscreen.";
export const intendedUseNote =
  "ARCK 103 PAM is intended for monitoring only and is not a substitute for professional assessment. It is not marketed as a diagnostic device, and all on-screen advice is advisory. The current version is a proof-of-concept prototype; future engineering revisions will refine sensor selection, validation and production readiness.";

export const ecosystemNodes = [
  "ECG",
  "SpO2",
  "Temp",
  "Ambient",
  "Activity",
  "Alerts",
];

export const userNeeds: UserNeed[] = [
  {
    audience: "Patient or caregiver",
    story:
      "“I want to see a real-time ECG waveform and heart rate so I can verify the heart’s condition during monitoring.”",
    icon: HeartPulse,
  },
  {
    audience: "Patient",
    story:
      "“I want to check my blood oxygen and pulse through a finger sensor to detect potential hypoxia.”",
    icon: Droplets,
  },
  {
    audience: "Caregiver",
    story:
      "“I want to see the patient’s body temperature so I can monitor for fever.”",
    icon: Thermometer,
  },
  {
    audience: "Patient or clinician",
    story:
      "“I want to record my blood pressure to detect hypertension or hypotension.”",
    icon: Gauge,
  },
  {
    audience: "Clinician",
    story:
      "“I want to see the environment conditions to interpret the patient’s readings, for example, high humidity can affect the thermistor.”",
    icon: CloudSun,
  },
  {
    audience: "Patient",
    story: "“I want to track my steps so I can reach daily activity goals.”",
    icon: Footprints,
  },
];

export const capabilities: Capability[] = [
  {
    title: "Live ECG and heart rate",
    description:
      "Single-lead ECG acquisition with a live waveform display and heart-rate computation. Signal quality and electrode contact are monitored.",
    icon: HeartPulse,
  },
  {
    title: "SpO2 and pulse",
    description:
      "Optical pulse oximetry provides blood-oxygen percentage and pulse rate, with finger contact and signal-quality checks so low-quality signals are flagged instead of showing false values.",
    icon: Droplets,
  },
  {
    title: "Body temperature with fever detection",
    description:
      "Digital temperature measurement with fever-detection logic (38°C and above) that raises an alert.",
    icon: Thermometer,
  },
  {
    title: "Environmental context",
    description:
      "Ambient temperature and humidity are monitored alongside the patient’s readings to help interpret them.",
    icon: CloudSun,
  },
  {
    title: "Activity monitoring",
    description:
      "A 3-axis accelerometer provides step counting and movement detection, with inactivity prompts and daily activity goals.",
    icon: Footprints,
  },
  {
    title: "Configurable alerts and guidance",
    description:
      "High and low thresholds for each vital trigger visual, audible and on-screen alerts with non-diagnostic advice.",
    icon: Bell,
  },
  {
    title: "Data logging and export",
    description:
      "Time-stamped vitals are stored locally on a microSD card in a CSV format that opens in Excel for later analysis.",
    icon: HardDrive,
  },
  {
    title: "Patient profiles",
    description:
      "Simple identification per session, with an ID and basic demographics. No extensive personal data is stored.",
    icon: Users,
  },
  {
    title: "Self-test and calibration",
    description:
      "A built-in self-test on startup, sensor connectivity checks, and calibration routines for temperature and blood pressure.",
    icon: Wrench,
  },
];

export const monitoredParameters = [
  { label: "Heart rate (ECG)", icon: HeartPulse },
  { label: "Blood-oxygen saturation (SpO2)", icon: Droplets },
  { label: "Pulse rate", icon: Activity },
  { label: "Body temperature", icon: Thermometer },
  { label: "Blood pressure (optional)", icon: Gauge },
  { label: "Ambient temperature & humidity", icon: CloudSun },
  { label: "Steps & movement", icon: Footprints },
];

export const architectureLayers: ArchitectureLayer[] = [
  {
    name: "Interface layer",
    detail:
      "3.5″ color touchscreen (480×320), status LEDs, a buzzer and buttons for patient and caregiver interaction.",
  },
  {
    name: "Firmware & analytics",
    detail:
      "Modular FreeRTOS tasks for ECG, PPG, temperature, environment, activity, alarms, UI, data logging and diagnostics, with on-device signal processing.",
  },
  {
    name: "Processing core",
    detail:
      "ESP32-WROOM-32 dual-core 240 MHz microcontroller with integrated Wi-Fi and BLE. Production units use a custom PCB with an ESP32 module.",
  },
  {
    name: "Sensing layer",
    detail:
      "AD8232 ECG front-end, MAX30102 pulse oximeter, 10K NTC thermistor with ADS1115 ADC, BME280 environmental sensor and a 3-axis accelerometer. Blood pressure is optional.",
  },
  {
    name: "Power & storage",
    detail:
      "Rechargeable Li-ion/LiPo battery with USB-C charging, 3.3V regulation, microSD data logging and a real-time clock.",
  },
];

export const securityPrinciples = [
  "Secure boot",
  "Flash encryption",
  "Signed firmware updates",
  "Rollback on failure",
  "Encrypted wireless (TLS)",
  "BLE / Wi-Fi pairing",
  "Minimal personal data",
  "SBOM & patching",
];

export const vitalModules: ModuleGroup[] = [
  {
    title: "ECG and heart rate",
    icon: HeartPulse,
    items: [
      "AD8232 front-end",
      "Single-lead ECG",
      "0.5–40 Hz bandpass",
      "200 Hz sampling",
      "Lead-off detection",
      "R-peak detection (Pan–Tompkins)",
      "Live waveform",
    ],
  },
  {
    title: "Heart rhythm indication",
    icon: Activity,
    items: [
      "Heart-rate variability (SDNN)",
      "Irregular rhythm suggestion",
      "Atrial fibrillation indication (optional)",
      "Not a full arrhythmia diagnosis",
    ],
  },
  {
    title: "SpO2 and pulse",
    icon: Droplets,
    items: [
      "MAX30102 sensor",
      "Red / IR optical sensing",
      "Ambient-light cancellation",
      "Signal-quality flagging",
      "±2% typical SpO2 accuracy",
      "Finger clip or adhesive sensor",
    ],
  },
  {
    title: "Body temperature",
    icon: Thermometer,
    items: [
      "10K NTC thermistor",
      "16-bit ADS1115 ADC",
      "0.1°C resolution",
      "±0.5°C with calibration",
      "Fever detection at 38°C",
      "Trend and fever monitoring",
    ],
  },
  {
    title: "Blood pressure (optional)",
    icon: Gauge,
    items: [
      "Oscillometric cuff",
      "Cuffless pulse-transit-time",
      "Arterial tonometry",
      "Systolic / diastolic readings or estimates",
      "Cuffless shown as “estimated BP”",
    ],
  },
];

export const supportingModules: ModuleGroup[] = [
  {
    title: "Environmental sensing",
    icon: CloudSun,
    items: [
      "BME280 sensor",
      "Ambient temperature",
      "Relative humidity",
      "±1°C, ±3%RH",
      "Factory calibrated",
    ],
  },
  {
    title: "Activity monitoring",
    icon: Footprints,
    items: [
      "3-axis accelerometer",
      "Step counting",
      "Movement detection",
      "Sedentary periods (optional)",
    ],
  },
  {
    title: "User interface",
    icon: LayoutDashboard,
    items: [
      "3.5″ touchscreen",
      "Vitals dashboard",
      "ECG screen",
      "SpO2 / pulse screen",
      "Temp log",
      "Environment",
      "History",
      "Settings",
    ],
  },
  {
    title: "Data logging and connectivity",
    icon: HardDrive,
    items: [
      "microSD storage",
      "CSV / Excel-compatible",
      "Time-stamped vitals",
      "Real-time clock",
      "Patient ID per session",
      "Wi-Fi / BLE (optional)",
    ],
  },
  {
    title: "Power management",
    icon: BatteryCharging,
    items: [
      "Rechargeable Li-ion / LiPo",
      "2000 mAh for all-day use",
      "USB-C charging",
      "Battery-level display",
      "Safe shutdown on low battery",
      "Deep sleep when idle",
    ],
  },
  {
    title: "Diagnostics and calibration",
    icon: Wrench,
    items: [
      "Startup self-test",
      "Sensor connectivity check",
      "Temperature calibration",
      "BP calibration",
      "I2C scans on request",
    ],
  },
];

export const bpMethods: BpMethod[] = [
  {
    name: "Oscillometric cuff",
    principle:
      "An inflatable upper-arm cuff and micro-pump detect artery oscillations during deflation to determine systolic and diastolic pressure.",
    badge: "Standard NIBP",
    points: [
      "Clinically validated, accepted standard",
      "ISO 81060-2 target: ±5 mmHg mean, ±8 mmHg SD",
      "Needs pump, valve, cuff and pressure sensor",
      "Slower (30–60 s) and not continuous",
    ],
  },
  {
    name: "Cuffless pulse-transit-time",
    principle:
      "Estimates blood pressure from the delay between the ECG R-wave and pulse arrival measured by PPG, calibrated against a real cuff.",
    badge: "Software-only",
    points: [
      "Reuses the existing ECG and PPG sensors",
      "Continuous, with no cuff inflation",
      "Needs calibration and periodic recalibration",
      "Must be shown as “estimated BP”",
    ],
  },
  {
    name: "Arterial tonometry",
    principle:
      "A pressure transducer held over a superficial artery, such as the radial artery, captures the pressure waveform.",
    badge: "Not recommended for V1",
    points: [
      "Continuous beat-to-beat waveform",
      "Sensitive to sensor placement",
      "Needs a mechanical positioning design",
      "Still requires calibration against a cuff",
    ],
  },
];

export const bpNote =
  "Early selection of the blood-pressure approach affects hardware complexity and the regulatory path, so whether to include NIBP in Version 1 is still to be finalized.";

export const alertExamples: AlertExample[] = [
  {
    parameter: "Body temperature",
    title: "Fever alert",
    message:
      "“Body temp 38.5°C. Rest and hydrate. If symptoms worsen, contact physician.”",
    note: "38°C and above is treated as fever.",
  },
  {
    parameter: "Blood pressure",
    title: "Hypertension warning",
    message: "“BP 150/95 mmHg. Elevated BP. Consider relaxation and recheck.”",
    note: "140/90 is a common threshold and is configurable.",
  },
  {
    parameter: "SpO2",
    title: "Low SpO2 caution",
    message: "“SpO2 92%. Low oxygen. If feeling unwell, seek medical help.”",
    note: "Default guideline is below 94%, configurable.",
  },
  {
    parameter: "Heart rate",
    title: "Tachycardia alert",
    message: "“HR 120 BPM. High heart rate. Rest and retest.”",
    note: "Default guideline is above 100 BPM, configurable.",
  },
  {
    parameter: "Activity",
    title: "Inactivity prompt",
    message:
      "“You have 1500 steps today. Aim for 7000+ steps (150 min exercise/week).”",
    note: "Encourages daily activity goals.",
  },
];

export const alertDelivery = [
  { label: "Status LEDs (green, yellow, red)", icon: Bell },
  { label: "Audible buzzer", icon: Zap },
  { label: "On-screen overlay messages", icon: LayoutDashboard },
];

export const complianceAreas: ComplianceArea[] = [
  {
    title: "Accuracy verification",
    description:
      "Each vital is compared with calibrated references: a waveform simulator or ECG database for ECG and heart rate, a clinical finger oximeter for SpO2, a calibrated thermometer for temperature (±0.5°C), and a reference sphygmomanometer for blood pressure.",
    icon: ClipboardCheck,
  },
  {
    title: "Electrical safety and EMC",
    description:
      "Leakage current, dielectric strength and grounding tests under IEC 60601-1, radiated emission and immunity testing under IEC 60601-1-2, and battery safety testing (UL 2054 or UN38.3).",
    icon: Zap,
  },
  {
    title: "Biocompatibility and environment",
    description:
      "ISO 10993-1 for materials that touch skin, an enclosure rating of at least IP21, thermal cycling, drop and shock, humidity exposure and surface-temperature checks.",
    icon: FlaskConical,
  },
  {
    title: "Usability and alarm testing",
    description:
      "IEC 62366 usability walkthroughs, alarm patterns per IEC 60601-1-8, and programmable thresholds with defaults based on clinical guidelines.",
    icon: Bell,
  },
  {
    title: "Software and cybersecurity",
    description:
      "IEC 62304-compliant software verification and validation, IEC 81001-5-1 cybersecurity guidance, and dependency management with SBOM and patching.",
    icon: FileCheck,
  },
  {
    title: "Regulatory pathway",
    description:
      "Intended for FDA Class II (510(k), 21 CFR 870.2300) and EU MDR Class IIa, supported by an ISO 13485 quality system, ISO 14971 risk management, and DHF and DHR documentation.",
    icon: BadgeCheck,
  },
];

export const standards = [
  "IEC 60601-1",
  "IEC 60601-1-2",
  "IEC 60601-1-8",
  "IEC 60601-2-27",
  "IEC 80601-2-49",
  "ISO 80601-2-61",
  "ISO 81060-2",
  "ISO 13485",
  "ISO 14971",
  "IEC 62366",
  "IEC 62304",
  "IEC 81001-5-1",
];

export const roadmap: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    weeks: "Weeks 1–4",
    title: "Feasibility",
    deliverables: [
      "Concept prototype integrating ESP32 with AD8232, MAX30102, BME280 and NTC (ADS1115)",
      "Basic LCD output and proof-of-concept UI",
      "Preliminary ECG, SpO2 and temperature software modules",
      "Evaluate blood-pressure module options",
    ],
  },
  {
    phase: "Phase 2",
    weeks: "Weeks 5–12",
    title: "Engineering prototype",
    deliverables: [
      "Custom PCB design for ESP32, sensors and power",
      "RTOS firmware tasks and full UI navigation",
      "microSD data logging, accelerometer, RTC and battery system",
      "3D-printed enclosure and first calibration procedures",
    ],
  },
  {
    phase: "Phase 3",
    weeks: "Weeks 13–20",
    title: "Alpha validation",
    deliverables: [
      "Assemble units, run functional testing and calibrate sensors",
      "Implement alert logic",
      "Preliminary EMC pre-scan",
      "Diagnostic and test routines, with design revised from feedback",
    ],
  },
  {
    phase: "Phase 4",
    weeks: "Weeks 21–28",
    title: "Pre-production",
    deliverables: [
      "Finalize hardware (PCB 2.0) and enclosure (injection-mold tooling)",
      "Complete software validation, including fault injection and safety checks",
      "Detailed documentation: DHF and test protocols",
      "Prepare regulatory files, including risk management",
    ],
  },
  {
    phase: "Phase 5",
    weeks: "Weeks 29–36",
    title: "Pilot production",
    deliverables: [
      "Manufacture a small batch",
      "Full verification and validation: EMC, safety labs, accuracy and biocompatibility tests",
      "Refine assembly and QC process",
      "User training and labeling",
    ],
  },
  {
    phase: "Phase 6",
    weeks: "Weeks 37–52",
    title: "Commercial launch",
    deliverables: [
      "Regulatory submissions (EU, and FDA if targeted)",
      "Marketing materials",
      "Scale production",
      "Establish supply chain and support infrastructure",
    ],
  },
];

export const roadmapNote =
  "Each phase ends with a design review. Timelines are estimates and may overlap.";

export const dependencies = [
  "Early selection of the blood-pressure approach, including whether NIBP is part of Version 1.",
  "Sensor calibration kits and test equipment ready before validation begins.",
  "Design for manufacturability reviews for the PCB and enclosure, starting at the engineering prototype stage.",
];
