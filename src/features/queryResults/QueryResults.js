import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQueryInput,
  setEmptyQueryInput,
} from "../searchBar/searchBarSlice";
import { selectPosts } from "../posts/postsSlice";
import "./queryResults.css";
import {
  selectCommentsVisibility,
  selectComments,
} from "../comments/commentsSlice";

function QueryResults() {
  const queryInput = useSelector(selectQueryInput);
  const subreddit = useSelector(selectPosts);
  const dispatch = useDispatch();
  const commentsVisibility = useSelector(selectCommentsVisibility);
  const commentsList = useSelector(selectComments);

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
    return (
      <div className='queryResults-wrapper breadcrumb'>
        <h1>
          {"r/" +
            subreddit[0]?.data?.subreddit +
            "/" +
            "comments/" +
            commentsList[0].data?.author}
        </h1>
      </div>
    );
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
