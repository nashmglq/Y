import { useEffect, useState } from "react";
import { changePasswordActions } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const dispatch = useDispatch();
  const {loading, success, error, message} = useSelector((state) => state.changePassword)

  const updatePassword = (e) => {
    e.preventDefault();
// Use objects to pass data to the backend for easier targeting by names.
// [] = ['qwe', 'qwe']
// {} = {name: "qwe", name2: "qwe"}
    const formData = {oldPassword, newPassword};
    dispatch(changePasswordActions(formData));
    // just like getting the value
    setOldPassword("")
    setnewPassword("")
  };

  return (
    <div class="container mt-4 justify-content-center align-items-center d-flex">
      <div class="row">
        <div class="col">
          <div class="card p-4">
            <h2>Change password</h2>
            <form onSubmit={updatePassword}>
              <div class="form-group">
                <label>Old Password:</label>
                <input
                  class="form-control"
                  placeholder="Old password"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value = {oldPassword}
                ></input>
                <label>New Password:</label>
                <input
                  class="form-control"
                  placeholder="New password"
                  type="password"
                  onChange={(e) => setnewPassword(e.target.value)}
                  value = {newPassword}
                ></input>
              </div>

              {message ? <p class = "mt-2">{message}</p> : ""}

              <button class="btn btn-primary mt-2">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
