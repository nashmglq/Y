import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postCommentActions } from "../actions/crudActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ id }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const commentHandler = (e) => {
    e.preventDefault();
    const formData = { comment };
    console.log(formData);
    dispatch(postCommentActions(id, formData));
    setComment(""); // and then pass the value of the comment
  };

  return (
    <form class="form-group" onSubmit={commentHandler}>
    <div class = "d-flex">
      <input
        class="form-control"
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment."
        value={comment}
      ></input>
      <button class="btn btn-link">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
    </form>
  );
};

export default Comment;
