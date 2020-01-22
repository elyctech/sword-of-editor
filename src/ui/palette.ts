import {
  Ground,
  GroundType,

  groundTiles,
  tileSize
} from "./rendering";
import { context } from "./context";

export default function createPalette(
  palette : HTMLElement,
  onTileSelected  : (
    tile  : GroundType
  ) => void
) : void
{
  // Tile selection logic

  let selectedTile  : HTMLDivElement | null = null;

  const selectTile  = (
    tile          : GroundType,
    tileContainer : HTMLDivElement
  ) : void =>
  {
    if (selectedTile)
    {
      selectedTile.style.borderColor  = "white";
    }

    tileContainer.style.borderColor  = "black";

    selectedTile  = tileContainer;

    onTileSelected(
      tile
    );
  }

  // Drawer style

  palette.style.backgroundColor = "white";
  palette.style.borderRight     = "1px solid black";
  palette.style.height          = "100%";
  palette.style.padding         = "0px 15px";
  palette.style.width           = `${(tileSize + 10) * 4 + 31}px`;

  // Drawer control

  palette.style.display   = "none";
  palette.style.position  = "absolute";
  palette.style.top       = "0px";

  let paletteOpen = false;

  window.addEventListener(
    "keydown",
    (
      event : KeyboardEvent
    ) : void =>
    {
      if (event.key === "Tab")
      {
        paletteOpen = !paletteOpen;

        palette.style.display = paletteOpen ? "block" : "none";

        event.preventDefault();
      }
    }
  );

  context.canvas.addEventListener(
    "mousedown",
    () : void =>
    {
      paletteOpen = false;

      palette.style.display = "none";
    }
  );

  // Drawer contents

  // Brush size

  document.getElementById("brushSize")!.style.width = "90%";

  // Tile selector

  const tileSelector  = palette.querySelector("#tileSelector")!;

  for (const [name, type] of Object.entries(Ground))
  {
    const tileContainer = document.createElement("div");
    tileContainer.style.border  = "1px solid white";
    tileContainer.style.display = "inline-block";
    tileContainer.style.padding = "3px";
    tileContainer.style.width   = `${tileSize}px`;

    tileContainer.onclick = () => selectTile(type, tileContainer);

    const tile = document.createElement("div");
    tile.style.backgroundColor  = groundTiles[type];
    tile.style.height  = `${tileSize}px`;
    tile.style.width   = `${tileSize}px`;

    tile.title  = name;

    // Build selectable tile

    tileContainer.appendChild(
      tile
    );

    // Add tile to container

    tileSelector.appendChild(
      tileContainer
    );
  }
};
