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
    setQueryInput: (state) => {
      state.queryInput = state.value;
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
export const selectSearchBarValue = (state) => state.searchBar.value;

//actions
export const { setQueryInput, setEmptyValue, setSearchBarValue } =
  searchBarSlice.actions;

export default searchBarSlice.reducer;
