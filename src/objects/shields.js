import { k } from "../kaplay";
import { animateSquashStretchObject } from "../utils/animations";

export function shieldSetup(object) {
  const spriteFrame = k.randi(7);
  const spriteFlip = spriteFrame != 4 && k.rand() < 0.5 ? true : false;

  // SHIELDS SETUP
  // And onUpdate constant movement/animation
  for (let i = 0; i < object.shields; i++) {
    const newShield = k.add([
      k.sprite("shield", {
        frame: spriteFrame,
        flipX: spriteFlip,
      }),
      k.anchor("center"),
      k.area({ scale: k.vec2(0.7, 0.7), offset: k.vec2(0, 1.2) }),
      k.pos(object.pos),
      k.timer(),
      k.layer("game"),
      k.z(1),
      "shield",
    ]);

    newShield.onCollide("bullet", () => {
      animateSquashStretchObject(newShield);
    });

    object.createdShields.push({ shield: newShield, index: i });
  }

  object.onUpdate(() => {
    if (!object.has("health")) return;
    const t = k.time() * object.speed * object.direction;
    object.createdShields.forEach(({ shield, index }, i) => {
      const angle = ((2 * Math.PI) / object.shields) * i + t;
      let offset = k.vec2(
        Math.cos(angle) * object.radius,
        Math.sin(angle) * object.radius,
      );
      shield.moveTo(object.pos.x + offset.x, object.pos.y + offset.y);
    });
  });

  object.onDeath(() => {
    object.createdShields.forEach(({ shield }, i) => {
      k.wait(0.3 * i, () => {
        shield.sprite = "explode";
        shield.play("play");

        shield.onAnimEnd((anim) => {
          shield.destroy();
        });
      });
    });
  });
}
