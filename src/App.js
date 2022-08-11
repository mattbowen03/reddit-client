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

function App() {
  //allows us to dispatchActions
  const dispatch = useDispatch();

  //runs on page load
  useEffect(() => {
    //dispatches async thunk from postsSlice.js
    dispatch(fetchPostsAsync(subredditList[0].url));
  });

  return (
    <div className='App'>
      <header className='app-header'>
        <nav>
          <h1 className='nav-left logo'>
            <a href='/'>Ryan's Reddits.</a>
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
        <div className='main-content-wrapper'>
          <div className='main-content-left'>
            <Comments />
            <Posts />
          </div>
          <div className={"main-content-right "}>
            <SubRedditSelections />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
