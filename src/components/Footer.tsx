export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-fluid py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} ליאור. נבנה ב‑Next.js + Tailwind + shadcn/ui.
      </div>
    </footer>
  );
}

