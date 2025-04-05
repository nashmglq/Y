import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { likeActions } from "../actions/crudActions";

const Like = ({ id }) => {
  const dispatch = useDispatch();
 
  const likeHandler = () => {
    dispatch(likeActions(id)); // Handles both like and unlike
  };

  return (
    <button className="btn btn-link btn-sm mt-1" onClick={likeHandler}>
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
};

const Unlike = ({ id }) => {
  const dispatch = useDispatch();

  const likeHandler = () => {
    dispatch(likeActions(id)); // Reusing the same action
  };

  return (
    <button className="btn btn-link btn-sm mt-1" onClick={likeHandler}>
      <FontAwesomeIcon icon={faHeartSolid} style={{ color: "red" }} />
    </button>
  );
};

export default Like;
export { Unlike };
