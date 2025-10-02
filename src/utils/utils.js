import { k } from "../kaplay";

export function getOffsetPosition(defaultOffset = 48) {
  let offset = defaultOffset;

  const maxDistance = 128;
  const screenHeight = k.height();

  const playArea = k.height() - offset * 2;

  if (playArea > maxDistance) {
    const areaDifference = playArea - maxDistance;

    offset = offset + areaDifference / 2;
  }
  console.log(screenHeight, playArea, offset);
  return offset;
}
