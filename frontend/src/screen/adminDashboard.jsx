import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminCheckerActions,adminListOfUserActions } from "../actions/adminActions";
import DeleteUser from "../component/deleteUser";
import SuspendUser from "../component/suspendUser";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.adminListOfUser);
  const getToken = JSON.parse(localStorage.getItem("userInfo"))
  const nav = useNavigate()

  useEffect(() => {
    if(getToken.is_admin === 0){
      nav("/")
    }
    dispatch(adminListOfUserActions());
  }, [dispatch]);

  
  return (
    <div>
      <div className="container mt-2">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-8">
            <h4>Users</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Profile</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">User Status</th>
                    <th scope="col">Suspend User</th>
                    <th scope="col">Delete User</th>
                  </tr>
                </thead>
                <tbody>
                  {message && Array.isArray(message) ? (
                    message.map((usersList) => (
                      <tr key={usersList.id}>
                        <td>
                          <img
                            src={
                              `http://localhost:5001/uploads/${usersList.profile_image}` ||
                              "default.jpg"
                            }
                            className="rounded-circle img-fluid"
                            style={{ width: "40px", height: "40px" }}
                            alt="Profile"
                          />
                        </td>
                        <td>@{usersList.username}</td>
                        <td>{usersList.email}</td>
                        <td>{usersList.is_admin === 1 ? "Admin" : "User"}{" "}{usersList.is_verified === 1 ? "(Active)" : "(Inactive)" }</td>
                        <td>
                            <SuspendUser id = {usersList.id} check = {usersList.is_verified}/>
                        </td>
                        <td>
                          <DeleteUser id = {usersList.id}/>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
