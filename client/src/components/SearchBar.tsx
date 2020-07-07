import React from "react";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  return (
    <div className="search-container form-group row">
      <label htmlFor="search" className="search-field col-form-label">
        <GoSearch className="search-icon" />
        Search
      </label>
      <input
        type="text"
        className="form-control col-sm-9"
        placeholder="Enter keywords to find your orders"
      />
    </div>
  );
};

export default SearchBar;
