export type AssistOutput = {
  scope: {
    goals: string[];
    users: string[];
    use_cases: { title: string; as_a?: string; i_want?: string; so_that?: string }[];
  };
  architecture: {
    modules: { name: string; responsibilities: string[] }[];
    services?: { name: string; type?: string; notes?: string }[];
    integrations?: { name: string; purpose?: string }[];
  };
  data: {
    entities: {
      name: string;
      fields: { name: string; type: string; required?: boolean; notes?: string }[];
    }[];
    relationships?: { from: string; to: string; type: "1-1" | "1-n" | "n-n"; notes?: string }[];
  };
  api?: {
    endpoints: {
      method: string;
      path: string;
      summary?: string;
      request?: Record<string, unknown>;
      response?: Record<string, unknown>;
    }[];
  };
  plan: {
    phases: {
      name: string;
      weeks: number;
      tasks: { title: string; points?: number; depends_on?: string[] }[];
    }[];
  };
  estimate: {
    price_range_usd: { min: number; max: number };
    timeline_weeks: number;
    assumptions: string[];
  };
  diagrams: {
    flow?: { nodes: { id: string; label: string }[]; edges: { from: string; to: string }[] };
    erd?: { entities: { name: string; fields: { name: string; type: string }[] }[]; relationships?: { from: string; to: string; type: string }[] };
    gantt?: { tasks: { title: string; start_week: number; weeks: number }[] };
  };
  risks?: string[];
  clarifying_questions?: string[];
};

// JSON Schema for OpenAI response_format (Draft-07–like subset)
export const assistJsonSchema = {
  name: "assist_output",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      scope: {
        type: "object",
        additionalProperties: false,
        properties: {
          goals: { type: "array", items: { type: "string" } },
          users: { type: "array", items: { type: "string" } },
          use_cases: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                title: { type: "string" },
                as_a: { type: "string" },
                i_want: { type: "string" },
                so_that: { type: "string" },
              },
              required: ["title"],
            },
          },
        },
        required: ["goals", "users", "use_cases"],
      },
      architecture: {
        type: "object",
        additionalProperties: false,
        properties: {
          modules: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                name: { type: "string" },
                responsibilities: { type: "array", items: { type: "string" } },
              },
              required: ["name", "responsibilities"],
            },
          },
          services: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: { name: { type: "string" }, type: { type: "string" }, notes: { type: "string" } },
              required: ["name"],
            },
          },
          integrations: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: { name: { type: "string" }, purpose: { type: "string" } },
              required: ["name"],
            },
          },
        },
        required: ["modules"],
      },
      data: {
        type: "object",
        additionalProperties: false,
        properties: {
          entities: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                name: { type: "string" },
                fields: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      name: { type: "string" },
                      type: { type: "string" },
                      required: { type: "boolean" },
                      notes: { type: "string" },
                    },
                    required: ["name", "type"],
                  },
                },
              },
              required: ["name", "fields"],
            },
          },
          relationships: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                from: { type: "string" },
                to: { type: "string" },
                type: { type: "string", enum: ["1-1", "1-n", "n-n"] },
                notes: { type: "string" },
              },
              required: ["from", "to", "type"],
            },
          },
        },
        required: ["entities"],
      },
      api: {
        type: "object",
        additionalProperties: false,
        properties: {
          endpoints: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
              properties: {
                method: { type: "string" },
                path: { type: "string" },
                summary: { type: "string" },
                request: { type: "object" },
                response: { type: "object" },
              },
              required: ["method", "path"],
            },
          },
        },
        required: ["endpoints"],
      },
      plan: {
        type: "object",
        additionalProperties: false,
        properties: {
          phases: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                name: { type: "string" },
                weeks: { type: "number" },
                tasks: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      title: { type: "string" },
                      points: { type: "number" },
                      depends_on: { type: "array", items: { type: "string" } },
                    },
                    required: ["title"],
                  },
                },
              },
              required: ["name", "weeks", "tasks"],
            },
          },
        },
        required: ["phases"],
      },
      estimate: {
        type: "object",
        additionalProperties: false,
        properties: {
          price_range_usd: {
            type: "object",
            additionalProperties: false,
            properties: { min: { type: "number" }, max: { type: "number" } },
            required: ["min", "max"],
          },
          timeline_weeks: { type: "number" },
          assumptions: { type: "array", items: { type: "string" } },
        },
        required: ["price_range_usd", "timeline_weeks", "assumptions"],
      },
      diagrams: {
        type: "object",
        additionalProperties: false,
        properties: {
          flow: {
            type: "object",
            additionalProperties: false,
            properties: {
              nodes: { type: "array", items: { type: "object", properties: { id: { type: "string" }, label: { type: "string" } }, required: ["id", "label"], additionalProperties: false } },
              edges: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" } }, required: ["from", "to"], additionalProperties: false } },
            },
            required: ["nodes", "edges"],
          },
          erd: {
            type: "object",
            additionalProperties: true,
            properties: {
              entities: { type: "array", items: { type: "object", properties: { name: { type: "string" }, fields: { type: "array", items: { type: "object", properties: { name: { type: "string" }, type: { type: "string" } }, required: ["name", "type"], additionalProperties: false } } }, required: ["name", "fields"], additionalProperties: false } },
              relationships: { type: "array", items: { type: "object", properties: { from: { type: "string" }, to: { type: "string" }, type: { type: "string" } }, required: ["from", "to", "type"], additionalProperties: false } },
            },
            required: ["entities"],
          },
          gantt: {
            type: "object",
            additionalProperties: false,
            properties: {
              tasks: { type: "array", items: { type: "object", properties: { title: { type: "string" }, start_week: { type: "number" }, weeks: { type: "number" } }, required: ["title", "start_week", "weeks"], additionalProperties: false } },
            },
            required: ["tasks"],
          },
        },
      },
      risks: { type: "array", items: { type: "string" } },
      clarifying_questions: { type: "array", items: { type: "string" } },
    },
    required: ["scope", "architecture", "data", "plan", "estimate"],
  },
} as const;

