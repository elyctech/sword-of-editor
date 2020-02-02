import React, {
  ReactElement,

  useCallback
} from "react";

import {
  GroundType
} from "../../../../../../../lib/rendering";

import {
  Palette
} from "../../../palette";

import "./index.scss";

interface ToolDrawerMainProps
{
  brushSize : number;

  mapHeight : number;

  mapWidth  : number;

  selectedTile  : GroundType;

  tileSize  : number;

  tiles : Map<
    GroundType,
    string
  >;

  setBrushSize  : (
    size  : number
  ) => void;

  setMapHeight  : (
    height  : number
  ) => void;

  setMapWidth : (
    width : number
  ) => void;

  setSelectedTile : (
    tile  : GroundType
  ) => void;

  showMapExport : () => void;
}

export default function ToolDrawerMain(
  props : ToolDrawerMainProps
) : ReactElement
{
  const {
    brushSize,
    mapHeight,
    mapWidth,
    selectedTile,
    setBrushSize,
    setMapHeight,
    setMapWidth,
    setSelectedTile,
    showMapExport,
    tileSize,
    tiles
  } = props;

  const updateBrushSize = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) =>
    {
      setBrushSize(
        event.target.valueAsNumber
      );
    },
    [
      setBrushSize
    ]
  );

  const updateMapHeight = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) =>
    {
      setMapHeight(
        event.target.valueAsNumber
      );
    },
    [
      setMapHeight
    ]
  );

  const updateMapWidth = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) =>
    {
      setMapWidth(
        event.target.valueAsNumber
      );
    },
    [
      setMapWidth
    ]
  );

  return (
    <div
      className = "toolDrawer"
    >
      <div
        className = "tool mapSize"
      >
        Height:
        <input
          min       = {1}
          onChange  = {updateMapHeight}
          type      = "number"
          value     = {mapHeight}
        />

        Width:
        <input
          min       = {1}
          onChange  = {updateMapWidth}
          type      = "number"
          value     = {mapWidth}
        />

      </div>
      <div
        className = "tool brushSize"
      >
        Brush:
        <input
          min       = {1}
          onChange  = {updateBrushSize}
          type      = "number"
          value     = {brushSize}
        />
      </div>
      <div
        className = "tool tool-flex"
      >
        <Palette
          selectedTile    = {selectedTile}
          setSelectedTile = {setSelectedTile}
          tileSize        = {tileSize}
          tiles           = {tiles}
        />
      </div>
      <div
        className = "tool exportControl"
      >
        <button
          className = "exportButton"
          onClick   = {showMapExport}
        >
          Export
        </button>
      </div>
    </div>
  );
}
