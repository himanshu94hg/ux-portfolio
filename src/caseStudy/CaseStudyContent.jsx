import { useEffect } from "react";

function Tag({ children, color, bg }) {
  return <span style={{ display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: color || "#818cf8", background: bg || "rgba(99,102,241,0.1)", padding: "4px 12px", borderRadius: "100px", border: `1px solid ${color ? color + "40" : "rgba(99,102,241,0.28)"}`, boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset" }}>{children}</span>;
}

function MBlock({ label, color, children }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.35rem 1.5rem" }}>
      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color, textTransform: "uppercase", margin: "0 0 0.8rem" }}>{label}</p>
      {children}
    </div>
  );
}

/** Full case study body — same structure as the former modal, usable on a dedicated page. */
export function CaseStudyContent({ cs }) {
  useEffect(() => { window.scrollTo(0, 0); }, [cs.id]);

  return (
    <div style={{ width: "100%", maxWidth: "840px", margin: "0 auto", overflow: "hidden", borderRadius: "26px", border: "1px solid rgba(255,255,255,0.08)", background: "#0c0f1a", boxShadow: "0 48px 140px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)" }}>
      <div style={{ background: `linear-gradient(135deg,${cs.color}25 0%,${cs.color}08 60%,transparent 100%)`, borderBottom: `1px solid ${cs.color}22`, padding: "2.75rem 2.5rem 2.25rem", position: "relative" }}>
        <Tag color={cs.accent} bg={cs.color + "18"}>{cs.tag}</Tag>
        <h1 style={{ fontSize: "clamp(1.85rem,4.5vw,2.5rem)", fontWeight: 900, color: "#f1f5f9", margin: "0.9rem 0 0.6rem", lineHeight: 1.08, letterSpacing: "-0.04em" }}>{cs.title}</h1>
        <p style={{ color: "#94a3b8", fontSize: "17px", lineHeight: 1.7, maxWidth: "600px", margin: "0 0 1.75rem", fontWeight: 400 }}>{cs.tagline}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[[cs.metric, "Key metric", cs.color], [cs.users, "Context", null]].map(([val, lbl, c]) => (
            <div key={lbl} style={{ background: c ? c + "18" : "rgba(255,255,255,0.04)", border: `1px solid ${c ? c + "33" : "rgba(255,255,255,0.08)"}`, borderRadius: "14px", padding: "0.9rem 1.35rem" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: c ? cs.accent : "#64748b", textTransform: "uppercase", margin: "0 0 4px" }}>{lbl}</p>
              <p style={{ fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 900, color: "#f1f5f9", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.2 }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "2.25rem 2.5rem 2.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
          <MBlock label="Challenge" color={cs.accent}><p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>{cs.challenge}</p></MBlock>
          <MBlock label="Constraints" color={cs.accent}>
            {cs.constraints.split(" · ").map((c, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
                <span style={{ color: cs.accent, marginTop: "4px", fontSize: "11px", flexShrink: 0, fontWeight: 900 }}>→</span>
                <span style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.65 }}>{c}</span>
              </div>
            ))}
          </MBlock>
        </div>
        <MBlock label="My Role" color={cs.accent}><p style={{ color: "#cbd5e1", fontSize: "16px", lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{cs.role}</p></MBlock>
        <MBlock label="UX Process" color={cs.accent}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {cs.process.map((p, i) => <span key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#cbd5e1", fontSize: "13px", fontWeight: 500, padding: "6px 13px", borderRadius: "100px" }}>{p}</span>)}
          </div>
        </MBlock>
        <MBlock label="Outcomes & Metrics" color={cs.accent}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "10px" }}>
            {cs.metrics.map((m, i) => (
              <div key={i} style={{ background: cs.color + "10", border: `1px solid ${cs.color}25`, borderRadius: "12px", padding: "1rem 1.1rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: cs.accent, fontWeight: 900, flexShrink: 0, marginTop: "2px" }}>↑</span>
                <span style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: 1.55, fontWeight: 500 }}>{m}</span>
              </div>
            ))}
          </div>
        </MBlock>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
          <MBlock label="Outcome" color={cs.accent}><p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>{cs.outcome}</p></MBlock>
          <MBlock label="Key Learning" color={cs.accent}><p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>&ldquo;{cs.learnings}&rdquo;</p></MBlock>
        </div>
      </div>
    </div>
  );
}
