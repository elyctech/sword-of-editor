import {
  context
} from "./context";

import {
  setMouseCoordinates
} from "./mouse-coordinates";

import {
  Ground,
  GroundType,

  tileSize
} from "./rendering";

let brushSize = 1;

let selectedTile  : GroundType = Ground.none;

const strokeHistory : GroundType[][][] = [];

let lastStroke  : GroundType[][] = [];

let directionLock : {
  x ?: number;
  y ?: number;
} | null = null;

export function setBrushSize(
  size  : number
) : void
{
  brushSize = size;
}

export function setTile(
  tile  : GroundType
) : void
{
  selectedTile  = tile;
};

export const map  : {
  ground  : GroundType[][]
} = {
  "ground"  : []
};

const paintTile = (
  mouseX  : number,
  mouseY  : number
) : void =>
{
  const startY = mouseY - Math.floor(brushSize / 2);

  for (let dy = 0; dy < brushSize; dy += 1)
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

    const startX = mouseX - Math.floor(brushSize / 2);

    for (let dx = 0; dx < brushSize; dx += 1)
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

let painting = false;

context.canvas.addEventListener(
  "mousedown",
  (
    event : MouseEvent
  ) : void =>
  {
    if (selectedTile !== Ground.none)
    {
      painting = true;

      lastStroke  = [];

      paintTile(
        Math.floor(event.x / tileSize),
        Math.floor(event.y / tileSize)
      );
    }
  }
);

context.canvas.addEventListener(
  "mousemove",
  (
    event : MouseEvent
  ) : void =>
  {
    let x = Math.floor(event.x / tileSize);
    let y = Math.floor(event.y / tileSize);

    setMouseCoordinates(
      x,
      y
    );

    if (painting)
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
            directionLock = {
              y
            }
          }
          else
          {
            directionLock = {
              x
            };
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
        directionLock = null;
      }

      paintTile(
        x,
        y
      );
    }
  }
);

context.canvas.addEventListener(
  "mouseup",
  ()  : void =>
  {
    if (painting)
    {
      painting = false;

      strokeHistory.push(
        lastStroke
      );

      directionLock = null;
    }
  }
);

window.addEventListener(
  "keydown",
  (
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
  }
);
