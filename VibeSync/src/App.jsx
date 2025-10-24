import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Features from './components/Features'
import Groups from './pages/Groups'
import Events from './pages/Events'
import Setting from './pages/Setting'
import Helpcenter from './pages/Helpcenter'
import Team from './pages/Team'
import TermofServices from './pages/TermofServices'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      
      <div>
        <Routes>
          <Route path="/Signin" element={<Signin/>} />
          <Route path="/Signup" element={<Signup/>} />
        </Routes>
      </div>
      <div>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/Groups" element={<Groups/>} />
        <Route path="/Events" element={<Events/>} />
        <Route path="/Setting" element={<Setting/>} />
        <Route path="/Helpcenter" element={<Helpcenter/>} />
        <Route path="/Team" element={<Team/>} />
        <Route path="/TermofServices" element={<TermofServices/>} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
        
      </Routes>
      <Footer/>
      </div>

      
    </div>
  )
}

export default App