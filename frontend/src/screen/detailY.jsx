import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkDetailLikeActions,
  detailYActions,
  likeCountActions,
} from "../actions/crudActions";
import DeleteY from "../component/deleteY";
import Updatetweet from "../component/update";
import TimePosted from "../component/timePosted";
import { FaEllipsisH } from "react-icons/fa";
import Like, { Unlike } from "../component/like";
import CommentList from "../component/commentList";

const DetailY = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const localId = userInfo.id;

  const { loading, success, error, message } = useSelector(
    (state) => state.detailY
  );
  const { message: checkIfLiked } = useSelector(
    (state) => state.checkDetailLike
  );

  const { count: countLikes } = useSelector((state) => state.likeCount);

  useEffect(() => {
    dispatch(detailYActions(id));
    dispatch(checkDetailLikeActions(id));
    dispatch(likeCountActions(id));
  }, [dispatch]);

  return (
    <div class="container mt-2">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <h4>Something...</h4>
          </div>
        </div>
        <div class="col-6">
          <div class="card p-3">
            {message ? (
              <div>
                <div class="col-12">
                  <img
                    src={
                      `http://localhost:5001/uploads/${message.profile_image}` ||
                      "default.jpg"
                    }
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle img-fluid"
                  ></img>
                  <small>
                    <b> {message.name} </b>
                    {`@${message.username}`} ·{" "}
                    <TimePosted time={message.date_published} />
                    <small>{message.updated === 1 ? "· Edited" : null}</small>
                  </small>
                </div>
                <h6 class="mt-2">{message.tweet}</h6>
                {message.img ? (
                  <img
                    src={`http://localhost:5001/uploads/${message.img}`}
                    style={{ height: "100%", width: "100%" }}
                  />
                ) : null}
              </div>
            ) : null}

            <div class="d-flex">
              <small>
                {" "}
                {checkIfLiked == true ? (
                  <div class="d-flex">
                    <Unlike id={message.tweet_id} />
                    {countLikes
                      ? countLikes.map((counts) => (
                          <span class="mt-2">{counts.heart}</span>
                        ))
                      : null}
                  </div>
                ) : (
                  <div class="d-flex">
                    <Like id={message.tweet_id} />
                    {countLikes
                      ? countLikes.map((counts) => (
                          <span class="mt-2">{counts.heart}</span>
                        ))
                      : null}
                  </div>
                )}
              </small>

              <CommentList id = {id}/>
              {message.userId === localId ? <DeleteY id={id} /> : null}
              {message.userId === localId ? (
                <Updatetweet id={id} tweet={message.tweet} />
              ) : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailY;
