import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../redditAPI/postsAPI";

const initialState = {
  value: "Loading",
  status: "idle",
  visibility: "SHOW",
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
    },
    [fetchPostsAsync.rejected]: (state) => {
      state.value = "failed";
    },
  },
});

//selectors
export const selectPosts = (state) => state.posts.value;

export const selectPostsStatus = (state) => state.posts.status;

export const selectPostsVisibility = (state) => state.posts.visibility;

//actions
export const { seePosts, togglePostsVisibility } = postsSlice.actions;

export default postsSlice.reducer;