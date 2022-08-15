import React, { useEffect } from "react";
import "./App.css";
import SearchBar from "./features/searchBar/SearchBar";
import Posts from "./features/posts/Posts";
import SubRedditSelections from "./features/subRedditSelections/SubRedditSelections";

import { fetchPostsAsync } from "./features/posts/postsSlice";

import { useDispatch } from "react-redux";
import Comments from "./features/comments/Comments";
import { subredditList } from "./modules/subredditList";
import HamburgerMenu from "./features/hamburgerMenu/HamburgerMenu";
import Overlay from "./features/overlay/Overlay";
import QueryResults from "./features/queryResults/QueryResults";
import ErrorMessage from "./features/errorMessage/ErrorMessage";

function App() {
  //allows us to dispatchActions
  const dispatch = useDispatch();

  //runs on page load
  useEffect(() => {
    //dispatches async thunk from postsSlice.js
    console.log("useEffect Run");
    dispatch(fetchPostsAsync(subredditList[0].url));
  });

  return (
    <div className='App'>
      <Overlay />
      <header className='app-header'>
        <nav>
          <h1 className='nav-left logo'>
            <a href='/'>Matt's Reddits.</a>
          </h1>
          <div className='nav-center'>
            <SearchBar />
          </div>
          <div className='nav-right'>
            <HamburgerMenu />
          </div>
        </nav>
      </header>

      <section className='main-section'>
        <ErrorMessage />
        <div className='main-content-wrapper'>
          <div className='main-content-left'>
            <QueryResults />
            <Comments />
            <Posts />
          </div>
          <div className='main-content-right'>
            <SubRedditSelections />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
