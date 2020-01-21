import {
  context
} from "./context";

import {
  GroundType,

  tileSize
} from "./rendering";

let brushSize = 1;

let selectedTile  : GroundType | null = null;

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
  if (selectedTile !== null)
  {
    const startY = Math.floor(event.y / tileSize) - Math.floor(brushSize / 2);

    for (let dy = 0; dy < brushSize; dy += 1)
    {
      const y = startY + dy;

      if (!map.ground[y])
      {
        map.ground[y] = [];
      }

      const startX = Math.floor(event.x / tileSize) - Math.floor(brushSize / 2);

      for (let dx = 0; dx < brushSize; dx += 1)
      {
        const x = startX + dx;

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
    painting = true;

    paintTile(
      event
    );
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
    painting = false;
  }
);
