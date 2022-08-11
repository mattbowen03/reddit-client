import React from "react";
import SubRedditSelections from "../subRedditSelections/SubRedditSelections";
import hamburgerIcon from "../../icons/bx-menu.svg";
import {
  toggleHamburgerMenuVisibility,
  selectHamburgerMenuVisibility,
} from "./hamburgerMenuSlice";
import { useDispatch, useSelector } from "react-redux";

function HamburgerMenu() {
  const dispatch = useDispatch();
  const hamburgerVisibility = useSelector(selectHamburgerMenuVisibility);

  return (
    <div className='hamburger-wrapper'>
      {hamburgerVisibility === "HIDDEN" && (
        <img
          onClick={() => {
            dispatch(toggleHamburgerMenuVisibility());
          }}
          className='hamnburger'
          src={hamburgerIcon}
          alt=''
        />
      )}

      {hamburgerVisibility === "SHOW" && <SubRedditSelections />}
    </div>
  );
}

export default HamburgerMenu;
