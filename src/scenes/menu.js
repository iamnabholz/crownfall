import { k } from "../kaplay";

k.scene("menu", (opts) => {
  k.onDraw(() => {
    k.drawSprite({
      sprite: "TITLE",
      anchor: "center",
      pos: k.vec2(k.center().x, k.center().y + 16),
    });

    k.drawText({
      text: "10   %",
      size: 10,
      width: 120,
      anchor: "center",
      align: "center",
      letterSpacing: -2,
      pos: k.vec2(k.center().x, k.center().y - 16),
    });
  });
});
