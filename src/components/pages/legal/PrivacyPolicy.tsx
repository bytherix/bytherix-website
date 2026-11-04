import LegalPageLayout, { type LegalSection } from "./LegalPageLayout";

const sections: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "This draft explains how Bytherix Technology may handle information when you visit this website, contact us, or use a product or service offered here. The exact practices should be confirmed before this policy is published.",
    ],
  },
  {
    title: "Information We Collect",
    paragraphs: [
      "Depending on the features you use, information may include details you choose to provide, such as your name, email address, message, or information needed to discuss or fulfill a purchase. Basic technical information, such as browser, device, and usage data, may also be processed by the website or its hosting and service providers.",
      "Confirm which forms, account features, analytics, and transaction records are active and what information they collect.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "Information may be used to respond to inquiries, provide requested products or services, operate and maintain the website, support transactions, and address security or legal requirements. Confirm the purposes that match current Bytherix operations before publication.",
    ],
  },
  {
    title: "Cookies and Tracking Technologies",
    paragraphs: [
      "The website or services integrated with it may use cookies or similar technologies for essential functions, preferences, analytics, or other purposes. Confirm which technologies are in use, what they do, and whether a consent or preference control is required in the regions served.",
    ],
  },
  {
    title: "Information Sharing and Disclosure",
    paragraphs: [
      "Information may be made available to service providers when needed to operate the website or deliver a requested service, or disclosed when required by law or to protect legitimate rights and safety. Confirm the actual providers, data flows, and any additional sharing practices before publication; do not include providers that are not in use.",
    ],
  },
  {
    title: "Data Security",
    paragraphs: [
      "Appropriate safeguards should be selected for the information and systems involved. No method of transmission or storage can be represented as completely secure. Confirm the security measures that Bytherix actually maintains before making specific security claims.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "Information should be retained only as long as needed for the relevant purpose, applicable requirements, or resolution of a matter. Confirm the retention periods and deletion practices for each type of information before publication.",
    ],
  },
  {
    title: "User Rights and Choices",
    paragraphs: [
      "Depending on where you live and the information involved, you may have rights to request access, correction, deletion, or other choices regarding your personal information. Available rights, verification steps, and response requirements vary. Confirm the applicable process and requirements before publication.",
      "You can contact Bytherix at bytherix1@gmail.com with a privacy question or request. Do not send sensitive information unless it is necessary to handle your request.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "Links or embedded features may lead to services operated by others. Their privacy practices are governed by their own notices, not this policy. Confirm which third-party services are integrated with the website and link to their notices where appropriate.",
    ],
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      "Confirm whether any Bytherix website or service is directed to children, the applicable age threshold, and the procedures for handling information relating to children before publication. Do not make an age-related assurance until those details have been reviewed.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "If this policy is updated, the published version should include a revised effective date and explain material changes where appropriate. Confirm how updates will be communicated to affected users.",
    ],
  },
  {
    title: "Contact Information",
    paragraphs: [
      "For privacy questions or requests, contact Bytherix Technology at bytherix1@gmail.com. Confirm that this is the preferred contact for privacy matters before publication.",
    ],
  },
];

function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      introduction="A clear overview of how information may be handled when you interact with Bytherix Technology. This draft is intended for review against the website’s actual data practices."
      sections={sections}
    />
  );
}

export default PrivacyPolicy;
