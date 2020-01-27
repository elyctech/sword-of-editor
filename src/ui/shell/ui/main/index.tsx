import React, {
  ReactElement,

  useCallback,
  useState,
  useRef,
  useEffect
} from "react";

import {
  MapExport
} from "../components/map-export";

import {
  MapPainter
} from "../components/map-painter";

import {
  MouseCoordinates
} from "../components/mouse-coordinates";

import {
  ToolDrawer
} from "../components/tool-drawer";

import {
  Ground,
  GroundType,

  groundTiles
} from "../../../../lib/rendering";

import "./index.scss";

// Helpers

interface Map
{
  ground  : GroundType[][];
}

interface ShellMainProps
{

}

export default function ShellMain(
  _props : ShellMainProps
) : ReactElement
{
  // Tile size (based on viewport)

  const [
    tileSize,
    setTileSize
  ] = useState(
    0
  );

  // Painting the map

  const map = useRef<Map>(
    {
      "ground"  : []
    }
  ).current;

  // Brush

  const [
    brushSize,
    setBrushSize
  ] = useState(
    1
  );

  const [
    selectedTile,
    setSelectedTile
  ] = useState(
    Ground.none
  );

  // Dimensions

  const [
    mapHeight,
    setMapHeight
  ] = useState(
    72
  );

  const [
    mapWidth,
    setMapWidth
  ] = useState(
    128
  );

  // Canvas mouse controls

  const [
    mouseCoordinates,
    setMouseCoordinates
  ] = useState(
    {
      "x" : 0,
      "y" : 0
    }
  );

  const updateMouseCoordinates  = useCallback(
    (
      x : number,
      y : number
    ) : void =>
    {
      setMouseCoordinates(
        {
          x,
          y
        }
      );
    },
    []
  );

  // Drawer

  const [
    drawerOpen,
    setDrawerOpen
  ] = useState(
    false
  );

  useEffect(
    ()  : () => void =>
    {
      const toggleDrawer = (
        event : KeyboardEvent
      ) : void =>
      {
        if (event.key === "Tab")
        {
          setDrawerOpen(
            !drawerOpen
          );

          event.preventDefault();
        }
      };

      window.addEventListener(
        "keydown",
        toggleDrawer
      );

      return () : void =>
      {

        window.removeEventListener(
          "keydown",
          toggleDrawer
        )
      };
    },
    [
      drawerOpen
    ]
  );

  // Map export

  const [
    showMapExport,
    setShowMapExport
  ] = useState(
    false
  );

  const closeMapExport  = useCallback(
    () : void =>
    {
      setShowMapExport(
        false
      );
    },
    []
  );

  const openMapExport  = useCallback(
    () : void =>
    {
      setShowMapExport(
        true
      );
    },
    []
  );

  // Render

  // TODO Remove
  setMapHeight;
  setMapWidth;

  return (
    <div
      className = "shell"
    >
      <MapPainter
        brushSize           = {brushSize}
        map                 = {map}
        mapHeight           = {mapHeight}
        mapWidth            = {mapWidth}
        selectedTile        = {selectedTile}
        setMouseCoordinates = {updateMouseCoordinates}
        setTileSize         = {setTileSize}
        tileSize            = {tileSize}
      />
      { drawerOpen &&
        <ToolDrawer
          brushSize       = {brushSize}
          selectedTile    = {selectedTile}
          setBrushSize    = {setBrushSize}
          setSelectedTile = {setSelectedTile}
          showMapExport   = {openMapExport}
          tileSize        = {tileSize}
          tiles           = {new Map(Object.entries(groundTiles).slice(1).map((entry) => [parseInt(entry[0]), entry[1]]))}
        />
      }
      { showMapExport &&
        <MapExport
          close = {closeMapExport}
          map   = {map}
        />
      }
      <MouseCoordinates
        x = {mouseCoordinates.x}
        y = {mouseCoordinates.y}
      />
    </div>
  );
}
