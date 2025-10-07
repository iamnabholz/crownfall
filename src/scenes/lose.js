import { k } from "../kaplay";
import { GameState } from "../main";

k.scene("over", () => {
  const restart = k.add([
    k.sprite("restart"),
    k.pos(k.center().x, k.center().y + 48),
    k.anchor("center"),
    k.area(),
    k.layer("foreground"),
    "restart",
  ]);

  if (GameState.score > GameState.highscore)
    GameState.highscore = GameState.score;

  restart.onClick(() => {
    GameState.score = 0;
    GameState.mode = "start";
    k.go("game");
  });

  /*const bd = k.add([
    k.sprite("border"),
    k.pos(k.vec2(pos.x - 0.1, pos.y)),
    k.anchor("center"),
  ]);

  bd.width = 36;
  bd.height = 36;*/

  k.onDraw(() => {
    k.drawRect({
      width: 200,
      height: 150,
      pos: k.center(),
      anchor: "center",
      fill: false,
      outline: { color: k.WHITE, width: 1.5, join: "miter" },
    });

    k.drawSprite({
      sprite: "RIP",
      width: 24,
      height: 24,
      pos: k.vec2(k.center().x, k.center().y - 82),
      anchor: "center",
    });

    k.drawText({
      text: "GAME OVER",
      font: "Alkhemikal",
      anchor: "center",
      align: "center",
      pos: k.vec2(k.center().x, k.center().y - 44),
      letterSpacing: -4,
      size: 28,
    });

    k.drawText({
      text: "Score: " + GameState.score,
      anchor: "center",
      align: "center",
      pos: k.vec2(k.center().x, k.center().y - 16),
      letterSpacing: -5,
      size: 16,
    });

    k.drawText({
      text: "Highscore: " + GameState.highscore,
      anchor: "center",
      align: "center",
      pos: k.center(),
      letterSpacing: -5,
      size: 16,
    });

    k.drawText({
      text: "Kills: " + GameState.enemiesBeaten,
      anchor: "center",
      align: "center",
      pos: k.vec2(k.center().x, k.center().y + 18),
      letterSpacing: -7,
      size: 16,
    });

    // Retsrta Background
    k.drawRect({
      width: 24,
      height: 24,
      pos: k.vec2(k.center().x, k.center().y + 48),
      anchor: "center",
      fill: false,
      outline: { color: k.WHITE, width: 1, join: "miter" },
    });

    k.drawText({
      text: "by FABRIC VISIONS",
      anchor: "center",
      align: "center",
      pos: k.vec2(k.center().x, k.center().y + 92),
      letterSpacing: -2.8,
      size: 8,
      opacity: 0.4,
    });
  });
});
