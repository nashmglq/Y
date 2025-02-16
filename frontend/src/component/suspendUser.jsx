import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AdminUserSuspendAction } from "../actions/adminActions";
const SuspendUser = ({id, check}) => {
  const [show, setShow] = useState(false);
  const showHandler = () => setShow(true);
  const hideHandler = () => setShow(false);
  const dispatch = useDispatch();

  const deleteButton = () =>{

    dispatch(AdminUserSuspendAction(id))
    setShow(false)
  }

  return (
    <div>
      <button className={check === 1 ? "btn btn-warning"  : "btn btn-light" } onClick={showHandler}>{check === 1 ? "Suspend" : "Activate"}</button>
      <Modal show={show}>
        <Modal.Header>Suspend User?</Modal.Header>
        <Modal.Body>Are you sure to suspend this user?</Modal.Body>
        <Modal.Footer>
          <button class={check === 1 ? "btn btn-danger"  : "btn btn-light" } onClick={deleteButton}>
          {check === 1 ? "Suspend" : "Activate"}
          </button>
          <button class="btn btn-warning" onClick={hideHandler}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SuspendUser;
