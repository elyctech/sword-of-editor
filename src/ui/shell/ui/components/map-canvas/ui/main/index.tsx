import React, {
  ReactElement,

  useCallback,
  useEffect,
  useLayoutEffect,
  useRef
} from "react";

import "./index.scss";

export type MapCanvasMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

type MapCanvasMouseListener = (
  event: MapCanvasMouseEvent
) => void;

interface MapCanvasMainProps
{
  onMouseDown : MapCanvasMouseListener;

  onMouseMove : MapCanvasMouseListener;

  onMouseOut  : MapCanvasMouseListener;

  onMouseUp   : MapCanvasMouseListener;

  setContext  : (
    context : CanvasRenderingContext2D
  ) => void;

  setViewport : (
    height  : number,
    width   : number
  ) => void;
}

export default function MapCanvasMain(
  props : MapCanvasMainProps
) : ReactElement
{
  const {
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseUp,
    setContext,
    setViewport
  } = props;

  // Stop the context menu from appearing when done panning

  const suppressContextMenu = useCallback(
    (
      event : React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) : void =>
    {
      event.preventDefault();
    },
    []
  );

  // Set up the viewport properly

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas    = canvasRef.current;

  useEffect(
    () : void =>
    {
      if (canvas)
      {
        setContext(
          canvas.getContext("2d")!
        );
      }
    },
    [
      canvas
    ]
  );

  // Make canvas maximum size always

  useLayoutEffect(
    () : void =>
    {
      if (canvas)
      {
        canvas.height = window.innerHeight;
        canvas.width  = window.innerWidth;

        setViewport(
          window.innerHeight,
          window.innerWidth
        );
      }
    },
    [
      canvas,
      window.innerHeight,
      window.innerWidth,
      setViewport
    ]
  );

  // Render

  return (
    <canvas
      className     = "mapCanvas"
      onContextMenu = {suppressContextMenu}
      onMouseDown   = {onMouseDown}
      onMouseMove   = {onMouseMove}
      onMouseOut    = {onMouseOut}
      onMouseUp     = {onMouseUp}
      ref           = {canvasRef}
    ></canvas>
  );
}
