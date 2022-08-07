import React from "react";
import "./posts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  selectPostsVisibility,
  togglePostsVisibility,
} from "./postsSlice";
import {
  fetchCommentsAsync,
  toggleCommentsVisibility,
} from "../comments/commentsSlice";
import upArrow from "../../icons/bx-up-arrow-alt.svg";
import dnArrow from "../../icons/bx-down-arrow-alt.svg";

function Posts() {
  const postsList = useSelector(selectPosts);
  const visibility = useSelector(selectPostsVisibility);
  const dispatch = useDispatch();

  if (visibility === "HIDDEN") {
    return;
  }

  if (postsList === "Loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className='posts-wrapper'>
      {/* <h2>{postsList[0].data.subreddit_name_prefixed}</h2> */}
      {postsList.map((item, idx) => {
        let myDate = new Date(item.data.created * 1000);

        return (
          <div className='post' key={idx}>
            <div className='post-left'>
              <div className='upvote'>
                <img src={upArrow} className='upArrow' alt='up-arrow' />
              </div>
              <div className='vote-number'>{item.data.score}</div>
              <img src={dnArrow} className='dnArrow' alt='down-arrow' />
              <div className='downVote'></div>
            </div>
            <div className='post-right'>
              <h2>{item.data.title}</h2>
              <h3>
                Posted by {item.data.author} on {myDate.toLocaleString()}
              </h3>
              <div className='post-content'>{item.data.selftext}</div>
              <button
                onClick={() => {
                  dispatch(fetchCommentsAsync(item.data.url + ".json"));
                  dispatch(toggleCommentsVisibility());
                  dispatch(togglePostsVisibility());
                }}>
                See Comments
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
