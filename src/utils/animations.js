import { k } from "../kaplay";

export function animateShakingObject(obj, duration = 0.2, intensity = 3) {
  const startX = obj.pos.x;

  obj.tween(
    0,
    1,
    duration,
    (t) => {
      // t goes from 0 → 1 over `duration`
      // multiply by frequency to get N oscillations per second
      const angle = t * 20 * Math.PI * 2 * duration;
      obj.pos.x = startX + Math.sin(angle) * intensity;
    },
    k.easings.easeOutCubic,
  );
}

export function animateFloatingObject(obj) {
  obj.animate("pos", [k.vec2(0), k.vec2(0, 2)], {
    duration: 1,
    direction: "ping-pong",
    easing: k.easings.easeInOutSine,
  });
}

export function animateSquashStretchObject(obj) {
  obj.tween(
    k.vec2(0.6, 1.2),
    k.vec2(1),
    1,
    (value) => {
      obj.scale = value;
    },
    k.easings.easeOutElastic,
  );
}
