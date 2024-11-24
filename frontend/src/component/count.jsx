import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { likeCountActions } from "../actions/crudActions";


const CountLike = ({id}) => {
    const dispatch = useDispatch();
    const {count} = useSelector(state => state.likeCount)

    useEffect(()=>{
        dispatch(likeCountActions(id))
        // console.log(count)
    }, [dispatch])

    return(<div>
        {count ? count.map(counts => (<p>{counts.heart}</p>))   : "something"}
    </div>)
}

export default CountLike