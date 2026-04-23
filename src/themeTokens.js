/** Matches portfolio home `T` so case study routes feel consistent. */
export function getPortfolioThemeTokens(dark) {
  return {
    bg: dark ? "#07090f" : "#f7f8fc",
    bg2: dark ? "#0c0f1a" : "#f0f1f7",
    surface: dark ? "#0f1220" : "#ffffff",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)",
    text: dark ? "#f1f5f9" : "#0f172a",
    textB: dark ? "#e2e8f0" : "#1e293b",
    body: dark ? "#94a3b8" : "#475569",
    bodyB: dark ? "#cbd5e1" : "#334155",
    subtle: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
  };
}
