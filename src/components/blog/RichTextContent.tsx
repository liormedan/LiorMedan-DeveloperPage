import { cn } from "@/lib/utils";

type RichTextContentProps = {
  html?: string | null;
  className?: string;
};

export function RichTextContent({ html, className }: RichTextContentProps) {
  if (!html) return null;

  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed rtl:prose-headings:text-right rtl:prose-p:text-right",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
