import { k } from "../kaplay";
import { animateSquashStretchObject } from "../utils/animations";

export function buildGUI(OPTIONS, number, maxNumber, mirror = false) {
  const dir = mirror ? -1 : 1;

  k.drawSprite({
    sprite: "diamond",
    pos: k.vec2(OPTIONS.xOffset * dir, 0),
    anchor: "center",
    flipX: mirror,
  });

  /*if (mirror) {
    k.drawSprite({
      sprite: "diamond",
      pos: k.vec2((OPTIONS.xOffset - 17) * dir, 0),
      anchor: "center",
      flipX: false,
    });
    }*/

  k.drawText({
    text: number.toString(),
    size: 14,
    pos: k.vec2(OPTIONS.xOffset * dir + 0.3, -0.5),
    anchor: "center",
    align: "center",
    font: "Numbers",
    letterSpacing: -10,
  });

  // Sprites in a zig-zag way
  for (let i = 0; i < maxNumber; i++) {
    // base position
    const baseX = dir * (OPTIONS.xOffset + 13);
    const baseY = i * OPTIONS.spacing + 8;

    // every odd index nudges X by a certain amount
    const zigzagOffset = i % 2 === 0 ? 0 : OPTIONS.spacing;

    k.drawSprite({
      sprite: "point",
      frame: i < number ? (mirror ? 1 : 0) : 2,
      opacity: i < number ? 1 : 0.5,
      pos: k.vec2(baseX - dir * zigzagOffset, dir * baseY),
      anchor: "center",
      //flipX: !mirror,
    });
  }
}
