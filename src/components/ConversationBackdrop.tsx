"use client";
import * as React from "react";

// Lightweight animated gradient backdrop for the conversation area
export default function ConversationBackdrop({ className }: { className?: string }) {
  return (
    <div className={"absolute inset-0 -z-10 pointer-events-none overflow-hidden " + (className ?? "")}> 
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
      <div className="aurora-mesh" />
    </div>
  );
}

