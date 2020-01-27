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

  selectedTile  : GroundType;

  tileSize  : number;

  tiles : Map<
    GroundType,
    string
  >;

  setBrushSize  : (
    size  : number
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
    selectedTile,
    setBrushSize,
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
    []
  );

  return (
    <div
      className = "toolDrawer"
    >
      <div
        className = "mapSize"
      ></div>
      <div
        className = "brushSize"
      >
        Brush:
        <input
          min       = {1}
          onChange  = {updateBrushSize}
          type      = "number"
          value     = {brushSize}
        />
      </div>
      <Palette
        selectedTile    = {selectedTile}
        setSelectedTile = {setSelectedTile}
        tileSize        = {tileSize}
        tiles           = {tiles}
      />
      <div
        className = "exportControl"
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
