import { useState } from "react";

const Home = () => {
  const [textLength, setTextLength] = useState(0);
  const maxtext = 400;

  console.log(textLength);

  return (
    <div>
      <div className="container d-flex mt-4">
        <div className="row w-100">
          <div className="col-lg-8">
            <h5>Share something</h5>
            <form>
              <textarea
                className="bg-light text-white w-100 form-control"
                placeholder="What's happening?"
                minLength={1}
                maxLength={400}
                onChange={(e) => setTextLength(e.target.value.length)}
              ></textarea>
              <p>
                {textLength}/{maxtext}
              </p>

              <input type="file" className="form-control mt-2"></input>

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
          <div className="col">
            <div className="card">
                <h5>Latest happenings</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
