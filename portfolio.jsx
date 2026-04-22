import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "Process", "Skills", "About", "Contact"];

const STATS = [
  { value: 6.8, suffix: "+ Yrs", label: "Experience" },
  { value: 5000, suffix: "+", label: "Users Impacted" },
  { value: 30, suffix: "%", label: "Faster Delivery" },
  { value: 20, suffix: "%", label: "Efficiency Gains" },
];

const CASE_STUDIES = [
  {
    id: 1,
    tag: "AI · Enterprise",
    title: "AI Fraud Detection Dashboard",
    desc: "Real-time threat intelligence platform helping banks stop fraud before it happens.",
    color: "#6366f1",
    accent: "#818cf8",
    bg: "from-indigo-950 to-slate-900",
    metric: "40% ↓ False Positives",
    challenge: "A leading fintech needed to surface complex ML fraud signals to non-technical analysts without overwhelming them—while maintaining sub-second response times on millions of daily transactions.",
    role: "Lead Product Designer — end-to-end from discovery through ship.",
    process: ["Stakeholder interviews with 12 fraud analysts", "Competitive audit of 6 enterprise dashboards", "Information architecture redesign", "3 rounds of usability testing", "Design system component library", "Developer handoff with Zeroheight docs"],
    metrics: ["40% reduction in false positive review time", "28% improvement in threat detection accuracy", "NPS score jumped from 32 to 71 post-launch", "Onboarding time cut from 3 days to 4 hours"],
    outcome: "Shipped in Q2 2024. Rolled out to 800+ analysts across 3 countries. The dashboard became the internal gold standard for data-heavy enterprise UX."
  },
  {
    id: 2,
    tag: "Logistics · B2B",
    title: "Shipease Logistics Platform",
    desc: "End-to-end shipment visibility and operations platform for mid-market logistics companies.",
    color: "#10b981",
    accent: "#34d399",
    bg: "from-emerald-950 to-slate-900",
    metric: "30% Faster Operations",
    challenge: "Shipease's legacy platform had 60% task abandonment on their core dispatch flow. Operations teams were losing 2+ hours per day to workarounds.",
    role: "Senior UX Designer — research, IA, interaction design, and design system.",
    process: ["Contextual inquiry with 8 dispatchers", "Journey mapping of 6 core workflows", "Card sorting for navigation redesign", "Prototype testing with 5 iterations", "Component library with 120+ components"],
    metrics: ["30% reduction in dispatch time", "Task completion rate from 41% to 89%", "Support tickets dropped 52% in 30 days", "3.2x increase in daily active users"],
    outcome: "Platform relaunched in 6 months. Became Shipease's primary growth lever, contributing to a $4M ARR increase in Year 1."
  },
  {
    id: 3,
    tag: "Marketplace · Consumer",
    title: "Marketplace Booking Experience",
    desc: "Premium service booking platform connecting customers with vetted professionals nationwide.",
    color: "#f59e0b",
    accent: "#fbbf24",
    bg: "from-amber-950 to-slate-900",
    metric: "22% ↑ Conversion Rate",
    challenge: "A marketplace with 50K+ professionals had a 3-step booking funnel with 71% drop-off. Mobile experience was afterthought-built with 4.2s load times.",
    role: "Product Designer — mobile-first redesign with growth focus.",
    process: ["Funnel analytics deep-dive with data team", "Session recordings analysis (400+ sessions)", "A/B testing framework setup", "Mobile-first redesign with progressive disclosure", "Performance optimization partnership with engineering"],
    metrics: ["22% increase in booking conversion", "Mobile load time: 4.2s → 1.8s", "Cart abandonment dropped 34%", "Revenue per session up 18%"],
    outcome: "New booking flow drove $2.1M incremental revenue in first quarter. Featured in a major product case study."
  },
  {
    id: 4,
    tag: "Enterprise · ERP",
    title: "Enterprise ERP Workflow System",
    desc: "Next-generation ERP interface reducing cognitive load for complex manufacturing operations.",
    color: "#8b5cf6",
    accent: "#a78bfa",
    bg: "from-violet-950 to-slate-900",
    metric: "35% ↓ Error Rate",
    challenge: "A manufacturing ERP used by 2,000+ employees had a 1990s interface causing 200+ daily data-entry errors and a 6-month onboarding curve.",
    role: "Lead Designer — system architecture, interaction patterns, and design system.",
    process: ["6-week ethnographic research with factory floor workers", "Error pattern analysis with QA team", "Progressive disclosure architecture", "Role-based permission UX design", "Multi-language design system (EN/DE/JA)"],
    metrics: ["35% reduction in data-entry errors", "Onboarding reduced from 6 months to 3 weeks", "Employee satisfaction score: 2.8 → 4.4/5", "IT support tickets reduced 61%"],
    outcome: "Deployed across 4 manufacturing plants in 3 countries. Won internal innovation award. Client renewed 5-year contract."
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discover", desc: "User interviews, competitive research, stakeholder alignment", icon: "🔍" },
  { step: "02", title: "Define", desc: "Problem framing, success metrics, design principles", icon: "🎯" },
  { step: "03", title: "Ideate", desc: "Sketches, information architecture, flow mapping", icon: "💡" },
  { step: "04", title: "Prototype", desc: "High-fidelity Figma, interactive prototypes", icon: "⚡" },
  { step: "05", title: "Test", desc: "Usability testing, A/B tests, heuristic evaluation", icon: "🧪" },
  { step: "06", title: "Ship", desc: "Dev handoff, QA review, launch coordination", icon: "🚀" },
  { step: "07", title: "Optimize", desc: "Analytics review, iteration cycles, continuous improvement", icon: "📈" },
];

const SKILLS = [
  { name: "Figma", level: 98 }, { name: "FigJam", level: 92 }, { name: "Adobe XD", level: 85 },
  { name: "Sketch", level: 80 }, { name: "Design Systems", level: 95 }, { name: "UX Research", level: 90 },
  { name: "ChatGPT / Claude AI", level: 88 }, { name: "React + HTML/CSS", level: 78 },
  { name: "Jira / Agile", level: 85 }, { name: "Prototyping", level: 96 },
];

const TESTIMONIALS = [
  {
    name: "Priya Kapoor", role: "Product Manager, Razorpay", initials: "PK", color: "#6366f1",
    text: "Himanshu doesn't just design screens—he solves problems. His ability to translate complex user research into elegant, scalable UI is genuinely rare. He shipped our most ambitious redesign in record time with zero quality compromise."
  },
  {
    name: "Alex Chen", role: "Engineering Lead, Shipease", initials: "AC", color: "#10b981",
    text: "Working with Himanshu changed how our entire engineering team thinks about UX. His Figma handoffs are pixel-perfect and his component thinking makes implementation fast. Honestly the best designer I've shipped with."
  },
  {
    name: "Meera Sharma", role: "Founder, Marketplace Startup", initials: "MS", color: "#f59e0b",
    text: "Himanshu delivered a booking experience that directly impacted revenue within weeks. He's fast, strategic, and his taste level is exceptional. Our conversion metrics have never looked better."
  },
  {
    name: "David Park", role: "CTO, Enterprise SaaS", initials: "DP", color: "#8b5cf6",
    text: "We hired Himanshu to redesign a critical enterprise workflow. He brought research depth, system thinking, and production-ready design. The project won an internal innovation award and I attribute much of that to his work."
  },
];

const UI_GALLERY = [
  { label: "Dashboard UI", tag: "Data Viz", emoji: "📊" },
  { label: "Mobile Apps", tag: "iOS / Android", emoji: "📱" },
  { label: "Website Design", tag: "Landing Pages", emoji: "🌐" },
  { label: "Design Systems", tag: "Components", emoji: "🧩" },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function AnimCounter({ target, suffix, duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, 0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = () => {
      start += 16;
      const p = Math.min(start / duration, 1);
      setVal(Math.floor(p * target * 10) / 10);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function CaseStudyModal({ cs, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 1000, overflowY: "auto", display: "flex", justifyContent: "center", padding: "2rem 1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0f1117", border: "1px solid #1e2130", borderRadius: "20px", width: "100%", maxWidth: "780px", padding: "2.5rem", position: "relative", height: "fit-content" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "#1e2130", border: "none", color: "#9ca3af", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", color: cs.accent, textTransform: "uppercase" }}>{cs.tag}</span>
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, color: "#f1f5f9", margin: "0.75rem 0 0.5rem", lineHeight: 1.15 }}>{cs.title}</h2>
        <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "2rem" }}>{cs.desc}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[["Challenge", cs.challenge], ["My Role", cs.role], ["Outcome", cs.outcome]].map(([k, v]) => (
            <div key={k} style={{ background: "#151822", border: "1px solid #1e2130", borderRadius: "12px", padding: "1.25rem" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: cs.accent, textTransform: "uppercase", marginBottom: "0.5rem" }}>{k}</p>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.65 }}>{v}</p>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: cs.accent, textTransform: "uppercase", marginBottom: "0.75rem" }}>UX Process</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {cs.process.map((p, i) => (
              <span key={i} style={{ background: "#151822", border: "1px solid #1e2130", color: "#94a3b8", fontSize: "13px", padding: "6px 12px", borderRadius: "100px" }}>{p}</span>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: cs.accent, textTransform: "uppercase", marginBottom: "0.75rem" }}>Outcomes & Metrics</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
            {cs.metrics.map((m, i) => (
              <div key={i} style={{ background: "#151822", border: `1px solid ${cs.color}33`, borderRadius: "10px", padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cs.accent, flexShrink: 0 }} />
                <p style={{ color: "#e2e8f0", fontSize: "14px", margin: 0 }}>{m}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCS, setActiveCS] = useState(null);
  const [activeProcess, setActiveProcess] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const bg = dark ? "#080b12" : "#f8f9fc";
  const surface = dark ? "#0f1117" : "#ffffff";
  const surfaceBorder = dark ? "#1a1e2e" : "#e5e7ef";
  const text = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#94a3b8" : "#64748b";
  const subtle = dark ? "#1e2436" : "#f1f5f9";

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif", minHeight: "100vh", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Scroll progress */}
      <ScrollProgress dark={dark} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem", background: scrolled ? (dark ? "rgba(8,11,18,0.92)" : "rgba(248,249,252,0.92)") : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${surfaceBorder}` : "none", transition: "all 0.35s ease", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 800, fontSize: "17px", letterSpacing: "-0.02em", color: text }}>
          <span style={{ color: "#6366f1" }}>H</span>G
        </div>
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", color: muted, fontSize: "14px", fontWeight: 500, cursor: "pointer", padding: "6px 12px", borderRadius: "8px", transition: "color 0.2s, background 0.2s" }}
              onMouseEnter={e => { e.target.style.color = text; e.target.style.background = subtle; }}
              onMouseLeave={e => { e.target.style.color = muted; e.target.style.background = "transparent"; }}>
              {l}
            </button>
          ))}
          <button onClick={() => setDark(!dark)} style={{ background: subtle, border: `1px solid ${surfaceBorder}`, color: text, width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "15px", marginLeft: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            {dark ? "☀" : "☾"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="work" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "8rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 480px", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(40px)", transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: dark ? "#1e2436" : "#eff0ff", border: `1px solid ${dark ? "#2e3458" : "#c7d2fe"}`, borderRadius: "100px", padding: "6px 14px", marginBottom: "1.75rem" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 8px #6ee7b7" }} />
            <span style={{ fontSize: "13px", color: dark ? "#a5b4fc" : "#4338ca", fontWeight: 500 }}>Open to opportunities</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 0.5rem", color: text }}>
            Himanshu<br /><span style={{ background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Grover</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", fontWeight: 600, color: muted, letterSpacing: "-0.01em", margin: "0 0 1.25rem" }}>Senior Product Designer · UI/UX · AI Products</p>
          <p style={{ fontSize: "clamp(1.05rem, 2vw, 1.2rem)", lineHeight: 1.7, color: dark ? "#cbd5e1" : "#374151", maxWidth: "520px", margin: "0 0 2.5rem" }}>
            Designing products people love and businesses grow. 6.8+ years building SaaS, enterprise tools, dashboards, marketplaces, and AI-powered experiences.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <MagButton onClick={() => scrollTo("work")} primary dark={dark}>View Work →</MagButton>
            <MagButton href="mailto:himanshugrover2710@gmail.com" dark={dark}>Let's Talk</MagButton>
            <MagButton dark={dark}>Download CV</MagButton>
          </div>
        </div>
        <div style={{ flex: "0 0 auto", opacity: mounted ? 1 : 0, transition: "opacity 1.2s ease 0.4s", transform: mounted ? "none" : "scale(0.9)", transitionProperty: "opacity, transform" }}>
          <AvatarArt dark={dark} />
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ borderTop: `1px solid ${surfaceBorder}`, borderBottom: `1px solid ${surfaceBorder}`, padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem" }}>
          {STATS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <AnimCounter target={s.value} suffix={s.suffix} />
                </div>
                <p style={{ color: muted, fontSize: "14px", fontWeight: 500, marginTop: "4px" }}>{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="Featured Work" muted={muted} />
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.75rem", color: text }}>Case Studies</h2>
          <p style={{ color: muted, maxWidth: "480px", lineHeight: 1.7, marginBottom: "3rem" }}>Selected projects where design created measurable business impact.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {CASE_STUDIES.map((cs, i) => (
            <FadeIn key={cs.id} delay={i * 0.08}>
              <CaseCard cs={cs} dark={dark} surface={surface} surfaceBorder={surfaceBorder} muted={muted} text={text} onClick={() => setActiveCS(cs)} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* UI GALLERY */}
      <section style={{ padding: "4rem 2rem 6rem", background: dark ? "#0a0d16" : "#f3f4f8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel label="Visual Playground" muted={muted} />
            <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 3rem", color: text }}>Selected UI Work</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {UI_GALLERY.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <UICard item={item} i={i} dark={dark} surface={surface} surfaceBorder={surfaceBorder} text={text} muted={muted} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="Design Process" muted={muted} />
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.75rem", color: text }}>How I Work</h2>
          <p style={{ color: muted, maxWidth: "480px", lineHeight: 1.7, marginBottom: "3rem" }}>A research-driven, outcome-oriented process that balances velocity with craft.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
          {PROCESS_STEPS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div onClick={() => setActiveProcess(activeProcess === i ? null : i)} style={{ background: activeProcess === i ? (dark ? "#1a1e2e" : "#eff0ff") : surface, border: `1px solid ${activeProcess === i ? "#6366f1" : surfaceBorder}`, borderRadius: "16px", padding: "1.5rem 1.25rem", cursor: "pointer", transition: "all 0.25s", textAlign: "center" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
                onMouseLeave={e => e.currentTarget.style.borderColor = activeProcess === i ? "#6366f1" : surfaceBorder}>
                <div style={{ fontSize: "28px", marginBottom: "0.75rem" }}>{p.icon}</div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#6366f1", marginBottom: "4px" }}>{p.step}</div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: text, marginBottom: activeProcess === i ? "0.75rem" : 0 }}>{p.title}</div>
                {activeProcess === i && <p style={{ fontSize: "13px", color: muted, lineHeight: 1.6, marginTop: "0.5rem" }}>{p.desc}</p>}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "4rem 2rem 6rem", background: dark ? "#0a0d16" : "#f3f4f8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <FadeIn>
            <SectionLabel label="Skills & Tools" muted={muted} />
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.75rem", color: text }}>What I Bring</h2>
            <p style={{ color: muted, lineHeight: 1.7, marginBottom: "2rem" }}>Deeply technical design skills combined with strategic product thinking and a strong bias for outcomes.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Figma", "FigJam", "Adobe XD", "Sketch", "Design Systems", "UX Research", "Claude AI", "ChatGPT", "Jira", "React", "HTML/CSS", "Prototyping", "A/B Testing", "User Interviews"].map(s => (
                <span key={s} style={{ background: surface, border: `1px solid ${surfaceBorder}`, color: muted, fontSize: "13px", fontWeight: 500, padding: "6px 14px", borderRadius: "100px" }}>{s}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {SKILLS.map((s, i) => <SkillBar key={i} s={s} i={i} dark={dark} text={text} muted={muted} />)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="Testimonials" muted={muted} />
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 3rem", color: text }}>What People Say</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: "20px", padding: "1.75rem", transition: "transform 0.25s, box-shadow 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = dark ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <p style={{ color: dark ? "#cbd5e1" : "#374151", lineHeight: 1.75, fontSize: "15px", marginBottom: "1.5rem" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: t.color + "22", border: `2px solid ${t.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: t.color }}>{t.initials}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "14px", color: text, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: "13px", color: muted, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "4rem 2rem 6rem", background: dark ? "#0a0d16" : "#f3f4f8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", maxWidth: "320px", background: dark ? "#1a1e2e" : "#e8eaf6", borderRadius: "24px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${surfaceBorder}` }}>
                <span style={{ fontSize: "80px" }}>🧑‍💻</span>
              </div>
              <div style={{ position: "absolute", bottom: "-1rem", right: "-1rem", background: "linear-gradient(135deg, #6366f1, #a78bfa)", borderRadius: "16px", padding: "1rem 1.25rem", fontSize: "14px", fontWeight: 700, color: "white" }}>
                6.8+ Years<br /><span style={{ fontWeight: 400, opacity: 0.85, fontSize: "13px" }}>of crafting UX</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <SectionLabel label="About Me" muted={muted} />
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 1.25rem", color: text }}>I solve complex product problems through design.</h2>
            <p style={{ color: dark ? "#cbd5e1" : "#374151", lineHeight: 1.8, marginBottom: "1rem", fontSize: "16px" }}>
              I'm a Senior Product Designer who operates at the intersection of user psychology, business strategy, and engineering reality. I've spent 6.8+ years working on products used by millions—from zero-to-one startup launches to enterprise systems serving global teams.
            </p>
            <p style={{ color: muted, lineHeight: 1.8, marginBottom: "1.75rem", fontSize: "15px" }}>
              My design process is grounded in research, driven by clarity, and measured by outcomes. I don't just make things beautiful—I make them work. Every pixel has a purpose. Every interaction earns its place.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[["SaaS & B2B Products", "Enterprise UX Systems"], ["AI-Powered Experiences", "Design Leadership"]].flat().map(x => (
                <div key={x} style={{ display: "flex", alignItems: "center", gap: "8px", color: dark ? "#94a3b8" : "#64748b", fontSize: "14px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1" }} />{x}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 2rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <SectionLabel label="Contact" muted={muted} center />
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 1rem", color: text, lineHeight: 1.1 }}>
            Let's build something<br /><span style={{ background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>meaningful.</span>
          </h2>
          <p style={{ color: muted, fontSize: "17px", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto 2.5rem" }}>
            Open to full-time roles, freelance projects, and interesting conversations. Let's talk.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <MagButton href="mailto:himanshugrover2710@gmail.com" primary dark={dark}>himanshugrover2710@gmail.com →</MagButton>
            <MagButton dark={dark}>LinkedIn</MagButton>
          </div>
          <p style={{ color: muted, fontSize: "14px" }}>📞 +91 97116 92602</p>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${surfaceBorder}`, padding: "1.75rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontWeight: 800, fontSize: "15px", letterSpacing: "-0.02em", color: text }}><span style={{ color: "#6366f1" }}>H</span>G</span>
        <span style={{ color: muted, fontSize: "13px" }}>© 2026 Himanshu Grover. Designed with intention.</span>
        <div style={{ display: "flex", gap: "1rem" }}>
          {["Work", "Process", "Contact"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", color: muted, fontSize: "13px", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </footer>

      {activeCS && <CaseStudyModal cs={activeCS} onClose={() => setActiveCS(null)} />}
    </div>
  );
}

function ScrollProgress({ dark }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: "2px", width: pct + "%", background: "linear-gradient(90deg, #6366f1, #a78bfa, #60a5fa)", zIndex: 999, transition: "width 0.1s linear" }} />;
}

function MagButton({ children, onClick, href, primary, dark }) {
  const style = {
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: primary ? "12px 24px" : "11px 22px",
    background: primary ? "linear-gradient(135deg, #6366f1, #818cf8)" : "transparent",
    border: primary ? "none" : `1px solid ${dark ? "#2e3458" : "#d1d5db"}`,
    color: primary ? "#fff" : (dark ? "#e2e8f0" : "#374151"),
    borderRadius: "100px", fontSize: "15px", fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s", textDecoration: "none", fontFamily: "inherit",
    boxShadow: primary ? "0 4px 24px rgba(99,102,241,0.35)" : "none"
  };
  const hover = (e, on) => {
    e.currentTarget.style.transform = on ? "translateY(-2px) scale(1.02)" : "none";
    if (primary) e.currentTarget.style.boxShadow = on ? "0 8px 36px rgba(99,102,241,0.55)" : "0 4px 24px rgba(99,102,241,0.35)";
  };
  if (href) return <a href={href} style={style} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{children}</a>;
  return <button style={style} onClick={onClick} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{children}</button>;
}

function CaseCard({ cs, dark, surface, surfaceBorder, muted, text, onClick }) {
  return (
    <div onClick={onClick} style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: "20px", overflow: "hidden", cursor: "pointer", transition: "all 0.3s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = dark ? "0 24px 80px rgba(0,0,0,0.5)" : "0 24px 80px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = cs.color + "66"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = surfaceBorder; }}>
      <div style={{ height: "200px", background: `linear-gradient(135deg, ${cs.color}22, ${cs.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `1px solid ${cs.color}22` }}>
        <div style={{ fontSize: "56px", opacity: 0.9 }}>
          {cs.id === 1 ? "🛡" : cs.id === 2 ? "📦" : cs.id === 3 ? "🛒" : "⚙️"}
        </div>
        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: cs.color + "22", border: `1px solid ${cs.color}44`, color: cs.accent, fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "100px" }}>{cs.metric}</div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: cs.accent, textTransform: "uppercase" }}>{cs.tag}</span>
        <h3 style={{ fontWeight: 800, fontSize: "18px", color: text, margin: "0.4rem 0 0.5rem", lineHeight: 1.25 }}>{cs.title}</h3>
        <p style={{ color: muted, fontSize: "14px", lineHeight: 1.65, margin: "0 0 1.25rem" }}>{cs.desc}</p>
        <span style={{ fontSize: "13px", color: cs.accent, fontWeight: 600 }}>View Case Study →</span>
      </div>
    </div>
  );
}

function UICard({ item, i, dark, surface, surfaceBorder, text, muted }) {
  const colors = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6"];
  return (
    <div style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: "20px", overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = colors[i] + "66"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = surfaceBorder; }}>
      <div style={{ height: "160px", background: `linear-gradient(135deg, ${colors[i]}18, ${colors[i]}06)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>{item.emoji}</div>
      <div style={{ padding: "1.25rem" }}>
        <p style={{ fontWeight: 700, fontSize: "16px", color: text, margin: "0 0 2px" }}>{item.label}</p>
        <p style={{ fontSize: "13px", color: muted, margin: 0 }}>{item.tag}</p>
      </div>
    </div>
  );
}

function SkillBar({ s, i, dark, text, muted }) {
  const ref = useRef();
  const inView = useInView(ref, 0.2);
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: text }}>{s.name}</span>
        <span style={{ fontSize: "13px", color: muted }}>{s.level}%</span>
      </div>
      <div style={{ height: "5px", background: dark ? "#1e2436" : "#e5e7ef", borderRadius: "100px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: inView ? s.level + "%" : "0%", background: `linear-gradient(90deg, #6366f1, #a78bfa)`, borderRadius: "100px", transition: `width 1.2s ease ${i * 0.07}s` }} />
      </div>
    </div>
  );
}

function SectionLabel({ label, muted, center }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem", ...(center ? { justifyContent: "center", width: "100%" } : {}) }}>
      <div style={{ width: "20px", height: "2px", background: "linear-gradient(90deg, #6366f1, #a78bfa)" }} />
      <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: "#6366f1", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function AvatarArt({ dark }) {
  return (
    <div style={{ width: "340px", height: "380px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "30px", background: dark ? "linear-gradient(135deg, #1a1e2e, #0f1117)" : "linear-gradient(135deg, #eff0ff, #e8eaf6)", border: `1px solid ${dark ? "#2e3458" : "#c7d2fe"}`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "120px" }}>🧑‍🎨</div>
        <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "#6366f122", border: "1px solid #6366f144", borderRadius: "12px", padding: "0.6rem 0.9rem", backdropFilter: "blur(8px)" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", margin: 0 }}>AVAILABLE</p>
        </div>
        <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", background: dark ? "rgba(15,17,23,0.8)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderRadius: "14px", padding: "1rem", border: `1px solid ${dark ? "#2e3458" : "#c7d2fe"}` }}>
          <p style={{ fontWeight: 800, fontSize: "15px", color: dark ? "#f1f5f9" : "#0f172a", margin: "0 0 2px" }}>Himanshu Grover</p>
          <p style={{ fontSize: "13px", color: "#6366f1", margin: 0, fontWeight: 500 }}>Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
}
