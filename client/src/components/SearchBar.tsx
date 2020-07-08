import React, { Dispatch } from "react";
import { GoSearch } from "react-icons/go";
import { Actions } from "../interface/actions";
import { KEYWORD_SEARCH_ACTION } from "../constants";

interface Props {
  dispatch: Dispatch<Actions>;
}

const SearchBar: React.FC<Props> = ({ dispatch }) => {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: KEYWORD_SEARCH_ACTION, payload: e.target.value })
        }
      />
    </div>
  );
};

export default SearchBar;
