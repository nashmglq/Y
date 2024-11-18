// import "./bootstrap.min.css"; can be here or index, becasue that is the main application
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./screen/landingPage";
import Register from "./screen/register";
import VerifiedEmail from "./screen/verifiedEmail";
import ResendVerification from "./screen/resendVerification";
import Profile from "./screen/profile";
import Navbar from "./component/header";
import Home from "./screen/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/verify-email" element={<VerifiedEmail />}></Route>
          <Route
            path="/resend-verification"
            element={<ResendVerification />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path = "/home" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
