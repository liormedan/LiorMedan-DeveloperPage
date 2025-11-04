"use client";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Bubble({ children, className }: Props) {
  return (
    <span className={`inline-block rounded-full p-[2px] bubble-ring ${className ?? ""}`}>
      <span className="inline-block rounded-full bg-background/80 backdrop-blur-sm border border-white/10 px-5 py-2">
        {children}
      </span>
    </span>
  );
}

