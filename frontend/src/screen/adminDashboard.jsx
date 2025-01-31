import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminListOfUserActions } from "../actions/adminActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.adminListOfUser);

  useEffect(() => {
    dispatch(adminListOfUserActions());
  }, []);
  return (
    <div>
      <div className="container mt-2">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-8">
            <h4>Users</h4>
            <div className="card">
              <div className="list-group">
                {message && Array.isArray(message)
                  ? message.map((usersList) => (
                      <li class="list-group-item list-group">
                        {usersList.username} {usersList.name} {usersList.email}
                      </li>
                    ))
                  : "somethhing"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
