import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectComments,
  selectCommentsStatus,
  selectCommentsVisibility,
  toggleCommentsVisibility,
} from "./commentsSlice";
import "./comments.css";
import upArrow from "../../icons/bx-up-arrow-alt.svg";
import dnArrow from "../../icons/bx-down-arrow-alt.svg";
import { selectQueryInput } from "../searchBar/searchBarSlice";
import {
  selectoriginalPostID,
  selectPosts,
  togglePostsVisibility,
} from "../posts/postsSlice";
import ReactMarkdown from "react-markdown";
import backArrow from "../../icons/bx-arrow-back.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Comments() {
  const commentsList = useSelector(selectComments);
  const commentsStatus = useSelector(selectCommentsStatus);
  const visibility = useSelector(selectCommentsVisibility);
  const queryInput = useSelector(selectQueryInput);
  const originalPostID = useSelector(selectoriginalPostID);
  const postsList = useSelector(selectPosts);
  const dispatch = useDispatch();

  if (visibility === "HIDDEN") {
    return;
  }

  if (
    commentsStatus === "idle" ||
    commentsStatus === "loading" ||
    commentsStatus === "rejected"
  ) {
    return (
      <div className='comment-skeleton'>
        <h1>
          <Skeleton count={1} />
        </h1>
        <p>
          <Skeleton count={5} />
        </p>
        <p>
          <Skeleton count={5} />
        </p>
      </div>
    );
  }

  let filteredList = commentsList;

  if (queryInput) {
    filteredList = commentsList.filter((item) => {
      return (
        item.data?.body.toLowerCase().includes(queryInput.toLowerCase()) ||
        item.data?.author.toLowerCase().includes(queryInput.toLowerCase())
      );
    });
  }

  //Filters postList array with selected post's id
  let originalPost = postsList.filter((item) => {
    if (item.data?.id === originalPostID) {
      return item.data;
    }
    return null;
  });

  let myDate = new Date(originalPost[0]?.data?.created * 1000);

  return (
    <div className='post-comments-container'>
      <div className='original-post'>
        <div className='comment-left'>
          <div className='upvote'>
            <img src={upArrow} className='upArrow' alt='up-arrow' />
          </div>
          <div className='vote-number'>{originalPost[0]?.data?.score}</div>
          <img src={dnArrow} className='dnArrow' alt='down-arrow' />
          <div className='downVote'></div>
        </div>
        <div className='comment-right'>
          <button
            onClick={() => {
              if (visibility === "SHOW") {
                dispatch(togglePostsVisibility());
                dispatch(toggleCommentsVisibility());
              }
            }}
            className='commentsBtn'>
            <img src={backArrow} alt=''></img>
            r/{postsList[0]?.data?.subreddit}/posts
          </button>
          <div className='post-byline'>
            {"Posted by: " +
              originalPost[0]?.data?.author +
              " on " +
              myDate.toLocaleString()}
          </div>
          <h1>{originalPost[0]?.data?.title}</h1>
          <ReactMarkdown>{originalPost[0]?.data?.selftext}</ReactMarkdown>
          <img src={originalPost[0]?.data?.url} alt=''></img>
          <div className='votes-icon-container post-footer'>
            <img src={upArrow} alt='' />
            <span>{originalPost[0].data?.score}</span>
            <img src={dnArrow} alt='' />
          </div>
        </div>
      </div>

      <div className='comments'>
        {filteredList.map((item, idx) => {
          myDate = new Date(item.data?.created * 1000);
          return (
            <div className='comment-wrapper' key={idx}>
              <div className='comment-left'>
                <div className='upvote'>
                  <img src={upArrow} className='upArrow' alt='up-arrow' />
                </div>
                <div className='vote-number'>{item.data?.score}</div>
                <img src={dnArrow} className='dnArrow' alt='down-arrow' />
                <div className='downVote'></div>
              </div>
              <div className='comment-right'>
                <p className='post-byline'>
                  {"Posted by: " +
                    item?.data?.author +
                    " on " +
                    myDate.toLocaleString()}
                </p>
                <ReactMarkdown>{item.data?.body}</ReactMarkdown>
                <div className='votes-icon-container post-footer'>
                  <img src={upArrow} alt='' />
                  <span>{item.data?.score}</span>
                  <img src={dnArrow} alt='' />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
