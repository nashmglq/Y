import { useDispatch } from "react-redux";
import { followActions } from "../actions/authActions";

const Follow = ({id}) => {
  const dispatch = useDispatch();



  const followButton = () =>{
    dispatch(followActions(id))
    console.log(id)
  }

  return (
    <div>
      <button class="btn btn-primary" onClick={followButton}>Follow</button>
    </div>
  );
};

export default Follow;
