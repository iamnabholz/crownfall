import { k, GameState } from "../kaplay";

k.scene("over", () => {
  const restart = k.add([
    k.sprite("restart"),
    k.pos(k.center().x, k.center().y + 48),
    k.anchor("center"),
    k.area(),
    "restart",
  ]);

  if (GameState.score > GameState.highscore)
    GameState.highscore = GameState.score;

  k.onClick("restart", () => {
    GameState.score = 0;
    GameState.mode = "start";
    k.go("game");
  });

  k.onDraw(() => {
    k.drawSprite({
      sprite: "RIP",
      width: 24,
      height: 24,
      pos: k.vec2(k.center().x, k.center().y - 64),
      anchor: "center",
    });

    k.drawText({
      text: "GAME OVER",
      font: "Alkhemikal",
      anchor: "center",
      align: "center",
      pos: k.vec2(k.center().x, k.center().y - 26),
      letterSpacing: -4,
      size: 28,
    });

    k.drawText({
      text: "Score: " + GameState.score,
      anchor: "center",
      align: "center",
      pos: k.center(),
      letterSpacing: -5,
      size: 16,
    });

    k.drawText({
      text: "Highscore: " + GameState.highscore,
      anchor: "center",
      align: "center",
      pos: k.vec2(k.center().x, k.center().y + 16),
      letterSpacing: -5,
      size: 16,
    });

    k.drawText({
      text: "by FABRIC VISIONS",
      anchor: "center",
      align: "center",
      pos: k.vec2(k.center().x, k.height() - 10),
      letterSpacing: -2.8,
      size: 8,
      opacity: 0.4,
    });
  });
});
