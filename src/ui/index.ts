import {
  map,

  setBrushSize,
  setTile
} from "./map-painter";

import {
  drawGround
} from "./rendering";

import createTileSeletor  from "./palette";

createTileSeletor(
  document.getElementById("palette")!,
  setTile
);

const brushSizeElement  : HTMLInputElement  = document.getElementById("brushSize")! as HTMLInputElement;

brushSizeElement.addEventListener(
  "change",
  () : void =>
  {
    setBrushSize(
      brushSizeElement.valueAsNumber
    );
  }
)

const drawFrame = () =>
{
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
