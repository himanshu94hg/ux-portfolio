import { Navigate, useParams } from "react-router-dom";
import { getCaseStudyById } from "../data/caseStudiesData.js";
import { CaseStudyContent } from "../caseStudy/CaseStudyContent.jsx";
import { CaseStudyPageChrome } from "../caseStudy/CaseStudyThemeContext.jsx";

export default function CaseStudyPage() {
  const { id } = useParams();
  const cs = getCaseStudyById(id);
  if (!cs) return <Navigate to="/" replace />;

  return (
    <CaseStudyPageChrome>
      <CaseStudyContent cs={cs} />
    </CaseStudyPageChrome>
  );
}
