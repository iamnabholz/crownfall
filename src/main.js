import { k } from "./kaplay";
import { getOffsetPosition } from "./utils/utils";
import "./scenes/game";
import "./scenes/menu";

export const GameState = {
  yOffset: getOffsetPosition(),
  xOffset: 64,
  xPosition: k.center().x,
  spacing: 8,
  tintColor: [244, 78, 56],
  particles: null,
  difficulty: "hard",
  mode: "start",
  score: 0,
  highscore: 0,
  enemiesBeaten: 0,
  floor: 1,
};

k.setLayers(["background", "game", "foreground"], "foreground");

k.onLoad(() => {
  k.randSeed(Date.now());

  k.go("game");
});
