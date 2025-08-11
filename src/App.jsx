import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import Courses from './Components/Courses/Courses.jsx'
import Coaches from './Components/Coaches/Coaches.jsx'
import Tournaments from './Components/Tournaments/Tournaments.jsx'
import Resources from './Components/Resources/Resources.jsx'
import About from './Components/About/About.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import SignUp from './Components/SignUp/SignUp.jsx'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx'
import Contact from './Components/Contact/Contact.jsx'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy.jsx'
import TermsOfService from './Components/TermsOfService/TermsOfService.jsx'
import FAQ from './Components/FAQ/FAQ.jsx'
import Blog from './Components/Blog/Blog.jsx'
import NotFound from './Components/NotFound/NotFound.jsx' // Import the new component

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          {/* Add this catch-all route at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App