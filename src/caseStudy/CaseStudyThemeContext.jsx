import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { readStoredThemeIsDark, persistThemePreference } from "../themeStorage.js";
import { getPortfolioThemeTokens } from "../themeTokens.js";

const CaseStudyThemeContext = createContext(null);

export function useCaseStudyTheme() {
  const ctx = useContext(CaseStudyThemeContext);
  return ctx;
}

const font = "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif";

/**
 * Shell for case study routes: page background, fonts, back link, theme toggle (reads/writes same storage as home).
 */
export function CaseStudyPageChrome({ children, backLabel = "Back to portfolio" }) {
  const [dark, setDark] = useState(() => readStoredThemeIsDark());
  const T = useMemo(() => getPortfolioThemeTokens(dark), [dark]);

  const toggleDark = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      persistThemePreference(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ dark, T, toggleDark }), [dark, T, toggleDark]);

  return (
    <CaseStudyThemeContext.Provider value={value}>
      <div
        style={{
          minHeight: "100vh",
          background: T.bg,
          color: T.text,
          fontFamily: font,
          padding: "clamp(0.85rem, 3.5vw, 1.5rem) clamp(0.75rem, 3.2vw, 1.25rem) clamp(2rem, 6vw, 3rem)",
          transition: "background 0.35s ease, color 0.35s ease",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto clamp(1rem, 3vw, 1.5rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(0.5rem, 2vw, 1rem)",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "clamp(12px, 3.2vw, 14px)",
              fontWeight: 600,
              color: T.body,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              padding: "6px 0",
              transition: "color 0.2s",
              minWidth: 0,
            }}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }} aria-hidden>
              ←
            </span>
            {backLabel}
          </Link>
          <button
            type="button"
            onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: T.subtle,
              border: `1px solid ${T.border}`,
              color: T.body,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "17px",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s, border-color 0.2s",
              flexShrink: 0,
            }}
          >
            {dark ? "🌙" : "☀"}
          </button>
        </div>
        {children}
      </div>
    </CaseStudyThemeContext.Provider>
  );
}
