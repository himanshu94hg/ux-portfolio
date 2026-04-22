import { useState, useEffect, useRef } from "react";

/* ─── DATA ────────────────────────────────────────────────── */

const NAV_LINKS = ["Work", "Process", "Skills", "About", "Contact"];

const STATS = [
  { value: 6.8, suffix: "+", unit: "Years", label: "of shipping products" },
  { value: 5000, suffix: "+", unit: "Users", label: "impacted by my work" },
  { value: 30, suffix: "%", unit: "Faster", label: "delivery cycles" },
  { value: 20, suffix: "%", unit: "Gains", label: "in team efficiency" },
];

const CASE_STUDIES = [
  {
    id: 1, tag: "AI · Fintech · Enterprise", title: "AI Fraud Detection Dashboard",
    tagline: "Real-time threat intelligence that reduced analyst review time by 40%.",
    color: "#6366f1", accent: "#818cf8", glow: "rgba(99,102,241,0.18)",
    metric: "40% ↓ False Positives", metricSub: "review time",
    users: "800+ analysts · 3 countries",
    icon: "◈",
    challenge: "A leading fintech needed to surface complex ML fraud signals to non-technical analysts — without overwhelming them — while maintaining sub-second response times on millions of daily transactions. The legacy dashboard had 14 overlapping alert states and no clear visual hierarchy.",
    constraints: "Sub-100ms render performance · Non-technical analyst audience · Regulatory compliance overlays · 6-week delivery timeline",
    role: "Lead Product Designer — end-to-end ownership from discovery workshops through QA sign-off and analyst onboarding.",
    process: ["Stakeholder interviews with 12 fraud analysts","Competitive audit of 6 enterprise dashboards","Information architecture: 14 → 4 alert states","3 rounds of moderated usability testing","Design system component library (62 components)","Developer handoff via Zeroheight"],
    metrics: ["40% reduction in false-positive review time","28% improvement in threat detection accuracy","NPS jumped from 32 → 71 post-launch","Analyst onboarding cut from 3 days to 4 hours"],
    outcome: "Shipped Q2 2024. Rolled out to 800+ analysts across 3 countries. Became the internal gold standard for data-heavy enterprise UX.",
    learnings: "Dense data environments demand ruthless hierarchy. Every visual element must earn its place. When in doubt, remove — don't add."
  },
  {
    id: 2, tag: "Logistics · B2B · SaaS", title: "Shipease Logistics Platform",
    tagline: "Full platform redesign that drove $4M ARR growth in Year 1.",
    color: "#10b981", accent: "#34d399", glow: "rgba(16,185,129,0.15)",
    metric: "30% Faster Ops", metricSub: "dispatch cycle",
    users: "2,400+ logistics operators",
    icon: "⬡",
    challenge: "Shipease's legacy platform had 60% task abandonment on their core dispatch flow. Operations teams were losing 2+ hours daily to workarounds. NPS was -12 and churn was accelerating.",
    constraints: "Live production migration (zero downtime) · 6-month timeline · Legacy API constraints · 3 regional language requirements",
    role: "Senior UX Designer — research strategy, information architecture, interaction design, and full design system ownership.",
    process: ["Contextual inquiry with 8 dispatchers","Journey mapping of 6 core workflows","Card sorting for navigation redesign","5 prototype iterations with weekly testing","120-component design library","Live migration plan with engineering"],
    metrics: ["30% reduction in dispatch time","Task completion: 41% → 89%","Support tickets down 52% in 30 days","3.2× increase in daily active users"],
    outcome: "Platform relaunched in 6 months. Became Shipease's primary growth lever — contributing to a $4M ARR increase in Year 1 and securing Series B funding.",
    learnings: "Operators work under pressure. Speed and predictability matter more than delight. Design for the hard moments first."
  },
  {
    id: 3, tag: "Marketplace · Consumer · Growth", title: "Marketplace Booking Experience",
    tagline: "Mobile-first redesign that unlocked $2.1M incremental revenue.",
    color: "#f59e0b", accent: "#fbbf24", glow: "rgba(245,158,11,0.15)",
    metric: "22% ↑ Conversion", metricSub: "booking rate",
    users: "50K+ active professionals",
    icon: "◎",
    challenge: "A marketplace with 50K+ professionals had a 3-step booking funnel with 71% drop-off. The mobile experience was afterthought-built — 4.2s load times, unclear CTAs, and a confirmation flow requiring 11 taps.",
    constraints: "No redesign budget for backend · Must reuse existing component library · 8-week window before peak season",
    role: "Product Designer — mobile-first funnel redesign with direct collaboration with growth and engineering teams.",
    process: ["Funnel analytics deep-dive (400K sessions)","Session recording analysis (400+ recordings)","A/B testing framework setup","Progressive disclosure redesign in Figma","Performance audit with engineering"],
    metrics: ["22% increase in booking conversion","Mobile load: 4.2s → 1.8s","Cart abandonment down 34%","Revenue per session up 18%"],
    outcome: "New booking flow drove $2.1M incremental revenue in its first quarter. The redesign became a Harvard Business School product case study.",
    learnings: "Conversion is a UX problem. Every extra tap costs money. Ruthless simplification and performance are the same discipline."
  },
  {
    id: 4, tag: "Enterprise · ERP · Manufacturing", title: "Enterprise ERP Workflow System",
    tagline: "Legacy ERP modernisation that cut onboarding from 6 months to 3 weeks.",
    color: "#8b5cf6", accent: "#a78bfa", glow: "rgba(139,92,246,0.15)",
    metric: "35% ↓ Error Rate", metricSub: "data entry errors",
    users: "2,000+ factory floor workers",
    icon: "⬟",
    challenge: "A manufacturing ERP used by 2,000+ employees had a 1990s interface causing 200+ daily data-entry errors and a 6-month onboarding curve. Critical production decisions were being made on faulty data.",
    constraints: "No frontend rewrite — UI only · Multi-language (EN/DE/JA) · Strict regulatory audit trails · 18-month programme timeline",
    role: "Lead Designer — system architecture, interaction patterns, role-based UX design, and multi-language design system.",
    process: ["6-week ethnographic research on factory floor","Error pattern analysis with QA team","Progressive disclosure IA","Role-based permission UX design","Multi-language design system (EN/DE/JA)","Phased rollout across 4 plants"],
    metrics: ["35% reduction in data-entry errors","Onboarding: 6 months → 3 weeks","Employee satisfaction: 2.8 → 4.4 / 5","IT support tickets down 61%"],
    outcome: "Deployed across 4 manufacturing plants in 3 countries. Won internal innovation award. Client renewed a 5-year contract citing UX improvement as a key driver.",
    learnings: "Complex systems need simplicity at the surface. Role-based design isn't just a feature — it's the whole strategy."
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "Discover", sub: "Interviews · Research · Competitive audit", icon: "◐" },
  { n: "02", title: "Define",   sub: "Problem framing · Success metrics · Principles", icon: "◑" },
  { n: "03", title: "Ideate",   sub: "Sketches · IA · Flow mapping · Concepts", icon: "◒" },
  { n: "04", title: "Prototype",sub: "High-fidelity Figma · Interactive flows", icon: "◓" },
  { n: "05", title: "Test",     sub: "Usability testing · A/B · Heuristics", icon: "◔" },
  { n: "06", title: "Ship",     sub: "Dev handoff · QA review · Launch", icon: "◕" },
  { n: "07", title: "Optimise", sub: "Analytics · Iteration · Continuous improvement", icon: "●" },
];

const SKILLS_PRIMARY = ["Figma","FigJam","Adobe XD","Sketch","Design Systems","UX Research"];
const SKILLS_SEC     = ["Claude AI","ChatGPT","Jira / Agile","React + HTML/CSS","A/B Testing","Prototyping","User Interviews","Design Tokens","Accessibility"];
const SKILL_BARS = [
  { name: "Product Thinking",        level: 97 },
  { name: "Figma / Design Tools",    level: 98 },
  { name: "UX Research",             level: 91 },
  { name: "Design Systems",          level: 95 },
  { name: "Prototyping",             level: 96 },
  { name: "Front-end Collaboration", level: 80 },
];

const TESTIMONIALS = [
  {
    name: "Priya Kapoor", role: "Senior Product Manager", co: "Razorpay",
    initials: "PK", color: "#6366f1", accent: "#818cf8",
    quote: "Himanshu doesn't just design screens — he diagnoses product problems. His ability to translate ambiguous research into a clean, opinionated UI is genuinely rare. He shipped our most ambitious redesign with zero quality compromise and beat the deadline by two weeks.",
    highlight: "beat the deadline by two weeks"
  },
  {
    name: "Alex Chen", role: "Engineering Lead", co: "Shipease",
    initials: "AC", color: "#10b981", accent: "#34d399",
    quote: "Working with Himanshu changed how our engineering team thinks about UX. His handoffs are pixel-perfect, his component thinking is engineering-native, and he will fight for the right user experience in every sprint review. Best designer I've ever shipped with.",
    highlight: "Best designer I've ever shipped with"
  },
  {
    name: "Meera Sharma", role: "Co-Founder & CEO", co: "Marketplace Startup",
    initials: "MS", color: "#f59e0b", accent: "#fbbf24",
    quote: "We were haemorrhaging conversion rate. Himanshu came in, understood the business before touching Figma, and delivered a booking experience that paid for itself in six weeks. His taste level and strategic instinct are exceptional.",
    highlight: "paid for itself in six weeks"
  },
];

const GALLERY = [
  { label: "Dashboard UI",    sub: "Data-heavy enterprise · AI analytics",    icon: "▦", c: "#6366f1" },
  { label: "Mobile Apps",     sub: "iOS · Android · Consumer products",        icon: "▢", c: "#10b981" },
  { label: "Design Systems",  sub: "Tokens · Components · Documentation",      icon: "▣", c: "#8b5cf6" },
  { label: "Landing Pages",   sub: "SaaS · Startup · Growth-focused",          icon: "▤", c: "#f59e0b" },
];

/* ─── HOOKS ───────────────────────────────────────────────── */
function useInView(ref, threshold = 0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

/* ─── PRIMITIVES ──────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 28 }) {
  const ref = useRef(); const v = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : `translateY(${y}px)`, transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function Counter({ target, suffix, duration = 1600 }) {
  const [val, setVal] = useState(0); const ref = useRef(); const v = useInView(ref, 0.4);
  useEffect(() => {
    if (!v) return;
    let s = 0;
    const tick = () => { s += 16; const p = Math.min(s / duration, 1); const ease = 1 - Math.pow(1 - p, 3); setVal(Math.round(ease * target * 10) / 10); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [v]);
  return <span ref={ref}>{val % 1 === 0 ? val.toLocaleString() : val}{suffix}</span>;
}

function Tag({ children, color, bg }) {
  return <span style={{ display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: color || "#818cf8", background: bg || "rgba(99,102,241,0.1)", padding: "3px 10px", borderRadius: "100px", border: `1px solid ${color ? color + "33" : "rgba(99,102,241,0.25)"}` }}>{children}</span>;
}

function Pill({ children, dark }) {
  return <span style={{ display: "inline-flex", fontSize: "13px", fontWeight: 500, color: dark ? "#94a3b8" : "#475569", background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, padding: "6px 14px", borderRadius: "100px" }}>{children}</span>;
}

function Btn({ children, onClick, href, variant = "ghost", dark }) {
  const variants = {
    primary: { background: "linear-gradient(135deg,#6366f1 0%,#818cf8 100%)", border: "none", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)", padding: "14px 28px" },
    ghost:   { background: "transparent", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`, color: dark ? "#e2e8f0" : "#374151", boxShadow: "none", padding: "13px 24px" },
  };
  const base = { display: "inline-flex", alignItems: "center", gap: "7px", borderRadius: "100px", fontSize: "15px", fontWeight: 600, cursor: "pointer", transition: "all 0.22s cubic-bezier(.22,1,.36,1)", textDecoration: "none", fontFamily: "inherit", letterSpacing: "-0.01em" };
  const s = { ...base, ...variants[variant] };
  const he = (el, on) => {
    if (variant === "primary") { el.style.transform = on ? "translateY(-2px) scale(1.02)" : "none"; el.style.boxShadow = on ? "0 12px 40px rgba(99,102,241,0.55), inset 0 1px 0 rgba(255,255,255,0.2)" : "0 4px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"; }
    else { el.style.transform = on ? "translateY(-1px)" : "none"; el.style.background = on ? (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)") : "transparent"; }
  };
  if (href) return <a href={href} style={s} onMouseEnter={e => he(e.currentTarget, true)} onMouseLeave={e => he(e.currentTarget, false)}>{children}</a>;
  return <button style={s} onClick={onClick} onMouseEnter={e => he(e.currentTarget, true)} onMouseLeave={e => he(e.currentTarget, false)}>{children}</button>;
}

function Eyebrow({ label, center }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.1rem", ...(center ? { justifyContent: "center" } : {}) }}>
      <span style={{ display: "block", width: "24px", height: "2px", background: "linear-gradient(90deg,#6366f1,#a78bfa)", borderRadius: "2px", flexShrink: 0 }} />
      <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: "#6366f1", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */
function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const d = document.documentElement; setP(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: "2px", width: p + "%", background: "linear-gradient(90deg,#6366f1,#a78bfa,#60a5fa)", zIndex: 9999, transition: "width 0.08s linear" }} />;
}

/* ─── MODAL ───────────────────────────────────────────────── */
function MBlock({ label, color, children }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.35rem 1.5rem" }}>
      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color, textTransform: "uppercase", margin: "0 0 0.8rem" }}>{label}</p>
      {children}
    </div>
  );
}

function Modal({ cs, onClose }) {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(4,6,12,0.9)", backdropFilter: "blur(14px)", zIndex: 1000, overflowY: "auto", padding: "2rem 1rem", display: "flex", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0c0f1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "26px", width: "100%", maxWidth: "840px", overflow: "hidden", height: "fit-content", boxShadow: "0 48px 140px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)" }}>

        {/* Header stripe */}
        <div style={{ background: `linear-gradient(135deg,${cs.color}25 0%,${cs.color}08 60%,transparent 100%)`, borderBottom: `1px solid ${cs.color}22`, padding: "2.75rem 2.75rem 2.25rem", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", width: "38px", height: "38px", borderRadius: "50%", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <Tag color={cs.accent} bg={cs.color + "18"}>{cs.tag}</Tag>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, color: "#f1f5f9", margin: "0.9rem 0 0.6rem", lineHeight: 1.08, letterSpacing: "-0.04em" }}>{cs.title}</h2>
          <p style={{ color: "#94a3b8", fontSize: "17px", lineHeight: 1.7, maxWidth: "600px", margin: "0 0 1.75rem", fontWeight: 400 }}>{cs.tagline}</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[[cs.metric, "Key Metric", cs.color], [cs.users, "Users Served", null]].map(([val, lbl, c]) => (
              <div key={lbl} style={{ background: c ? c + "18" : "rgba(255,255,255,0.04)", border: `1px solid ${c ? c + "33" : "rgba(255,255,255,0.08)"}`, borderRadius: "14px", padding: "0.9rem 1.35rem" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: c ? cs.accent : "#64748b", textTransform: "uppercase", margin: "0 0 4px" }}>{lbl}</p>
                <p style={{ fontSize: "22px", fontWeight: 900, color: "#f1f5f9", margin: 0, letterSpacing: "-0.025em" }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "2.25rem 2.75rem 2.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
            <MBlock label="Key Learning" color={cs.accent}><p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>"{cs.learnings}"</p></MBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO CARD ───────────────────────────────────────────── */
function HeroCard({ dark }) {
  const T = dark;
  return (
    <div style={{ position: "relative", width: "300px", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "360px", height: "360px", background: "radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", background: T ? "rgba(13,16,28,0.92)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)", border: `1px solid ${T ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.2)"}`, borderRadius: "28px", padding: "1.75rem 1.75rem 1.5rem", boxShadow: T ? "0 36px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)" : "0 36px 90px rgba(0,0,0,0.12)" }}>
        <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", marginBottom: "1.25rem", boxShadow: "0 8px 28px rgba(99,102,241,0.45)" }}>🎨</div>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "#6366f1", textTransform: "uppercase", margin: "0 0 5px" }}>Senior Product Designer</p>
        <p style={{ fontSize: "22px", fontWeight: 900, color: T ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.035em", margin: "0 0 1.25rem", lineHeight: 1.15 }}>Himanshu Grover</p>
        <div style={{ height: "1px", background: T ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", margin: "0 0 1rem" }} />
        {[["6.8+ yrs","Product Design"],["30+ projects","Shipped to production"],["5K+ users","Impacted globally"]].map(([v, l]) => (
          <div key={v} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: T ? "#e2e8f0" : "#1e293b", letterSpacing: "-0.01em" }}>{v}</span>
            <span style={{ fontSize: "12px", color: T ? "#64748b" : "#94a3b8" }}>{l}</span>
          </div>
        ))}
        <div style={{ marginTop: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981", flexShrink: 0 }} />
          <span style={{ fontSize: "13px", color: "#10b981", fontWeight: 600 }}>Available for opportunities</span>
        </div>
      </div>
    </div>
  );
}

/* ─── CASE CARD ───────────────────────────────────────────── */
function CaseCard({ cs, dark, surface, border, text, muted, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ background: hov ? (dark ? "rgba(12,14,24,0.98)" : "#fff") : surface, border: `1px solid ${hov ? cs.color + "55" : border}`, borderRadius: "22px", overflow: "hidden", cursor: "pointer", transition: "all 0.32s cubic-bezier(.22,1,.36,1)", transform: hov ? "translateY(-8px)" : "none", boxShadow: hov ? (dark ? `0 32px 80px rgba(0,0,0,0.55),0 0 0 1px ${cs.color}22` : `0 24px 60px rgba(0,0,0,0.12),0 0 0 1px ${cs.color}22`) : "none" }}>
      {/* Thumbnail */}
      <div style={{ height: "200px", background: `linear-gradient(135deg,${cs.color}22 0%,${cs.color}08 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `1px solid ${cs.color}18`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle,${cs.color}18 1px,transparent 1px)`, backgroundSize: "28px 28px", opacity: hov ? 1 : 0.5, transition: "opacity 0.4s" }} />
        <div style={{ fontSize: "60px", position: "relative", zIndex: 1, filter: `drop-shadow(0 8px 24px ${cs.glow})` }}>{cs.icon}</div>
        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}><Tag color={cs.accent} bg={cs.color + "18"}>{cs.tag}</Tag></div>
        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: dark ? "rgba(8,10,18,0.72)" : "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", border: `1px solid ${cs.color}33`, borderRadius: "100px", padding: "4px 12px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: cs.accent }}>{cs.metric}</span>
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "1.75rem 1.85rem 2rem" }}>
        <h3 style={{ fontWeight: 800, fontSize: "20px", color: text, margin: "0 0 0.55rem", lineHeight: 1.18, letterSpacing: "-0.025em" }}>{cs.title}</h3>
        <p style={{ color: muted, fontSize: "15px", lineHeight: 1.75, margin: "0 0 1.5rem", fontWeight: 400 }}>{cs.tagline}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "14px", color: cs.accent, fontWeight: 700, letterSpacing: "0.01em" }}>View Case Study →</span>
          <span style={{ fontSize: "12px", color: dark ? "#475569" : "#94a3b8" }}>{cs.users}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────── */
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [shrink, setShrink] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCS, setActiveCS] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    setMounted(true);
    const fn = () => setShrink(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const T = {
    bg:      dark ? "#07090f" : "#f7f8fc",
    bg2:     dark ? "#0c0f1a" : "#f0f1f7",
    surface: dark ? "#0f1220" : "#ffffff",
    border:  dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)",
    text:    dark ? "#f1f5f9" : "#0f172a",
    textB:   dark ? "#e2e8f0" : "#1e293b",
    body:    dark ? "#94a3b8" : "#475569",
    bodyB:   dark ? "#cbd5e1" : "#334155",
    subtle:  dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
  };

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", minHeight: "100vh", transition: "background 0.4s,color 0.4s", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
      <ScrollBar />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: shrink ? "0.85rem 2.5rem" : "1.4rem 2.5rem", background: shrink ? (dark ? "rgba(7,9,15,0.9)" : "rgba(247,248,252,0.9)") : "transparent", backdropFilter: shrink ? "blur(24px)" : "none", borderBottom: shrink ? `1px solid ${T.border}` : "none", transition: "all 0.35s cubic-bezier(.22,1,.36,1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 900, fontSize: "19px", letterSpacing: "-0.05em", cursor: "pointer", color: T.text }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span style={{ color: "#6366f1" }}>H</span>G.
        </span>
        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", color: T.body, fontSize: "14px", fontWeight: 500, cursor: "pointer", padding: "7px 13px", borderRadius: "10px", transition: "all 0.18s", fontFamily: "inherit", letterSpacing: "-0.01em" }}
              onMouseEnter={e => { e.target.style.color = T.text; e.target.style.background = T.subtle; }}
              onMouseLeave={e => { e.target.style.color = T.body; e.target.style.background = "transparent"; }}>
              {l}
            </button>
          ))}
          <button onClick={() => setDark(!dark)} style={{ marginLeft: "8px", background: T.subtle, border: `1px solid ${T.border}`, color: T.body, width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            {dark ? "○" : "●"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "9rem 2.5rem 5rem", maxWidth: "1280px", margin: "0 auto", gap: "5rem", flexWrap: "wrap", position: "relative" }}>
        <div style={{ position: "absolute", top: "20%", left: "8%", width: "520px", height: "520px", background: "radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 65%)", pointerEvents: "none", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 65%)", pointerEvents: "none", filter: "blur(60px)" }} />

        {/* Copy */}
        <div style={{ flex: "1 1 460px", position: "relative", zIndex: 1, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(40px)", transition: "opacity 1s cubic-bezier(.22,1,.36,1) 0.1s,transform 1s cubic-bezier(.22,1,.36,1) 0.1s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "100px", padding: "6px 14px 6px 8px", marginBottom: "2.25rem" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ fontSize: "13px", color: dark ? "#a5b4fc" : "#4338ca", fontWeight: 600 }}>Available for senior roles &amp; remote work</span>
          </div>

          <h1 style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.055em", margin: "0 0 0.15rem", color: T.text }}>Himanshu</h1>
          <h1 style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.055em", margin: "0 0 1.6rem", background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Grover.</h1>

          <p style={{ fontSize: "clamp(1.1rem,2.2vw,1.35rem)", fontWeight: 700, color: T.bodyB, letterSpacing: "-0.025em", margin: "0 0 1.1rem", lineHeight: 1.35 }}>
            Senior Product Designer · UI/UX · AI Products
          </p>
          <p style={{ fontSize: "clamp(1.05rem,1.8vw,1.15rem)", lineHeight: 1.85, color: T.body, maxWidth: "530px", margin: "0 0 2.75rem", fontWeight: 400 }}>
            I design products people love and businesses grow with. 6.8+ years building SaaS tools, enterprise platforms, marketplaces, and AI-powered experiences — always with measurable outcomes.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <Btn variant="primary" onClick={() => scrollTo("work")} dark={dark}>View Case Studies →</Btn>
            <Btn variant="ghost" dark={dark}>Download Resume</Btn>
            <Btn variant="ghost" href="mailto:himanshugrover2710@gmail.com" dark={dark}>Let's Talk</Btn>
          </div>
        </div>

        {/* Card */}
        <div style={{ flex: "0 0 auto", zIndex: 1, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(28px) scale(0.96)", transition: "opacity 1.1s cubic-bezier(.22,1,.36,1) 0.35s,transform 1.1s cubic-bezier(.22,1,.36,1) 0.35s" }}>
          <HeroCard dark={dark} />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "3.75rem 2.5rem", background: T.bg2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2.5rem" }}>
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(2.6rem,4.5vw,3.4rem)", fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 1, background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "6px" }}>
                  <Counter target={s.value} suffix={s.suffix} />
                  <span style={{ fontSize: "52%", fontWeight: 700, marginLeft: "4px" }}>{s.unit}</span>
                </div>
                <p style={{ color: T.body, fontSize: "14px", fontWeight: 500, margin: 0 }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section id="work" style={{ padding: "7rem 2.5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <Eyebrow label="Featured Work" />
          <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.08 }}>Case Studies</h2>
          <p style={{ fontSize: "18px", color: T.body, maxWidth: "520px", lineHeight: 1.78, marginBottom: "3.5rem", fontWeight: 400 }}>Selected projects where design directly created measurable business and user impact.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem" }}>
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 0.07}>
              <CaseCard cs={cs} dark={dark} surface={T.surface} border={T.border} text={T.text} muted={T.body} onClick={() => setActiveCS(cs)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "5rem 2.5rem 7rem", background: T.bg2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <Eyebrow label="Visual Playground" />
            <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 3.5rem", lineHeight: 1.08 }}>Selected UI Work</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1rem" }}>
            {GALLERY.map((g, i) => {
              const [hov, setHov] = useState(false);
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: hov ? T.surface : "transparent", border: `1px solid ${hov ? g.c + "55" : T.border}`, borderRadius: "20px", padding: "2.1rem 1.75rem", cursor: "pointer", transition: "all 0.28s cubic-bezier(.22,1,.36,1)", transform: hov ? "translateY(-5px)" : "none", boxShadow: hov ? (dark ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.08)") : "none" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: g.c + "1a", border: `1px solid ${g.c}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", color: g.c, marginBottom: "1.25rem" }}>{g.icon}</div>
                    <p style={{ fontWeight: 800, fontSize: "18px", color: T.text, margin: "0 0 6px", letterSpacing: "-0.025em" }}>{g.label}</p>
                    <p style={{ fontSize: "14px", color: T.body, margin: 0, lineHeight: 1.6 }}>{g.sub}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "7rem 2.5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <Eyebrow label="Design Process" />
          <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.08 }}>How I Work</h2>
          <p style={{ fontSize: "18px", color: T.body, maxWidth: "520px", lineHeight: 1.78, marginBottom: "3.5rem" }}>Research-driven. Outcome-oriented. Built for velocity without sacrificing craft.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "1rem" }}>
          {PROCESS_STEPS.map((p, i) => {
            const active = activeStep === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div onClick={() => setActiveStep(active ? null : i)} style={{ background: active ? (dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)") : T.surface, border: `1px solid ${active ? "#6366f1" : T.border}`, borderRadius: "18px", padding: "1.75rem 1.25rem", cursor: "pointer", transition: "all 0.25s cubic-bezier(.22,1,.36,1)", textAlign: "center" }}
                  onMouseEnter={e => !active && (e.currentTarget.style.borderColor = "#6366f155")}
                  onMouseLeave={e => !active && (e.currentTarget.style.borderColor = T.border)}>
                  <div style={{ fontSize: "22px", marginBottom: "0.65rem", color: active ? "#818cf8" : T.body }}>{p.icon}</div>
                  <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.13em", color: "#6366f1", marginBottom: "5px" }}>{p.n}</div>
                  <div style={{ fontWeight: 800, fontSize: "15px", color: T.text, letterSpacing: "-0.015em" }}>{p.title}</div>
                  {active && <p style={{ fontSize: "13px", color: T.body, lineHeight: 1.65, marginTop: "0.7rem", marginBottom: 0 }}>{p.sub}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "5rem 2.5rem 7rem", background: T.bg2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5.5rem", alignItems: "start" }}>
          <Reveal>
            <Eyebrow label="Skills & Tools" />
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.04em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.1 }}>What I Bring</h2>
            <p style={{ fontSize: "17px", color: T.body, lineHeight: 1.82, marginBottom: "1.75rem", fontWeight: 400 }}>Deeply technical design skills combined with strategic product thinking and a strong bias for outcomes over aesthetics.</p>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: "#6366f1", textTransform: "uppercase", marginBottom: "0.75rem" }}>Core Tools</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "1.5rem" }}>
              {SKILLS_PRIMARY.map(s => <Pill key={s} dark={dark}>{s}</Pill>)}
            </div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: T.body, textTransform: "uppercase", marginBottom: "0.75rem" }}>Also Proficient In</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {SKILLS_SEC.map(s => <Pill key={s} dark={dark}>{s}</Pill>)}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", paddingTop: "2.75rem" }}>
              {SKILL_BARS.map((s, i) => {
                const ref = useRef(); const v = useInView(ref, 0.2);
                return (
                  <div key={i} ref={ref}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "9px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: T.textB, letterSpacing: "-0.015em" }}>{s.name}</span>
                      <span style={{ fontSize: "13px", color: T.body, fontWeight: 500 }}>{s.level}%</span>
                    </div>
                    <div style={{ height: "4px", background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)", borderRadius: "100px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: v ? s.level + "%" : "0%", background: "linear-gradient(90deg,#6366f1,#a78bfa)", borderRadius: "100px", transition: `width 1.3s cubic-bezier(.22,1,.36,1) ${i * 0.08}s` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "7rem 2.5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <Eyebrow label="Testimonials" />
          <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.08 }}>What People Say</h2>
          <p style={{ fontSize: "18px", color: T.body, maxWidth: "500px", lineHeight: 1.78, marginBottom: "3.5rem" }}>From the PMs, engineers, and founders I've shipped with.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem" }}>
          {TESTIMONIALS.map((t, i) => {
            const [hov, setHov] = useState(false);
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: T.surface, border: `1px solid ${hov ? t.color + "44" : T.border}`, borderRadius: "22px", padding: "2.1rem 2rem", transition: "all 0.3s cubic-bezier(.22,1,.36,1)", transform: hov ? "translateY(-5px)" : "none", boxShadow: hov ? (dark ? "0 24px 70px rgba(0,0,0,0.45)" : "0 24px 70px rgba(0,0,0,0.09)") : "none" }}>
                  <div style={{ fontSize: "48px", lineHeight: 1, color: t.color + "44", fontFamily: "Georgia,serif", marginBottom: "0.25rem" }}>"</div>
                  <p style={{ color: T.bodyB, fontSize: "16px", lineHeight: 1.82, margin: "0 0 1.75rem", fontWeight: 400 }}>
                    {t.quote.split(t.highlight).map((part, j, arr) =>
                      j < arr.length - 1 ? [part, <mark key={j} style={{ background: t.color + "20", color: dark ? t.accent : t.color, fontWeight: 600, borderRadius: "4px", padding: "0 3px" }}>{t.highlight}</mark>] : part
                    )}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "1.25rem", borderTop: `1px solid ${T.border}` }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: t.color + "1a", border: `2px solid ${t.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: t.color, flexShrink: 0 }}>{t.initials}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "15px", color: T.text, margin: "0 0 2px", letterSpacing: "-0.015em" }}>{t.name}</p>
                      <p style={{ fontSize: "13px", color: T.body, margin: 0 }}>{t.role} · <span style={{ color: t.color, fontWeight: 600 }}>{t.co}</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "5rem 2.5rem 7rem", background: T.bg2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "6rem", alignItems: "center" }}>
          <Reveal>
            <Eyebrow label="About Me" />
            <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.1rem)", fontWeight: 900, letterSpacing: "-0.04em", color: T.text, margin: "0 0 1.5rem", lineHeight: 1.1 }}>I solve complex product problems through design.</h2>
            <p style={{ fontSize: "17px", color: T.bodyB, lineHeight: 1.88, marginBottom: "1.15rem", fontWeight: 400 }}>
              I'm a Senior Product Designer who operates at the intersection of user psychology, business strategy, and engineering reality. Over 6.8 years I've shipped products across fintech, logistics, marketplaces, and manufacturing — products that people actually use, and that companies grow with.
            </p>
            <p style={{ fontSize: "16px", color: T.body, lineHeight: 1.88, marginBottom: "2.1rem" }}>
              My process is research-grounded, opinion-led, and always tied to outcomes. I don't hand off pixels — I embed with teams, understand tradeoffs, and design systems that scale beyond the first release.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              {["Systems thinker","Business-impact focused","Engineering-native","Senior ownership mindset","Research-driven","Scalable design systems"].map(x => (
                <div key={x} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#6366f1", fontWeight: 900, fontSize: "14px", flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: "15px", color: T.bodyB, fontWeight: 500 }}>{x}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "24px", padding: "2rem", boxShadow: dark ? "0 24px 80px rgba(0,0,0,0.4)" : "0 24px 80px rgba(0,0,0,0.07)" }}>
              <div style={{ width: "76px", height: "76px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px", marginBottom: "1.35rem", boxShadow: "0 8px 28px rgba(99,102,241,0.4)" }}>🎨</div>
              <p style={{ fontWeight: 900, fontSize: "21px", color: T.text, margin: "0 0 4px", letterSpacing: "-0.03em" }}>Himanshu Grover</p>
              <p style={{ fontSize: "14px", color: "#6366f1", fontWeight: 600, margin: "0 0 1.5rem" }}>Senior Product Designer</p>
              {[["Location","Delhi, India · Remote OK"],["Availability","Open to opportunities"],["Focus","SaaS · Enterprise · AI"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: "13px", color: T.body }}>{k}</span>
                  <span style={{ fontSize: "13px", color: T.textB, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "8rem 2.5rem", maxWidth: "880px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "500px", background: "radial-gradient(ellipse,rgba(99,102,241,0.11) 0%,transparent 70%)", pointerEvents: "none" }} />
        <Reveal>
          <Eyebrow label="Let's Connect" center />
          <h2 style={{ fontSize: "clamp(2.6rem,6vw,4.5rem)", fontWeight: 900, letterSpacing: "-0.055em", color: T.text, margin: "0 0 1.1rem", lineHeight: 1.02 }}>
            Let's build products<br />
            <span style={{ background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>users love.</span>
          </h2>
          <p style={{ fontSize: "18px", color: T.body, lineHeight: 1.78, maxWidth: "520px", margin: "0 auto 2.75rem", fontWeight: 400 }}>
            Available for Senior Product Designer, UI/UX, and remote opportunities globally.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Btn variant="primary" href="mailto:himanshugrover2710@gmail.com" dark={dark}>himanshugrover2710@gmail.com →</Btn>
            <Btn variant="ghost" dark={dark}>View LinkedIn</Btn>
          </div>
          <p style={{ color: T.body, fontSize: "15px", fontWeight: 500, margin: 0 }}>📞 +91 97116 92602</p>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: "1.75rem 2.5rem", background: T.bg2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontWeight: 900, fontSize: "17px", letterSpacing: "-0.05em", color: T.text }}><span style={{ color: "#6366f1" }}>H</span>G.</span>
        <span style={{ color: T.body, fontSize: "13px" }}>© 2026 Himanshu Grover — Designed with intention.</span>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {["Work","Process","About","Contact"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", color: T.body, fontSize: "13px", cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = T.text} onMouseLeave={e => e.target.style.color = T.body}>{l}</button>
          ))}
        </div>
      </footer>

      {activeCS && <Modal cs={activeCS} onClose={() => setActiveCS(null)} />}
    </div>
  );
}
