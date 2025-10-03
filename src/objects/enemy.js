import { buildGUI } from "../components/charactergui";
import { k, GameState } from "../kaplay";
import {
  animateFloatingObject,
  animateShakingObject,
  animateSquashStretchObject,
} from "../utils/animations";
import { getEnemyConfig } from "../utils/difficulty";
import { shieldSetup } from "./shields";

export function enemy() {
  const stats = getEnemyConfig(GameState.difficulty);

  // PARENT OBJECT
  const object = k.add([
    k.health(stats.health),
    k.pos(GameState.xPosition, GameState.yOffset + 5),
    k.area({ shape: new k.Rect(k.vec2(0), 16, 16) }),
    k.anchor("center"),
    k.layer("game"),
    k.particles(
      {
        max: 100,
        speed: [60, 80],
        damping: [2.0, 3.0],
        lifeTime: [0.85, 1.2],
        angle: [0, 360],
        texture: k.getSprite("hit").data.tex, // texture of a sprite
        quads: [
          k.getSprite("hit").data.frames[0],
          k.getSprite("explode").data.frames[1],
          k.getSprite("explode").data.frames[0],
        ], // frames of a sprite
      },
      {
        direction: 0,
        spread: 360,
      },
    ),
    {
      shields: stats.shields,
      radius: stats.radius,
      speed: stats.speed,
      score: stats.score,
      direction: k.rand() < 0.5 ? 1 : -1,
      createdShields: [],
    },
    "crown",
  ]);

  // SPRITE ONLY SETUP
  const sprite = object.add([
    k.sprite("crown"),
    k.pos(),
    k.anchor("center"),
    k.animate({ relative: true }),
    k.timer(),
  ]);

  animateFloatingObject(sprite);

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

    k.loop(
      0.25,
      () => {
        object.emit(4);
      },
      object.createdShields.length + 1,
    );

    k.tween(
      GameState.score,
      (GameState.score += object.score),
      timer,
      (p) => (GameState.score = Math.ceil(p)),
      k.easings.easeOutQuint,
    );

    k.wait(timer, () => {
      k.shake(2);
      object.destroy();
    });
  });

  return object;
}
