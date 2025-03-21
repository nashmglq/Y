import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getCommentActions } from "../actions/crudActions";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./comment";
import TimePosted from "./timePosted";
import UpdateComment from "./commentUpdate";
import DeleteComment from "./commentDelete";
import { adminCheckerActions } from "../actions/adminActions";

const CommentList = ({ id }) => {
  const [show, setShow] = useState(false);
  const { message } = useSelector((state) => state.getComment);
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo ? userInfo.id : null;

  const showHandler = () => setShow(true);
  const hideButton = () => setShow(false);
  const { message: checkAdmin } = useSelector((state) => state.adminChecker);

  useEffect(() => {
    console.log("Use Effect for get Comments with the id of", id);
    dispatch(getCommentActions(id));
    dispatch(adminCheckerActions());
  }, [dispatch]);

  return (
    <div class="align-items-center justify-content">
      {/* message might be present but it is empty and it will cause an error */}
      {/* this will check the array if it has a value */}
      {message && Array.isArray(message) ? (
        message.map((comments) => (
          <div
            class="border-top border-secondary overflow-auto"
            style={{ maxHeight: "200px" }}
          >
            <div class="d-flex p-2">
              <img
                src={
                  `http://localhost:5001/uploads/${comments.profile_image}` ||
                  "default.jpg"
                }
                class="rounded-circle img-fluid"
                style={{ width: "44px", height: "44px" }}
              />
              <small>
                <b>
                  <h6 class="m-1" style={{ color: "white" }}>
                    {comments.name}
                  </h6>
                </b>
                <small class="m-1">@{comments.username}</small>
                <TimePosted time={comments.date_published} />
                <small>{comments.updated == 1 ? "Updated" : null}</small>
              </small>
            </div>

            <h6 class="mt-2">{comments.comment}</h6>

            {comments.userId == userId || checkAdmin === 1 ? (
              <div class="d-flex">
                {comments.userId == userId ? (
                  <div className="d-flex ">
                    <UpdateComment
                      id={comments.comment_id}
                      comments={comments.comment}
                    />
                    <DeleteComment id={comments.comment_id} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <p class="p-2"> No comments yet.</p>
      )}



      

      <Comment id={id} />
    </div>
  );
};
export default CommentList;
