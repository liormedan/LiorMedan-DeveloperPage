"use client";
import * as React from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-[fade-in_300ms_ease]">
      {children}
    </div>
  );
}

