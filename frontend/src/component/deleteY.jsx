import {useDispatch, useSelector} from "react-redux"
import { deleteYActions } from "../actions/crudActions";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Modal from "react-bootstrap/Modal";


const DeleteY = ({id}) =>{
    const dispatch = useDispatch();
    const {loading, success, error, message} = useSelector(state => state.deleteY)
    const nav = useNavigate();
    const [show, setShow] = useState(false);

    const deleteButton = (e) =>{
        e.preventDefault()
      
        dispatch(deleteYActions(id, nav))
    }
    const showButton = (e) => setShow(true)
    const hideButton = (e) => setShow(false)

    return(
    
    <div class = "col-sm-1">

        
        <button onClick={showButton} class = "btn btn-link">
        <FontAwesomeIcon icon={faTrashAlt}/>
        </button>
        <Modal show={show} onHide={hideButton}>
        <Modal.Header closeButton><h4>Delete confirmation</h4></Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this tweet?</p>
        </Modal.Body>
        <Modal.Footer>
            <button class = "btn btn-warning" onClick={deleteButton}>Delete tweet</button>
        </Modal.Footer>

        </Modal>
    </div>
    )

}

export default DeleteY;