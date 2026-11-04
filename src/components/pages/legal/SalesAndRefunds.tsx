import LegalPageLayout, { type LegalSection } from "./LegalPageLayout";

const sections: LegalSection[] = [
  {
    title: "Overview",
    paragraphs: [
      "This draft describes considerations for purchases made through Bytherix Technology. The final policy should match the products and services actually sold, the checkout terms shown at purchase, and applicable consumer-protection requirements.",
    ],
  },
  {
    title: "Product and Service Purchases",
    paragraphs: [
      "Product descriptions, scope, deliverables, availability, and any purchase-specific conditions should be reviewed before an order is placed. For custom or project-based services, the written proposal or agreement for that engagement may provide additional details.",
      "Confirm the sales channels and terms that apply to each current Bytherix offering.",
    ],
  },
  {
    title: "Pricing and Payment",
    paragraphs: [
      "The price, currency, applicable taxes or fees, and available payment methods should be shown before the customer completes a purchase. Confirm the actual checkout configuration and any price-related terms; no particular payment provider or fee is specified by this draft.",
    ],
  },
  {
    title: "Order Confirmation",
    paragraphs: [
      "A confirmation message or receipt may be provided using the contact details supplied during an order. Confirm when an order is considered accepted, how confirmations are delivered, and what process applies if an order cannot be fulfilled.",
    ],
  },
  {
    title: "Digital Products and Services",
    paragraphs: [
      "Where a purchase includes digital content or an online service, the delivery method, access requirements, availability, and any usage limits should be disclosed before purchase. Confirm the relevant details for each digital offering.",
    ],
  },
  {
    title: "Cancellation Policy",
    paragraphs: [
      "Cancellation options may depend on the type of purchase, work already performed, and any terms agreed before purchase. Review the applicable product or service terms and any mandatory cancellation rights before stating a definitive cancellation rule.",
    ],
  },
  {
    title: "Refund Eligibility",
    paragraphs: [
      "Refund eligibility depends on the purchase terms, the circumstances of the request, and applicable law. This draft does not promise a refund or establish a universal eligibility period. Confirm and publish the specific rules for each offering, including any rights that cannot be excluded by law.",
    ],
  },
  {
    title: "Refund Process",
    paragraphs: [
      "To raise a purchase or refund question, contact Bytherix at bytherix1@gmail.com and include the order reference and a brief description of the issue. Avoid sending payment-card details by email. Confirm the review process, any required evidence, and expected handling times before publication.",
    ],
  },
  {
    title: "Non-Refundable Purchases",
    paragraphs: [
      "No category of purchase is designated as non-refundable by this draft. Any proposed exclusions must be clearly disclosed before purchase and reviewed for compliance with applicable law.",
    ],
  },
  {
    title: "Subscription and Renewal Terms",
    paragraphs: [
      "If subscriptions are offered, the purchase flow should clearly disclose the billing amount and frequency, renewal and cancellation terms, and how changes are communicated. Confirm whether subscriptions or automatic renewals are offered and the exact terms before publishing this section.",
    ],
  },
  {
    title: "Contact Information",
    paragraphs: [
      "For purchase, cancellation, or refund questions, contact Bytherix Technology at bytherix1@gmail.com. Confirm that this is the preferred support contact before publication.",
    ],
  },
];

function SalesAndRefunds() {
  return (
    <LegalPageLayout
      title="Sales and Refunds"
      introduction="Information for customers considering a Bytherix product or service purchase. Purchase-specific terms and applicable legal rights should be reviewed before this draft is published."
      sections={sections}
    />
  );
}

export default SalesAndRefunds;
