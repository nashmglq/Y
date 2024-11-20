import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailYActions } from "../actions/crudActions";
import DeleteY from "../component/deleteY";
import Updatetweet from "../component/update";

const DetailY = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate()
  const { loading, success, error, message } = useSelector(
    (state) => state.detailY
  );
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const localId = userInfo.id
  useEffect(() => {
    dispatch(detailYActions(id));
  }, [dispatch]);

  return (
    <div class="container mt-2">
      <div class="row">
        <div class="col">
          <div class="card">
            {message ? (
              <div>
                <img
                  src={
                    `http://localhost:5001/uploads/${message.profile_image}` ||
                    "default.jpg"
                  }
                  style={{ height: "3%", width: "3%" }}
                ></img>
                <small>{`@${message.username}`}</small>          
                {message.userId  === localId ? <DeleteY id={id} />: null} 
                {message.userId  === localId ? <Updatetweet id={id} tweet = {message.tweet} />: null}
                  


                
                <h5 class="mt-4">{message.tweet}</h5>

                {message.img ? (
                  <img
                    src={`http://localhost:5001/uploads/${message.img}`}
                    style={{ height: "10%", width: "10%" }}
                  />
                ) : null}

              
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailY;
