import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TimePosted from "../component/timePosted";
import Like, { Unlike } from "../component/like";
import { postYActions } from "../actions/crudActions";
const SeachQuery = () => {
  const [tweet, setTweet] = useState("");
  const [tweet_img, setTweet_img] = useState("");
  const { message } = useSelector((state) => state.searchY);
  const maxtext = 999;
  const dispatch = useDispatch();
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
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
        {/* <h5>Results from "{}"</h5> */}
          {message && Array.isArray(message)
            ? message.map((tweets) => (
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
                    {tweets.isLiked ? (
                      <Unlike id={tweets.tweet_id} />
                    ) : (
                      <Like id={tweets.tweet_id} />
                    )}
                    <span>{tweets.heart}</span>
                  </div>
                </div>
              ))
            : message}
        </div>
      </div>
    </div>
  );
};
export default SeachQuery;
