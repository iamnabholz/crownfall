// difficulties.js
import { k } from "../kaplay";

const DIFFICULTIES = {
  TEST: {
    health: () => 1,
    shields: () => 1,
    radius: () => 40,
    speed: () => 0.3,
    score: () => k.randi(8, 11),
  },
  easy: {
    health: () => k.randi(3, 5),
    shields: () => k.randi(3, 5),
    radius: () => 40,
    speed: () => k.rand(0.45, 0.7),
    score: () => 3,
  },
  medium: {
    health: () => k.randi(4, 6),
    shields: () => k.randi(4, 6),
    radius: () => 36,
    speed: () => k.rand(1.1, 1.2),
    score: () => k.randi(5, 8),
  },
  hard: {
    health: () => k.randi(6, 9),
    shields: () => k.randi(5, 7),
    radius: () => 36,
    speed: () => k.rand(1.4, 1.5),
    score: () => k.randi(9, 12),
  },
  imposible: {
    health: () => k.randi(9, 11),
    shields: () => k.randi(6, 8),
    radius: () => 32,
    speed: () => k.rand(1.7, 1.8),
    score: () => 16,
  },
};

export function getEnemyConfig(difficulty = "easy") {
  const rules = DIFFICULTIES[difficulty];

  return {
    health: rules.health(),
    shields: rules.shields(),
    radius: rules.radius(),
    speed: rules.speed(),
    score: rules.score(),
  };
}
