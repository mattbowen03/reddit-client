import React from "react";
import "./searchBar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmptyValue,
  setQueryInput,
  setSearchBarValue,
  selectSearchBarValue,
} from "./searchBarSlice";
import { selectPosts } from "../posts/postsSlice";
import { toggleHamburgerMenuVisibility } from "../hamburgerMenu/hamburgerMenuSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const subreddit = useSelector(selectPosts);
  const searchBarValue = useSelector(selectSearchBarValue);

  if (subreddit === "Loading") {
    return (
      <div>
        <input type='text' placeholder={"Search r/"}></input>
      </div>
    );
  }

  return (
    <div className='searchBar-wrapper'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setQueryInput());
          dispatch(setEmptyValue());
          dispatch(toggleHamburgerMenuVisibility());
        }}>
        <input
          type='text'
          placeholder={"Search r/" + subreddit[0].data.subreddit}
          value={searchBarValue}
          onChange={(e) => {
            dispatch(setSearchBarValue(e.target.value));
          }}></input>
        <input type='submit'></input>
      </form>
    </div>
  );
}

export default SearchBar;
