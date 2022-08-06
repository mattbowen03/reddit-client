import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import SearchBar from "./features/searchBar/SearchBar";
import MainContentLeftHeading from "./features/mainContentLeftHeading/MainContentLeftHeading";
import MainContentRightHeading from "./features/mainContentRightHeading/MainContentRightHeading";
import Posts from "./features/posts/Posts";
import SubRedditSelections from "./features/subRedditSelections/SubRedditSelections";

import { fetchPostsAsync } from "./features/posts/postsSlice";

import { useDispatch } from "react-redux";
import Comments from "./features/comments/Comments";

function App() {
  //allows us to dispatchActions
  const dispatch = useDispatch();

  //runs on page load
  useEffect(() => {
    //dispatches async thunk from musicSlice.js
    dispatch(fetchPostsAsync("https://www.reddit.com/r/Music/.json"));
  });

  return (
    <div className='App'>
      <header className='app-header'>
        <nav>
          <div className='nav-left'>LOGO!</div>
          <div className='nav-center'>
            <SearchBar />
          </div>
          <div className='nav-right'></div>
        </nav>
      </header>

      <section className='main-section'>
        <div className='main-content-wrapper'>
          <div className='main-content-left'>
            <MainContentLeftHeading />
            <Comments />
            <Posts />
          </div>
          <div className='main-content-right'>
            <MainContentRightHeading />
            <SubRedditSelections />
          </div>
        </div>
      </section>

      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className='App-link'
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'>
            React
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'>
            Redux
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux-toolkit.js.org/'
            target='_blank'
            rel='noopener noreferrer'>
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className='App-link'
            href='https://react-redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'>
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
