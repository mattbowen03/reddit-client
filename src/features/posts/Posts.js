import React from "react";
import "./posts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  selectPostsVisibility,
  togglePostsVisibility,
  setOriginalPostID,
} from "./postsSlice";
import {
  fetchCommentsAsync,
  toggleCommentsVisibility,
} from "../comments/commentsSlice";
import upArrow from "../../icons/bx-up-arrow-alt.svg";
import dnArrow from "../../icons/bx-down-arrow-alt.svg";
import commentIcon from "../../icons/bx-comment-detail.svg";
import { selectQueryInput } from "../searchBar/searchBarSlice";
import ReactMarkdown from "react-markdown";

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

  console.log({ postsList });

  let filteredList = postsList;

  if (queryInput) {
    filteredList = postsList.filter((item) => {
      return (
        item.data.title.toLowerCase().includes(queryInput.toLowerCase()) ||
        item.data.selftext.toLowerCase().includes(queryInput.toLowerCase()) ||
        item.data.author.toLowerCase().includes(queryInput.toLowerCase())
      );
    });
  }

  return (
    <div className='posts-wrapper'>
      {filteredList.map((item, idx) => {
        let myDate = new Date(item.data.created * 1000);

        return (
          <div
            onClick={() => {
              dispatch(
                fetchCommentsAsync(
                  "https://www.reddit.com" + item.data.permalink + ".json"
                )
              );
              dispatch(toggleCommentsVisibility());
              dispatch(togglePostsVisibility());
              dispatch(setOriginalPostID(item.data.id));
            }}
            className='post'
            key={idx}>
            <div className='post-left'>
              <div className='upvote'>
                <img src={upArrow} className='upArrow' alt='up-arrow' />
              </div>
              <div className='vote-number'>{item.data.score}</div>
              <img src={dnArrow} className='dnArrow' alt='down-arrow' />
              <div className='downVote'></div>
            </div>
            <div className='post-right'>
              <div className='post-wrap'>
                <h3>
                  Posted by {item.data.author} on {myDate.toLocaleString()}
                </h3>
                <h2>{item.data.title}</h2>
                <div className='post-text'>
                  <ReactMarkdown>{item.data.selftext}</ReactMarkdown>
                </div>
                <img src={item.data.url} alt='' />
              </div>
              <div className='text-fade'></div>
              <button
                className='commentsBtn'
                key={idx}
                onClick={() => {
                  dispatch(
                    fetchCommentsAsync(
                      "https://www.reddit.com" + item.data.permalink + ".json"
                    )
                  );
                  dispatch(toggleCommentsVisibility());
                  dispatch(togglePostsVisibility());
                  dispatch(setOriginalPostID(item.data.id));
                }}>
                <img src={commentIcon} alt=''></img>
                {item.data.num_comments} Comments
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
