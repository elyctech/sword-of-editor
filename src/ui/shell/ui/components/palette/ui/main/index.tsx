import React, {
  ReactElement
} from "react";

import {
  GroundType
} from "../../../../../../../lib/rendering";

interface PaletteMainProps
{
  selectedTile  : GroundType;

  tileSize  : number;

  tiles : Map<
    GroundType,
    string
  >;

  setSelectedTile : (
    tile  : GroundType
  ) => void;
}

export default function PaletteMain(
  props : PaletteMainProps
) : ReactElement
{
  const {
    selectedTile,
    setSelectedTile,
    tileSize,
    tiles
  } = props;

  const tileSelectors : ReactElement[]  = [];

  for (const [type, color] of tiles)
  {
    const containerStyle  = {
      "border"  : "1px solid transparent",
      "display" : "inline-block",
      "height"  : `${tileSize}px`,
      "padding" : "5px",
      "width"   : `${tileSize}px`
    };

    const style = {
      "backgroundColor" : color,
      "height"          : "100%"
    };

    if (type === selectedTile)
    {
      (containerStyle as any).border  = "1px solid #666";
    }

    tileSelectors.push(
      <div
        key     = {type}
        onClick = {() => setSelectedTile(type)}
        style   = {containerStyle}
      >
        <div
          style = {style}
        ></div>
      </div>
    );
  }

  return (
    <div
      className = "palette"
    >
      {tileSelectors}
    </div>
  );
}
