import { useState } from "react";
import Navbar from "../component/header";

const Routing = ({ children }) => {
  const getToken = localStorage.getItem("userInfo");
  let renderHeader;
  if (getToken) {
    renderHeader = <Navbar />;
  }

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
