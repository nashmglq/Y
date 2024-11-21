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
    
    <div class="container mt-2">
      <div class="row ">
        <div class="col-sm-3">
          <div class="card p-2"> 
            <img
              src={
                profile
                  ? `http://localhost:5001/uploads/${profile.profile_image}`
                  : "default.jpg"
              }
              style={{ height: '40%', width: '40%' }}
              class = "mt-2 rounded-circle"
              alt="profile_image"
            ></img>
            <h4 class = "mt-2">{profile ? `${profile.name}` : "You are not authenticated"}</h4>
            <small class="mt-2">
              {profile ? `@${profile.username}` : "You are not authenticated"}{" "}
            </small>
            <small class = "mb-4 mt-2">
             {profile && profile.bio ? `${profile.bio}` : "No bio yet."}
            </small>

            {profile && (
              <UpdateProfile
                nameInitial = {profile.name}
                usernameInitial={profile.username}
                bioInitial={profile.bio}
                profile_image_Initial={profile.profile_image}
              />
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;



