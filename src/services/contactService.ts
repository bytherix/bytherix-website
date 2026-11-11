export interface ContactPayload {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export type ContactResult =
  | { status: "success" }
  | { status: "unconfigured" }
  | { status: "error"; message: string };

export const CONTACT_FALLBACK_EMAIL = "bytherix1@gmail.com";
export const CONTACT_PHONE = "+977 9861165413";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  if (!data.name.trim()) {
    errors.name = "Your name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

/**
 * The contact endpoint is intentionally optional. Until the owner provisions a
 * form backend the UI must not pretend a message was delivered.
 */
export function getContactEndpoint(): string | null {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  return typeof endpoint === "string" && endpoint.trim().length > 0
    ? endpoint.trim()
    : null;
}

interface SubmitOptions {
  endpoint?: string | null;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export async function submitContact(
  data: ContactPayload,
  options: SubmitOptions = {},
): Promise<ContactResult> {
  const endpoint =
    options.endpoint === undefined ? getContactEndpoint() : options.endpoint;
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 10_000;

  if (!endpoint) {
    return { status: "unconfigured" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: data.companyName.trim(),
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        source: "bytherixtechnology.com",
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        status: "error",
        message: `The message could not be sent (status ${response.status}). Please email us directly.`,
      };
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message:
        "The message could not be sent. Please check your connection or email us directly.",
    };
  } finally {
    clearTimeout(timer);
  }
}
