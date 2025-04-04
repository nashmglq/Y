import { useDispatch, useSelector } from "react-redux";

const SeachQuery = () => {
  const { message } = useSelector((state) => state.searchY);

  return (
    <div className="container">
      {message && Array.isArray(message)
        ? message.map((tweets) => (
            <div className="container">
              <div className="row  mt-2">
                <div className="col-lg-12">
                  <div className="card">
                    <p>{tweets.tweet}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : message}
    </div>
  );
};
export default SeachQuery;
