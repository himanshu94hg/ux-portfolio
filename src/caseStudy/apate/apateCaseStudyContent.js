export const ACCENT = "#10b981";
export const ACCENT_DIM = "#34d399";

export const hero = {
  brand: "APATE AI",
  productLine: "Scam Intelligence & Fraud Prevention Platform",
  tagline: "Redesigning a fragmented internal prototype into a structured, enterprise-ready operations platform for fraud and risk teams.",
  oneLine:
    "Apate AI had powerful ML intelligence behind it — but the front end was a collection of Metabase iframes stitched together with no coherent product experience. I redesigned and restructured it from the ground up.",
  role: "UI/UX Designer · Product Thinking · Frontend Collaboration",
  company: "Optimal Virtual Employee · Client: Apate AI",
  industry: "Cybersecurity · AI · Enterprise SaaS",
  scope: "UX Redesign · UI Design · Information Architecture · Prototyping · Frontend Implementation",
  duration: "Multi-phase Engagement",
  tools: "Figma · FigJam · React · HTML/CSS",
};

export const problem = {
  title: "The problem",
  intro:
    "The original product was essentially a working prototype — not a product. Three core issues defined the problem:",
  issues: [
    {
      title: "1. Raw data, no structure",
      body:
        "The existing screens — Dashboard, Alerts, Conversations — displayed raw data with no hierarchy, no filtering, and no information architecture. Users had to interpret everything themselves.",
    },
    {
      title: "2. Metabase iframe problem",
      body:
        "All dashboards were built inside Metabase iframes. This created a generic, template-like visual experience with no brand consistency, unpredictable interactions, and no guided workflows. Enterprise clients and investors perceived it as \"stitched together.\"",
    },
    {
      title: "3. Missing product entirely",
      body:
        "There was no Control section. No bot status page. No mission creation. No bot assignment. No investigation workflow. The first version had a Dashboard, Alerts page, and Conversations page — and nothing else.",
    },
  ],
};

export const legacy = {
  caption: "Selected screens from the earlier product experience (dashboard, assets, alerts).",
  screenImage: "/case-study/apate/old-screens-composite.png",
  screenImageAlt:
    "Legacy Apate Insights Portal composite: home dashboard with summary cards, assets table, and alerts feed with filters (early prototype).",
};

export const userGroups = {
  title: "Users",
  groups: [
    {
      label: "Bot operations manager",
      desc:
        "Needs predictable bot allocation, reliable mission payloads, and clear resource availability. Was blocked by placeholder agent IDs causing deployment failures and a slider that didn’t match actual bot counts.",
    },
    {
      label: "Investigator / analyst",
      desc:
        "Needs high clarity in data patterns and fast drill-down into scam flows. Was wasting time reconciling inconsistent KPIs across pages and manually reconstructing investigation sequences with no guided workflow.",
    },
    {
      label: "Manager / enterprise client",
      desc:
        "Needs performance visibility, reporting, and a product that looks credible in demos. The Metabase iframe UI was actively hurting sales conversations.",
    },
  ],
  optionalPersona: {
    intro: "Persona framework used to define workflows for operators, analysts, and enterprise stakeholders.",
    images: [
      {
        src: "/case-study/apate/userpersona.png",
        alt: "User persona and workflow: Alex (Bot Operator) — goals, metrics, and Flow 1 launching a new bot (fleet to bot details).",
      },
      {
        src: "/case-study/apate/userpersona2.png",
        alt: "Additional persona and workflow context for Apate platform roles.",
      },
    ],
  },
};

export const approach = {
  title: "The approach",
  intro:
    "Rather than redesigning existing screens in isolation, I restructured the entire product around four operational pillars that matched how users actually worked:",
  pillars: [
    {
      name: "Command",
      desc: "Real-time operations overview. KPIs, alert trends, threat summaries, active bot status. Designed for immediate situational awareness.",
    },
    {
      name: "Control",
      desc: "The entirely missing layer. Built from scratch. Mission creation, bot assignment, deployment workflows, capacity visibility, live conversation monitoring, CSV import with validation.",
    },
    {
      name: "Analyst",
      desc: "Restructured conversation monitoring. Better hierarchy, channel context, bot attribution, faster review workflows.",
    },
    {
      name: "Investigation",
      desc: "Structured investigation workflow from alert triage through case closure. Replaced the open-ended raw data view with a guided, step-by-step process.",
    },
  ],
};

export const beforeAfter = {
  title: "What changed: before vs after",
  rows: [
    { area: "Dashboard", before: "Raw Metabase iframe, weak KPIs", after: "Custom branded dashboard, unified KPI system" },
    { area: "Alerts", before: "Unfiltered raw data, no categorisation", after: "Filtered, prioritised, contextualised alerts" },
    { area: "Conversations", before: "Raw list, no hierarchy", after: "Structured monitoring with channel context" },
    { area: "Control", before: "Did not exist", after: "Full mission creation and bot management system" },
    { area: "Investigation", before: "Did not exist", after: "Guided workflow from triage to case closure" },
    { area: "Multi-tenant", before: "Inconsistent themes per tenant", after: "JWT SSO with tenant-aware consistent theming" },
    { area: "Visual identity", before: "Generic Metabase look", after: "Cohesive Apate brand system" },
  ],
};

export const delivered = {
  title: "What I delivered",
  items: [
    "Insight Hub V2 — shipped across all modules",
    "Custom theming replacing Metabase iframes entirely",
    "JWT SSO integration with tenant-aware dashboards",
    "Bot allocation modal — fixed placeholder agent issue, slider sync, unified logic",
    "CSV import with validation and sample file downloads",
    "Unified KPI and filter system across all dashboards",
    "Reusable Figma component library and React patterns",
    "Improved error handling, timeout states, and backend payload reliability",
  ],
};

export const newScreens = {
  caption: "Command, conversations, and control — the redesigned operational platform.",
  screenImage: "/case-study/apate/new-screens-composite.png",
  screenImageAlt:
    "Apate operational platform composite: threat operations command (dashboard, analytics, alerts), conversations monitoring, and control (missions and deployment fleet).",
};

export const outcomes = {
  title: "Outcomes",
  intro:
    "Metrics were not formally tracked during this engagement. Outcomes are based on team and stakeholder feedback throughout the project.",
  items: [
    "Platform moved from internal prototype to enterprise demo-ready product",
    "Bot deployment errors reduced significantly through validated allocation logic and fixed slider sync",
    "Investigation workflows no longer required analysts to manually reconstruct sequences",
    "Enterprise bank clients in Australia onboarded onto the redesigned platform",
    "Product perceived as credibly enterprise-grade in client and investor demos",
    "Reusable component foundations built for all future module development",
  ],
};

export const keyLearnings = {
  title: "Key learnings",
  items: [
    {
      title: "Data consistency builds trust",
      body: "Even small KPI mismatches across dashboards broke user confidence in the entire product. Fixing definitions with the ML team was as important as the visual redesign.",
    },
    {
      title: "Guided workflows beat open-ended dashboards",
      body: "Analysts consistently preferred structured investigation paths over flexible but unguided interfaces. Structure reduces cognitive load under operational pressure.",
    },
    {
      title: "Branding matters in enterprise",
      body: "Replacing Metabase iframes with a cohesive visual system directly changed how the product was perceived in sales demos. UI quality signals product maturity.",
    },
    {
      title: "UX prevents operational errors",
      body: "Clear validation on the bot allocation modal, constrained inputs, and readable error states prevented real mission failures. Small interaction details had large downstream impact.",
    },
  ],
};
