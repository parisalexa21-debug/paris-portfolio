import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          reply:
            "Server is missing OPENAI_API_KEY. Add it to .env.local and restart the dev server.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({} as any));

    // Support different client payload shapes:
    const message =
      String(body?.message ?? body?.input ?? body?.text ?? "").trim();

    if (!message) {
      return new Response(JSON.stringify({ reply: "Please enter a question." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const system = `
You are an AI Resume Assistant for Paris Peña’s portfolio site.

Tone:
- Cybersecurity-professional, confident, concise, and friendly.
- Prefer bullet points for clarity.

Scope:
- Answer questions about Paris’s education, skills, projects, interests, and contact info.
- Use only information implied by the portfolio context:
  - Cybersecurity student with Criminal Justice background and a Cybersecurity minor
  - Building Next.js/React + TypeScript + Tailwind projects
  - Security compliance/CSET documentation work
  - Portfolio includes an AI assistant + projects
  - Contact email: Paris.alexa21@gmail.com
  - GitHub: https://github.com/parisalexa21-debug
  - LinkedIn: https://linkedin.com/in/paris-peña-09357820b

Rules:
- If you don’t know a detail, say so and suggest contacting Paris.
- Do not invent employers, certifications, dates, or private details.
- Keep responses under ~120 words unless asked for more.
`.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 220,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() ?? "";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    // Log full error server-side (Terminal)
    console.error("API /api/chat error:", err?.message ?? err);

    return new Response(
      JSON.stringify({
        reply: "AI assistant error. Please try again.",
        // helpful during dev; you can remove later:
        debug: err?.message ?? String(err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}