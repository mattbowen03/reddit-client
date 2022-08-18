import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQueryInput,
  setEmptyQueryInput,
} from "../searchBar/searchBarSlice";
import { selectPosts } from "../posts/postsSlice";
import "./queryResults.css";
import { selectCommentsVisibility } from "../comments/commentsSlice";

function QueryResults() {
  const queryInput = useSelector(selectQueryInput);
  const subreddit = useSelector(selectPosts);
  const dispatch = useDispatch();
  const commentsVisibility = useSelector(selectCommentsVisibility);

  if (subreddit === "loading") {
    return;
  }

  if (queryInput === "" && commentsVisibility === "HIDDEN") {
    return (
      <div className='queryResults-wrapper breadcrumb'>
        <h1>{"r/" + subreddit[0]?.data?.subreddit + "/posts"}</h1>
      </div>
    );
  }

  if (queryInput === "" && commentsVisibility === "SHOW") {
    return;
  }

  return (
    <div className='queryResults-wrapper'>
      <span className='queryResults-header'>
        Results for "{queryInput}" in {"r/" + subreddit[0]?.data?.subreddit}:
      </span>
      <button
        className='clearQueryBtn'
        onClick={() => dispatch(setEmptyQueryInput())}>
        Clear Search
      </button>
    </div>
  );
}

export default QueryResults;
