import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { updateCommentActions } from "../actions/crudActions";
const UpdateComment = ({ id, comments }) => {
  const [show, setShow] = useState(false);
  const [comment, setUpdatedComment] = useState(comments);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const tweet_id = useParams().id

  const handelUpdate = (e) => {
    e.preventDefault();

    const formData = {comment};

    dispatch(updateCommentActions(id, formData, tweet_id));
  };

  return (
    <div>
      <button class="btn btn-link" onClick={handleShow}>
        <FontAwesomeIcon icon={fas.faPencilAlt} />
      </button>

      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>Edit comment</Modal.Header>

        <Modal.Body>
          <form class="control-group" onSubmit={handelUpdate}>
            <label>Edit:</label>
            <input
              class="form-control"
              value={comment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            ></input>
            <button class="btn btn-primary mt-2 w-100">
              {" "}
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateComment;
