import {
  EnumValue,

  createEnum
} from "../enum";

export const Ground = createEnum(
  [
    "none",
    "dirt",
    "grass"
  ]
);

export type GroundType = EnumValue;

export const groundTiles = {
  [Ground.none]   : "rgba(0,0,0,0.0)",
  [Ground.dirt]   : "#6e4d05",
  [Ground.grass]  : "#07a842"
};

export interface Renderer
{
  clearCanvas() : void;

  drawGround(
    type  : GroundType,
    x     : number,
    y     : number,
    dx    ?: number,
    dy    ?: number
  ) : void;
}

export function createRenderer(
  context         : CanvasRenderingContext2D,
  tileSize        : number,
  viewportHeight  : number,
  viewportWidth   : number
) : Renderer
{
  return {
    clearCanvas : () =>
    {
      context.clearRect(
        0,
        0,
        viewportWidth,
        viewportHeight
      );
    },

    drawGround  : (
      type  : GroundType,
      x     : number,
      y     : number,
      dx    : number = 0,
      dy    : number = 0
    ) : void =>
    {
      context.fillStyle = groundTiles[type];

      const ceiledTileSize = Math.ceil(
        tileSize
      );

      context.fillRect(
        Math.floor(x * tileSize + dx),
        Math.floor(y * tileSize + dy),
        ceiledTileSize,
        ceiledTileSize
      );
    }
  };
};
