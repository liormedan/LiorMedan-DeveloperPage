"use client";
import * as React from "react";
import { DEFAULT_PALETTE, type Palette } from "@/lib/palette";

type Ctx = {
  palette: Palette;
  setPalette: (p: Palette) => void;
};

const PaletteContext = React.createContext<Ctx | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = React.useState<Palette>(DEFAULT_PALETTE);
  const value = React.useMemo(() => ({ palette, setPalette }), [palette]);
  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function usePalette() {
  const ctx = React.useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used within PaletteProvider");
  return ctx;
}

