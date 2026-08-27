export interface ContactState {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back so a rejected form does not lose what was typed. */
  values?: { name: string; email: string; message: string };
}

export const initialContactState: ContactState = { status: "idle" };
