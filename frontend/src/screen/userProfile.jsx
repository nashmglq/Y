import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserIdActions } from "../actions/authActions";
import { getUserYActions, getUserYOtherActions } from "../actions/crudActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimePosted from "../component/timePosted";
import Like from "../component/like";
import Follow from "../component/follow";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loading, error, profile, message } = useSelector(
    (state) => state.getUserId
  );

  const { y } = useSelector((state) => state.getUserYOther);
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const nav = useNavigate();
  useEffect(() => {
    dispatch(getUserIdActions(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserYOtherActions(id));
    console.log(id)
  }, [dispatch]);

  useEffect(() => {
    const userId = userInfo.id;

    if (userId == id) {
      nav("/profile");
    }
  }, [dispatch]);

  return (
    <div class="container mt-2">
      <div class="row">
        <div class="col-sm-3">
          <div class="card p-2">
            {profile
              ? profile.map((profileUser) => (
                  <div>
                    <img
                      src={
                        profileUser
                          ? `http://localhost:5001/uploads/${profileUser.profile_image}`
                          : "default.jpg"
                      }
                      style={{ height: "40%", width: "40%" }}
                      class="mt-2 rounded-circle"
                      alt="profile_image"
                    ></img>
                    <h4 class="mt-2">
                      {profileUser
                        ? `${profileUser.name}`
                        : "You are not authenticated"}
                    </h4>
                    <small class="mt-2">
                      {profileUser
                        ? `@${profileUser.username}`
                        : "You are not authenticated"}{" "}
                    </small>
                    <br />
                    <small class="mb-4 mt-2 mb-2">
                      {profileUser && profileUser.bio
                        ? `${profileUser.bio}`
                        : "No bio yet."}
                    </small>{" "}

                        <Follow  id = {profileUser.id}/>

                  </div>
                ))
              : "Not authenticated."}
          </div>
        </div>
        <div class="col-sm-8">
          {y
            ? y.map((userY) => (
                <div class="card mt-2 p-2">
                  <Link
                    to={`/home/${userY.tweet_id}`}
                    class="text-decoration-none text-dark"
                  >
                    <div>
                      {userY.profile_image ? (
                        <img
                          src={`http://localhost:5001/uploads/${userY.profile_image}`}
                          style={{ width: "40px", height: "40px" }}
                          className="rounded-circle img-fluid mt-2"
                        />
                      ) : (
                        <img
                          src="default.jpg"
                          style={{ width: "40px", height: "40px" }}
                          className="rounded-circle img-fluid mt-2"
                        />
                      )}

                      <small class="text-body-primary">
                        <b> {userY.name} </b>
                      </small>
                      <small class="mr-2">
                        {`@${userY.username}`} ·{" "}
                        <TimePosted time={userY.date_published} />
                      </small>
                      <small>
                        <small>
                          {" "}
                          {userY.updated === 1 ? "· Edited" : null}
                        </small>
                      </small>
                    </div>

                    <p class="mt-2">{userY.tweet}</p>
                    {userY.img ? (
                      <img
                        src={`http://localhost:5001/uploads/${userY.img}`}
                        class="mt-2"
                        style={{ height: "100%", width: "100%" }}
                      />
                    ) : null}
                  </Link>

                  <div class="d-flex">
                    <Like id={userY.tweet_id} /> {userY.heart}{" "}
                  </div>
                </div>
              ))
            : "Empty space."}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
