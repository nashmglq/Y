import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  AdminDeleteUserActions,
  adminListOfUserActions,
} from "../actions/adminActions";
import { useDispatch } from "react-redux";

const DeleteUser = ({ id }) => {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const dispatch = useDispatch();
  const deleteUser = () => {
    dispatch(AdminDeleteUserActions(id));
    dispatch(adminListOfUserActions());
    setShow(false);
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={showModal}>
        Delete Account
      </button>
      <Modal show={show}>
        <Modal.Header>Delete User</Modal.Header>

        <Modal.Body>Are you sure you want to delete this User?</Modal.Body>
        <Modal.Footer>
          {" "}
          <button className="btn btn-danger" onClick={deleteUser}>
            Delete
          </button>
          <button className="btn btn-warning" onClick={hideModal}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteUser;
