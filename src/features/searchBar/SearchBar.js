import React from "react";
import "./searchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { setQueryInput, setSearchBarValue } from "./searchBarSlice";
import { selectPosts } from "../posts/postsSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const subreddit = useSelector(selectPosts);

  if (subreddit === "Loading") {
    return (
      <div>
        <input type='text' placeholder={"Search r/"}></input>
      </div>
    );
  }

  return (
    <div className='searchBar-wrapper'>
      <input
        type='text'
        placeholder={"Search r/" + subreddit[0].data.subreddit}
        onChange={(e) => {
          dispatch(setQueryInput(e.target.value));
          dispatch(setSearchBarValue(e.target.value));
        }}></input>
    </div>
  );
}

export default SearchBar;
