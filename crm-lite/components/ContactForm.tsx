"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email") || null,
        phone: form.get("phone") || null,
        company: form.get("company") || null,
      }),
    });
    setSubmitting(false);
    e.currentTarget.reset();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Company
        <input name="company" />
      </label>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Phone
        <input name="phone" />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding…" : "Add contact"}
      </button>
    </form>
  );
}
