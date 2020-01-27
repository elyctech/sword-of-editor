import React, {
  ReactElement
} from "react";

import "./index.scss";

interface MouseCoordinatesMainProps
{
  x : number;
  y : number;
}

export default function MouseCoordinatesMain(
  props : MouseCoordinatesMainProps
) : ReactElement
{
  const {
    x,
    y
  } = props;

  return (
    <span
      className = "mouseCoordinates"
    >
      {x},{y}
    </span>
  );
}
