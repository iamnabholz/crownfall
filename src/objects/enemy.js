import { buildGUI } from "../components/charactergui";
import { k } from "../kaplay";
import { GameState } from "../main";
import {
  animateFloatingObject,
  animateShakingObject,
  animateSquashStretchObject,
} from "../utils/animations";
import { getEnemyConfig } from "../utils/difficulty";
import { shieldSetup } from "./shields";

export function buildEnemy({ onDeath } = {}) {
  const config = [
    "easy",
    "medium",
    "hard",
    "easy",
    "medium",
    "hard",
    "easy",
    "medium",
    "easy",
    "medium",
    "imposible",
  ];
  let slo = k.choose(config);
  let stats = getEnemyConfig(slo);
  console.log(slo);

  // PARENT OBJECT
  const object = k.add([
    k.health(stats.health),
    k.pos(GameState.xPosition, GameState.yOffset + 5),
    k.area({ shape: new k.Rect(k.vec2(0), 16, 16) }),
    k.anchor("center"),
    {
      shields: stats.shields,
      radius: stats.radius,
      speed: stats.speed,
      score: stats.score,
      direction: k.rand() < 0.5 ? 1 : -1,
      createdShields: [],
    },
    k.layer("game"),
    "crown",
  ]);

  // SPRITE ONLY SETUP
  const sprite = object.add([
    k.sprite("crown"),
    k.pos(),
    k.anchor("center"),
    k.animate({ relative: true }),
    k.timer(),
    k.layer("game"),
    k.z(2),
  ]);

  animateFloatingObject(sprite, true);

  // DRAW ENEMY HEALTH
  object.onDraw(() => {
    if (GameState.mode !== "game" || !object.has("health")) return;

    buildGUI(GameState, object.hp, object.maxHP);
  });

  shieldSetup(object);

  object.onCollide("bullet", () => {
    animateShakingObject(sprite);
    animateSquashStretchObject(sprite);
    object.hp -= 1;
  });

  object.onDeath(() => {
    object.unuse("health");
    k.shake(4);

    const timer = 0.25 * object.createdShields.length + 1;

    animateShakingObject(sprite, timer, 2);

    GameState.particles.pos = object.pos;
    k.loop(
      0.25,
      () => {
        GameState.particles.emit(4);
      },
      object.createdShields.length + 1,
    );

    k.wait(timer, () => {
      if (onDeath) onDeath(object);
      object.destroy();
    });
  });

  return object;
}
