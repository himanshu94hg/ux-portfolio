/** Active case studies (grid + detail pages). */
export const CASE_STUDIES = [
  {
    id: 1, tag: "Sustainability · Enterprise SaaS · Analytics", title: "Carbon Footprint Management Platform",
    tagline: "Designing a sustainability intelligence platform that helps enterprises centralize emissions data, track reduction initiatives, and simplify sustainability reporting.",
    color: "#6366f1", accent: "#818cf8", glow: "rgba(99,102,241,0.18)",
    metric: "ESG & reporting", metricSub: "live view",
    users: "Dashboard · Analytics · Strategy · Reporting",
    icon: "◈",
    challenge: "Teams relied on spreadsheets, disconnected systems, and manual reporting, making it difficult to trust data or act quickly.",
    constraints: "Multi-region reporting · Scope 1–3 coverage · Disparate data sources · Executive-ready dashboards · Enterprise security",
    role: "Led end-to-end product design across discovery, IA, dashboards, reporting flows, and scalable design systems.",
    process: ["Discovery with sustainability, data, and finance stakeholders", "Information architecture: emissions, initiatives, and reporting", "Dashboard and executive-ready reporting patterns", "Design system, developer handoff, and iteration with pilot teams"],
    metrics: ["Unified reporting workflows", "Faster executive reporting preparation", "Better visibility into reduction initiatives", "Improved confidence in sustainability data"],
    outcome: "A unified surface replaced fragmented tools — so teams could centralize data, move faster on reporting, and govern reduction work with more trust.",
    learnings: "Sustainability UX is a trust product: clarity, consistency, and traceability matter more than flashy visuals."
  },
  {
    id: 2, tag: "AI · Cybersecurity · Fintech · SaaS", title: "Apate AI — Scam Intelligence & Fraud Prevention Platform",
    tagline: "Redesigning a fragmented internal prototype into a structured, enterprise-ready operations platform for fraud and risk teams.",
    color: "#10b981", accent: "#34d399", glow: "rgba(16,185,129,0.15)",
    metric: "Enterprise demo-ready", metricSub: "SSO & theming",
    users: "Command / Control / Analyst / Investigation",
    icon: "⬡",
    challenge: "The product was a working prototype, not a product: Metabase iframes, no IA, and missing Control, investigation workflows, and credible enterprise UX for demos and clients.",
    constraints: "Multi-tenant JWT SSO · Replacing embedded dashboards with custom UI · ML-backed KPIs · Real bot allocation and mission payloads",
    role: "UI/UX, IA, and frontend collaboration — restructured the platform around Command, Control, analyst workflows, and guided investigation, then shipped with engineering.",
    process: [
      "Framed the problem: raw data, iframe dashboards, and missing operational layers",
      "Restructured around four operational pillars and a before/after product surface",
      "Replaced Metabase with branded theming, unified filters/KPIs, and Insight Hub V2",
      "Shipped allocation and CSV controls with validation, plus JWT tenant-aware theming",
    ],
    metrics: [
      "Prototype → enterprise demo-ready positioning (stakeholder feedback; metrics not formally tracked)",
      "Fewer bot deployment errors after allocation and slider fixes",
      "Australian bank clients onboarded on the redesigned platform",
    ],
    outcome:
      "Turned a stitched-together internal tool into a coherent enterprise operations platform: credible in sales conversations, with guided workflows and foundations for future modules.",
    learnings: "In intelligence products, data consistency, guided paths, and branded UI matter as much as the ML — and tight UX in allocation prevents real mission failures.",
  },
];

export function getCaseStudyById(id) {
  return CASE_STUDIES.find(s => s.id === Number(id));
}
