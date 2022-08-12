import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../redditAPI/postsAPI";

const initialState = {
  value: "Loading",
  status: "idle",
  visibility: "SHOW",
  originalPostID: "none",
  currentSubreddit: "Loading",
};

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async (url) => {
    const response = await fetchPosts(url);
    console.log({ response });
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
    setOriginalPostID: (state, action) => {
      state.originalPostID = action.payload;
    },
    togglePostsVisibility: (state, action) => {
      state.visibility === "HIDDEN"
        ? (state.visibility = "SHOW")
        : (state.visibility = "HIDDEN");
    },
  },
  extraReducers: {
    [fetchPostsAsync.pending]: (state, action) => {
      console.log("Payload pending:", action.payload);
      state.value = "Loading";
      state.status = "Pending";
    },
    [fetchPostsAsync.fulfilled]: (state, action) => {
      console.log("actionPayload fulfilled:", action.payload);
      state.value = action.payload;
      state.status = "idle";
      state.currentSubreddit = action.payload[0].data.subreddit;
    },
    [fetchPostsAsync.rejected]: (state, action) => {
      console.log("actionPayload rejected:", action.payload);
      state.value = "rejected";
      state.status = "rejected";
    },
  },
});

//selectors
export const selectPosts = (state) => state.posts.value;

export const selectPostsStatus = (state) => state.posts.status;

export const selectPostsVisibility = (state) => state.posts.visibility;

export const selectoriginalPostID = (state) => state.posts.originalPostID;

export const selectCurrentSubreddit = (state) => state.posts.currentSubreddit;

//actions
export const { seePosts, togglePostsVisibility, setOriginalPostID } =
  postsSlice.actions;

export default postsSlice.reducer;
