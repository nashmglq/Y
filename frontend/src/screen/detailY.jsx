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
        <div class = "col-3">
          <div class ="card">
            <h1>qwe</h1>
          </div>
        </div>
        <div class="col-6">
          <div class="card p-3">
            {message ? (
              <div>

                <div class = "col-12">
                <img
                  src={
                    `http://localhost:5001/uploads/${message.profile_image}` ||
                    "default.jpg"
                  }
                  style={{ height: "8%", width: "8%" }}
                  class = "rounded-circle"
                ></img> 
                <small class = "ml-2">{`@${message.username}`} </small>    

                  </div>
                  {message.userId  === localId ? <DeleteY id={id} />: null} 
                {message.userId  === localId ? <Updatetweet id={id} tweet = {message.tweet} />: null}
              
                
                <h6 class="mt-4">{message.tweet}</h6>

                {message.img ? (
                  <img
                    src={`http://localhost:5001/uploads/${message.img}`}
                    style={{ height: "100%", width: "100%" }}
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
