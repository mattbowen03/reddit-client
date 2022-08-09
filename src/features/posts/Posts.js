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
              <h3>
                Posted by {item.data.author} on {myDate.toLocaleString()}
              </h3>
              <h2>{item.data.title}</h2>
              <div className='post-content'>
                <ReactMarkdown>{item.data.selftext}</ReactMarkdown>
              </div>
              <img src={item.data.url} alt='' />
              <button
                key={idx}
                onClick={() => {
                  dispatch(
                    fetchCommentsAsync(
                      "https://www.reddit.com" + item.data.permalink + ".json"
                    )
                  );
                  dispatch(toggleCommentsVisibility());
                  dispatch(togglePostsVisibility());
                  dispatch(
                    setSelectedPost([
                      item.data.title,
                      item.data.author,
                      myDate.toLocaleString(),
                      item.data.selftext,
                      item.data.score,
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
