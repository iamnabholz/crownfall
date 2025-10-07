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

export function toRoman(num) {
  const map = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, roman] of map) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
}
