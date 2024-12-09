import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getCommentActions } from "../actions/crudActions";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./comment";

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
                <div>
                  <h1>{comments.comment}</h1>
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
