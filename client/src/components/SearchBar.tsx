import React, { Dispatch, useState } from "react";
import { GoSearch } from "react-icons/go";
import { Actions } from "../interface/actions";
import { SearchRequest } from "../actions/SearchOrders";
import { SEARCH_REQUEST_ACTION } from "../constants";

interface Props {
  dispatch: Dispatch<Actions>;
}

const SearchBar: React.FC<Props> = ({ dispatch }) => {
  const [keyword, setKeyword] = useState("");
  function hanldeOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }
  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    let input = document.getElementById("keyword") as HTMLInputElement;
    input.value = "";
    const action = SearchRequest(keyword);
    dispatch({ type: SEARCH_REQUEST_ACTION, payload: action.payload });
  }
  return (
    <form className="search-container form-group row" onSubmit={handleSubmit}>
      <label htmlFor="search" className="search-field col-form-label">
        <GoSearch className="search-icon" />
        Search
      </label>
      <input
        id="keyword"
        type="text"
        onChange={hanldeOnChange}
        className="form-control col-sm-9"
        placeholder="Enter keywords to find your orders"
      />
    </form>
  );
};

export default SearchBar;
