import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";

import {
  CONTACT_FALLBACK_EMAIL,
  CONTACT_PHONE,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "../../../../../../services/contactService";

const initialFormData: ContactPayload = {
  companyName: "",
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "unconfigured";

const ContactForm = () => {
  const [formData, setFormData] =
    useState<ContactPayload>(initialFormData);

  const [errors, setErrors] =
    useState<ContactErrors>({});

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    const fieldName =
      name as keyof ContactPayload;

    if (errors[fieldName]) {
      setErrors((previous) => ({
        ...previous,
        [fieldName]: "",
      }));
    }

    if (status !== "idle" && status !== "submitting") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const validationErrors = validateContact(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    setErrors({});

    /*
     * Honeypot: real users never see or fill this field.
     * Bots that do are silently ignored — nothing is sent.
     */
    if (honeypot.trim().length > 0) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const result = await submitContact(formData);

    if (result.status === "success") {
      setStatus("success");
      setFormData(initialFormData);
      return;
    }

    if (result.status === "unconfigured") {
      setStatus("unconfigured");
      return;
    }

    setErrorMessage(result.message);
    setStatus("error");
  };

  /* =========================================================
     INPUT STYLE
  ========================================================= */

  const inputClass = (hasError = false) => `
    h-11
    w-full
    border
    ${
      hasError
        ? "border-red-500"
        : "border-[var(--border-primary)]"
    }
    bg-[var(--surface-secondary)]
    px-3.5
    text-sm
    text-[var(--text-primary)]
    outline-none
    placeholder:text-[var(--text-muted)]
    transition-all
    duration-300

    focus:border-[var(--color-green)]
    focus:bg-[var(--surface-primary)]
    focus:ring-2
    focus:ring-[var(--color-green)]/10

    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  /* =========================================================
     LABEL STYLE
  ========================================================= */

  const labelClass = `
    mb-1.5
    block
    text-xs
    font-semibold
    leading-4
    text-[var(--text-primary)]
  `;

  /* =========================================================
     ERROR STYLE
  ========================================================= */

  const errorClass = `
    mt-1
    text-[11px]
    leading-4
    text-red-500
  `;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5">
        <h2
          id="contact-form-heading"
          className="
            font-['Inter']
            text-2xl
            font-bold
            leading-tight
            tracking-tight
            text-[var(--text-primary)]
            sm:text-3xl
            lg:text-[2rem]
          "
        >
          Send Us A Message
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            text-xs
            leading-5
            text-[var(--text-muted)]
            sm:text-sm
          "
        >
          Tell us a little about your project, idea,
          or requirements. Our team will get back to
          you.
        </p>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-3.5"
      >
        {/* ===================================================
            COMPANY + NAME
        =================================================== */}

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Company */}

          <div>
            <label
              htmlFor="companyName"
              className={labelClass}
            >
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company"
              autoComplete="organization"
              className={inputClass()}
            />
          </div>

          {/* Name */}

          <div>
            <label
              htmlFor="name"
              className={labelClass}
            >
              Your Name
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name
                  ? "name-error"
                  : undefined
              }
              className={inputClass(
                Boolean(errors.name)
              )}
            />

            {errors.name && (
              <p
                id="name-error"
                className={errorClass}
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>
        </div>

        {/* ===================================================
            EMAIL + PHONE
        =================================================== */}

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className={labelClass}
            >
              Email Address
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email
                  ? "email-error"
                  : undefined
              }
              className={inputClass(
                Boolean(errors.email)
              )}
            />

            {errors.email && (
              <p
                id="email-error"
                className={errorClass}
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <label
              htmlFor="phone"
              className={labelClass}
            >
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+977 ..."
              autoComplete="tel"
              className={inputClass()}
            />
          </div>
        </div>

        {/* ===================================================
            SUBJECT
        =================================================== */}

        <div>
          <label
            htmlFor="subject"
            className={labelClass}
          >
            Subject
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={
              errors.subject
                ? "subject-error"
                : undefined
            }
            className={inputClass(
              Boolean(errors.subject)
            )}
          />

          {errors.subject && (
            <p
              id="subject-error"
              className={errorClass}
              role="alert"
            >
              {errors.subject}
            </p>
          )}
        </div>

        {/* ===================================================
            MESSAGE
        =================================================== */}

        <div>
          <label
            htmlFor="message"
            className={labelClass}
          >
            Message
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message
                ? "message-error"
                : undefined
            }
            rows={4}
            className={`
              min-h-[100px]
              w-full
              resize-y
              border
              ${
                errors.message
                  ? "border-red-500"
                  : "border-[var(--border-primary)]"
              }
              bg-[var(--surface-secondary)]
              px-3.5
              py-3
              text-sm
              leading-5
              text-[var(--text-primary)]
              outline-none
              placeholder:text-[var(--text-muted)]
              transition-all
              duration-300

              focus:border-[var(--color-green)]
              focus:bg-[var(--surface-primary)]
              focus:ring-2
              focus:ring-[var(--color-green)]/10
            `}
          />

          {errors.message && (
            <p
              id="message-error"
              className={errorClass}
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* ===================================================
            SPAM HONEYPOT (hidden from users and assistive tech)
        =================================================== */}

        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {/* ===================================================
            SUBMIT BUTTON
        =================================================== */}

        <div className="pt-1">
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              bg-[var(--color-green)]
              px-6
              text-sm
              font-semibold
              text-white
              outline-none
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:opacity-90

              focus-visible:ring-2
              focus-visible:ring-[var(--color-green)]
              focus-visible:ring-offset-2

              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
        </div>

        {/* ===================================================
            FORM STATUS
        =================================================== */}

        {status === "success" && (
          <p
            role="status"
            className="
              text-xs
              font-medium
              leading-4
              text-[var(--color-green)]
            "
          >
            Thank you. Your message has been sent. Our
            team will reply as soon as possible.
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="
              text-xs
              font-medium
              leading-4
              text-red-500
            "
          >
            {errorMessage}{" "}
            <a
              href={`mailto:${CONTACT_FALLBACK_EMAIL}`}
              className="underline"
            >
              Email {CONTACT_FALLBACK_EMAIL}
            </a>
          </p>
        )}

        {status === "unconfigured" && (
          <p
            role="status"
            className="
              text-xs
              font-medium
              leading-5
              text-[var(--text-secondary)]
            "
          >
            This form is not connected to a message
            service yet, so your message has not been
            sent. Please email{" "}
            <a
              href={`mailto:${CONTACT_FALLBACK_EMAIL}`}
              className="underline"
            >
              {CONTACT_FALLBACK_EMAIL}
            </a>{" "}
            or call{" "}
            <a href="tel:+9779861165413" className="underline">
              {CONTACT_PHONE}
            </a>{" "}
            and we will respond directly.
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;