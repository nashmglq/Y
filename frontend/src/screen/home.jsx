import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getYActions, postYActions } from "../actions/crudActions";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweet_img, setTweet_img] = useState("");
  const maxtext = 999;
  const nav = useNavigate();
  const getItem = localStorage.getItem("userInfo");
  const dispatch = useDispatch();
  const { loading, success, error, y, message } = useSelector(
    (state) => state.getY
  );

  
  const postHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("tweet", tweet)
    formData.append("tweet_img", tweet_img)
    dispatch(postYActions(formData))
    setTweet("")
  }


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
          <div className="col-lg-8">
            <h5>Share something</h5>
            <form onSubmit={postHandler}>
              <textarea
                className="bg-light text-white w-100 form-control"
                placeholder="What's happening?"
                value = {tweet}
                minLength={1}
                maxLength={999}
                onChange={(e) => setTweet(e.target.value)}
              ></textarea>
              <p>
                {tweet ? tweet.length : 0}/{maxtext}
              </p>

              <input type="file" className="form-control mt-2" onChange={e => setTweet_img( e.target.files[0])}></input>

              <button className="btn btn-primary mt-2">Y that</button>
            </form>
          </div>



          {/* Sticky Sidebar */}
          <div className="col-sm-4 position-sticky" style={{ top: "100px" }}>
            <h5>Recently visited</h5>
            <div className="card">
              <p>....</p>
            </div>
          </div>
        </div>
      </div>



      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8">
            <h5>Latest happenings</h5>
            {y ?
              y.map((tweets) => (
                <Link to = {`/home/${tweets.tweet_id}`} class = "text-decoration-none"
                >
                <div class="card mt-2">
                  <div>
                  <img src = {`http://localhost:5001/uploads/${tweets.profile_image}` || 'default.jpg' }
                   style={{height: '8%', width: '8%'}} class = "rounded-circle"/> <small>{`@${tweets.username}`}</small>
                   </div>
                  <p>{tweets.tweet}</p>
                  {tweets.img ? <img src = {`http://localhost:5001/uploads/${tweets.img}`}/> : null}
                </div>
                </Link>
              )) : "You are not authenticated"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
