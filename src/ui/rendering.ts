import {
  context,
  viewportHeight,
  viewportWidth
} from "./context";

import {
  EnumValue,

  createEnum
} from "./helpers";

// Tiles

export const horizontalTileCount  = 128;

export const tileSize  = Math.ceil(viewportWidth / horizontalTileCount);

export const verticalTileCount  = Math.ceil(viewportHeight / tileSize);

// Ground

export const Ground = createEnum(
  [
    "dirt",
    "grass"
  ]
);

export type GroundType = EnumValue;

export const groundTiles = {
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

  context.fillRect(
    x * tileSize + dx,
    y * tileSize + dy,
    tileSize,
    tileSize
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
  y     : number
) : void
{
  context.fillStyle = characters[type];

  context.beginPath();

  context.ellipse(
    x * tileSize,
    y * tileSize,
    1 * tileSize,
    2 * tileSize,
    0,
    0,
    2 * Math.PI
  );

  context.fill();
}