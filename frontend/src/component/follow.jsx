import { useDispatch, useSelector } from "react-redux";
import { followActions, checkIfFollowActions } from "../actions/authActions";
import { useEffect } from "react";

const Follow = ({ id }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.checkIfFollow);

  useEffect(() => {
    dispatch(checkIfFollowActions(id));
  }, [dispatch]);

  const followButton = () => {
    dispatch(followActions(id));
    console.log(id);
  };

  return (
    <div>
      {message == true ? (
        <button class="btn btn-primary" onClick={followButton}>
          Unfollow
        </button>
      ) : (
        <button class="btn btn-primary" onClick={followButton}>
          Follow
        </button>
      )}
    </div>
  );
};

export default Follow;
