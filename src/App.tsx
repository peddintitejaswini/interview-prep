import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "@/Layouts/public-layout";
import AuthenticationLayout from "@/Layouts/auth-layout";

import HomePage from "@/routes/home";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import ProtectRoutes from "./Layouts/protected-routes";
import DashboardLayout from "./Layouts/dashboard-layout";
import Dashboard from "./routes/dashboard";
import CreateEditPage from "./routes/create-edit-page";
import MockLoadPage from "./routes/mock-load-page";
import MockInterviewPage from "./routes/mock-interview-page";
import { Feedback } from "./routes/feedback";
import AboutPage from "./routes/about-page";
import ServicesPage from "./routes/sevices-page";
import ContactPage from "./routes/contact-page";
import SkillGapPage from "./routes/skill-gap-page";
import RoadmapPage from "./routes/roadmap-page";
import JobRolesPage from "./routes/job-roles-page";
import JdRoadmapPage from "./routes/jd-roadmap-page";
import RoadmapDetailPage from "./routes/roadmap-detail-page";

const App = () => {
  return (
    <Router>
      <Routes>
        {/*Public routes*/}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />}></Route>

          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/*Authentication Layout */}
        <Route element={<AuthenticationLayout />}>
          <Route path="/signin/*" element={<SignInPage />}></Route>
          <Route path="/signup/*" element={<SignUpPage />}></Route>
        </Route>

        {/*Protected Routes - Dashboard*/}
        <Route
          element={
            <ProtectRoutes>
              <DashboardLayout />
            </ProtectRoutes>
          }
          path="/dashboard"
        >
          <Route path="generate" element={<Dashboard />} />
          <Route path="skill-gap" element={<SkillGapPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="jd-roadmap" element={<JdRoadmapPage />} />
          <Route path="jd-roadmap/:roadmapId" element={<RoadmapDetailPage />} />
          <Route path="job-roles" element={<JobRolesPage />} />
          <Route path="generate/create" element={<CreateEditPage />} />
          <Route path="generate/:interviewId" element={<CreateEditPage />} />
          <Route
            path="generate/interview/:interviewId"
            element={<MockLoadPage />}
          />
          <Route
            path="generate/interview/:interviewId/start"
            element={<MockInterviewPage />}
          />
          <Route path="generate/feedback/:interviewId" element={<Feedback />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
