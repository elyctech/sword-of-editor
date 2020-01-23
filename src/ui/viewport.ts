// Viewport values

export let viewportHeight = 0;
export let viewportWidth  = 0;

export function setViewport(
  height  : number,
  width   : number
) : void
{
  viewportHeight  = height;
  viewportWidth   = width;
}

// Panning

export const panOffset = {
  "x" : 0,
  "y" : 0
};

export function pan(
  x : number,
  y : number
) : void
{
  panOffset.x += x;
  panOffset.y += y;
};
