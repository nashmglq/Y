import { useState } from "react";

const SearchY = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container align-items-center justify-content-end mt-4">
      <div className="row">
        <div className="col-sm-4">
          <form class="form-inline my-2">
            <input
              class="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchY;
