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

  if (status === "failed") {
    return <div>Failed to load.</div>;
  }

  let filteredList = commentsList;

  if (queryInput) {
    filteredList = commentsList.filter((item) => {
      return (
        item.data.body.toLowerCase().includes(queryInput) ||
        item.data.author.toLowerCase().includes(queryInput)
      );
    });
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
          <ReactMarkdown>{originalPost[3]}</ReactMarkdown>
        </div>
      </div>

      <div className='comments'>
        {filteredList.map((item, idx) => {
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
                <ReactMarkdown>{item.data.body}</ReactMarkdown>
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
