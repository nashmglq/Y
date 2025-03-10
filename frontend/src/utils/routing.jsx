import { useEffect, useState } from "react";
import Navbar from "../component/header";
import { useNavigate } from "react-router-dom";

const Routing = ({ children }) => {
  const getToken = localStorage.getItem("userInfo");
  const nav = useNavigate();
  let renderHeader;
  if (getToken) {
    renderHeader = <Navbar />;
  }

  useEffect(()=>{
    if(!getToken){
      nav("/")
    }
  })

  return (
    <div>
      {" "}
      {/* pass it as the element so like the screens */}
      {renderHeader}
      {children}
    </div>
  );
};

export default Routing;
