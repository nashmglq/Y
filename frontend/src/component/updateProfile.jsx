import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { updateProfileAction } from "../actions/authActions";

const UpdateProfile = ({
  usernameInitial,
  bioInitial,
  profile_image_Initial,
}) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(usernameInitial);
  const [bio, setBio] = useState(bioInitial);
  const [profile_image, setProfile_image] = useState(profile_image_Initial);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.updateProfile
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    setShow(false);

    // we cant do this because we pass files, because it is not a regular object as we saw in console.log = {username, bio, profile_image}

    console.log(profile_image);

    const formData = new FormData(); // new object wtih key/value empty
    // soo formData (key, value)
    formData.append("username", username);
    formData.append("bio", bio);

    // Check if profile_image has a value, and if so, append it to formData
    if (profile_image) {
      // file object is large
      //so that is why we cant {} use this becuase this wont get an object with a lot of things
      // {} can only handle one value
      formData.append("profile_image", profile_image);
    }

    dispatch(updateProfileAction(formData));
    console.log(formData);

    // FINAL NOTE:
    // why initial being taken as body? because it is an string object without the whole file (it is not taken as file as shown in backend)
  };

  return (
    <div>
      <button class="btn btn-primary" onClick={showModal}>
        Update Profile
      </button>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="form-group" onSubmit={handleUpdate}>
            <label>Profile picture</label>
            <input
              class="form-control"
              type="file"
              onChange={(e) =>
                // get the whole file object
                setProfile_image(e.target.files[0] || profile_image_Initial)
              }
            ></input>
            <label>Username</label>
            <input
              class="form-control"
              type="text"
              placeholder={username}
              onChange={(e) =>
                setUsername(e.target.value ? e.target.value : username)
              }
            ></input>
            <label>Bio</label>
            <textarea
              class="form-control"
              placeholder={bio}
              onChange={(e) => setBio(e.target.value ? e.target.value : bio)}
            ></textarea>
            <Modal.Footer>
              <button class="btn btn-primary">Save Changes</button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
