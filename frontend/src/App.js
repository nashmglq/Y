// import "./bootstrap.min.css"; can be here or index, becasue that is the main application
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './screen/landingPage'; 
import Register from "./screen/register";
import VerifiedEmail from "./screen/verifiedEmail";
import ResendVerification from "./screen/resendVerification";


function App() {
  return (
    <BrowserRouter>

    <div className="App">

      <Routes>


          <Route path = "/" element = {<LandingPage/>}></Route>
          <Route path = "/register" element = {<Register/>}></Route>
          <Route path = "/verify-email" element = {<VerifiedEmail/>}></Route>
          <Route path = "/resend-verification" element = {<ResendVerification/>}></Route>


      </Routes>
      
    </div>


    </BrowserRouter>
  );
}

export default App;
