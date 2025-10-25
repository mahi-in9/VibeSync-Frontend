import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './components/Features';
import Groups from './pages/Groups';
import Events from './pages/Events';
import Setting from './pages/Setting';
import Helpcenter from './pages/Helpcenter';
import Team from './pages/Team';
import TermofServices from './pages/TermofServices';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const location = useLocation();
  
  // Check if current route is signin or signup
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div>
      {/* Show Navbar and Footer only on non-auth pages */}
      {!isAuthPage && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<Features />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/events" element={<Events />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/helpcenter" element={<Helpcenter />} />
        <Route path="/team" element={<Team />} />
        <Route path="/termofservices" element={<TermofServices />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;