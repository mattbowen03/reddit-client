import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryInput: null,
  queryResults: "",
  status: "idle",
  visibility: "SHOW",
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setQueryInput: (state, action) => {
      state.queryInput = action.payload;
    },
  },
});

//selectors
export const selectQueryInput = (state) => state.searchBar.queryInput;
export const selectQueryResults = (state) => state.searchBar.queryResults;

//actions
export const { setQueryInput } = searchBarSlice.actions;

export default searchBarSlice.reducer;
