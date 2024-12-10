import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getCommentActions } from "../actions/crudActions";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./comment";
import TimePosted from "./timePosted";
const CommentList = ({ id }) => {
  const [show, setShow] = useState(false);
  const { message } = useSelector((state) => state.getComment);
  const dispatch = useDispatch();

  const showHandler = () => setShow(true);
  const hideButton = () => setShow(false);

  useEffect(() => {
    console.log("Use Effect for get Comments with the id of", id);
   dispatch( getCommentActions(id))
  }, [dispatch]);

  return (
    <div class="align-items-center justify-content">
      <button onClick={showHandler} class="btn btn-link">
        <FontAwesomeIcon icon={faComment} />
      </button>

      <Modal show={show} onHide={hideButton}>
        <Modal.Header closeButton>Comments</Modal.Header>
        <Modal.Body>
          {message
            ? message.map((comments) => (
                <div class = "mt-2">
                  <div class = "d-flex">
                  <img src = {`http://localhost:5001/uploads/${comments.profile_image}` || "default.jpg"} 
                   class = "rounded-circle img-fluid"
                   style={{ width: "40px", height: "40px" }}
                   />
                   <small>
                   <p class = "mb-1">@{comments.username}</p>
                   <TimePosted time={comments.date_published} />
                   </small>
                  </div>
   

                   <h6>{comments.comment}</h6>


                </div>
              ))
            : "No comments yet."}
        </Modal.Body>

        <Modal.Footer className="d-flex flex-column">
          <Comment id={id} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default CommentList;
