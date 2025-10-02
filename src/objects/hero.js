import { k, GameState } from "../kaplay";
import {
  animateFloatingObject,
  animateSquashStretchObject,
} from "../utils/animations";
import { buildGUI } from "../components/charactergui";

export function hero() {
  // PARENT OBJECT
  const object = k.add([
    k.pos(GameState.xPosition, k.height() - GameState.yOffset),
    k.anchor("center"),
    k.layer("game"),
    {
      canShoot: false,
      reloadSpeed: 10,
      bulletSpeed: 3,
      ammo: 5,
      maxAmmo: 0,
    },
    "player",
  ]);

  object.maxAmmo = object.ammo;

  // SPRITE ONLY SETUP
  const sprite = object.add([
    k.sprite("hero"),
    k.pos(),
    k.animate({ relative: true }),
    k.layer("game"),
    k.z(1),
    k.anchor("center"),
    k.timer(),
  ]);

  animateFloatingObject(sprite);

  // DRAW PLAYER AMMO
  object.onDraw(() => {
    if (GameState.mode !== "game") return;

    buildGUI(GameState, object.ammo, object.maxAmmo, true);
  });

  // SHOOT PROJECTILE FUNCTION
  // Creates a bullet
  object.shoot = () => {
    if (object.ammo > 0 && object.canShoot) {
      object.ammo -= 1;
      object.canShoot = false;

      k.wait(0.1 * object.reloadSpeed, () => {
        object.canShoot = true;
      });

      sprite.unanimate("pos");
      animateSquashStretchObject(sprite);

      const bullet = k.add([
        k.pos(object.pos),
        k.sprite("bullet", { anim: "play" }),
        k.area({ scale: 0.4 }),
        k.offscreen({ destroy: true }),
        k.anchor("center"),
        k.layer("game"),
        k.move(k.UP, object.bulletSpeed * 30),
        "bullet",
      ]);

      function collide() {
        bullet.unuse("move");

        bullet.sprite = "hit";
        bullet.play("play");

        bullet.onAnimEnd((anim) => {
          bullet.destroy();
        });
      }

      bullet.onCollide("shield", () => {
        collide();
      });

      bullet.onCollide("crown", () => {
        collide();
      });

      animateFloatingObject(sprite);
    }
  };

  return object;
}
