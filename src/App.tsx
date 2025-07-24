import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "@/Layouts/public-layout";
import AuthenticationLayout from "@/Layouts/auth-layout";

import HomePage from "@/routes/home";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import ProtectRoutes from "./Layouts/protected-routes";
import MainLayout from "./Layouts/main-layout";
import Generate from "./components/generate";
import Dashboard from "./routes/dashboard";
import CreateEditPage from "./routes/create-edit-page";
import MockLoadPage from "./routes/mock-load-page";
import MockInterviewPage from "./routes/mock-interview-page";
import { Feedback } from "./routes/feedback";
import AboutPage from "./routes/about-page";
import ServicesPage from "./routes/sevices-page";
import ContactPage from "./routes/contact-page";

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

        {/*Protected Routes*/}
        <Route
          element={
            <ProtectRoutes>
              <MainLayout />
            </ProtectRoutes>
          }
        >
          <Route element={<Generate />} path="/generate">
            <Route index element={<Dashboard />} />
            <Route path=":interviewId" element={<CreateEditPage />} />
            <Route path="interview/:interviewId" element={<MockLoadPage />} />
            <Route
              path="interview/:interviewId/start"
              element={<MockInterviewPage />}
            />
            <Route path="feedback/:interviewId" element={<Feedback />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
