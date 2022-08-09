import React from "react";
import { useSelector } from "react-redux";
import {
  selectComments,
  selectCommentsStatus,
  selectCommentsVisibility,
} from "./commentsSlice";
import "./comments.css";
import upArrow from "../../icons/bx-up-arrow-alt.svg";
import dnArrow from "../../icons/bx-down-arrow-alt.svg";
import { selectQueryInput } from "../searchBar/searchBarSlice";
import { selectedPost } from "../posts/postsSlice";
import ReactMarkdown from "react-markdown";

function Comments() {
  const commentsList = useSelector(selectComments);
  const status = useSelector(selectCommentsStatus);
  const visibility = useSelector(selectCommentsVisibility);
  const queryInput = useSelector(selectQueryInput);
  const originalPost = useSelector(selectedPost);

  if (visibility === "HIDDEN") {
    return;
  }

  if (status === "idle" || status === "pending") {
    return <div>Loading...</div>;
  }

  console.log(originalPost);

  if (queryInput) {
    return (
      <div className='post-comments-container'>
        <div className='original-post'>
          <div className='comment-left'>
            <div className='upvote'>
              <img src={upArrow} className='upArrow' alt='up-arrow' />
            </div>
            <div className='vote-number'>{originalPost[4]}</div>
            <img src={dnArrow} className='dnArrow' alt='down-arrow' />
            <div className='downVote'></div>
          </div>
          <div className='comment-right'>
            <h3>{"Posted by: " + originalPost[1] + "on " + originalPost[2]}</h3>
            <h2>{originalPost[0]}</h2>
            <p>{originalPost[3]}</p>
          </div>
        </div>
        <div className='comments'>
          {commentsList.map((item, idx) => {
            if (
              item.data.body.includes(queryInput) ||
              item.data.author.includes(queryInput)
            ) {
              return (
                <div className='comment-wrapper' key={idx}>
                  <div className='comment-left'>
                    <div className='upvote'>
                      <img src={upArrow} className='upArrow' alt='up-arrow' />
                    </div>
                    <div className='vote-number'>{item.data.score}</div>
                    <img src={dnArrow} className='dnArrow' alt='down-arrow' />
                    <div className='downVote'></div>
                  </div>
                  <div className='comment-right'>
                    <p>{item.data.body}</p>
                    <p>{item.data.author}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className='post-comments-container'>
      <div className='original-post'>
        <div className='comment-left'>
          <div className='upvote'>
            <img src={upArrow} className='upArrow' alt='up-arrow' />
          </div>
          <div className='vote-number'>{originalPost[4]}</div>
          <img src={dnArrow} className='dnArrow' alt='down-arrow' />
          <div className='downVote'></div>
        </div>
        <div className='comment-right'>
          <h3>{"Posted by: " + originalPost[1] + "on " + originalPost[2]}</h3>
          <h2>{originalPost[0]}</h2>
          <p>{originalPost[3]}</p>
        </div>
      </div>

      <div className='comments'>
        {commentsList.map((item, idx) => {
          return (
            <div className='comment-wrapper' key={idx}>
              <div className='comment-left'>
                <div className='upvote'>
                  <img src={upArrow} className='upArrow' alt='up-arrow' />
                </div>
                <div className='vote-number'>{item.data.score}</div>
                <img src={dnArrow} className='dnArrow' alt='down-arrow' />
                <div className='downVote'></div>
              </div>
              <div className='comment-right'>
                <p>{item.data.body}</p>
                <p>{item.data.author}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
