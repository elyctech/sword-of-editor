import React, {
  ReactElement,

  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import {
  MapCanvas,
  MapCanvasMouseEvent
} from "../../../map-canvas";

import {
  Ground,
  GroundType,
  Renderer,

  createRenderer
} from "../../../../../../../lib/rendering";

// TODO Do no duplicate this
interface Map
{
  ground  : GroundType[][];
}

interface MapPainterMainProps
{
  brushSize : number;

  map : Map;

  mapHeight : number;

  mapWidth  : number;

  selectedTile  : GroundType;

  tileSize  : number;

  setMouseCoordinates : (
    x : number,
    y : number
  ) => void;

  setTileSize : (
    tileSize  : number
  ) => void;
}

export default function MapPainterMain(
  props : MapPainterMainProps
) : ReactElement
{
  const {
    brushSize,
    map,
    mapHeight,
    mapWidth,
    setMouseCoordinates,
    selectedTile,
    setTileSize,
    tileSize
  } = props;

  // Viewport settings

  const [
    viewport,
    setViewport
  ] = useState<
  {
    height  : number,
    width   : number
  } | null
  >(
    null
  );

  const updateViewport  = useCallback(
    (
      height  : number,
      width   : number
    ) : void =>
    {
      setTileSize(
        width / 128
      );

      setViewport(
        {
          height,
          width
        }
      );
    },
    []
  );

  // Stroke history
  // TODO Should this be limited to save memory?

  const strokeHistory = useRef<GroundType[][][]>([]).current;

  let lastStrokeRef = useRef<GroundType[][]>([]);

  useEffect(
    ()  : () => void =>
    {
      const undoLastStroke = (
        event : KeyboardEvent
      ) : void =>
      {
        if (event.ctrlKey && event.key === "z")
        {
          const stroke = strokeHistory.pop();

          if (stroke)
          {
            for (const [y, row] of stroke.entries())
            {
              if (row)
              {
                for (const [x, tile] of row.entries())
                {
                  if (typeof tile !== "undefined")
                  {
                    map.ground[y][x] = tile;
                  }
                }
              }
            }
          }
        }
      };

      window.addEventListener(
        "keydown",
        undoLastStroke
      );

      return () : void =>
      {

        window.removeEventListener(
          "keydown",
          undoLastStroke
        )
      };
    },
    []
  );

  // Paint a tile

  const paintTile = (
    mouseX  : number,
    mouseY  : number
  ) : void =>
  {
    const lastStroke = lastStrokeRef.current;

    let sizeY = brushSize;

    let startY = mouseY - Math.floor(brushSize / 2);

    if (startY < 0)
    {
      // Shrink the paint area by the out-of-bounds amount
      sizeY += startY;

      startY  = 0;
    }
    else if ((startY + brushSize) > mapHeight)
    {
      sizeY = mapHeight - startY;
    }

    let sizeX = brushSize

    let startX = mouseX - Math.floor(brushSize / 2);

    if (startX < 0)
    {
      // Shrink the paint area by the out-of-bounds amount
      sizeX += startX;

      startX  = 0;
    }
    else if ((startX + brushSize) > mapWidth)
    {
      sizeX = mapWidth - startX;
    }

    for (let dy = 0; dy < sizeY; dy += 1)
    {
      const y = startY + dy;

      if (!map.ground[y])
      {
        map.ground[y] = [];
      }

      if (!lastStroke[y])
      {
        lastStroke[y] = [];
      }

      for (let dx = 0; dx < sizeX; dx += 1)
      {
        const x = startX + dx;

        // Only paint a tile once per stroke
        if (typeof lastStroke[y][x] === "undefined")
        {
          lastStroke[y][x] = map.ground[y][x] || Ground.none;
          map.ground[y][x] = selectedTile;
        }
      }
    }
  };

  const [
    directionLock,
    setDirectionLock
  ] = useState<
  {
    x ?: number,
    y ?: number
  } | null
  >(
    null
  );

  const panOffset = useRef(
    {
      "x" : 0,
      "y" : 0
    }
  ).current;

  const pan = useCallback(
    (
      x : number,
      y : number
    ) =>
    {
      // Clamp by map rectangle
      panOffset.x = Math.min(
        0,
        Math.max(
          viewport!.width - mapWidth * tileSize,
          panOffset.x + x
        )
      );

      panOffset.y = Math.min(
        0,
        Math.max(
          viewport!.height - mapHeight * tileSize,
          panOffset.y + y
        )
      );
    },
    [
      mapHeight,
      mapWidth,
      panOffset,
      tileSize,
      viewport
    ]
  );

  const isPaintingRef = useRef(false);
  const isPanningRef  = useRef(false);

  const startMouseAction  = useCallback(
    (
      event : MapCanvasMouseEvent
    ) : void =>
    {
      if (event.button === 0)
      {
        if (selectedTile !== Ground.none)
        {
          isPaintingRef.current = true;

          lastStrokeRef.current = [];

          paintTile(
            Math.floor((event.clientX - panOffset.x) / tileSize),
            Math.floor((event.clientY - panOffset.y) / tileSize)
          );
        }
      }
      else if (event.button === 2)
      {
        isPanningRef.current  = true;
      }
    },
    [
      brushSize,
      selectedTile,
      tileSize
    ]
  );

  const processMouseMovement  = useCallback(
    (
      event : MapCanvasMouseEvent
    ) : void =>
    {
      let x = Math.floor((event.clientX - panOffset.x) / tileSize);
      let y = Math.floor((event.clientY - panOffset.y) / tileSize);

      setMouseCoordinates(
        x,
        y
      );

      if (isPaintingRef.current)
      {
        // Draw in a straight line if shift is held

        if (event.shiftKey)
        {
          if (!directionLock)
          {
            // If X > Y, we are moving more in the X, so draw straight in the X (stop the Y from changing). Otherwise, draw
            //  straight in the Y (stop the X for changing)
            if (event.movementX > event.movementY)
            {
              setDirectionLock(
                {
                  y
                }
              );
            }
            else
            {
              setDirectionLock(
                {
                  x
                }
              );
            }
          }
          else
          {
            if (typeof directionLock.x === "undefined")
            {
              y = directionLock.y!;
            }
            else
            {
              x = directionLock.x!;
            }
          }
        }
        else if (directionLock)
        {
          setDirectionLock(
            null
          );
        }

        paintTile(
          x,
          y
        );
      }
      else if (isPanningRef.current)
      {
        pan(
          event.movementX,
          event.movementY
        );
      }
    },
    [
      brushSize,
      directionLock,
      pan,
      selectedTile,
      tileSize
    ]
  );

  const finishMouseAction = useCallback(
    ()  : void =>
    {
      if (isPaintingRef.current)
      {
        isPaintingRef.current = false;

        strokeHistory.push(
          lastStrokeRef.current
        );

        setDirectionLock(
          null
        );
      }
      else if (isPanningRef.current)
      {
        isPanningRef.current = false;
      }
    },
    []
  );

  // Draw map

  const [
    context,
    setContext
  ] = useState<
  CanvasRenderingContext2D | null
  >(
    null
  );

  const rendererRef = useRef<Renderer>();

  useEffect(
    () : void =>
    {
      if (context && tileSize && viewport)
      {
        rendererRef.current = createRenderer(
          context,
          tileSize,
          viewport.height,
          viewport.width
        );
      }
    },
    [
      context,
      tileSize,
      viewport
    ]
  );

  const renderer = rendererRef.current;

  useEffect(
    () : () => void =>
    {
      let frame : number | null = null;

      if (renderer)
      {
        const drawFrame = () =>
        {
          renderer.clearCanvas();

          for (const [y, row] of map.ground.entries())
          {
            if (row)
            {
              for (const [x, tile] of row.entries())
              {
                if (typeof tile !== "undefined")
                {
                  renderer.drawGround(
                    tile,
                    x,
                    y,
                    panOffset.x,
                    panOffset.y
                  );
                }
              }
            }
          }

          frame = window.requestAnimationFrame(
            drawFrame
          );
        };

        frame = window.requestAnimationFrame(
          drawFrame
        );
      }

      return () : void =>
      {
        if (frame)
        {
          window.cancelAnimationFrame(
            frame
          );
        }
      }
    },
    [
      renderer
    ]
  );

  return (
    <MapCanvas
      onMouseDown = {startMouseAction}
      onMouseMove = {processMouseMovement}
      onMouseOut  = {finishMouseAction}
      onMouseUp   = {finishMouseAction}
      setContext  = {setContext}
      setViewport = {updateViewport}
    />
  );
}
