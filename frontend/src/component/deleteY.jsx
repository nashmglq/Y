import {useDispatch, useSelector} from "react-redux"
import { deleteYActions } from "../actions/crudActions";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const DeleteY = ({id}) =>{
    const dispatch = useDispatch();
    const {loading, success, error, message} = useSelector(state => state.deleteY)
    const nav = useNavigate()

    const deleteButton = (e) =>{
        e.preventDefault()

        dispatch(deleteYActions(id, nav))
        
    }

    return(<div>
        <button onClick={deleteButton} class = "btn btn-link">
        <FontAwesomeIcon icon={faTrashAlt}/>
        </button>

    </div>
    )

}

export default DeleteY;