import {
  context,
} from "./context";

import {
  EnumValue,

  createEnum
} from "./helpers";

import {
  viewportHeight,
  viewportWidth
} from "./viewport";

// General functions

export function clearCanvas()
{
  context.clearRect(
    0,
    0,
    viewportWidth,
    viewportHeight
  );
}

// Tiles

export const horizontalTileCount  = 128;

export const tileSize  = viewportWidth / horizontalTileCount;

export const verticalTileCount  = viewportHeight / tileSize;

// Ground

export const Ground = createEnum(
  [
    "none",
    "dirt",
    "grass"
  ]
);

export type GroundType = EnumValue;

export const groundTiles = {
  [Ground.none]   : "#fff",
  [Ground.dirt]   : "#6e4d05",
  [Ground.grass]  : "#07a842"
};

export function drawGround(
  type  : GroundType,
  x     : number,
  y     : number,
  dx    : number = 0,
  dy    : number = 0
) : void {
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

// Objects

// type ObjectType = EnumValue;

// Characters

export const Characters = createEnum(
  [
    "friendlyNpc",
    "hostileNpc",
    "player"
  ]
);

type CharacterType = EnumValue;

const characters = {
  [Characters.friendlyNpc] : "#7917d4",
  [Characters.hostileNpc]  : "#d43717",
  [Characters.player]      : "#ffc74d"
}

export function drawCharacter(
  type  : CharacterType,
  x     : number,
  y     : number,
  dx    : number = 0,
  dy    : number = 0
) : void
{
  context.fillStyle = characters[type];

  context.beginPath();

  context.ellipse(
    x * tileSize + dx,
    y * tileSize + dy,
    1 * tileSize,
    2 * tileSize,
    0,
    0,
    2 * Math.PI
  );

  context.fill();
}