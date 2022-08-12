import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleHamburgerMenuVisibility,
  selectHamburgerMenuVisibility,
} from "../hamburgerMenu/hamburgerMenuSlice";

function Overlay() {
  const dispatch = useDispatch();
  const hamburgerMenuVisibility = useSelector(selectHamburgerMenuVisibility);
  let overlayClass = hamburgerMenuVisibility === "SHOW" ? "overlay" : "";
  return (
    <div
      className={overlayClass}
      onClick={() => dispatch(toggleHamburgerMenuVisibility())}></div>
  );
}

export default Overlay;
