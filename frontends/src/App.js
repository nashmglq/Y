// import "./bootstrap.min.css"; can be here or index, becasue that is the main application
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './screen/landingPage'; 
import Register from "./screen/register";


function App() {
  return (
    <BrowserRouter>

    <div className="App">

      <Routes>


          <Route path = "/" element = {<LandingPage/>}></Route>
          <Route path = "/register" element = {<Register/>}></Route>
          {/* <Route path = "/verify-email?token=" */}


      </Routes>
      
    </div>


    </BrowserRouter>
  );
}

export default App;
