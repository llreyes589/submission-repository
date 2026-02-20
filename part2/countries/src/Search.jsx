import React from "react";

const Search = ({ searchString, setSearchString }) => {
  return (
    <div>
      <span>find countries</span>{" "}
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e)}
      />
    </div>
  );
};

export default Search;
