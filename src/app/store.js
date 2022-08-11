import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import searchBarReducer from "../features/searchBar/searchBarSlice";
import hamburgerMenuReducer from "../features/hamburgerMenu/hamburgerMenuSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    searchBar: searchBarReducer,
    hamburgerMenu: hamburgerMenuReducer,
  },
});
