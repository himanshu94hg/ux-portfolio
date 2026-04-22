import { Link, Navigate, useParams } from "react-router-dom";
import { getCaseStudyById } from "../data/caseStudiesData.js";
import { CaseStudyContent } from "../caseStudy/CaseStudyContent.jsx";

const font = "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,sans-serif";

export default function CaseStudyPage() {
  const { id } = useParams();
  const cs = getCaseStudyById(id);
  if (!cs) return <Navigate to="/" replace />;

  return (
    <div style={{ minHeight: "100vh", background: "#07090f", color: "#f1f5f9", fontFamily: font, padding: "1.5rem 1.25rem 3rem" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: "880px", margin: "0 auto 1.5rem" }}>
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
            transition: "color 0.2s",
          }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1 }} aria-hidden>←</span>
          Back to portfolio
        </Link>
      </div>
      <CaseStudyContent cs={cs} />
    </div>
  );
}
