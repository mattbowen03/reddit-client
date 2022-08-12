import React from "react";
import SubRedditSelections from "../subRedditSelections/SubRedditSelections";
import hamburgerIcon from "../../icons/bx-menu.svg";
import xIcon from "../../icons/bx-x.svg";
import {
  toggleHamburgerMenuVisibility,
  selectHamburgerMenuVisibility,
} from "./hamburgerMenuSlice";
import { useDispatch, useSelector } from "react-redux";

function HamburgerMenu() {
  const dispatch = useDispatch();
  const hamburgerMenuVisibility = useSelector(selectHamburgerMenuVisibility);
  const hamburgerClass =
    hamburgerMenuVisibility === "HIDDEN"
      ? "hamburgerMenu"
      : "hamburgerMenu showMenu";

  return (
    <div className='hamburger-wrapper'>
      <img
        onClick={() => {
          dispatch(toggleHamburgerMenuVisibility());
        }}
        className={
          "hamburger " +
          (hamburgerMenuVisibility === "HIDDEN" ? "showIcon" : "hideIcon")
        }
        src={hamburgerIcon}
        alt=''
      />
      <img
        onClick={() => {
          dispatch(toggleHamburgerMenuVisibility());
        }}
        className={
          "hamburger " + (hamburgerMenuVisibility === "HIDDEN" && "hideIcon")
        }
        src={xIcon}
        alt=''
      />
      <div className={hamburgerClass}>
        <SubRedditSelections />
      </div>
    </div>
  );
}

export default HamburgerMenu;
