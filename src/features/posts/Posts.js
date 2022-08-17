import React from "react";
import "./posts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  selectPostsVisibility,
  togglePostsVisibility,
  setOriginalPostID,
  selectPostsStatus,
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Posts() {
  const postsList = useSelector(selectPosts);
  const visibility = useSelector(selectPostsVisibility);
  const queryInput = useSelector(selectQueryInput);
  const dispatch = useDispatch();
  const postsStatus = useSelector(selectPostsStatus);

  if (visibility === "HIDDEN") {
    return;
  }

  if (postsStatus !== "fulfilled") {
    return (
      <div className='post-skeleton'>
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

  let filteredList = postsList;

  if (queryInput) {
    filteredList = postsList.filter((item) => {
      return (
        item.data?.title?.toLowerCase().includes(queryInput.toLowerCase()) ||
        item.data?.selftext?.toLowerCase().includes(queryInput.toLowerCase()) ||
        item.data?.author?.toLowerCase().includes(queryInput.toLowerCase())
      );
    });
  }

  return (
    <div className='posts-wrapper'>
      {filteredList.map((item, idx) => {
        let myDate = new Date(item.data?.created * 1000);

        return (
          <div
            onClick={() => {
              dispatch(
                fetchCommentsAsync(
                  "https://www.reddit.com" + item.data?.permalink + ".json"
                )
              );
              dispatch(toggleCommentsVisibility());
              dispatch(togglePostsVisibility());
              dispatch(setOriginalPostID(item.data?.id));
            }}
            className='post'
            key={idx}>
            <div className='post-left'>
              <div className='upvote'>
                <img src={upArrow} className='upArrow' alt='up-arrow' />
              </div>
              <div className='vote-number'>{item.data?.score}</div>
              <img src={dnArrow} className='dnArrow' alt='down-arrow' />
              <div className='downVote'></div>
            </div>
            <div className='post-right'>
              <div className='post-wrap'>
                <div className='post-byline'>
                  Posted by {item.data?.author} on {myDate.toLocaleString()}
                </div>
                <h1 className='post-title'>{item.data?.title}</h1>
                <div className='post-text'>
                  <ReactMarkdown>{item.data?.selftext}</ReactMarkdown>
                </div>
                <img src={item.data?.url} alt='' />
              </div>
              <div className='text-fade'></div>
              <div className='bottom-post-icons'>
                <div className='comments-icon-container'>
                  <img className='commentIcon' src={commentIcon} alt=''></img>
                  <span className='post-footer'>
                    {item.data?.num_comments}{" "}
                    {item.data?.num_comments > 1 ||
                    item.data?.num_comments === 0
                      ? "Comments"
                      : "Comment"}
                  </span>
                </div>
                <div className='votes-icon-container post-footer'>
                  <img src={upArrow} alt='' />
                  <span>{item.data?.score}</span>
                  <img src={dnArrow} alt='' />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
