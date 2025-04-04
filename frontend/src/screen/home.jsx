import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getYActions,
  postYActions,
  checkDetailLikeActions,
  likeCountActions
} from "../actions/crudActions";
import TimePosted from "../component/timePosted";
import Like, { Unlike } from "../component/like";
import SearchY from "../component/searchY";


const Home = () => {
  const { id } = useParams();

  const [tweet, setTweet] = useState("");
  const [tweet_img, setTweet_img] = useState("");
  const maxtext = 999;
  const nav = useNavigate();
  const getItem = localStorage.getItem("userInfo");
  const dispatch = useDispatch();
  const { loading, success, error, y, message } = useSelector(
    (state) => state.getY
  );

  const holderOfLike = null

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
    dispatch(checkDetailLikeActions(id));
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
            <div class="card mt-2 p-4">
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
                  ref={fileNameReset}
                  className="form-control mt-2"
                  onChange={(e) => setTweet_img(e.target.files[0])}
                ></input>

                <button className="btn btn-primary mt-4">Y that</button>
              </form>
            </div>
          </div>
          <div className="col-lg-8">
            <h5>Latest happenings</h5>
            {y ? (
              y.map((tweets) => (
                <div class="card mt-2 p-2" value={tweets.tweet_id}>
                  <div>
                    <Link
                      to={`/profile/${tweets.id}`}
                      class="text-dark text-decoration-none"
                    >
                      <img
                        src={
                          `http://localhost:5001/uploads/${tweets.profile_image}` ||
                          "default.jpg"
                        }
                        style={{ width: "40px", height: "40px" }}
                        className="rounded-circle img-fluid mt-2"
                      />{" "}
                      <small class="text-body-primary">
                        <b>{tweets.name} </b>
                      </small>
                      <small class="mr-2">
                        {`@${tweets.username}`} ·{" "}
                        <TimePosted time={tweets.date_published} />
                      </small>
                    </Link>
                    <small>
                      <small> {tweets.updated === 1 ? "· Edited" : null}</small>
                    </small>
                  </div>
                  <Link
                    to={`/home/${tweets.tweet_id}`}
                    class="text-decoration-none text-dark"
                  >
                    <p class="mt-2">{tweets.tweet}</p>
                    {tweets.img ? (
                      <div class="d-flex p-2 align-items-center justify-content-center">
                        <img
                          src={`http://localhost:5001/uploads/${tweets.img}`}
                          class="d-flex justify-content-center"
                          style={{ height: "100%", width: "100%" }}
                        />
                      </div>
                    ) : null}
                  </Link>
                  <div className="d-flex align-items-center">
                  {tweets.isLiked ?  <Unlike id = {tweets.tweet_id}/> : <Like id={tweets.tweet_id} />}
                  <span>{tweets.heart}</span>
              
                  </div>
                </div>
              ))
            ) : (
              <p>{message}</p>
            )}
          </div>
          <div class="col-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
