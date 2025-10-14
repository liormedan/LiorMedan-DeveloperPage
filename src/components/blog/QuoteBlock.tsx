import Link from "next/link";
import { cn } from "@/lib/utils";

type QuoteBlockProps = {
  text: string;
  author?: string | null;
  sourceUrl?: string | null;
  className?: string;
};

export function QuoteBlock({ text, author, sourceUrl, className }: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "rounded-2xl border-l-4 border-primary/70 bg-primary/5 p-6 text-lg font-medium leading-relaxed",
        className
      )}
    >
      <p className="mb-4">“{text}”</p>
      {author && (
        <footer className="text-sm text-muted-foreground">
          — {sourceUrl ? (
            <Link href={sourceUrl} className="underline" target="_blank" rel="noreferrer">
              {author}
            </Link>
          ) : (
            author
          )}
        </footer>
      )}
    </blockquote>
  );
}
