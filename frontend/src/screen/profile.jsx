import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileActions } from "../actions/authActions";
import UpdateProfile from "../component/updateProfile";
import Header from "../component/header";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const token = localStorage.getItem("userInfo")
  const nav = useNavigate()
  useEffect(() =>{
    if(!token){
      nav("/")
    }
  },[token])

  const dispatch = useDispatch();
  // Initially, profile is undefined, causing an error when accessing username. Since the effect runs once, it won't update profile until the next render.
  const { loading, success, error, profile, message } = useSelector((state) => state.getProfile);
  // it does get the new one however we have an error so it will be distrupted so no re-rendering
  useEffect(() => {
    dispatch(getProfileActions());
  }, [dispatch]);

  return (
    
    <div class="container-fluid d-flex justify-content-center align-items-center mt-2">
      <div class="row">
        <div class="col-lg-12">
          <div class="card p-4">
            <h1>Profile</h1>

            {/* use && so we do not set null */}
            {profile && (
              <UpdateProfile
                usernameInitial={profile.username}
                bioInitial={profile.bio}
                profile_image_Initial={profile.profile_image}
              />
            )}

            <img
              src={
                profile
                  ? `http://localhost:5001/uploads/${profile.profile_image}`
                  : "default.jpg"
              }
              style={{ height: 200 }}
              class = "mt-2"
              alt="profile_image"
            ></img>
            <small class="mt-2">
              {profile ? `@${profile.username}` : "You are not authenticated"}{" "}
            </small>
            <p class="mt-2">
              Email:{" "}
              {profile ? `${profile.email}` : "You are not authenticated"}
            </p>
            <p>
              Bio: {profile && profile.bio ? `${profile.bio}` : "No bio yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
