import React from "react";
import "./posts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  selectPostsVisibility,
  togglePostsVisibility,
  setSelectedPost,
} from "./postsSlice";
import {
  fetchCommentsAsync,
  toggleCommentsVisibility,
} from "../comments/commentsSlice";
import upArrow from "../../icons/bx-up-arrow-alt.svg";
import dnArrow from "../../icons/bx-down-arrow-alt.svg";
import { selectQueryInput } from "../searchBar/searchBarSlice";

function Posts() {
  const postsList = useSelector(selectPosts);
  const visibility = useSelector(selectPostsVisibility);
  const queryInput = useSelector(selectQueryInput);
  const dispatch = useDispatch();

  if (visibility === "HIDDEN") {
    return;
  }

  if (postsList === "Loading") {
    return <div>Loading...</div>;
  }

  if (queryInput) {
    return (
      <div>
        {postsList.map((item, idx) => {
          let myDate = new Date(item.data.created * 1000);
          if (
            item.data.title.includes(queryInput) ||
            item.data.selftext.includes(queryInput) ||
            item.data.author.includes(queryInput)
          ) {
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
                  <p className='post-content'>{item.data.selftext}</p>
                  <button
                    onClick={() => {
                      dispatch(fetchCommentsAsync(item.data.url + ".json"));
                      dispatch(toggleCommentsVisibility());
                      dispatch(togglePostsVisibility());
                      dispatch(setSelectedPost(item.data.title));
                    }}>
                    See Comments
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
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
              <p className='post-content'>{item.data.selftext}</p>
              <button
                key={idx}
                onClick={() => {
                  dispatch(fetchCommentsAsync(item.data.url + ".json"));
                  dispatch(toggleCommentsVisibility());
                  dispatch(togglePostsVisibility());
                  dispatch(
                    setSelectedPost([
                      item.data.title,
                      item.data.author,
                      myDate.toLocaleString(),
                      item.data.selftext,
                    ])
                  );
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
