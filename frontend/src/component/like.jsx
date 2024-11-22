import { useState } from "react";
import Heart from "react-animated-heart";

const Like = () => {
  const [click, setClick] = useState(false);

  return (
    <div>
      <Heart isClick={click} onClick={() => setClick(!click)} />
    </div>
  );
};

export default Like;
