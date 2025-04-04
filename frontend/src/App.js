// import "./bootstrap.min.css"; can be here or index, becasue that is the main application
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LandingPage from "./screen/landingPage";
import Register from "./screen/register";
import VerifiedEmail from "./screen/verifiedEmail";
import ResendVerification from "./screen/resendVerification";
import Profile from "./screen/profile";
import Navbar from "./component/header";
import Home from "./screen/home";
import Routing from "./utils/routing"
import DetailY from "./screen/detailY";
import UserProfile from "./screen/userProfile"
import ChangePassword from "./screen/changePassword";
import AdminDashboard from "./screen/adminDashboard";
import SeachQuery from "./screen/searchQuery";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/verify-email" element={<VerifiedEmail />}></Route>
          <Route
            path="/resend-verification"
            element={<ResendVerification />}
          ></Route>
          <Route path="/profile" element={<Routing><Profile /></Routing>}></Route>
          <Route path = "/home" element={<Routing><Home/></Routing>}></Route>
          <Route path = "/home/:id" element={<Routing><DetailY/></Routing>}></Route>
          <Route path = "/profile/:id" element={<Routing><UserProfile/></Routing>}></Route>
          <Route path = "/information" element = {<Routing><ChangePassword/></Routing>}></Route>
          <Route path = "/admin-dashboard" element = {<Routing><AdminDashboard/></Routing>} ></Route>
          <Route path= "/search" element = {<Routing><SeachQuery/></Routing>}></Route>


           {/* none registerd url, (*) means all path or url, Navigate automatically nav to "to" 
            unlike useNavigate which you to tell when it is to navigate
           */} 
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
