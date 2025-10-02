// particlefx.js
import { k } from "../kaplay";

let hitData = null;
let lifetime = null;

k.onLoad(() => {
  hitData = k.getSprite("hit").data;
  lifetime = hitData.frames.length / 10;
});

export function hitParticle(pos, count = 1) {
  const hitEmitter = k.add([
    k.pos(pos),
    k.anchor("center"),
    k.layer("game"),
    k.z(2),
    k.particles(
      {
        max: 20,
        lifeTime: [lifetime, lifetime],
        texture: hitData.tex,
        quads: hitData.frames,
      },
      {
        direction: 0,
        spread: 0,
      },
    ),
  ]);

  hitEmitter.emit(count);
}
