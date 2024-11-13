import { React, useState } from "react";
import { ReactTyped } from "react-typed";
import {useDispatch} from "react-redux";
import { loginActions } from "../actions/authActions";
import {Link} from "react-router-dom";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault()

    const formData = {email, password};

    dispatch(loginActions(formData))
  }

  return (
    <div className="container d-flex min-vh-100 justify-content-center flex-column">
      <div class="row justify-content-center align-items-center">
        <div class="col-sm-6">
          <div class="animated-typing">
            <h1 class = "d-flex">What is it? <br/>Or Y is it?</h1>

            <ReactTyped
              strings={[
                "Y is this happening?",
                "Y is this a big deal?",
                "Share and asked Y?",
              ]}
              typeSpeed={100}
              backspeed={90}
              loop
            ></ReactTyped>
          </div>
        </div>

        <div class="col-sm-4 d-flex justify-content-center flex-column">
          <h3 class="justify-content-center">Log in</h3>
          <div class="card d-flex p-4 bg-light w-100">
            <form onSubmit={handleLogin}>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" onChange={e => setEmail(e.target.value)}></input>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" onChange = {e=>setPassword(e.target.value)}></input>
              </div>

              <button type="submit" class="btn btn-secondary mt-2">
                Login
              </button>
            </form>
              <Link to = "/register">
              <small>Register here</small>
              </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
