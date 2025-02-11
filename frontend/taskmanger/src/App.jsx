import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar.jsx";
import Profile from "./componets/Profile.jsx";
import Signin from "./componets/Signin.jsx";
import SignUp from "./componets/SignUp.jsx";
import Welcome from "./componets/Welcome.jsx";
import FooterComp from "./componets/FooterComp.jsx";
import Newtask from "./componets/Newtask.jsx";
import Progress from "./componets/Progress.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <div className="h-screen w-full  bg-white ">
            <Navbar />

            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/newtask" element={<Newtask />} />
              <Route path="/Progress" element={<Progress />} />
            </Routes>
          </div>
        </Router>
        <FooterComp />
      </AuthProvider>
    </>
  );
};

export default App;
