export const THEME_STORAGE_KEY = "hg-portfolio-theme";
export const THEME_TTL_MS = 24 * 60 * 60 * 1000;

export function readStoredThemeIsDark() {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return true;
    const data = JSON.parse(raw);
    if (typeof data?.dark !== "boolean" || typeof data?.exp !== "number") return true;
    if (Date.now() > data.exp) {
      localStorage.removeItem(THEME_STORAGE_KEY);
      return true;
    }
    return data.dark;
  } catch {
    return true;
  }
}

export function persistThemePreference(isDark) {
  try {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({ dark: isDark, exp: Date.now() + THEME_TTL_MS })
    );
  } catch {
    /* private mode / quota */
  }
}
