import { describe, expect, it, vi } from "vitest";

import {
  submitContact,
  validateContact,
  type ContactPayload,
} from "./contactService";

const validPayload: ContactPayload = {
  companyName: "  Bytherix  ",
  name: "  Sarina Balami ",
  email: "  sarina@example.com ",
  phone: " +977 9800000000 ",
  subject: "  New project ",
  message: "  We need a website.  ",
};

describe("validateContact", () => {
  it("reports every required field when the form is empty", () => {
    const errors = validateContact({
      companyName: "",
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    expect(Object.keys(errors).sort()).toEqual([
      "email",
      "message",
      "name",
      "subject",
    ]);
  });

  it("rejects an invalid email address", () => {
    const errors = validateContact({ ...validPayload, email: "not-an-email" });

    expect(errors.email).toBe("Please enter a valid email address.");
  });

  it("accepts a complete payload", () => {
    expect(validateContact(validPayload)).toEqual({});
  });
});

describe("submitContact", () => {
  it("reports the form as unconfigured when no endpoint exists", async () => {
    const result = await submitContact(validPayload, { endpoint: null });

    expect(result).toEqual({ status: "unconfigured" });
  });

  it("posts a trimmed payload and reports success on a 2xx response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 202 }));

    const result = await submitContact(validPayload, {
      endpoint: "https://example.com/contact",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result).toEqual({ status: "success" });
    expect(fetchImpl).toHaveBeenCalledTimes(1);

    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://example.com/contact");
    expect(init.method).toBe("POST");

    const body = JSON.parse(String(init.body)) as Record<string, string>;
    expect(body).toMatchObject({
      name: "Sarina Balami",
      email: "sarina@example.com",
      subject: "New project",
      message: "We need a website.",
      source: "bytherixtechnology.com",
    });
  });

  it("surfaces a non-2xx response as an error", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));

    const result = await submitContact(validPayload, {
      endpoint: "https://example.com/contact",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.message).toContain("500");
    }
  });

  it("surfaces a network failure as an error", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("offline"));

    const result = await submitContact(validPayload, {
      endpoint: "https://example.com/contact",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(result.status).toBe("error");
  });
});
