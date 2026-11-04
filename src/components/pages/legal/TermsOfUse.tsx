import LegalPageLayout, { type LegalSection } from "./LegalPageLayout";

const sections: LegalSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "These draft terms describe general conditions for using the Bytherix Technology website. Review them against the website’s current features, business practices, and applicable law before publication.",
    ],
  },
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using the website, you are asked to comply with the terms that are in effect and any applicable law. Confirm how users are notified of and accept these terms, especially where a separate service or purchase has additional conditions.",
    ],
  },
  {
    title: "Website Usage",
    paragraphs: [
      "You may use the website for lawful purposes and in a manner consistent with these terms. Website content is provided for general information unless a specific product or service description states otherwise.",
    ],
  },
  {
    title: "User Responsibilities",
    paragraphs: [
      "When using the website or contacting Bytherix, provide information that is accurate to the best of your knowledge, respect the rights of others, and do not interfere with the website or its users.",
    ],
  },
  {
    title: "Intellectual Property Rights",
    paragraphs: [
      "The website’s text, branding, graphics, and other materials may be protected by intellectual-property laws. Confirm ownership, permitted uses, and any third-party materials before publishing a definitive rights statement. No permission to reproduce or commercially use materials should be inferred beyond what applicable law allows.",
    ],
  },
  {
    title: "Products and Services",
    paragraphs: [
      "Products and services may have additional descriptions, availability information, usage conditions, or written agreements. If terms differ, confirm which terms govern the relevant offering and make them available before the user commits to a purchase or engagement.",
    ],
  },
  {
    title: "Account Responsibilities",
    paragraphs: [
      "If an offering allows you to create an account, you are responsible for keeping your sign-in details secure and for activity through your account, subject to applicable law. Confirm the account features, security procedures, and account-closure process before publishing account-specific terms.",
    ],
  },
  {
    title: "Prohibited Activities",
    paragraphs: [
      "Do not use the website to violate laws or others’ rights, attempt unauthorized access, disrupt or impair website operation, distribute malicious code, or misuse website content. This list should be reviewed against the actual services and relevant legal requirements.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "Any exclusion or limitation of liability must be reviewed and tailored to applicable law, including mandatory consumer protections and exceptions that cannot legally be excluded. No final liability cap, warranty disclaimer, or remedy is established by this draft.",
    ],
  },
  {
    title: "Third-Party Links",
    paragraphs: [
      "The website may link to third-party sites or services for convenience. Bytherix does not control their content or practices; confirm the wording and any responsibility that may apply before publication.",
    ],
  },
  {
    title: "Modifications to Terms",
    paragraphs: [
      "These terms may need to change as the website or services evolve. Confirm how updates will be dated, communicated, and applied to existing users or purchases before publication.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "The governing law and any forum for resolving disputes have not been specified. Confirm the appropriate jurisdiction and dispute terms with qualified counsel before publishing this section.",
    ],
  },
  {
    title: "Contact Information",
    paragraphs: [
      "For questions about these terms, contact Bytherix Technology at bytherix1@gmail.com. Confirm that this is the preferred contact for legal notices or other formal communications before publication.",
    ],
  },
];

function TermsOfUse() {
  return (
    <LegalPageLayout
      title="Terms of Use"
      introduction="These terms set out the proposed ground rules for using the Bytherix Technology website. Read them alongside any terms that apply to a particular product or service."
      sections={sections}
    />
  );
}

export default TermsOfUse;
