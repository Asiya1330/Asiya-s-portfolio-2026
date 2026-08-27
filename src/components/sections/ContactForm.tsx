"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { sendMessage } from "@/app/actions/contact";
import { initialContactState } from "@/app/actions/contact-state";
import styles from "./Contact.module.css";

export function ContactForm() {
  const [state, action] = useActionState(sendMessage, initialContactState);

  if (state.status === "sent") {
    return (
      <div className={styles.panel}>
        <span className="label">Sent</span>
        <h3 className={styles.panelTitle}>Thank you — that reached me.</h3>
        <p className={styles.panelNote}>
          I read everything myself and reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.panel} action={action} noValidate>
      <span className="label">Send a brief</span>
      <h3 className={styles.panelTitle}>Tell me what you are building</h3>

      <Field
        name="name"
        label="Name"
        defaultValue={state.values?.name}
        error={state.fieldErrors?.name}
        autoComplete="name"
      />
      <Field
        name="email"
        label="Email"
        type="email"
        defaultValue={state.values?.email}
        error={state.fieldErrors?.email}
        autoComplete="email"
      />
      <Field
        name="message"
        label="What do you need built?"
        defaultValue={state.values?.message}
        error={state.fieldErrors?.message}
        multiline
      />

      {/* spam trap — hidden from people, irresistible to bots */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && <p className={styles.formError}>{state.message}</p>}

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending} data-hover>
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  error?: string;
  multiline?: boolean;
  autoComplete?: string;
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  error,
  multiline,
  autoComplete,
}: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <p className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          defaultValue={defaultValue}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error && (
        <span id={errorId} className={styles.fieldError}>
          {error}
        </span>
      )}
    </p>
  );
}
