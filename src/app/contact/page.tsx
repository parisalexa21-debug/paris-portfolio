"use client";

import { useState } from "react";

export default function ContactPage() {
  const EMAIL = "Paris.alexa21@gmail.com";
  const LINKEDIN = "https://linkedin.com/in/paris-peña-09357820b";
  const GITHUB = "https://github.com/parisalexa21-debug";

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("Portfolio Contact");
  const [message, setMessage] = useState("");

  function mailtoLink() {
    const body =
      `Name: ${name}\n` +
      `Email: ${fromEmail}\n\n` +
      `${message}`;

    const params = new URLSearchParams({
      subject,
      body,
    });

    return `mailto:${EMAIL}?${params.toString()}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      alert("Email copied!");
    } catch {
      alert("Could not copy. Please copy manually: " + EMAIL);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 text-gray-600">
          Want to connect? Send a message or reach out through LinkedIn.
        </p>
      </div>

      {/* Contact cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">Email</h2>
          <p className="mt-2 text-sm text-gray-700 break-all">{EMAIL}</p>
          <div className="mt-4 flex gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Email Me
            </a>
            <button
              onClick={copyEmail}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">LinkedIn</h2>
          <p className="mt-2 text-sm text-gray-700">
            Professional profile + messaging
          </p>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Open LinkedIn →
          </a>
        </div>

        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">GitHub</h2>
          <p className="mt-2 text-sm text-gray-700">
            Projects + code repositories
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Open GitHub →
          </a>
        </div>
      </div>

      {/* Simple message form (mailto-based) */}
      <div className="rounded-xl border p-5">
        <h2 className="font-semibold">Send a message</h2>
        <p className="mt-2 text-sm text-gray-600">
          This form opens your email app with the message pre-filled.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Your email</label>
            <input
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full rounded-lg border px-3 py-2 text-sm"
              rows={5}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={mailtoLink()}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Open Email Draft →
          </a>
          <button
            type="button"
            onClick={() => {
              setName("");
              setFromEmail("");
              setSubject("Portfolio Contact");
              setMessage("");
            }}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}