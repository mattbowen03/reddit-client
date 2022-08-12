import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../redditAPI/commentsAPI";

const initialState = {
  value: {},
  status: "idle",
  visibility: "HIDDEN",
};

export const fetchCommentsAsync = createAsyncThunk(
  "comments/fetchComments",
  async (url) => {
    const response = await fetchComments(url);
    return response;
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    seeComments: (state, action) => {
      state.value = action.payload;
    },
    toggleCommentsVisibility: (state, action) => {
      state.visibility === "HIDDEN"
        ? (state.visibility = "SHOW")
        : (state.visibility = "HIDDEN");
    },
  },
  extraReducers: {
    [fetchCommentsAsync.pending]: (state) => {
      state.value = "pending";
      state.status = "pending";
    },
    [fetchCommentsAsync.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.status = "fulfilled";
    },
    [fetchCommentsAsync.rejected]: (state) => {
      state.value = "rejected";
      state.status = "rejected";
    },
  },
});

//selectors
export const selectComments = (state) => state.comments.value;

export const selectCommentsStatus = (state) => state.comments.status;

export const selectCommentsVisibility = (state) => state.comments.visibility;

//actions
export const { seeComments, toggleCommentsVisibility } = commentsSlice.actions;

export default commentsSlice.reducer;
