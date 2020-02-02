import React, {
  ReactElement,

  useCallback
} from "react";

import {
  GroundType
} from "../../../../../../../lib/rendering";

import "./index.scss";

// TODO Do not copy this everywhere
interface Map
{
  ground  : GroundType[][];
}

interface MapExportMainProps
{
  map : Map;

  mapHeight : number;

  mapWidth  : number;

  close : () => void;
}

export default function MapExportMain(
  props : MapExportMainProps
) : ReactElement
{
  const {
    close,
    map,
    mapHeight,
    mapWidth
  } = props;

  const closeExport = useCallback(
    (
      event : React.MouseEvent<HTMLDivElement, MouseEvent>
    ) : void =>
    {
      // Do not close if the textarea was clicked, only if the div was
      if (event.target === event.currentTarget)
      {
        close();
      }
    },
    [
      close
    ]
  );

  const clippedMap  = {
    "ground"  : map.ground.slice(0, mapHeight).map(
      (row) => row.slice(0, mapWidth)
    )
  };

  return (
    <div
      className = "mapExport"
      onClick   = {closeExport}
    >
      <textarea
        readOnly  = {true}
        value     = {JSON.stringify(clippedMap)}
      ></textarea>
    </div>
  );
}
