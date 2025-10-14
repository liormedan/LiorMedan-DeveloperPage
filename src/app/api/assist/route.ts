import { NextRequest } from "next/server";
import { assistJsonSchema, type AssistOutput } from "@/lib/assistSchema";

const SYS_PROMPT = `You are a senior product/tech architect. Given a user's idea, produce a concise, practical scope, a first-pass architecture, DB entities, API endpoints, a phased plan, estimate, and simple diagram specs.

Constraints:
- Output MUST be valid JSON matching the provided JSON Schema exactly.
- Be pragmatic and minimal; avoid fluff. Prefer 4–7 bullets per list.
- Use short Hebrew labels where relevant; code/type names in English.
- diagrams.flow should reflect the main user flow (client -> app -> services -> db).
- diagrams.gantt: 4–8 tasks with start_week and weeks.
`;

export async function POST(req: NextRequest) {
  const { query } = (await req.json().catch(() => ({}))) as { query?: string };
  if (!query || !query.trim()) return Response.json({ ok: false, error: "missing_query" }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_ASSIST_MODEL || "gpt-4o-mini";
  if (!apiKey) {
    return Response.json({ ok: false, error: "missing_api_key" }, { status: 500 });
  }

  const body = {
    model,
    input: [
      { role: "system", content: SYS_PROMPT },
      { role: "user", content: query.slice(0, 6000) },
    ],
    response_format: {
      type: "json_schema",
      json_schema: assistJsonSchema,
    },
    temperature: 0.2,
  } as const;

  try {
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const j = await r.json();

    // Try to read the JSON text from various fields (stable across versions)
    const text = j.output_text || j.output?.[0]?.content?.[0]?.text || j.choices?.[0]?.message?.content;
    if (!text || typeof text !== "string") {
      return Response.json({ ok: false, error: "bad_response", raw: j }, { status: 502 });
    }
    let data: AssistOutput;
    try {
      data = JSON.parse(text) as AssistOutput;
    } catch (e) {
      return Response.json({ ok: false, error: "parse_error", sample: text.slice(0, 400) }, { status: 502 });
    }
    return Response.json({ ok: true, data });
  } catch (e: any) {
    return Response.json({ ok: false, error: "upstream_error", message: String(e?.message || e) }, { status: 502 });
  }
}

