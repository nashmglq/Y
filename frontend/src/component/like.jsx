import { useState } from "react";
import Heart from "react-animated-heart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { likeActions } from "../actions/crudActions";

const Like = ({id}) => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const likeHandler = (e) =>{
    
    dispatch(likeActions(id)) 
  }

  return (
    <div>
      <button class="btn btn-link btn-sm" onClick={likeHandler}>
      <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
};

export default Like;
