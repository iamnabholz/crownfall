import { k } from "./kaplay";
import "./scenes/game";
import "./scenes/menu";

k.loadSpriteAtlas("sprites/gui-sheet.png", {
  diamond: {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
  },
  point: {
    x: 32,
    y: 0,
    width: 32,
    height: 16,
    sliceX: 2,
  },
  RIP: {
    x: 0,
    y: 16,
    width: 16,
    height: 16,
  },
  border: {
    x: 16,
    y: 0,
    width: 16,
    height: 16,
    slice9: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
  },
  restart: {
    x: 16,
    y: 16,
    width: 16,
    height: 16,
  },
  inputs: {
    x: 0,
    y: 32,
    width: 80,
    height: 16,
    sliceX: 5,
  },
});

k.loadSpriteAtlas("sprites/tileset.png", {
  hero: {
    x: 16,
    y: 0,
    width: 16,
    height: 16,
  },
  bullet: {
    x: 32,
    y: 0,
    width: 32,
    height: 16,
    sliceX: 2,
    anims: {
      play: {
        from: 0,
        to: 1,
        loop: true,
      },
    },
  },
  crown: {
    x: 0,
    y: 0,
    width: 16,
    height: 16,
  },
  shield: {
    x: 0,
    y: 16,
    width: 64,
    height: 32,
    sliceX: 4,
    sliceY: 2,
  },
});

k.loadSpriteAtlas("sprites/fx-sheet.png", {
  explode: {
    x: 0,
    y: 0,
    width: 96,
    height: 16,
    sliceX: 6,
    anims: {
      play: {
        from: 0,
        to: 5,
        speed: 12,
      },
    },
  },
  hit: {
    x: 0,
    y: 16,
    width: 64,
    height: 16,
    sliceX: 4,
    anims: {
      play: {
        from: 0,
        to: 3,
        speed: 12,
      },
    },
  },
  particle: {
    x: 64,
    y: 16,
    width: 32,
    height: 16,
    sliceX: 2,
  },
});

k.loadSprite("bg0", "map/backgrounds/png/Level_0.png");

k.setLayers(["background", "game", "foreground", "shader"], "shader");

k.onLoad(() => {
  k.go("game");
});
