import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibility: "HIDDEN",
};

export const hamburgerMenuSlice = createSlice({
  name: "hamburgerMenu",
  initialState,
  reducers: {
    toggleHamburgerMenuVisibility: (state) => {
      state.visibility === "HIDDEN"
        ? (state.visibility = "SHOW")
        : (state.visibility = "HIDDEN");
    },
  },
});

//selectors
export const selectHamburgerMenuVisibility = (state) =>
  state.hamburgerMenu.visibility;

//actions
export const { toggleHamburgerMenuVisibility } = hamburgerMenuSlice.actions;

export default hamburgerMenuSlice.reducer;
