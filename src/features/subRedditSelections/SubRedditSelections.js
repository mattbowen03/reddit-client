import React from "react";
import "./subRedditSelections.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsAsync,
  togglePostsVisibility,
  selectCurrentSubreddit,
} from "../posts/postsSlice";
import {
  toggleCommentsVisibility,
  selectCommentsVisibility,
} from "../comments/commentsSlice";
import { subredditList } from "../../modules/subredditList";
import SearchBar from "../searchBar/SearchBar";
import {
  toggleHamburgerMenuVisibility,
  selectHamburgerMenuVisibility,
} from "../hamburgerMenu/hamburgerMenuSlice";

function SubRedditSelections() {
  const dispatch = useDispatch();
  const visibility = useSelector(selectCommentsVisibility);
  const currentSubreddit = "r/" + useSelector(selectCurrentSubreddit);
  const hamburgerMenuVisibility = useSelector(selectHamburgerMenuVisibility);

  return (
    <div className='selections-wrapper'>
      <div className='selections-title'>My subReddits</div>
      <div className='hamburger-searchBar'>
        <SearchBar />
      </div>
      {subredditList.map((subreddit, idx) => {
        return (
          <button
            className={
              currentSubreddit === subreddit.name
                ? "subredditSelectionButton currentSubreddit"
                : "subredditSelectionButton"
            }
            key={idx}
            onClick={() => {
              dispatch(fetchPostsAsync(subreddit.url));
              if (visibility === "SHOW") {
                dispatch(togglePostsVisibility());
                dispatch(toggleCommentsVisibility());
              }
              if (hamburgerMenuVisibility === "SHOW") {
                dispatch(toggleHamburgerMenuVisibility());
              }
            }}>
            {subreddit.name}
          </button>
        );
      })}
    </div>
  );
}

export default SubRedditSelections;
