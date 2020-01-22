import {
  context
} from "./context";

import {
  Ground,
  GroundType,

  tileSize
} from "./rendering";

let brushSize = 1;

let selectedTile  : GroundType = Ground.none;

const strokeHistory : GroundType[][][] = [];

let lastStroke  : GroundType[][] = [];

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
  event : MouseEvent
) : void =>
{
  const mouseX = Math.floor(event.x / tileSize);
  const mouseY = Math.floor(event.y / tileSize);

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
        event
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
    if (painting)
    {
      paintTile(
        event
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
              map.ground[y][x] = tile;
            }
          }
        }
      }
    }
  }
);
