import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendEmailVerificationAction } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.resendEmailVerification);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userInfo");

    if (token) {
      nav("/profile");
    }
  });

  const handleResend = (e) => {
    e.preventDefault();

    const resendEmail = { email };

    dispatch(resendEmailVerificationAction(resendEmail));
  };
  return (
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="row">
        <div class="col-lg-12">
          <h3> Re-Send Email Verification</h3>
          <div class="card p-4">
            <form onSubmit={handleResend}>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <button class="btn btn-secondary col-12 mt-4">Resend</button>
              <Link to="/">
                <small class="mt-2">Login here.</small>
              </Link>

              {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;
