import { cn } from "@/lib/utils";

type CodeSnippetProps = {
  title?: string | null;
  filename?: string | null;
  language?: string | null;
  code: string;
  className?: string;
};

export function CodeSnippetBlock({
  title,
  filename,
  language,
  code,
  className,
}: CodeSnippetProps) {
  return (
    <figure className={cn("rounded-2xl border bg-muted/40 p-4", className)}>
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          {language && <span className="rounded-full bg-muted px-2 py-1">{language}</span>}
          {filename && <span className="font-medium">{filename}</span>}
        </div>
        {title && <figcaption className="font-medium text-foreground">{title}</figcaption>}
      </header>
      <pre className="overflow-x-auto rounded-xl bg-background/80 p-4 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
