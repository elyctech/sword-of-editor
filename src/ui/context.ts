const canvas  = document.querySelector("canvas")!;

canvas.height = canvas.offsetHeight;
canvas.width  = canvas.offsetWidth;

export const viewportHeight = canvas.offsetHeight;
export const viewportWidth  = canvas.offsetWidth;

export const context = canvas.getContext("2d")!;
