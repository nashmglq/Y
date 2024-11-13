import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { emailVerifyAction } from "../actions/authActions";

const VerifiedEmail = () => {
  const location = useLocation(); // current location of the url
  const queryParams = new URLSearchParams(location.search); // get the ? (query)
  const token = queryParams.get("token"); // get the token part
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.emailVerify) 

  console.log(queryParams); // size of the queries

  useEffect(() => {
    dispatch(emailVerifyAction(token));
  }, []); // add if u want something change it will do this again

  return (
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
      <div class="row">
        <div class="col">
          <div class="card p-4">
           {message && <h3>{message}</h3>}
            <button class="btn btn-secondary">Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
