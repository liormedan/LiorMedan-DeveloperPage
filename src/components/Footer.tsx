export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-fluid py-6 text-sm text-muted-foreground" dir="rtl">
        © {new Date().getFullYear()} ליאור מדן. נבנה עם Next.js + Tailwind + shadcn/ui.
      </div>
    </footer>
  );
}

