import {
  setViewport
} from "./viewport";

const canvas  = document.querySelector("canvas")!;

canvas.height = canvas.offsetHeight;
canvas.width  = canvas.offsetWidth;

setViewport(
  canvas.offsetHeight,
  canvas.offsetWidth
);

export const context = canvas.getContext("2d")!;
