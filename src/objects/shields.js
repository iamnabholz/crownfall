import { k } from "../kaplay";
import { animateSquashStretchObject } from "../utils/animations";

// helper: linear interpolation between 2 vectors
function lerpVec(a, b, t) {
  return k.vec2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
}

// Path generators
function circlePath(t, i, count, radius) {
  const angle = ((2 * Math.PI) / count) * i + t;
  return k.vec2(Math.cos(angle) * radius, Math.sin(angle) * radius);
}

function squarePath(t, i, count, radius) {
  // normalize shield position along square perimeter
  const progress = (i / count + t * 0.1) % 1; // 0..1 looping
  const side = Math.floor(progress * 4); // 0,1,2,3
  const local = (progress * 4) % 1;

  switch (side) {
    case 0:
      return k.vec2(-radius + 2 * radius * local, -radius);
    case 1:
      return k.vec2(radius, -radius + 2 * radius * local);
    case 2:
      return k.vec2(radius - 2 * radius * local, radius);
    case 3:
      return k.vec2(-radius, radius - 2 * radius * local);
  }
}

function trianglePath(t, i, count, radius) {
  let progress = (i / count + t * 0.1) % 1;
  if (progress >= 1) progress = 0;

  const raw = progress * 3;
  let side = Math.floor(raw);
  if (side >= 3) side = 2; // clamp safeguard
  const local = raw - side;

  const h = Math.sqrt(3) * radius;

  const vertices = [
    k.vec2(0, -h / 2),
    k.vec2(-radius, h / 2),
    k.vec2(radius, h / 2),
  ];

  const a = vertices[side];
  const b = vertices[(side + 1) % 3];

  return lerpVec(a, b, local);
}

export function shieldSetup(object) {
  const path = "circle";
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
      k.area({ scale: k.vec2(0.65, 0.5), offset: k.vec2(0, 1.4) }),
      k.pos(object.pos),
      k.layer("game"),
      k.timer(),
      k.z(1),
      "shield",
    ]);

    newShield.onCollide("bullet", () => {
      animateSquashStretchObject(newShield);
    });

    // store index, not offset
    object.createdShields.push({ shield: newShield, index: i });
  }

  object.onUpdate(() => {
    if (!object.has("health")) return;

    const t = k.time() * object.speed * object.direction;
    let offset = k.vec2(0, 0);

    object.createdShields.forEach(({ shield, index }) => {
      switch (path) {
        case "circle":
          offset = circlePath(t, index, object.shields, object.radius);
          break;
        case "square":
          offset = squarePath(t, index, object.shields, object.radius);
          break;
        case "triangle":
          offset = trianglePath(t, index, object.shields, object.radius);
          break;
      }
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
