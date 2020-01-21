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
  for (let y = 0; y < map.ground.length; y += 1)
  {
    const row = map.ground[y];

    if (row)
    {
      for (let x = 0; x < row.length; x += 1)
      {
        const tile  = row[x];

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
