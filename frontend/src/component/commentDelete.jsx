import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteCommentActions } from "../actions/crudActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const DeleteComment = ({ id }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const tweet_id = useParams().id

  const showHandler = () => setShow(true);
  const hideHandler = () => setShow(false);


  const deleteHandler = () => dispatch(deleteCommentActions(id, tweet_id));

  return (
    <div class="m-2">
      <button class="btn btn-danger" onClick={showHandler}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>

      <Modal show={show}>
        <Modal.Header>
          Are you sure you want to delete this comment?
        </Modal.Header>
        <Modal.Body>
          <button class="btn btn-danger" onClick={deleteHandler}>
            Delete
          </button>
          <button class="btn btn-light" onClick={hideHandler}>
            Cancel
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteComment;
