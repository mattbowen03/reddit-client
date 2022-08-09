import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../redditAPI/postsAPI";

const initialState = {
  value: "Loading",
  status: "idle",
  visibility: "SHOW",
  selectedPost: "none",
  currentSubreddit: "Loading",
};

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async (url) => {
    const response = await fetchPosts(url);
    return response;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    seePosts: (state, action) => {
      state.value = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    togglePostsVisibility: (state, action) => {
      state.visibility === "HIDDEN"
        ? (state.visibility = "SHOW")
        : (state.visibility = "HIDDEN");
    },
  },
  extraReducers: {
    [fetchPostsAsync.pending]: (state) => {
      state.value = "Loading";
      state.status = "Pending";
    },
    [fetchPostsAsync.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.status = "idle";
      state.currentSubreddit = action.payload[0].data.subreddit;
    },
    [fetchPostsAsync.rejected]: (state) => {
      state.value = "rejected";
      state.status = "rejected";
    },
  },
});

//selectors
export const selectPosts = (state) => state.posts.value;

export const selectPostsStatus = (state) => state.posts.status;

export const selectPostsVisibility = (state) => state.posts.visibility;

export const selectedPost = (state) => state.posts.selectedPost;
export const selectCurrentSubreddit = (state) => state.posts.currentSubreddit;

//actions
export const { seePosts, togglePostsVisibility, setSelectedPost } =
  postsSlice.actions;

export default postsSlice.reducer;
