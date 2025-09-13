export type RGB = { r: number; g: number; b: number };

export type Palette = {
  primary: string;
  ring: string;
  accent: string;
  muted: string;
  background?: string;
  foreground?: string;
};

const clamp255 = (x: number) => Math.max(0, Math.min(255, Math.round(x)));
const rgbStr = (r: number, g: number, b: number) => `rgb(${clamp255(r)}, ${clamp255(g)}, ${clamp255(b)})`;

function mixRGB(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r * (1 - t) + b.r * t,
    g: a.g * (1 - t) + b.g * t,
    b: a.b * (1 - t) + b.b * t,
  };
}

export function paletteFromBase(base: RGB): Palette {
  const primary = rgbStr(base.r, base.g, base.b);
  const ring = primary;
  const accentRGB = mixRGB(base, { r: 255, g: 255, b: 255 }, 0.2);
  const mutedRGB = mixRGB(base, { r: 245, g: 245, b: 245 }, 0.88);
  return {
    primary,
    ring,
    accent: rgbStr(accentRGB.r, accentRGB.g, accentRGB.b),
    muted: rgbStr(mutedRGB.r, mutedRGB.g, mutedRGB.b),
  };
}

export function applyPaletteToCSS(p: Palette) {
  const root = document.documentElement;
  if (p.primary) root.style.setProperty("--primary", p.primary);
  if (p.ring) root.style.setProperty("--ring", p.ring);
  if (p.accent) root.style.setProperty("--accent", p.accent);
  if (p.muted) root.style.setProperty("--muted", p.muted);
  if (p.background) root.style.setProperty("--background", p.background);
  if (p.foreground) root.style.setProperty("--foreground", p.foreground);
}

export const DEFAULT_PALETTE: Palette = {
  primary: "rgb(80, 102, 255)",
  ring: "rgb(80, 102, 255)",
  accent: "rgb(204, 209, 255)",
  muted: "rgb(244, 245, 255)",
};

