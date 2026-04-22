import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "../portfolio2.jsx";
import CaseStudyPage from "./pages/CaseStudyPage.jsx";
import CarbonCaseStudyPage from "./caseStudy/carbon/CarbonCaseStudyPage.jsx";
import ApateCaseStudyPage from "./caseStudy/apate/ApateCaseStudyPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/case-study/1" element={<CarbonCaseStudyPage />} />
        <Route path="/case-study/2" element={<ApateCaseStudyPage />} />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
