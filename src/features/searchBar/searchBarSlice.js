import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryInput: null,
  queryResults: "",
  status: "idle",
  visibility: "SHOW",
  value: "",
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setQueryInput: (state, action) => {
      state.queryInput = action.payload;
    },
    setSearchBarValue: (state, action) => {
      state.value = action.payload;
    },
    setEmptyValue: (state) => {
      state.value = "";
    },
  },
});

//selectors
export const selectQueryInput = (state) => state.searchBar.queryInput;
export const selectQueryResults = (state) => state.searchBar.queryResults;

//actions
export const { setQueryInput, setEmptyValue, setSearchBarValue } =
  searchBarSlice.actions;

export default searchBarSlice.reducer;
