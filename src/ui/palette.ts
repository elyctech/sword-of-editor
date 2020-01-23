import {
  context
} from "./context";

import {
  map,

  setBrushSize,
  setTile
} from "./map-painter";

import {
  Ground,
  GroundType,

  groundTiles,
  tileSize
} from "./rendering";

// TODO Separate "drawer" from "palette" ("palette" being one thing in the drawer)

const palette = document.getElementById("palette")!;

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

  setTile(
    tile
  );
}

// Drawer style

palette.style.width = `${(tileSize + 10) * 4 + 31}px`;

// Drawer control
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

const brushSizeElement  : HTMLInputElement  = document.getElementById("brushSize")! as HTMLInputElement;

brushSizeElement.style.width = "90%";

brushSizeElement.addEventListener(
  "change",
  () : void =>
  {
    setBrushSize(
      brushSizeElement.valueAsNumber
    );
  }
);

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

// Export button

const exportButton  = document.getElementById("exportButton")!.firstElementChild!;
const exportOverlay = document.getElementById("exportOverlay")!;
const exportedMap   = document.getElementById("exportedMap")!;

exportButton.addEventListener(
  "click",
  ()  : void =>
  {
    exportedMap.innerText       = JSON.stringify(map);
    exportOverlay.style.display = "flex";
  }
);

exportOverlay.addEventListener(
  "click",
  (
    event : MouseEvent
  ) : void =>
  {
    if (event.target === exportOverlay)
    {
      exportOverlay.style.display = "none";
    }
  }
);
