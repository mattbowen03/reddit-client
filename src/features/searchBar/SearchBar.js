import React from "react";
import "./searchBar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmptyValue,
  setQueryInput,
  setSearchBarValue,
  selectSearchBarValue,
} from "./searchBarSlice";
import { selectPosts, selectPostsStatus } from "../posts/postsSlice";
import { toggleHamburgerMenuVisibility } from "../hamburgerMenu/hamburgerMenuSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const postsList = useSelector(selectPosts);
  const searchBarValue = useSelector(selectSearchBarValue);
  const postsStatus = useSelector(selectPostsStatus);

  if (postsList === "loading") {
    return (
      <div className='searchBar-wrapper'>
        <form>
          <input type='text' placeholder='Search r/'></input>
        </form>
      </div>
    );
  }

  if (postsStatus === "rejected") {
    return;
  }

  return (
    <div className='searchBar-wrapper'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setQueryInput());
          dispatch(setEmptyValue());
          dispatch(toggleHamburgerMenuVisibility());
          document.activeElement.blur();
        }}>
        <input
          type='text'
          placeholder={"Search r/" + postsList[0]?.data?.subreddit}
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
