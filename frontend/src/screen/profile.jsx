import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FollowCountActions, getProfileActions } from "../actions/authActions";
import UpdateProfile from "../component/updateProfile";
import Header from "../component/header";
import { Link, useNavigate } from "react-router-dom";
import { getUserYActions } from "../actions/crudActions";
import TimePosted from "../component/timePosted";
import Like, {Unlike} from "../component/like";

const Profile = () => {
  const token = localStorage.getItem("userInfo");
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      nav("/");
    }
  }, [token]);

  const dispatch = useDispatch();
  const {
    loading: profileLoadin,
    success: profileSuccess,
    error: profileError,
    profile: profileGet,
    message: messageGet,
  } = useSelector((state) => state.getProfile);

  const {followersCount} = useSelector((state) => state.FollowCount)
  
  const { y } = useSelector((state) => state.getUserY);
  console.log(y);

  useEffect(() => {
    dispatch(getUserYActions());
    dispatch(getProfileActions());
    dispatch(FollowCountActions())
  }, [dispatch]);

  console.log(followersCount)

  return (
    <div class="container mt-2">
      <div class="row ">
        <div class="col-sm-3">
          <div class="card p-2">
            <img
              src={
                profileGet
                  ? `http://localhost:5001/uploads/${profileGet.profile_image}`
                  : "default.jpg"
              }
              style={{ height: "40%", width: "40%" }}
              class="mt-2 rounded-circle"
              alt="profile_image"
            ></img>
            <h4 class="mt-2">
              {profileGet ? `${profileGet.name}` : "You are not authenticated"}
            </h4>
            <small class="mt-2">
              {profileGet
                ? `@${profileGet.username}`
                : "You are not authenticated"}{" "}
            </small>

            <small className="mt-2">
              Followers: {followersCount ? `${followersCount}`: "0"}
            </small>

            
            <small class="mb-4 mt-2">
              {profileGet && profileGet.bio
                ? `${profileGet.bio}`
                : "No bio yet."}
            </small>


            {profileGet && (
              <UpdateProfile
                nameInitial={profileGet.name}
                usernameInitial={profileGet.username}
                bioInitial={profileGet.bio}
                profile_image_Initial={profileGet.profile_image}
              />
            )}
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
                      ) : null}

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

                  <div class="d-flex align-items-center">
                    {userY.isLiked ? (
                      <Unlike id={userY.tweet_id} />
                    ) : (
                      <Like id={userY.tweet_id} />
                    )}
                    <span class="mt-1">{userY.heart}</span>
                  </div>
                </div>
              ))
            : "Share your own Y"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
