import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./components/Features";
import Groups from "./pages/Groups";
import Events from "./pages/Events";
import Setting from "./pages/Setting";
import Helpcenter from "./pages/Helpcenter";
import Team from "./pages/Team";
import TermofServices from "./pages/TermofServices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Profile";
import TmbdMovie from "./pages/TmbdMovie";
import FindCafe from "./pages/FindCafe";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div>
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/helpcenter" element={<Helpcenter />} />
        <Route path="/team" element={<Team />} />
        <Route path="/termofservices" element={<TermofServices />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path="/signin" element={<PublicRoute element={Signin} />} />
        <Route path="/signup" element={<PublicRoute element={Signup} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/profile" element={<Profile element={Profile} />} />
        <Route path="/setting" element={<ProtectedRoute element={Setting} />} />
        <Route path="/events" element={<ProtectedRoute element={Events} />} />
        <Route path="/groups" element={<ProtectedRoute element={Groups} />} />
        <Route path="tmbd" element={<TmbdMovie element={TmbdMovie} />} />
        <Route path="find-cafe" element={<FindCafe element={FindCafe} />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
