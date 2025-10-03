import { k } from "../kaplay";

export function getOffsetPosition(defaultOffset = 48) {
  let offset = defaultOffset;

  const maxDistance = 128;
  const playArea = k.height() - offset * 2;

  if (playArea > maxDistance) {
    const areaDifference = playArea - maxDistance;

    offset = offset + areaDifference / 2;
  }

  return offset;
}
