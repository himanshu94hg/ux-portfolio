import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CASE_STUDIES } from "./src/data/caseStudiesData.js";
import { readStoredThemeIsDark, persistThemePreference } from "./src/themeStorage.js";

/* ─── DATA ────────────────────────────────────────────────── */

const NAV_LINKS = ["Work", "Process", "Skills", "About", "Contact"];

const STATS = [
  { value: 6.8, suffix: "+", unit: "Years", label: "Building Digital Products" },
  { value: 30, suffix: "+", unit: "Projects", label: "Launched & Delivered" },
  { value: "", suffix: "", unit: "Global  Markets", label: "UK · US · India · Australia" },
  { value: 6, suffix: "+", unit: "Industries", label: "EdTech · Logistics · Cybersecurity · eCommerce · Enterprise SaaS · Travel / Hospitality" },
];

const PROCESS_STEPS = [
  { n: "01", title: "Discover", sub: "Interviews · Research · Competitive audit", icon: "◐" },
  { n: "02", title: "Define", sub: "Problem framing · Success metrics · Principles", icon: "◑" },
  { n: "03", title: "Ideate", sub: "Sketches · IA · Flow mapping · Concepts", icon: "◒" },
  { n: "04", title: "Prototype", sub: "High-fidelity Figma · Interactive flows", icon: "◓" },
  { n: "05", title: "Test", sub: "Usability testing · A/B · Heuristics", icon: "◔" },
  { n: "06", title: "Ship", sub: "Dev handoff · QA review · Launch", icon: "◕" },
  { n: "07", title: "Optimise", sub: "Analytics · Iteration · Continuous improvement", icon: "●" },
];

const SKILLS_CATEGORIES = [
  {
    label: "Product Design",
    line:
      "End-to-End Product Design · Product Discovery · UX Strategy · MVP Design · Feature Prioritization · Conversion Optimization · Roadmapping · KPI-Focused Design · Stakeholder Management",
  },
  {
    label: "UX Design",
    line:
      "Interaction Design · User Research · Personas · Journey Mapping · User Flows · Information Architecture · Wireframing · Prototyping · Usability Testing · A/B Testing",
  },
  {
    label: "UI Design",
    line:
      "Design Systems · Component Libraries · Design Tokens · Dashboard UX · Data Visualization · Responsive Design · Accessibility (WCAG 2.1) · Motion Design · Visual Design",
  },
  { label: "Tools", line: "Figma (Advanced) · Adobe XD · Sketch · FigJam · Claude AI · ChatGPT · Jira · Git" },
  { label: "Technical", line: "HTML / CSS · React (Working Knowledge) · Tailwind · Vercel" },
  {
    label: "Methods",
    line:
      "Agile (Scrum) · Design Thinking · Design Sprints · Human-Centered Design · Async Remote Collaboration · Cross-functional Collaboration",
  },
];

const LINKEDIN_RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/himanshugrover-hg/details/recommendations/?detailScreenTabIndex=0";
/** Brand spelling: capital I and N (https://brand.linkedin.com). */
const LINKEDIN = "LinkedIn";

const TESTIMONIALS = [
  {
    name: "Shilpa",
    initials: "S",
    roleLine: "Senior Project Manager · Publishing & Digital Transformation",
    relation: "Managed Himanshu directly",
    quote:
      "Himanshu is an exceptional Senior UI/UX Designer who brings together user-centered thinking, strong design execution, and strategic clarity. He demonstrates strong ownership and leadership — mentoring junior designers, maintaining design consistency through systems and guidelines, and driving best result-driven practices across teams.",
    color: "#6366f1",
  },
  {
    name: "Himanshu Batra",
    initials: "HB",
    roleLine: "Backend Developer · SaaS & Web Applications · Shipease",
    relation: "Worked on the same team",
    quote:
      "Himanshu has a strong ability to turn complex requirements into clean, intuitive, and scalable product experiences. His mix of design expertise and frontend understanding makes collaboration seamless and ensures high-quality execution. He consistently brings user-focused thinking, accessibility awareness, and a proactive attitude to every project.",
    color: "#10b981",
  },
  {
    name: "Gourav Kumar",
    initials: "GK",
    roleLine: "Data Science & Analytics · Associate Manager",
    relation: "Managed Himanshu directly · 2+ years",
    quote:
      "He consistently delivered accurate insights, handled stakeholders well, and showed strong ownership of complex projects.",
    color: "#f59e0b",
  },
];

const SELECTED_WORK = [
  {
    title: "Creelo",
    tagline: "Live Website · eCommerce · Premium Home Essentials",
    image: "/selected-work/creelo/creelo-in.png",
    description:
      "End-to-end UX across storefront, vendor panel, admin panel, and partner onboarding flows. Live product serving premium brands including Kohler and Brizo.",
    cta: "Visit Live Site",
    href: "https://creelo.in",
    hrefLabel: "creelo.in",
    color: "#6366f1",
  },
  {
    title: "Shipease Aggregator Panel",
    tagline: "Live SaaS · Logistics · B2B Aggregator",
    image: "/selected-work/shipease/Shipease.png",
    description:
      "Full aggregator dashboard enabling sellers to manage shipments across multiple logistics providers — onboarding, order management, rate comparison, and real-time tracking. Fully accessible, no login required.",
    cta: "View Live Product",
    href: "https://logisticssaas.vercel.app",
    hrefLabel: "logisticssaas.vercel.app",
    color: "#10b981",
  },
  {
    title: "Petnexion",
    tagline: "Mobile App · Social Network · iOS/Android",
    images: ["/selected-work/petxion/Login.png", "/selected-work/petxion/Home.png", "/selected-work/petxion/edit-profile.png"],
    modalImages: ["/selected-work/petxion/Mobile-Mockup-Design2.png"],
    description:
      "End-to-end mobile UI for a pet social networking app — onboarding, home feed, profile, connections, events, and pet management. Designed sole end-to-end at Chetu Inc.",
    status: "No longer live · Screenshots available",
    color: "#8b5cf6",
  },
  {
    title: "EcoLiving",
    tagline: "Design Exercise · eCommerce · Sustainable Living",
    image: "/selected-work/eco-living/Hero.png",
    modalImages: ["/selected-work/eco-living/Eco.png"],
    description:
      "Interview assignment exploring a sustainable home essentials storefront — hero section, featured collections bento grid, trust signals, testimonials, and newsletter flows.",
    status: "Concept · Not a real client",
    color: "#f59e0b",
  },
];

const DESIGN_PRINCIPLES = [
  {
    n: "01",
    title: "Constraints are a design brief.",
    body:
      "At Magic Edtech, there were no user interviews, no direct client access, and no feedback loops — just documentation and strict WCAG accessibility standards to follow. I learned that working within tight constraints isn't a limitation. It forces clarity, precision, and a deeper respect for the end user you never get to meet.",
  },
  {
    n: "02",
    title: "Understand the product before designing the screen.",
    body:
      "At Apate AI, the hardest part wasn't the UI — it was understanding what the product actually did well enough to define the right KPIs, the right hierarchy, and the right four operational pillars. You cannot design a good dashboard for a product you don't deeply understand. I always spend more time in discovery than most designers think is necessary.",
  },
  {
    n: "03",
    title: "When there's no data, research is your foundation.",
    body:
      "At Chetu, leadership couldn't provide user data or research. So I ran my own competitive analysis, studied industry patterns, and made design decisions grounded in evidence I gathered independently. A good designer doesn't wait for perfect information — they build the best picture they can with what's available.",
  },
  {
    n: "04",
    title: "Differentiation lives in the details others skip.",
    body:
      "At Shipease, the aggregator market was highly competitive. The way to stand out wasn't to copy what others were doing — it was to identify the features and interactions competitors weren't presenting well and do them better. The most impactful design decisions weren't the obvious ones.",
  },
  {
    n: "05",
    title: "Guided workflows beat open-ended dashboards.",
    body:
      "In enterprise and operations products, users under pressure don't want flexibility — they want clarity. Especially in data-heavy platforms like Apate AI, a well-structured guided path consistently outperforms a powerful but unguided interface. I design for the hard moments first, not the happy path.",
  },
  {
    n: "06",
    title: "Accessibility is not a checklist — it's a design standard.",
    body:
      "Spending 3.5 years designing to WCAG 2.1 standards for global education platforms taught me that accessibility constraints almost always produce better design. Better contrast, clearer hierarchy, more readable typography, more logical structure. Designing for everyone raises the bar for everyone.",
  },
];

/** Shared card rhythm: same corner radius, padding, and grid gaps site-wide. */
const CARD_LAYOUT = {
  radius: "20px",
  padDesk: "1.75rem",
  padMob: "1.25rem",
  gap: "1.25rem",
  stackGap: "1.25rem",
  inset: "1rem",
};

/* ─── HOOKS ───────────────────────────────────────────────── */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatches(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return matches;
}

function useInView(ref, options = {}) {
  const { threshold = 0, rootMargin = "0px 0px 72px 0px" } =
    typeof options === "number" ? { threshold: options } : options;
  const [v, setV] = useState(false);
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setV(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold, rootMargin]);
  return v;
}

/* ─── PRIMITIVES ──────────────────────────────────────────── */
/** Outer node is observed (no transform/opacity) so IntersectionObserver geometry matches layout — inner node runs the animation. */
function Reveal({ children, delay = 0, y = 28, stretch = false, style: styleProp }) {
  const ref = useRef();
  const v = useInView(ref);
  const outerStyle = {
    ...(stretch
      ? {
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch",
          minHeight: 0,
          minWidth: 0,
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          boxSizing: "border-box",
        }
      : {}),
    ...(styleProp || {}),
  };
  const innerStyle = {
    opacity: v ? 1 : 0,
    transform: v ? "none" : `translateY(${y}px)`,
    transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
    minWidth: 0,
    width: "100%",
    boxSizing: "border-box",
    ...(stretch
      ? { flex: 1, display: "flex", flexDirection: "column", minHeight: 0, maxWidth: "100%", height: "100%" }
      : {}),
  };
  return (
    <div ref={ref} style={outerStyle}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
}

function Counter({ target, suffix = "", duration = 1600 }) {
  const isText = typeof target === "string";
  const numericTarget = typeof target === "number" ? target : 0;
  const [val, setVal] = useState(0);
  const ref = useRef();
  const v = useInView(ref, { threshold: 0, rootMargin: "0px 0px 48px 0px" });
  const useDecimals = !Number.isInteger(numericTarget);

  useEffect(() => {
    if (!v || isText) return;
    let s = 0;
    const tick = () => {
      s += 16;
      const p = Math.min(s / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      if (p >= 1) {
        setVal(numericTarget);
        return;
      }
      const next = useDecimals
        ? Math.round(ease * numericTarget * 10) / 10
        : Math.round(ease * numericTarget);
      setVal(next);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [v, numericTarget, useDecimals, duration, isText]);

  if (isText) {
    return (
      <span ref={ref}>
        {target}
        {suffix}
      </span>
    );
  }

  const display = useDecimals
    ? (Number.isInteger(val) ? val.toLocaleString() : val.toFixed(1))
    : val.toLocaleString();
  return <span ref={ref}>{display}{suffix}</span>;
}

function Tag({ children, color, bg, compact }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: compact ? "12px" : "11px",
        fontWeight: 700,
        letterSpacing: compact ? "0.08em" : "0.1em",
        textTransform: "uppercase",
        color: color || "#818cf8",
        background: bg || "rgba(99,102,241,0.1)",
        padding: compact ? "4px 10px" : "4px 12px",
        borderRadius: "100px",
        border: `1px solid ${color ? color + "40" : "rgba(99,102,241,0.28)"}`,
        boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset",
        ...(compact
          ? {
              maxWidth: "100%",
              boxSizing: "border-box",
              whiteSpace: "normal",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              textAlign: "left",
              lineHeight: 1.35,
            }
          : {}),
      }}
    >
      {children}
    </span>
  );
}

function Btn({ children, onClick, href, target, rel, variant = "ghost", dark, style: styleProp }) {
  const variants = {
    primary: { background: "linear-gradient(135deg,#6366f1 0%,#818cf8 100%)", border: "none", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)", padding: "14px 28px" },
    ghost: { background: "transparent", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`, color: dark ? "#e2e8f0" : "#374151", boxShadow: "none", padding: "13px 24px" },
  };
  const base = { display: "inline-flex", alignItems: "center", gap: "7px", borderRadius: "100px", fontSize: "15px", fontWeight: 600, cursor: "pointer", transition: "transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s cubic-bezier(.22,1,.36,1), filter 0.2s ease, background 0.2s, border-color 0.2s", textDecoration: "none", fontFamily: "inherit", letterSpacing: "-0.01em" };
  const s = { ...base, ...variants[variant], ...(styleProp || {}) };
  const he = (el, on) => {
    if (variant === "primary") { el.style.transform = on ? "translateY(-2px) scale(1.02)" : "none"; el.style.boxShadow = on ? "0 16px 48px rgba(99,102,241,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset" : "0 4px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"; el.style.filter = on ? "brightness(1.06) saturate(1.05)" : "none"; }
    else { el.style.transform = on ? "translateY(-1px)" : "none"; el.style.background = on ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent"; el.style.borderColor = on ? (dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.16)") : (dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"); }
  };
  if (href) return <a href={href} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)} style={s} onMouseEnter={e => he(e.currentTarget, true)} onMouseLeave={e => he(e.currentTarget, false)}>{children}</a>;
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

function TestimonialCard({ t, delay, dark, T, cardPadding, isMobile }) {
  const [hov, setHov] = useState(false);
  const fillRow = !isMobile;
  return (
    <Reveal delay={delay} stretch={fillRow} style={{ minWidth: 0, width: "100%" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: T.surface,
          border: `1px solid ${hov ? t.color + "4d" : T.border}`,
          borderRadius: CARD_LAYOUT.radius,
          padding: cardPadding,
          transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s, border-color 0.3s",
          transform: hov ? "translateY(-6px)" : "none",
          boxShadow: hov ? (dark ? "0 28px 76px rgba(0,0,0,0.48),0 0 0 1px " + t.color + "15" : "0 24px 70px rgba(0,0,0,0.1)") : "none",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          ...(fillRow ? { flex: 1, height: "100%" } : {}),
        }}
      >
        <div style={{ fontSize: "52px", lineHeight: 0.75, background: `linear-gradient(160deg,${t.color}aa,${t.color}22)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "Georgia,serif", marginBottom: "0.5rem", fontWeight: 700, userSelect: "none" }}>"</div>
        <p style={{ color: T.bodyB, fontSize: "16px", lineHeight: 1.86, margin: `0 0 ${CARD_LAYOUT.stackGap}`, fontWeight: 400, letterSpacing: "0.01em", flex: "1 1 auto", minHeight: 0 }}>{t.quote}</p>
        <div style={{ paddingTop: CARD_LAYOUT.stackGap, borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: t.color + "1a", border: `2px solid ${hov ? t.color + "55" : t.color + "33"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: t.color, flexShrink: 0, transition: "border-color 0.3s" }}>{t.initials}</div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: "15px", color: T.text, margin: "0 0 3px", letterSpacing: "-0.015em" }}>{t.name}</p>
              <p style={{ fontSize: "13px", color: T.textB, margin: "0 0 4px", lineHeight: 1.5 }}>{t.roleLine}</p>
              <p style={{ fontSize: "12px", color: T.body, margin: 0, lineHeight: 1.5 }}>{t.relation}</p>
            </div>
          </div>
          <a
            href={LINKEDIN_RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: CARD_LAYOUT.stackGap,
              fontSize: "13px",
              fontWeight: 600,
              color: t.color,
              textDecoration: "none",
              borderBottom: `1px solid ${hov ? t.color + "55" : "transparent"}`,
              paddingBottom: "1px",
              transition: "border-color 0.2s",
            }}
          >
            {`Verify on ${LINKEDIN} →`}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

const SW_IMG_H = 200;

function SelectedWorkImageBlock({ item, T, imageHeight = SW_IMG_H }) {
  if (item.images?.length) {
    return (
      <div
        style={{
          margin: `0 0 ${CARD_LAYOUT.gap}`,
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${T.border}`,
          background: "rgba(0,0,0,0.2)",
          flexShrink: 0,
          height: imageHeight,
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${item.images.length}, minmax(0, 1fr))`,
            gap: "2px",
            alignItems: "stretch",
            height: "100%",
            minWidth: 0,
            width: "100%",
          }}
        >
          {item.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${item.title} — screen ${i + 1}`}
              loading="lazy"
              style={{ width: "100%", height: "100%", minHeight: 0, minWidth: 0, objectFit: "cover", objectPosition: "top center", display: "block" }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (item.image) {
    return (
      <div
        style={{
          margin: `0 0 ${CARD_LAYOUT.gap}`,
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${T.border}`,
          background: "rgba(0,0,0,0.15)",
          flexShrink: 0,
          height: imageHeight,
          width: "100%",
          minWidth: 0,
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <img
          src={item.image}
          alt={`${item.title} — product preview`}
          loading="lazy"
          style={{ width: "100%", height: "100%", minHeight: 0, minWidth: 0, objectFit: "cover", objectPosition: "top center", display: "block" }}
        />
      </div>
    );
  }
  return null;
}

function SelectedWorkModal({ item, onClose, T, dark }) {
  if (!item?.modalImages?.length) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10050,
        background: "rgba(0,0,0,0.82)",
        display: "flex",
        flexDirection: "column",
        padding: "1.25rem",
        boxSizing: "border-box",
        minHeight: 0,
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          flex: "1 1 0",
          minHeight: 0,
          minWidth: 0,
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "min(1100px, 96vw)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 2,
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 0 6px 0",
              marginBottom: "4px",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                border: `1px solid ${T.border}`,
                background: T.surface,
                color: T.text,
                fontSize: "24px",
                lineHeight: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: dark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              ×
            </button>
          </div>
          {item.modalImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${item.title} — preview ${i + 1}`}
              style={{
                display: "block",
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                height: "auto",
                borderRadius: "14px",
                border: `1px solid ${T.border}`,
                marginTop: i === 0 ? 0 : "14px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SelectedWorkCard({ item, delay, dark, T, onModalOpen, imageHeight, cardPadding }) {
  const [hov, setHov] = useState(false);
  const hasModal = item.modalImages?.length > 0 && typeof onModalOpen === "function";
  return (
    <Reveal delay={delay} stretch>
      <article
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => {
          if (hasModal) onModalOpen(item);
        }}
        onKeyDown={e => {
          if (!hasModal) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onModalOpen(item);
          }
        }}
        role={hasModal ? "button" : undefined}
        tabIndex={hasModal ? 0 : undefined}
        aria-label={hasModal ? `Open ${item.title} preview` : undefined}
        style={{
          background: hov ? T.surface : "rgba(255,255,255,0.02)",
          border: `1px solid ${hov ? item.color + "4d" : T.border}`,
          borderRadius: CARD_LAYOUT.radius,
          padding: cardPadding,
          transition: "all 0.28s cubic-bezier(.22,1,.36,1)",
          transform: hov ? "translateY(-4px)" : "none",
          boxShadow: hov ? (dark ? "0 20px 56px rgba(0,0,0,0.35)" : "0 16px 48px rgba(0,0,0,0.08)") : "none",
          minHeight: 0,
          minWidth: 0,
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          cursor: hasModal ? "pointer" : "default",
          outline: "none",
          overflow: "hidden",
        }}
      >
        <SelectedWorkImageBlock item={item} T={T} imageHeight={imageHeight} />
        <h3 style={{ fontWeight: 800, fontSize: "1.3rem", color: T.text, margin: "0 0 0.5rem", letterSpacing: "-0.03em", lineHeight: 1.2 }}>{item.title}</h3>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: item.color,
            margin: `0 0 ${CARD_LAYOUT.stackGap}`,
            lineHeight: 1.5,
          }}
        >
          {item.tagline}
        </p>
        <p style={{ fontSize: "15px", color: T.body, margin: `0 0 ${CARD_LAYOUT.gap}`, lineHeight: 1.75, flex: 1, minHeight: 0, overflow: "auto" }}>{item.description}</p>
        {item.href ? (
          <div>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: 700,
                color: item.color,
                textDecoration: "none",
                borderBottom: `1px solid ${item.color}40`,
                paddingBottom: "2px",
                marginBottom: "0.25rem",
              }}
            >
              <span style={{ fontSize: "15px" }}>→</span> {item.cta}
            </a>
            <p style={{ fontSize: "12px", color: T.body, margin: "0.45rem 0 0" }}>({item.hrefLabel})</p>
          </div>
        ) : (
          <p style={{ fontSize: "13px", color: T.body, margin: 0, fontStyle: "italic", lineHeight: 1.55 }}>{item.status}</p>
        )}
      </article>
    </Reveal>
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

/* ─── HERO CARD ───────────────────────────────────────────── */
function HeroCard({ dark, fullWidth }) {
  const T = dark;
  const [float, setFloat] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        width: fullWidth ? "100%" : "300px",
        maxWidth: fullWidth ? "100%" : undefined,
        flexShrink: fullWidth ? 1 : 0,
        alignSelf: fullWidth ? "stretch" : undefined,
        boxSizing: "border-box",
      }}
      onMouseEnter={() => setFloat(true)}
      onMouseLeave={() => setFloat(false)}
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: fullWidth ? "min(380px, 100vw)" : "380px", height: fullWidth ? "min(380px, 100vw)" : "380px", background: "radial-gradient(circle,rgba(99,102,241,0.24) 0%,rgba(99,102,241,0.06) 45%,transparent 70%)", pointerEvents: "none", opacity: float ? 1 : 0.85, transition: "opacity 0.45s cubic-bezier(.22,1,.36,1)" }} />
      <div style={{ position: "relative", background: T ? "rgba(13,16,28,0.92)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)", border: `1px solid ${T ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.2)"}`, borderRadius: "28px", padding: fullWidth ? CARD_LAYOUT.padMob : CARD_LAYOUT.padDesk, boxShadow: float ? (T ? "0 44px 100px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.12), 0 0 0 1px rgba(255,255,255,0.06)" : "0 44px 100px rgba(0,0,0,0.14), 0 0 40px rgba(99,102,241,0.1)") : (T ? "0 36px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)" : "0 36px 90px rgba(0,0,0,0.12)"), transform: float ? "translateY(-6px)" : "none", transition: "transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ width: fullWidth ? "60px" : "68px", height: fullWidth ? "60px" : "68px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fullWidth ? "26px" : "30px", marginBottom: "1.25rem", boxShadow: "0 8px 28px rgba(99,102,241,0.45)" }}>🎨</div>
        <p style={{ fontSize: fullWidth ? "12px" : "11px", fontWeight: 700, letterSpacing: "0.12em", color: "#6366f1", textTransform: "uppercase", margin: "0 0 5px" }}>Senior Product Designer</p>
        <p style={{ fontSize: fullWidth ? "clamp(1.15rem,4.5vw,1.375rem)" : "22px", fontWeight: 900, color: T ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.035em", margin: "0 0 1.25rem", lineHeight: 1.15 }}>Himanshu Grover</p>
        <div style={{ height: "1px", background: T ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", margin: "0 0 1rem" }} />
        {[["6.8+ yrs", "Product Design"], ["30+ Products & Features Shipped to Production"], ["Thousands of users impacted globally"]].map(([v, l]) => (
          <div key={v} style={{ display: "flex", justifyContent: l ? "space-between" : "flex-start", alignItems: fullWidth ? "flex-start" : "center", flexWrap: "wrap", gap: fullWidth ? "6px" : "4px", padding: "8px 0", borderBottom: `1px solid ${T ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
            <span style={{ fontSize: fullWidth ? "13px" : "14px", fontWeight: 700, color: T ? "#e2e8f0" : "#1e293b", letterSpacing: "-0.01em", lineHeight: 1.35 }}>{v}</span>
            {l ? <span style={{ fontSize: "12px", color: T ? "#64748b" : "#94a3b8", textAlign: fullWidth ? "left" : "right" }}>{l}</span> : null}
          </div>
        ))}
        <div style={{ marginTop: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981", flexShrink: 0 }} />
          <span style={{ fontSize: fullWidth ? "14px" : "13px", color: "#10b981", fontWeight: 600, lineHeight: 1.35 }}>Available for opportunities</span>
        </div>
      </div>
    </div>
  );
}

/* ─── CASE CARD ───────────────────────────────────────────── */
function CaseCard({ cs, dark, surface, border, text, muted, onClick, compactTag }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, background: hov ? (dark ? "rgba(12,14,24,0.98)" : "#fff") : surface, border: `1px solid ${hov ? cs.color + "5c" : border}`, borderRadius: CARD_LAYOUT.radius, overflow: "hidden", cursor: "pointer", transition: "transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s cubic-bezier(.22,1,.36,1), border-color 0.35s, background 0.35s", transform: hov ? "translateY(-9px)" : "none", boxShadow: hov ? (dark ? `0 36px 88px rgba(0,0,0,0.58),0 0 0 1px ${cs.color}28,0 0 48px ${cs.glow}` : `0 28px 64px rgba(0,0,0,0.12),0 0 0 1px ${cs.color}25`) : "none" }}>
      {/* Thumbnail */}
      <div style={{ height: "200px", flexShrink: 0, background: `linear-gradient(135deg,${cs.color}22 0%,${cs.color}08 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `1px solid ${cs.color}18`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle,${cs.color}18 1px,transparent 1px)`, backgroundSize: "28px 28px", opacity: hov ? 1 : 0.5, transition: "opacity 0.45s cubic-bezier(.22,1,.36,1)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: hov ? "3px" : "0px", background: `linear-gradient(90deg,transparent,${cs.accent},${cs.color},transparent)`, opacity: 0.85, transition: "height 0.35s cubic-bezier(.22,1,.36,1)" }} />
        <div style={{ fontSize: "60px", position: "relative", zIndex: 1, filter: `drop-shadow(0 8px 24px ${cs.glow})`, transform: hov ? "scale(1.04)" : "none", transition: "transform 0.4s cubic-bezier(.22,1,.36,1)" }}>{cs.icon}</div>
        {compactTag ? (
          <div
            style={{
              position: "absolute",
              top: CARD_LAYOUT.inset,
              left: CARD_LAYOUT.inset,
              right: CARD_LAYOUT.inset,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              minWidth: 0,
              pointerEvents: "none",
            }}
          >
            <div style={{ maxWidth: "100%", minWidth: 0, pointerEvents: "auto" }}>
              <Tag color={cs.accent} bg={cs.color + "18"} compact={compactTag}>{cs.tag}</Tag>
            </div>
            <div
              style={{
                maxWidth: "100%",
                minWidth: 0,
                boxSizing: "border-box",
                background: dark ? "rgba(8,10,18,0.75)" : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${cs.color}40`,
                borderRadius: "100px",
                padding: "5px 13px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                pointerEvents: "auto",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 700, color: cs.accent, letterSpacing: "0.02em", lineHeight: 1.35, display: "block", overflowWrap: "break-word", wordBreak: "break-word" }}>{cs.metric}</span>
            </div>
          </div>
        ) : (
          <>
            <div style={{ position: "absolute", top: CARD_LAYOUT.inset, left: CARD_LAYOUT.inset, zIndex: 2 }}>
              <Tag color={cs.accent} bg={cs.color + "18"} compact={compactTag}>{cs.tag}</Tag>
            </div>
            <div style={{ position: "absolute", top: CARD_LAYOUT.inset, right: CARD_LAYOUT.inset, zIndex: 2, background: dark ? "rgba(8,10,18,0.75)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", border: `1px solid ${cs.color}40`, borderRadius: "100px", padding: "5px 13px", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: cs.accent, letterSpacing: "0.02em" }}>{cs.metric}</span>
            </div>
          </>
        )}
      </div>
      {/* Body */}
      <div style={{ padding: compactTag ? CARD_LAYOUT.padMob : CARD_LAYOUT.padDesk, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <h3 style={{ fontWeight: 800, fontSize: "20px", color: text, margin: "0 0 0.5rem", lineHeight: 1.25, letterSpacing: "-0.028em" }}>{cs.title}</h3>
        <p style={{ color: muted, fontSize: "15px", lineHeight: 1.78, margin: 0, fontWeight: 400, letterSpacing: "0.01em" }}>{cs.tagline}</p>
        <div
          style={{
            display: "flex",
            flexDirection: compactTag ? "column" : "row",
            alignItems: compactTag ? "stretch" : "center",
            justifyContent: compactTag ? "flex-start" : "space-between",
            gap: compactTag ? "0.65rem" : "0.75rem",
            marginTop: "auto",
            paddingTop: CARD_LAYOUT.stackGap,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: cs.accent,
              fontWeight: 700,
              letterSpacing: "0.02em",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              whiteSpace: compactTag ? "nowrap" : undefined,
            }}
          >
            View Case Study{" "}
            <span style={{ display: "inline-block", transform: hov ? "translateX(4px)" : "none", transition: "transform 0.3s cubic-bezier(.22,1,.36,1)", filter: hov ? "brightness(1.1)" : "none" }}>→</span>
          </span>
          <span
            style={{
              fontSize: "12px",
              color: dark ? "#475569" : "#94a3b8",
              ...(compactTag
                ? {
                    lineHeight: 1.55,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    minWidth: 0,
                  }
                : {}),
            }}
          >
            {cs.users}
          </span>
        </div>
      </div>
    </div>
  );
}

const SKILLS_CARD_ACCENT = "#6366f1";

function SkillsCategoryCard({ c, dark, T, cardPad, isMobile }) {
  const [hov, setHov] = useState(false);
  const baseShadow = dark ? "0 8px 28px rgba(0,0,0,0.16)" : "0 2px 16px rgba(0,0,0,0.04)";
  const hoverShadow = dark
    ? `0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px ${SKILLS_CARD_ACCENT}30, 0 0 40px ${SKILLS_CARD_ACCENT}14`
    : `0 20px 44px rgba(15,23,42,0.1), 0 10px 28px rgba(99,102,241,0.12), 0 0 0 1px ${SKILLS_CARD_ACCENT}22`;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov && !dark ? "#fafbff" : T.surface,
        border: `1px solid ${hov ? `${SKILLS_CARD_ACCENT}40` : T.border}`,
        borderRadius: CARD_LAYOUT.radius,
        padding: cardPad,
        minHeight: 0,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        boxShadow: hov ? hoverShadow : baseShadow,
        transition: "transform 0.38s cubic-bezier(.22,1,.36,1), box-shadow 0.38s cubic-bezier(.22,1,.36,1), border-color 0.32s ease, background 0.32s ease",
        transform: hov ? "translateY(-7px)" : "none",
        ...(!isMobile ? { flex: 1, height: "100%", display: "flex", flexDirection: "column" } : {}),
      }}
    >
      <p style={{ fontSize: isMobile ? "11px" : "12px", fontWeight: 800, letterSpacing: "0.1em", color: SKILLS_CARD_ACCENT, textTransform: "uppercase", margin: "0 0 0.5rem", flexShrink: 0 }}>{c.label}</p>
      <p style={{ fontSize: isMobile ? "14px" : "15px", color: T.textB, margin: 0, lineHeight: isMobile ? 1.68 : 1.72, ...(!isMobile ? { flex: 1, minHeight: 0 } : {}) }}>{c.line}</p>
    </div>
  );
}

function DesignPrincipleCard({ p, dark, T, isMobile }) {
  const [hov, setHov] = useState(false);
  const accentTopSolid = hov ? "#818cf8" : "#6366f1";
  const baseShadow = dark ? "0 8px 32px rgba(0,0,0,0.2)" : "0 4px 24px rgba(0,0,0,0.04)";
  const hoverShadow = dark
    ? `0 14px 40px rgba(0,0,0,0.35), 0 0 0 1px ${SKILLS_CARD_ACCENT}28`
    : `0 14px 36px rgba(99,102,241,0.12), 0 6px 20px rgba(0,0,0,0.06)`;
  const pad = isMobile ? "clamp(1.5rem, 5vw, 2.5rem)" : "2.5rem";
  const bodyColor = T.bodyB;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: hov && !dark ? "#fafbff" : T.surface,
        border: `1px solid ${hov ? `${SKILLS_CARD_ACCENT}45` : T.border}`,
        borderTop: `3px solid ${accentTopSolid}`,
        borderRadius: CARD_LAYOUT.radius,
        padding: pad,
        boxSizing: "border-box",
        boxShadow: hov ? hoverShadow : baseShadow,
        transition: "transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s cubic-bezier(.22,1,.36,1), border-color 0.28s ease, border-top-color 0.28s ease, background 0.28s ease",
        transform: hov ? "translateY(-4px)" : "none",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: isMobile ? "-0.05em" : "0.02em",
          right: isMobile ? "-0.12em" : "0.08em",
          fontSize: isMobile ? "clamp(72px, 22vw, 120px)" : "120px",
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: "-0.06em",
          color: SKILLS_CARD_ACCENT,
          opacity: dark ? 0.08 : 0.06,
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {p.n}
      </span>
      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 900,
            letterSpacing: "0.18em",
            color: SKILLS_CARD_ACCENT,
            textTransform: "uppercase",
            margin: "0 0 1rem",
          }}
        >
          Principle {p.n}
        </p>
        <p style={{ fontSize: "20px", fontWeight: 800, color: T.text, margin: "0 0 1rem", letterSpacing: "-0.022em", lineHeight: 1.3 }}>{p.title}</p>
        <p style={{ fontSize: "15px", color: bodyColor, margin: 0, lineHeight: 1.8, fontWeight: 400 }}>{p.body}</p>
      </div>
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────────────────── */
export default function Portfolio() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => readStoredThemeIsDark());
  const [shrink, setShrink] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [workModalItem, setWorkModalItem] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const sectionPad = isMobile ? "1.25rem" : "2.5rem";
  const cardPad = isMobile ? CARD_LAYOUT.padMob : CARD_LAYOUT.padDesk;
  /** One observer for the whole stats grid so every column (incl. tall “6+ Industries”) reveals together. */
  const trustStatsGridRef = useRef(null);
  const trustStatsVisible = useInView(trustStatsGridRef, { threshold: 0, rootMargin: "0px 0px 25% 0px" });

  useEffect(() => {
    if (!isMobile) setNavOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!navOpen || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [navOpen, isMobile]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = e => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  useEffect(() => {
    setMounted(true);
    const fn = () => setShrink(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!workModalItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = e => e.key === "Escape" && setWorkModalItem(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [workModalItem]);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const T = {
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

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif", minHeight: "100vh", transition: "background 0.4s,color 0.4s", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
      <style>
        {`
          .portfolio-process-steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          @media (min-width: 640px) {
            .portfolio-process-steps {
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            }
          }
        `}
      </style>
      <ScrollBar />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: shrink ? `0.85rem ${sectionPad}` : `1.4rem ${sectionPad}`, background: shrink ? (dark ? "rgba(7,9,15,0.9)" : "rgba(247,248,252,0.9)") : "transparent", backdropFilter: shrink ? "blur(24px)" : "none", borderBottom: shrink ? `1px solid ${T.border}` : "none", transition: "all 0.35s cubic-bezier(.22,1,.36,1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 900, fontSize: "19px", letterSpacing: "-0.05em", cursor: "pointer", color: T.text }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span style={{ color: "#6366f1" }}>H</span>G.
        </span>
        <div style={{ display: "flex", gap: isMobile ? "6px" : "2px", alignItems: "center" }}>
          {!isMobile &&
            NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", color: T.body, fontSize: "14px", fontWeight: 500, cursor: "pointer", padding: "7px 13px", borderRadius: "10px", transition: "all 0.18s", fontFamily: "inherit", letterSpacing: "-0.01em" }}
                onMouseEnter={e => { e.target.style.color = T.text; e.target.style.background = T.subtle; }}
                onMouseLeave={e => { e.target.style.color = T.body; e.target.style.background = "transparent"; }}>
                {l}
              </button>
            ))}
          {isMobile && (
            <button
              type="button"
              aria-expanded={navOpen}
              aria-label={navOpen ? "Close menu" : "Open menu"}
              onClick={() => setNavOpen(o => !o)}
              style={{
                background: T.subtle,
                border: `1px solid ${T.border}`,
                color: T.text,
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                fontFamily: "inherit",
                lineHeight: 1,
              }}
            >
              {navOpen ? "×" : "☰"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setDark(prev => {
                const next = !prev;
                persistThemePreference(next);
                return next;
              });
            }}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{ marginLeft: isMobile ? "4px" : "8px", background: T.subtle, border: `1px solid ${T.border}`, color: T.body, width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "16px", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          >
            {dark ? "🌙" : "☀"}
          </button>
        </div>
      </nav>
      {isMobile && navOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 190,
              background: "rgba(0,0,0,0.45)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: shrink ? "56px" : "68px",
              left: 0,
              right: 0,
              zIndex: 195,
              background: dark ? "rgba(7,9,15,0.98)" : "rgba(247,248,252,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: `1px solid ${T.border}`,
              padding: "0.75rem 1rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              boxShadow: dark ? "0 24px 48px rgba(0,0,0,0.45)" : "0 16px 40px rgba(0,0,0,0.08)",
            }}
          >
            {NAV_LINKS.map(l => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  scrollTo(l.toLowerCase());
                  setNavOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: T.text,
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  textAlign: "left",
                  fontFamily: "inherit",
                  letterSpacing: "-0.01em",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          padding: isMobile ? `7.5rem ${sectionPad} 3.5rem` : `9.25rem ${sectionPad} 5.5rem`,
          maxWidth: "1280px",
          margin: "0 auto",
          gap: isMobile ? "2.5rem" : "5.25rem",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: "18%", left: "6%", width: "540px", height: "540px", background: "radial-gradient(circle,rgba(99,102,241,0.14) 0%,rgba(99,102,241,0.04) 38%,transparent 68%)", pointerEvents: "none", filter: "blur(56px)" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "4%", width: "420px", height: "420px", background: "radial-gradient(circle,rgba(167,139,250,0.1) 0%,rgba(96,165,250,0.04) 40%,transparent 70%)", pointerEvents: "none", filter: "blur(64px)" }} />

        {/* Copy */}
        <div style={{ flex: isMobile ? "1 1 auto" : "1 1 460px", minWidth: 0, position: "relative", zIndex: 1, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(40px)", transition: "opacity 1s cubic-bezier(.22,1,.36,1) 0.1s,transform 1s cubic-bezier(.22,1,.36,1) 0.1s" }}>
          <div
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "10px" : "8px",
              width: isMobile ? "100%" : "fit-content",
              maxWidth: "100%",
              boxSizing: "border-box",
              background: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.07)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "100px",
              padding: isMobile ? "11px 18px 11px 14px" : "6px 14px 6px 8px",
              marginBottom: "2.25rem",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
                flexShrink: 0,
                ...(isMobile ? { marginTop: "0.32em" } : {}),
              }}
            />
            <span
              style={{
                flex: isMobile ? "1" : undefined,
                minWidth: 0,
                fontSize: isMobile ? "clamp(13px, 3.6vw, 14px)" : "13px",
                color: dark ? "#a5b4fc" : "#4338ca",
                fontWeight: 600,
                lineHeight: isMobile ? 1.5 : 1.35,
                letterSpacing: isMobile ? "-0.02em" : undefined,
              }}
            >
              Available for senior roles &amp; remote work
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.4rem,6vw,6.5rem)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.055em", margin: "0 0 0.15rem", color: T.text, textRendering: "geometricPrecision", overflowWrap: "anywhere", wordBreak: "break-word" }}>Himanshu</h1>
          <h1 style={{ fontSize: "clamp(2.4rem,6vw,6.5rem)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.055em", margin: "0 0 1.65rem", background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", overflowWrap: "anywhere", wordBreak: "break-word" }}>Grover.</h1>

          <p style={{ fontSize: "clamp(1.1rem,2.2vw,1.35rem)", fontWeight: 800, color: T.bodyB, letterSpacing: "-0.028em", margin: "0 0 1.15rem", lineHeight: 1.4 }}>
            Senior Product Designer · UI/UX · AI Products
          </p>
          <p style={{ fontSize: "clamp(1.05rem,1.8vw,1.15rem)", lineHeight: 1.92, color: T.body, margin: "0 0 2.85rem", fontWeight: 400, letterSpacing: "0.01em" }}>
            I design products people love and businesses grow with. 6.8+ years building SaaS tools, enterprise platforms, marketplaces, and AI-powered experiences — always with measurable outcomes.
          </p>

          <div style={{ display: "flex", gap: isMobile ? "0.65rem" : "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
            <Btn variant="primary" onClick={() => scrollTo("work")} dark={dark} style={isMobile ? { padding: "15px 22px", fontSize: "16px" } : undefined}>View Case Studies →</Btn>
            <Btn variant="ghost" href="/UXD_Himanshu_Grover_Resume.pdf" target="_blank" dark={dark} style={isMobile ? { padding: "14px 20px", fontSize: "16px" } : undefined}>Download Resume</Btn>
            <Btn variant="ghost" href="mailto:himanshugrover2710@gmail.com" dark={dark} style={isMobile ? { padding: "14px 20px", fontSize: "16px" } : undefined}>Let's Talk</Btn>
          </div>
        </div>

        {/* Card */}
        <div style={{ flex: isMobile ? "1 1 auto" : "0 0 auto", width: isMobile ? "100%" : undefined, minWidth: 0, zIndex: 1, opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(28px) scale(0.96)", transition: "opacity 1.1s cubic-bezier(.22,1,.36,1) 0.35s,transform 1.1s cubic-bezier(.22,1,.36,1) 0.35s" }}>
          <HeroCard dark={dark} fullWidth={isMobile} />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: `3.75rem ${sectionPad}`, background: T.bg2 }}>
        <div
          ref={trustStatsGridRef}
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(auto-fit,minmax(200px,1fr))",
            gap: isMobile ? "2.35rem" : "2.5rem",
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{ minWidth: 0, maxWidth: "100%" }}>
              <div
                style={{
                  textAlign: "center",
                  minWidth: 0,
                  maxWidth: "100%",
                  opacity: trustStatsVisible ? 1 : 0,
                  transform: trustStatsVisible ? "none" : "translateY(28px)",
                  transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${i * 0.07}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${i * 0.07}s`,
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "clamp(2rem, 7vw, 2.85rem)" : "clamp(2.6rem,4.5vw,3.4rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.045em",
                    lineHeight: isMobile ? 1.12 : 1,
                    background: "linear-gradient(135deg,#6366f1,#a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "6px",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    padding: isMobile ? "0 2px" : 0,
                    boxSizing: "border-box",
                  }}
                >
                  <Counter target={s.value} suffix={s.suffix} />
                  <span style={{ fontSize: "52%", fontWeight: 700, marginLeft: "4px", whiteSpace: "normal" }}>{s.unit}</span>
                </div>
                <p
                  style={{
                    color: T.body,
                    fontSize: "14px",
                    fontWeight: 500,
                    margin: 0,
                    lineHeight: isMobile ? 1.65 : undefined,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    padding: isMobile ? "0 2px" : 0,
                    boxSizing: "border-box",
                  }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section id="work" style={{ padding: `7rem ${sectionPad}`, maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <Eyebrow label="Featured Work" />
          <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.08 }}>Case Studies</h2>
          <p style={{ fontSize: "18px", color: T.body, lineHeight: 1.78, marginBottom: "3.5rem", fontWeight: 400 }}>Selected projects where design directly created measurable business and user impact.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(2,minmax(0,1fr))", gap: CARD_LAYOUT.gap, alignItems: "stretch" }}>
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 0.07} stretch>
              <CaseCard cs={cs} dark={dark} surface={T.surface} border={T.border} text={T.text} muted={T.body} compactTag={isMobile} onClick={() => navigate(`/case-study/${cs.id}`)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── DESIGN PRINCIPLES (nav: Process → #process) ── */}
      <section id="process" style={{ padding: `7rem ${sectionPad}`, maxWidth: "1280px", margin: "0 auto", background: T.bg2, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <Reveal>
          <Eyebrow label="How I Think" />
          <h2 style={{ fontSize: "clamp(2.1rem,4.5vw,3.1rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.1 }}>Design Principles That Guide My Work</h2>
          <p style={{ fontSize: "18px", color: T.body, lineHeight: 1.78, margin: "0 0 2.75rem", fontWeight: 400 }}>
            Not a process. A point of view — built from 6.8 years of shipping real products across EdTech, logistics, cybersecurity, and enterprise SaaS.
          </p>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          {DESIGN_PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.n}
              delay={0.04 + i * 0.05}
              style={{
                minWidth: 0,
                width: "100%",
                ...(!isMobile && i === 0 ? { gridColumn: "1 / -1" } : {}),
              }}
            >
              <DesignPrincipleCard p={p} dark={dark} T={T} isMobile={isMobile} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SELECTED WORK (BEYOND CASE STUDIES) — 2×2 grid on large screens ── */}
      <section style={{ padding: `5rem ${sectionPad} 7rem`, background: T.bg2 }}>
        <style>
          {`
          .selected-work-card-grid {
            display: grid;
            gap: 1.25rem;
            align-items: stretch;
            width: 100%;
            min-width: 0;
            grid-template-columns: minmax(0, 1fr);
            grid-auto-rows: auto;
            isolation: isolate;
          }
          @media (min-width: 768px) {
            .selected-work-card-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .selected-work-card-grid > * {
              min-width: 0;
              max-width: 100%;
            }
          }
        `}
        </style>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <Eyebrow label="Selected Work" />
            <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.9rem", lineHeight: 1.08 }}>Beyond Case Studies</h2>
            <p style={{ fontSize: "18px", color: T.body, lineHeight: 1.78, margin: "0 0 2.75rem" }}>
              {`Live products, real clients, and design exercises — spanning eCommerce, logistics SaaS, mobile, and consumer platforms.`}
            </p>
          </Reveal>
          <div className="selected-work-card-grid" style={{ boxSizing: "border-box" }}>
            {SELECTED_WORK.map((item, i) => (
              <SelectedWorkCard key={item.title} item={item} delay={i * 0.05} dark={dark} T={T} onModalOpen={setWorkModalItem} imageHeight={isMobile ? 240 : SW_IMG_H} cardPadding={cardPad} />
            ))}
          </div>
        </div>
      </section>

      {/*
      ── PROCESS ──
      <section id="process" style={{ padding: "7rem 2.5rem", maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <Eyebrow label="Design Process" />
          <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.08 }}>How I Work</h2>
          <p style={{ fontSize: "18px", color: T.body, maxWidth: "520px", lineHeight: 1.78, marginBottom: "3.5rem" }}>Research-driven. Outcome-oriented. Built for velocity without sacrificing craft.</p>
        </Reveal>
        <div className="portfolio-process-steps" style={{ display: "grid", gap: "1rem" }}>
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
      */}

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: `5rem ${sectionPad} 7rem`, background: T.bg2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Reveal>
            <Eyebrow label="Skills & Tools" />
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.04em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.1 }}>What I Work With</h2>
            <p style={{ fontSize: "17px", color: T.body, lineHeight: 1.82, margin: "0 0 2.5rem", fontWeight: 400 }}>
              {`6.8 years across EdTech, logistics, cybersecurity, and enterprise SaaS — these are the tools and skills I use daily, and the ones I've shipped real products with.`}
            </p>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(auto-fit, minmax(300px, 1fr))",
              gap: CARD_LAYOUT.gap,
              alignItems: isMobile ? "start" : "stretch",
            }}
          >
            {SKILLS_CATEGORIES.map((c, i) => (
              <Reveal key={c.label} delay={0.04 + i * 0.04} stretch={!isMobile} style={{ minWidth: 0, width: "100%" }}>
                <SkillsCategoryCard c={c} dark={dark} T={T} cardPad={cardPad} isMobile={isMobile} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: `7rem ${sectionPad}`, maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <Eyebrow label="Testimonials" />
          <h2 style={{ fontSize: "clamp(2.4rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.045em", color: T.text, margin: "0 0 0.8rem", lineHeight: 1.08 }}>What People Say</h2>
          <p style={{ fontSize: "18px", color: T.body, lineHeight: 1.78, marginBottom: "3.5rem" }}>
            {`Recommendations from managers and teammates — each with a one-click path to verify on ${LINKEDIN}.`}
          </p>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(auto-fit,minmax(300px,1fr))",
            gap: CARD_LAYOUT.gap,
            alignItems: isMobile ? "start" : "stretch",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 0.08} dark={dark} T={T} cardPadding={cardPad} isMobile={isMobile} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: `5rem ${sectionPad} 7rem`, background: T.bg2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "minmax(0, 1.7fr) minmax(0, 1fr)", gap: isMobile ? "2.5rem" : "6rem", alignItems: isMobile ? "start" : "center" }}>
          <Reveal>
            <Eyebrow label="About Me" />
            <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.1rem)", fontWeight: 900, letterSpacing: "-0.04em", color: T.text, margin: "0 0 1.5rem", lineHeight: 1.1 }}>
              I turn complex, ambiguous product problems into clear, structured experiences.
            </h2>
            <p style={{ fontSize: "17px", color: T.bodyB, lineHeight: 1.9, marginBottom: "1.2rem", fontWeight: 400, letterSpacing: "0.01em" }}>
              {`I'm a Senior Product Designer with 6.8 years across EdTech, logistics, cybersecurity, and enterprise SaaS. I've designed ebook platforms for global publishers like Pearson and HMH, rebuilt fraud intelligence dashboards for enterprise security teams, and shipped aggregator tools used by thousands of logistics operators daily.`}
            </p>
            <p style={{ fontSize: "16px", color: T.body, lineHeight: 1.9, marginBottom: "1.2rem", letterSpacing: "0.01em" }}>
              {`What makes me different is where I sit. I understand engineering constraints well enough to have implemented my own designs in React and HTML/CSS. I understand accessibility deeply enough to have designed to WCAG 2.1 standards for 3.5 years without shortcuts. And I understand business well enough to frame every design decision around outcomes, not opinions.`}
            </p>
            <p style={{ fontSize: "16px", color: T.body, lineHeight: 1.9, marginBottom: "2.15rem", letterSpacing: "0.01em" }}>
              {`I work best in environments where the problem is genuinely hard — where there's no obvious answer, no clean data, and no competitor to copy. That's where structured thinking and strong design instincts matter most.`}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))", gap: isMobile ? "1.05rem" : "0.95rem" }}>
              {[
                "WCAG 2.1 accessibility standard",
                "Research-driven without perfect data",
                "Engineering-native collaborator",
                "Systems thinker across complex products",
                "Multi-role UX for enterprise platforms",
                "Shipped across 6+ industries globally",
              ].map(x => (
                <div key={x} style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: "10px", minWidth: 0 }}>
                  <span style={{ color: "#6366f1", fontWeight: 900, fontSize: "14px", flexShrink: 0, lineHeight: 1.45, ...(isMobile ? { marginTop: "0.2em" } : {}) }}>→</span>
                  <span style={{ fontSize: "15px", color: T.bodyB, fontWeight: 500, minWidth: 0, lineHeight: 1.55, ...(isMobile ? { overflowWrap: "break-word", wordBreak: "break-word" } : {}) }}>{x}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: CARD_LAYOUT.radius, padding: cardPad, boxShadow: dark ? "0 28px 90px rgba(0,0,0,0.45),0 0 0 1px rgba(99,102,241,0.08)" : "0 24px 80px rgba(0,0,0,0.07),0 0 0 1px rgba(99,102,241,0.06)" }}>
              <div style={{ width: "76px", height: "76px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px", marginBottom: "1.35rem", boxShadow: "0 10px 32px rgba(99,102,241,0.45)" }}>🎨</div>
              <p style={{ fontWeight: 900, fontSize: "21px", color: T.text, margin: "0 0 4px", letterSpacing: "-0.03em" }}>Himanshu Grover</p>
              <p style={{ fontSize: "14px", color: "#6366f1", fontWeight: 600, margin: "0 0 1.5rem" }}>Senior Product Designer</p>
              {[["Location", "Delhi, India · Remote OK"], ["Availability", "Open to opportunities"], ["Focus", "EdTech · Logistics · Cybersecurity · Enterprise SaaS"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: "13px", color: T.body, fontWeight: 500 }}>{k}</span>
                  <span style={{ fontSize: "13px", color: T.textB, fontWeight: 600, textAlign: "right", maxWidth: "58%" }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: `8.5rem ${sectionPad}`, maxWidth: "880px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", width: "760px", height: "520px", background: "radial-gradient(ellipse at center,rgba(99,102,241,0.14) 0%,rgba(167,139,250,0.05) 42%,transparent 72%)", pointerEvents: "none", filter: "blur(2px)" }} />
        <Reveal>
          <Eyebrow label="Let's Connect" center />
          <h2 style={{ fontSize: "clamp(2rem,5vw,4.5rem)", fontWeight: 900, letterSpacing: "-0.055em", color: T.text, margin: "0 0 1.2rem", lineHeight: 1.02, overflowWrap: "anywhere" }}>
            Let's build products<br />
            <span style={{ background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>users love.</span>
          </h2>
          <p style={{ fontSize: "18px", color: T.body, lineHeight: 1.85, margin: "0 auto 2.9rem", fontWeight: 400, letterSpacing: "0.01em", ...(isMobile ? { padding: "0 4px", boxSizing: "border-box" } : {}) }}>
            Open to senior product design, UI/UX, and fully remote roles worldwide.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.85rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "2.1rem",
              ...(isMobile ? { flexDirection: "column", alignItems: "stretch", width: "100%", maxWidth: "100%", boxSizing: "border-box", padding: "0 2px" } : {}),
            }}
          >
            <Btn
              variant="primary"
              href="mailto:himanshugrover2710@gmail.com"
              dark={dark}
              style={
                isMobile
                  ? {
                      width: "100%",
                      maxWidth: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "16px 18px",
                      fontSize: "clamp(12.5px, 3.4vw, 15px)",
                      lineHeight: 1.35,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      boxSizing: "border-box",
                    }
                  : undefined
              }
            >
              himanshugrover2710@gmail.com{isMobile ? "\u00a0" : " "}→
            </Btn>
            <Btn
              variant="ghost"
              dark={dark}
              style={isMobile ? { width: "100%", maxWidth: "100%", justifyContent: "center", boxSizing: "border-box", padding: "14px 18px" } : undefined}
            >
              {`View ${LINKEDIN}`}
            </Btn>
          </div>
          <p style={{ color: T.body, fontSize: "15px", fontWeight: 500, margin: 0, ...(isMobile ? { lineHeight: 1.5, padding: "0 4px" } : {}) }}>📞 +91 97116 92602</p>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: `1.75rem ${sectionPad}`, background: T.bg2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontWeight: 900, fontSize: "17px", letterSpacing: "-0.05em", color: T.text }}><span style={{ color: "#6366f1" }}>H</span>G.</span>
        <span style={{ color: T.body, fontSize: "13px" }}>© 2026 Himanshu Grover — Designed with intention.</span>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {["Work", "Process", "About", "Contact"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", color: T.body, fontSize: "13px", cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = T.text} onMouseLeave={e => e.target.style.color = T.body}>{l}</button>
          ))}
        </div>
      </footer>

      {workModalItem ? <SelectedWorkModal item={workModalItem} onClose={() => setWorkModalItem(null)} T={T} dark={dark} /> : null}
    </div>
  );
}
