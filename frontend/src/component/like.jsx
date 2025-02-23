import { useState } from "react";
import Heart from "react-animated-heart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { likeActions, likeCountActions } from "../actions/crudActions";

const Like = ({ id }) => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const likeHandler = (e) => {
    dispatch(likeActions(id));
    dispatch(likeCountActions(id))
    
    console.log(id)
  };

  return (
    <div>
      <button class="btn btn-link btn-sm mt-1" onClick={likeHandler}>
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
};

const Unlike = ({ id }) => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const likeHandler = (e) => {
    dispatch(likeActions(id));
  };

  return (
    <div>
      <button class="btn btn-link btn-sm mt-1" onClick={likeHandler}>
      <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
      </button>
    </div>
  );
};
// default = main function
// named = {} additional function
export default Like; 
export {Unlike} ; 
