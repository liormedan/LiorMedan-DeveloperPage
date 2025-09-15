"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { templates } from "@/data/templates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function TemplateDetails({ params }: Props) {
  const tpl = templates.find((t) => t.slug === params.slug);
  if (!tpl) return notFound();

  return (
    <div className="container-fluid py-8" dir="rtl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">{tpl.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">
              {tpl.category === "frontend" ? "פרונט" : "פול-סטאק"}
            </Badge>
            <span>•</span>
            <span>{tpl.stack.join(" · ")}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {tpl.demoUrl ? (
            <Button asChild variant="secondary">
              <Link href={tpl.demoUrl} target="_blank">דמו</Link>
            </Button>
          ) : null}
          <form action={`/api/checkout?sku=${tpl.slug}`} method="post">
            <Button type="submit">רכישה ${""}{tpl.priceUSD}</Button>
          </form>
        </div>
      </div>

      {tpl.image ? (
        <div
          className="mt-6 h-56 w-full rounded-md bg-cover bg-center border"
          style={{ backgroundImage: `url(${tpl.image})` }}
        />
      ) : null}

      <p className="mt-6 text-base">{tpl.description ?? tpl.shortDescription}</p>

      <div className="mt-6">
        <h2 className="font-medium mb-2">מה בתבנית</h2>
        <ul className="list-disc list-inside space-y-1">
          {tpl.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      {tpl.repoUrl ? (
        <div className="mt-6">
          <Button asChild variant="ghost">
            <Link href={tpl.repoUrl} target="_blank">קוד מקור</Link>
          </Button>
        </div>
      ) : null}

      <div className="mt-10 text-sm text-muted-foreground">
        תשלום בפועל יוגדר דרך Stripe/Vercel. כרגע זה מסלול דמו/פלייסהולדר.
      </div>
    </div>
  );
}

