import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ACCENT,
  ACCENT_DIM,
  hero,
  challenge,
  analytics,
  strategy,
  reporting,
  outcomes,
  contribution,
  keyLearning,
} from "./carbonCaseStudyContent.js";

const font = "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif";

const wrap = { maxWidth: "880px", margin: "0 auto" };

/** When `imageSrc` is set, show image; otherwise `emptySlotText` (e.g. ✅ Add screen…). */
function ScreenSlot({ imageSrc, imageAlt, emptySlotText }) {
  if (imageSrc) {
    return (
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.2)",
          background: "#f9fafb",
        }}
      >
        <img src={imageSrc} alt={imageAlt || ""} style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
    );
  }
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px dashed rgba(99,102,241,0.35)",
        background: "rgba(99,102,241,0.06)",
        minHeight: "min(42vw, 320px)",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.25rem",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "15px", fontWeight: 600, color: ACCENT_DIM, lineHeight: 1.5 }}>{emptySlotText}</span>
    </div>
  );
}

function FeatureList({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "#cbd5e1", fontSize: "15px", lineHeight: 1.8 }}>
      {items.map(t => (
        <li key={t} style={{ marginBottom: "0.4rem" }}>{t}</li>
      ))}
    </ul>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "1.75rem 1.5rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 style={{ fontSize: "clamp(1.35rem,3.2vw,1.75rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 1rem", color: "#f1f5f9" }}>{children}</h2>
  );
}

export default function CarbonCaseStudyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#07090f", color: "#f1f5f9", fontFamily: font, padding: "1.5rem 1.25rem 4rem" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
      <div style={{ ...wrap, marginBottom: "2.5rem" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#94a3b8",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            padding: "8px 0",
          }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1 }} aria-hidden>←</span>
          Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <div style={wrap}>
        <div
          style={{
            background: `linear-gradient(135deg,${ACCENT}18 0%,${ACCENT}06 50%,transparent 100%)`,
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "24px",
            padding: "2.5rem 2rem 2rem",
            marginBottom: "1.5rem",
          }}
        >
          <h1 style={{ fontSize: "clamp(1.9rem,4.5vw,2.6rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 1rem" }}>{hero.title}</h1>
          <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: 1.75, maxWidth: "640px", margin: "0 0 1.75rem" }}>{hero.lede}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
            {[
              ["Role", hero.role],
              ["Timeline", hero.timeline],
              ["Scope", hero.scope],
            ].map(([k, v]) => (
              <div key={k} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1rem 1.15rem" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: ACCENT_DIM, textTransform: "uppercase", margin: "0 0 0.4rem" }}>{k}</p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#e2e8f0", margin: 0, lineHeight: 1.45 }}>{v}</p>
              </div>
            ))}
          </div>
          <ScreenSlot imageSrc={hero.screenImage} imageAlt={hero.screenImageAlt} emptySlotText={hero.emptySlotText} />
        </div>
      </div>

      {/* The Challenge */}
      <div style={{ ...wrap, marginTop: "3.5rem" }}>
        <Card>
          <SectionHeading>{challenge.title}</SectionHeading>
          <p style={{ color: "#cbd5e1", fontSize: "16px", lineHeight: 1.85, margin: "0 0 1.25rem" }}>{challenge.intro}</p>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 0.75rem" }}>{challenge.listIntro}</p>
          <ul style={{ margin: "0 0 1.5rem", paddingLeft: "1.15rem", color: "#94a3b8", fontSize: "15px", lineHeight: 1.75 }}>
            {challenge.problems.map(p => <li key={p} style={{ marginBottom: "0.35rem" }}>{p}</li>)}
          </ul>
          <p style={{ color: "#e2e8f0", fontSize: "16px", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>{challenge.opportunity}</p>
        </Card>
      </div>

      {/* Analytics */}
      <div style={{ ...wrap, marginTop: "3.5rem" }}>
        <SectionHeading>{analytics.title}</SectionHeading>
        <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, margin: "0 0 1rem" }}>{analytics.body}</p>
        <p style={{ fontSize: "13px", fontWeight: 700, color: ACCENT_DIM, letterSpacing: "0.04em", margin: "0 0 0.65rem" }}>Key Features</p>
        <FeatureList items={analytics.features} />
        <div style={{ marginTop: "1.5rem" }}><ScreenSlot imageSrc={analytics.screenImage} imageAlt={analytics.screenImageAlt} emptySlotText={analytics.emptySlotText} /></div>
      </div>

      {/* Strategy */}
      <div style={{ ...wrap, marginTop: "3.5rem" }}>
        <SectionHeading>{strategy.title}</SectionHeading>
        <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, margin: "0 0 1rem" }}>{strategy.body}</p>
        <p style={{ fontSize: "13px", fontWeight: 700, color: ACCENT_DIM, letterSpacing: "0.04em", margin: "0 0 0.65rem" }}>Key Features</p>
        <FeatureList items={strategy.features} />
        <div style={{ marginTop: "1.5rem" }}><ScreenSlot imageSrc={strategy.screenImage} imageAlt={strategy.screenImageAlt} emptySlotText={strategy.emptySlotText} /></div>
      </div>

      {/* Reporting */}
      <div style={{ ...wrap, marginTop: "3.5rem" }}>
        <SectionHeading>{reporting.title}</SectionHeading>
        <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, margin: "0 0 1rem" }}>{reporting.body}</p>
        <p style={{ fontSize: "13px", fontWeight: 700, color: ACCENT_DIM, letterSpacing: "0.04em", margin: "0 0 0.65rem" }}>Key Features</p>
        <FeatureList items={reporting.features} />
        <div style={{ marginTop: "1.5rem" }}><ScreenSlot imageSrc={reporting.screenImage} imageAlt={reporting.screenImageAlt} emptySlotText={reporting.emptySlotText} /></div>
      </div>

      {/* Outcomes */}
      <div style={{ ...wrap, marginTop: "3.5rem" }}>
        <Card>
          <SectionHeading>{outcomes.title}</SectionHeading>
          <p style={{ color: "#cbd5e1", fontSize: "16px", lineHeight: 1.85, margin: "0 0 1.25rem" }}>{outcomes.intro}</p>
          <p style={{ fontSize: "13px", fontWeight: 700, color: ACCENT_DIM, letterSpacing: "0.04em", margin: "0 0 0.75rem" }}>{outcomes.resultsLabel}</p>
          <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "#e2e8f0", fontSize: "15px", lineHeight: 1.8 }}>
            {outcomes.items.map(t => <li key={t} style={{ marginBottom: "0.4rem" }}>{t}</li>)}
          </ul>
        </Card>
      </div>

      {/* My Contribution — fix: SectionHeading inside Card needs margin adjustment */}
      <div style={{ ...wrap, marginTop: "3.5rem" }}>
        <Card>
          <h2 style={{ fontSize: "clamp(1.35rem,3.2vw,1.75rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.75rem", color: "#f1f5f9" }}>{contribution.title}</h2>
          <p style={{ fontSize: "16px", fontWeight: 500, color: "#cbd5e1", margin: "0 0 1rem", lineHeight: 1.6 }}>{contribution.intro}</p>
          <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "#94a3b8", fontSize: "15px", lineHeight: 1.85 }}>
            {contribution.items.map(t => <li key={t} style={{ marginBottom: "0.35rem" }}>{t}</li>)}
          </ul>
        </Card>
      </div>

      {/* Key Learning */}
      <div style={{ ...wrap, marginTop: "3.5rem" }}>
        <h2 style={{ fontSize: "clamp(1.35rem,3.2vw,1.75rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 1rem", color: "#f1f5f9" }}>{keyLearning.title}</h2>
        <div
          style={{
            borderLeft: `3px solid ${ACCENT}`,
            background: "rgba(99,102,241,0.08)",
            borderRadius: "0 16px 16px 0",
            padding: "1.5rem 1.5rem 1.5rem 1.35rem",
          }}
        >
          <p style={{ color: "#e2e8f0", fontSize: "17px", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>{keyLearning.body}</p>
        </div>
      </div>
    </div>
  );
}
