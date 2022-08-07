import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import SearchBar from "./features/searchBar/SearchBar";
import Posts from "./features/posts/Posts";
import SubRedditSelections from "./features/subRedditSelections/SubRedditSelections";

import { fetchPostsAsync } from "./features/posts/postsSlice";

import { useDispatch } from "react-redux";
import Comments from "./features/comments/Comments";
import { subredditList } from "./modules/subredditList";

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
          <h1 className='nav-left logo'>Ryan's Reddit's</h1>
          <div className='nav-center'>
            <SearchBar />
          </div>
          <div className='nav-right'></div>
        </nav>
      </header>

      <section className='main-section'>
        <div className='main-content-wrapper'>
          <div className='main-content-left'>
            <Comments />
            <Posts />
          </div>
          <div className='main-content-right'>
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
