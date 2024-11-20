import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getYActions, postYActions } from "../actions/crudActions";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweet_img, setTweet_img] = useState("")
  const maxtext = 999;
  const nav = useNavigate();
  const getItem = localStorage.getItem("userInfo");
  const dispatch = useDispatch();
  const { loading, success, error, y, message } = useSelector(
    (state) => state.getY
  );


// useRef stores a reference to a DOM element (like a file input)
// to interact with it directly without updating the component.
const fileNameReset = useRef(null);


  const postHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tweet", tweet);
    formData.append("tweet_img", tweet_img);
    dispatch(postYActions(formData));
    setTweet("");
    fileNameReset.current.value = "";
  };

  useEffect(() => {
    dispatch(getYActions());
  }, [dispatch]);

  useEffect(() => {
    if (!getItem) {
      nav("/");
    }
  });

  return (
    <div>
      <div className="container d-flex mt-4 justify-content-center">
        <div className="row w-100">
          <div class="col-lg-3">
            <div class="card sticky-top mt-2">
              <h4>Recent visit</h4>
            </div>
          </div>
          <div className="col-lg-6">
            <h5>Latest happenings</h5>
            {y
              ? y.map((tweets) => (
                  <Link
                    to={`/home/${tweets.tweet_id}`}
                    class="text-decoration-none"
                  >
                    <div class="card mt-2 p-2">
                      <div>
                        <img
                          src={
                            `http://localhost:5001/uploads/${tweets.profile_image}` ||
                            "default.jpg"
                          }
                          style={{ height: "8%", width: "8%" }}
                          class="rounded-circle mt-1"
                        />{" "}
                        <small>{`@${tweets.username}`}</small>
                      </div>
                      <p>{tweets.tweet}</p>
                      {tweets.img ? (
                        <div class = "d-flex p-2 align-items-center justify-content-center">
                        <img
                          src={`http://localhost:5001/uploads/${tweets.img}`}
                          class = "d-flex justify-content-center"
                          style={{ height: "100%", width: "100%" }}
                        />
                        </div>
                      ) : null}
                   
                    </div>
                  </Link>
                ))
              : <p>{message}</p>}
          </div>
          <div class="col-3">
            <div class="card sticky-top mt-2 p-4">
              <form onSubmit={postHandler}>
                <textarea
                  className="bg-light text-white w-100 form-control"
                  placeholder="What's happening?"
                  value={tweet}
                  minLength={1}
                  maxLength={999}
                  onChange={(e) => setTweet(e.target.value)}
                ></textarea>
                <p>
                  {tweet ? tweet.length : 0}/{maxtext}
                </p>

                <input
                  type="file"
                  ref = {fileNameReset}
                  className="form-control mt-2"
                  onChange={(e) => setTweet_img(e.target.files[0])}
                ></input>

                <button className="btn btn-primary mt-4">Y that</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
