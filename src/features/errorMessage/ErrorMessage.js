import React from "react";
import "./errorMessage.css";
import { useSelector } from "react-redux";
import { selectPostsStatus } from "../posts/postsSlice";
import xIcon from "../../icons/bx-x.svg";

function ErrorMessage() {
  const postsStatus = useSelector(selectPostsStatus);

  if (postsStatus !== "rejected") {
    return;
  }

  return (
    <div className='errorMessage-wrapper'>
      <div className='errorMessage-content'>
        <div className='errorMessage-header'>
          <h1>Error!</h1>
          <img
            onClick={() => window.location.reload(true)}
            src={xIcon}
            alt=''
          />
        </div>
        <p>
          The page failed to load. Please refresh your browser and try again. If
          the problem persists, please contact{" "}
          <a href='mailto: fakesupport@fakeRyansReddits.com'>
            fakesupport@fakeRyansReddits.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default ErrorMessage;
