import { useEffect } from "react";
import { CaseStudyPageChrome, useCaseStudyTheme } from "../CaseStudyThemeContext.jsx";
import * as C from "./apateCaseStudyContent.js";

const wrap = { maxWidth: "900px", margin: "0 auto" };

function ApateCaseStudyInner() {
  const { T, dark } = useCaseStudyTheme();
  const screenShadow = dark
    ? "0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.2)"
    : "0 18px 48px rgba(15,23,42,0.12), 0 0 0 1px rgba(0,0,0,0.06)";

  function ScreenSlot({ imageSrc, imageAlt }) {
    if (!imageSrc) return null;
    return (
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${T.border}`,
          boxShadow: screenShadow,
          background: dark ? "#0f172a" : T.surface,
        }}
      >
        <img src={imageSrc} alt={imageAlt || ""} style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
    );
  }

  function Card({ children }) {
    return (
      <div
        style={{
          background: T.subtle,
          border: `1px solid ${T.border}`,
          borderRadius: "20px",
          padding: "1.75rem 1.5rem",
        }}
      >
        {children}
      </div>
    );
  }

  function H2({ children, style: sx = {} }) {
    return <h2 style={{ fontSize: "clamp(1.32rem,3.1vw,1.7rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.9rem", color: T.text, ...sx }}>{children}</h2>;
  }

  function H3({ children }) {
    return (
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.ACCENT_DIM, margin: "1.5rem 0 0.65rem" }}>{children}</h3>
    );
  }

  function Ul({ items }) {
    return (
      <ul style={{ margin: 0, paddingLeft: "1.15rem", color: T.bodyB, fontSize: "15px", lineHeight: 1.78 }}>
        {items.map((t, i) => <li key={i} style={{ marginBottom: "0.4rem" }}>{t}</li>)}
      </ul>
    );
  }

  function MetaGrid({ children }) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0.9rem",
          margin: "1.5rem 0 0",
        }}
      >
        {children}
      </div>
    );
  }

  function MetaCell({ label, value, sub }) {
    return (
      <div style={{ background: T.subtle, border: `1px solid ${T.border}`, borderRadius: "14px", padding: "1rem" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: C.ACCENT_DIM, textTransform: "uppercase", margin: "0 0 0.4rem" }}>{label}</p>
        <p style={{ fontSize: "15px", fontWeight: 600, margin: 0, lineHeight: 1.45, color: T.textB }}>{value}</p>
        {sub ? <p style={{ fontSize: "13px", color: T.body, margin: "0.5rem 0 0", lineHeight: 1.55 }}>{sub}</p> : null}
      </div>
    );
  }

  function BeforeAfterTable() {
    const Ba = C.beforeAfter;
    const headBorder = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
    const rowBorder = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
    return (
      <div style={{ marginTop: "1rem", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table
          style={{
            width: "100%",
            minWidth: "520px",
            borderCollapse: "collapse",
            fontSize: "14px",
            color: T.bodyB,
          }}
        >
          <thead>
            <tr>
              {["Area", "Before", "After"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "0.65rem 0.75rem",
                    borderBottom: `1px solid ${headBorder}`,
                    color: C.ACCENT_DIM,
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Ba.rows.map((row) => (
              <tr key={row.area} style={{ borderBottom: `1px solid ${rowBorder}` }}>
                <td style={{ padding: "0.75rem", fontWeight: 700, color: T.text, verticalAlign: "top" }}>{row.area}</td>
                <td style={{ padding: "0.75rem", maxWidth: "280px", verticalAlign: "top" }}>{row.before}</td>
                <td style={{ padding: "0.75rem", maxWidth: "280px", verticalAlign: "top" }}>{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const H = C.hero;
  const pillarBg = dark ? "rgba(16,185,129,0.08)" : "rgba(16,185,129,0.1)";

  return (
    <>
      <div style={wrap}>
        <div
          style={{
            background: `linear-gradient(135deg,${C.ACCENT}16 0%,${C.ACCENT}05 50%,transparent 100%)`,
            border: `1px solid ${C.ACCENT}33`,
            borderRadius: "24px",
            padding: "2.4rem 1.85rem 2rem",
            marginBottom: "2rem",
          }}
        >
          <p style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.2em", color: C.ACCENT_DIM, margin: "0 0 0.5rem" }}>CASE STUDY</p>
          <h1 style={{ fontSize: "clamp(1.6rem,3.6vw,2.05rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 0.35rem", color: T.text }}>{H.brand}</h1>
          <p style={{ fontSize: "clamp(1.05rem,2.2vw,1.2rem)", fontWeight: 600, color: T.textB, margin: "0 0 0.6rem" }}>{H.productLine}</p>
          <p style={{ color: T.body, fontSize: "1.05rem", lineHeight: 1.75, margin: "0 0 1.25rem" }}>{H.tagline}</p>
          <H3>Summary</H3>
          <p style={{ color: T.bodyB, fontSize: "16px", lineHeight: 1.85, margin: "0 0 0" }}>{H.oneLine}</p>
          <MetaGrid>
            <MetaCell label="Role" value={H.role} />
            <MetaCell label="Company" value={H.company} />
            <MetaCell label="Industry" value={H.industry} />
            <MetaCell label="Scope" value={H.scope} />
            <MetaCell label="Duration" value={H.duration} />
            <MetaCell label="Tools" value={H.tools} />
          </MetaGrid>
        </div>
      </div>

      <div style={{ ...wrap, marginTop: "1rem" }}>
        <H2 style={{ textTransform: "capitalize" }}>{C.problem.title}</H2>
        <p style={{ color: T.bodyB, fontSize: "16px", lineHeight: 1.85, margin: "0 0 1.25rem" }}>{C.problem.intro}</p>
        {C.problem.issues.map((issue) => (
          <div key={issue.title} style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "16px", fontWeight: 800, color: T.text, margin: "0 0 0.5rem" }}>{issue.title}</p>
            <p style={{ color: T.body, fontSize: "15px", lineHeight: 1.8, margin: 0 }}>{issue.body}</p>
          </div>
        ))}
        <div style={{ marginTop: "1.75rem" }}>
          <ScreenSlot imageSrc={C.legacy.screenImage} imageAlt={C.legacy.screenImageAlt} />
          <p style={{ fontSize: "14px", color: T.body, margin: "0.75rem 0 0", fontStyle: "italic", opacity: dark ? 0.9 : 0.85 }}>{C.legacy.caption}</p>
        </div>
      </div>

      <div style={{ ...wrap, marginTop: "2.5rem" }}>
        <H2>{C.userGroups.title}</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {C.userGroups.groups.map((g) => (
            <Card key={g.label}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: C.ACCENT_DIM, margin: "0 0 0.35rem" }}>{g.label}</p>
              <p style={{ color: T.bodyB, fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{g.desc}</p>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <p style={{ color: T.body, fontSize: "15px", lineHeight: 1.75, margin: 0 }}>{C.userGroups.optionalPersona.intro}</p>
          {C.userGroups.optionalPersona.images.map(({ src, alt }) => (
            <ScreenSlot key={src} imageSrc={src} imageAlt={alt} />
          ))}
        </div>
      </div>

      <div style={{ ...wrap, marginTop: "2.5rem" }}>
        <H2 style={{ textTransform: "capitalize" }}>{C.approach.title}</H2>
        <p style={{ color: T.body, margin: "0 0 1.25rem" }}>{C.approach.intro}</p>
        {C.approach.pillars.map((p) => (
          <div
            key={p.name}
            style={{
              marginBottom: "1.1rem",
              padding: "1rem 1.15rem",
              background: pillarBg,
              border: `1px solid ${C.ACCENT}2a`,
              borderRadius: "14px",
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: 800, color: C.ACCENT_DIM, margin: "0 0 0.35rem" }}>{p.name}</p>
            <p style={{ color: T.bodyB, fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ ...wrap, marginTop: "2.5rem" }}>
        <H2 style={{ textTransform: "capitalize" }}>{C.beforeAfter.title}</H2>
        <BeforeAfterTable />
      </div>

      <div style={{ ...wrap, marginTop: "2.5rem" }}>
        <H2 style={{ textTransform: "capitalize" }}>{C.delivered.title}</H2>
        <Ul items={C.delivered.items} />
        <H3>Redesigned product</H3>
        <ScreenSlot imageSrc={C.newScreens.screenImage} imageAlt={C.newScreens.screenImageAlt} />
        <p style={{ fontSize: "14px", color: T.body, margin: "0.75rem 0 0", fontStyle: "italic", opacity: dark ? 0.9 : 0.85 }}>{C.newScreens.caption}</p>
      </div>

      <div style={{ ...wrap, marginTop: "2.5rem" }}>
        <H2 style={{ textTransform: "capitalize" }}>{C.outcomes.title}</H2>
        <p style={{ color: T.body, margin: "0 0 1rem" }}>{C.outcomes.intro}</p>
        <Ul items={C.outcomes.items} />
      </div>

      <div style={{ ...wrap, marginTop: "2.5rem" }}>
        <H2 style={{ textTransform: "capitalize" }}>{C.keyLearnings.title}</H2>
        {C.keyLearnings.items.map((item) => (
          <div key={item.title} style={{ marginBottom: "1.35rem" }}>
            <p style={{ fontSize: "16px", fontWeight: 800, color: C.ACCENT_DIM, margin: "0 0 0.4rem" }}>{item.title}</p>
            <p style={{ color: T.body, fontSize: "15px", lineHeight: 1.8, margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ApateCaseStudyPage() {
  return (
    <CaseStudyPageChrome backLabel="Back to Portfolio">
      <ApateCaseStudyInner />
    </CaseStudyPageChrome>
  );
}
