import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from "react-bootstrap/Modal";
import { updateYAction } from "../actions/crudActions";

const Updatetweet = ({id, tweet}) => {
    const [show, setShow] = useState(false);
    const [updateTweet, setUpdateTweet] = useState(tweet);
    const onShow = (e) => setShow(true)
    const dispatch = useDispatch()
    const onHide = (e) => {
        // e.preventDefault()

        const formData = {updateTweet}
        console.log(id, formData)
        dispatch(updateYAction(id, formData))
        setShow(false)
    }
  return (
    <div class = "col-2">
      <button class = "btn btn-link" onClick={onShow}><FontAwesomeIcon icon = {faEdit}></FontAwesomeIcon></button>
      <Modal show = {show} onHide ={onHide}>
        <Modal.Header closeButton>Update Tweet</Modal.Header>
        <Modal.Body>
           <label>Tweet: </label>
           <input class = "form-control" value={updateTweet} onChange = {e => setUpdateTweet(e.target.value)}/>
            <button class = "btn btn-primary mt-2" onClick = {onHide}>Update</button>
        </Modal.Body>
      </Modal>
    </div>
  );
};


export default Updatetweet