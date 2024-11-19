import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailYActions } from "../actions/crudActions";

const DetailY = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.detailY
  );
console.log(id)
  useEffect(() => {
    dispatch(detailYActions(id));
  }, [dispatch]);

  return (
    <div class="container mt-2">
      <div class="row">
        <div class="col">
          <div class="card">
            {message && message.map(detailY => (
                <div>
                <img src = {`http://localhost:5001/uploads/${detailY.profile_image}` || "default.jpg"} style={{height:80, width: 60}}></img>
                <small>{`@${detailY.username}`}</small>
                <h5 class = "mt-4">{detailY.tweet}</h5>

                {detailY.img ? <img src = {`http://localhost:5001/uploads/${detailY.img}`}/> : null }
                </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailY;
