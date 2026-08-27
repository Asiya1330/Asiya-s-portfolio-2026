"use server";

import { site } from "@/content";
import type { ContactState } from "./contact-state";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

/**
 * Handles the contact form.
 *
 * Validation runs on the server because that is the only place it
 * counts — the matching client-side checks are a convenience, not a
 * guard. Delivery goes through Resend's REST API directly; the SDK
 * would be a dependency for one fetch call.
 *
 * With RESEND_API_KEY unset the action fails loudly and tells the
 * visitor to email instead, rather than silently swallowing the note.
 */
export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Bots fill in every field they find. This one is hidden from people.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "sent" };
  }

  const values = { name, email, message };
  const fieldErrors: ContactState["fieldErrors"] = {};

  if (name.length < 2) fieldErrors.name = "Please add your name.";
  if (!EMAIL.test(email)) fieldErrors.email = "That email does not look right.";
  if (message.length < 20) {
    fieldErrors.message = "A sentence or two about the project, please.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      status: "error",
      message: `Sending is not configured yet — please email ${site.email} directly.`,
      values,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: email,
        subject: `Client Message — ${name}`,
        text: `${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the message:", response.status, detail);
      return {
        status: "error",
        message: `Something went wrong sending that. Please email ${site.email}.`,
        values,
      };
    }

    return { status: "sent" };
  } catch (error) {
    console.error("Contact form failed:", error);
    return {
      status: "error",
      message: `Something went wrong sending that. Please email ${site.email}.`,
      values,
    };
  }
}
