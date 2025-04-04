import { useState } from "react";

const SearchY = () => {
  const [search, setSearch] = useState("");

  const searchButton = (e) => {
    e.preventDefault()
  }
 
  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="row w-100">
        <div className="col-sm-4 mx-auto">
          <form className="form-inline my-2 text-center d-flex gap-1">
            <input
              className="form-control w-100"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" onClick={searchButton}>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchY;
