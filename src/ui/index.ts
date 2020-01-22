import {
  map
} from "./map-painter";

import "./palette";

import {
  clearCanvas,
  drawGround
} from "./rendering";

const drawFrame = () =>
{
  clearCanvas();

  for (const [y, row] of map.ground.entries())
  {
    if (row)
    {
      for (const [x, tile] of row.entries())
      {
        if (typeof tile !== "undefined")
        {
          drawGround(
            tile,
            x,
            y
          );
        }
      }
    }
  }

  window.requestAnimationFrame(
    drawFrame
  );
};

window.requestAnimationFrame(
  drawFrame
);
