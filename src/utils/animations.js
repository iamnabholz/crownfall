import { k } from "../kaplay";

export function animateFadeToSpriteChange(sprite) {
  k.tween(1, 0, 2, (p) => (opacityWaving = p), k.easings.linear).onEnd(() => {
    if (controlSchemeFrame + 1 > k.getSprite("inputs").frames) {
      controlSchemeFrame = 0;
    } else {
      controlSchemeFrame += 1;
    }
    k.tween(0, 1, 2, (p) => (opacityWaving = p), k.easings.linear).onEnd(() => {
      animateFadeToSpriteChange(sprite);
    });
  });
}

export function animateShakingObject(obj, duration = 0.2, intensity = 3) {
  const startX = obj.pos.x;

  obj.tween(
    0,
    1,
    duration,
    (t) => {
      // t goes from 0 → 1 over `duration`
      // multiply by frequency to get N oscillations per second
      const angle = t * 10 * Math.PI * 2 * duration;
      obj.pos.x = startX + Math.sin(angle) * intensity;
    },
    k.easings.easeOutCubic,
  );
}

export function animateFloatingObject(obj, backwards = false) {
  obj.animate("pos", [k.vec2(0), k.vec2(0, backwards ? 2 : -2)], {
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
