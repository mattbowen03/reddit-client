import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQueryInput,
  setEmptyQueryInput,
} from "../searchBar/searchBarSlice";
import { selectPosts } from "../posts/postsSlice";
import "./queryResults.css";

function QueryResults() {
  const queryInput = useSelector(selectQueryInput);
  const subreddit = useSelector(selectPosts);
  const dispatch = useDispatch();

  if (subreddit === "loading") {
    return;
  }

  if (queryInput === "") {
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
