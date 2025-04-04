import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { registerReducer } from "../reducers/authReducer";
const Register = () => {
  // useState, when load, put it to the value of none
  // after useEffect, the data will be now empty, and will be put inside the box
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const { loading, success, message } = useSelector(
    (state) => state.registerUser
  );
  const nav = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("userInfo")

    if(token){
      nav("/profile")
    }
  })

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = { email, username, name, password, password2 };
    dispatch(registerAction(formData));
  };

  // think of this, argument is something that you pass on the fucntion so in this case useEffect
  // cannot use an arguement if we dont pass anything, if u try to use, then it would be undefined
  useEffect(() => {
    // u cannot use useState inside other hookd
    if (success) {
      // set it as empty
      setEmail("");
      setUsername("");
      setName("");
      setPassword("");
      setPassword2("");
    }
  }, [success]);

  console.log(success);

  return (
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="row">
        <div class="col">
          <h1>Join us now</h1>
          <div class=" card p-4">
            <form onSubmit={handleRegister}>
              <div class="form-group">
                <label>Email: </label>
                <input
                  type="email"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label>Username: </label>
                <input
                  type="text"
                  class="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label>Name:</label>
                <input type = "text" class = "form-control" value = {name} onChange = {e => setName(e.target.value)}>
                </input>
                <label>Password: </label>
                <input
                  type="password"
                  class="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label>Re-type Password: </label>
                <input
                  type="password"
                  class="form-control"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                ></input>
              </div>

              {loading 
              ? (
                <button class="btn btn-secondary mt-2 col-12 active disabled">Processing...</button>
              ) : (
                <button class="btn btn-secondary mt-2 col-12">Register</button>
              )}
            </form>

            <Link to="/">
              <small class="mt-2">Login here.</small>
            </Link>

            <Link to="/resend-verification">
              <small class="mt-2">Resend verification here.</small>
            </Link>

            {/* {message ? <p>{message}</p> : ""} */}
            {/* same with ternary, if we have both then do it, */}
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
