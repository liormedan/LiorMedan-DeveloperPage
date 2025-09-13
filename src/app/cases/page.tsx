import Link from "next/link";
import { cases } from "@/data/cases";

export default function CasesIndex() {
  return (
    <div className="container-fluid py-10">
      <h1 className="text-3xl font-bold mb-6">Case Studies</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {cases.map((c) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="block border rounded-lg p-5 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            {c.subtitle && <p className="text-sm text-muted-foreground mt-1">{c.subtitle}</p>}
            <p className="mt-3 text-sm">{c.summary}</p>
            {c.tech && (
              <div className="mt-3 text-xs text-muted-foreground">{c.tech.join(" • ")}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

