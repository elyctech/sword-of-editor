const coordinateContainer = document.getElementById("mouseCoordinates")!;

coordinateContainer.style.bottom    = "0px";
coordinateContainer.style.position  = "absolute";
coordinateContainer.style.right     = "0px";

export function setMouseCoordinates(
  x : number,
  y : number
) : void
{
  coordinateContainer.innerText = `${x},${y}`;
}
