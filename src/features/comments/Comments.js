import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectComments,
  selectCommentsStatus,
  selectCommentsVisibility,
} from "./commentsSlice";
import { togglePostsVisibility } from "../posts/postsSlice";
import { toggleCommentsVisibility } from "../comments/commentsSlice";
import "./comments.css";
import upArrow from "../../icons/bx-up-arrow-alt.svg";
import dnArrow from "../../icons/bx-down-arrow-alt.svg";

function Comments() {
  const commentsList = useSelector(selectComments);
  const status = useSelector(selectCommentsStatus);
  const visibility = useSelector(selectCommentsVisibility);
  const dispatch = useDispatch();

  if (visibility === "HIDDEN") {
    return;
  }

  if (status === "idle" || status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          dispatch(toggleCommentsVisibility());
          dispatch(togglePostsVisibility());
        }}>
        Go Back
      </button>
      <div>
        {commentsList.map((item, idx) => {
          return (
            <div className='comment-wrapper' key={idx}>
              {item.data.body}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
