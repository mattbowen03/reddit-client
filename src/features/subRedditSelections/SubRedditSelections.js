import React from "react";
import "./subRedditSelections.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync, togglePostsVisibility } from "../posts/postsSlice";
import {
  toggleCommentsVisibility,
  selectCommentsVisibility,
} from "../comments/commentsSlice";
import { subredditList } from "../../modules/subredditList";

function SubRedditSelections() {
  const dispatch = useDispatch();
  const visibility = useSelector(selectCommentsVisibility);

  return (
    <div className='selections-wrapper'>
      <h3>Featured SubReddits</h3>
      {subredditList.map((subreddit, idx) => {
        return (
          <button
            className='subredditSelectionButton'
            key={idx}
            onClick={() => {
              dispatch(fetchPostsAsync(subreddit.url));
              if (visibility === "SHOW") {
                dispatch(togglePostsVisibility());
                dispatch(toggleCommentsVisibility());
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
