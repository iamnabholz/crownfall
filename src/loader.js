import { k } from "./kaplay";
import { GameState } from "./main";

const colorPalettes = [
  [139, 200, 254],
  [207, 171, 74],
  [244, 78, 56],
  [0, 255, 174],
  [166, 146, 176],
];

const colorHistory = [];

export function setTintColor() {
  // available indices that are not in last 2
  const options = colorPalettes
    .map((_, i) => i)
    .filter((i) => !colorHistory.includes(i));

  // pick a random index
  const colorIndex = options[Math.floor(Math.random() * options.length)];

  // update history
  colorHistory.push(colorIndex);
  if (colorHistory.length > 2) colorHistory.shift();

  // store raw RGB in GameState
  //GameState.tintColor = colorPalettes[colorIndex];

  const [r, g, b] = colorPalettes[colorIndex].map((v) => v / 255);

  k.usePostEffect("tint", () => ({
    u_color: k.rgb(r, g, b),
  }));
}

export function loadAssets() {
  k.loadRoot("./"); // A good idea for Itch.io publishing later

  k.loadShader(
    "tint",
    null,
    `
    uniform vec3 u_color;

    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        vec4 c = def_frag();
        return vec4(u_color.x * c.r,
          u_color.y * c.g,
          u_color.z * c.b,
          c.a);
    }
  `,
  );

  setTintColor();

  k.loadBitmapFont("Alkhemikal", "fonts/Alkhemikal.png", 24, 32, {
    filter: "nearest",
    chars:
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  });

  k.loadBitmapFont("NameHere", "fonts/NameHere.png", 24, 32, {
    filter: "nearest",
    chars:
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  });

  k.loadBitmapFont("Numbers", "fonts/Number.png", 30, 30, {
    filter: "nearest",
    chars: " #$%'()*+,-./0123456789:<=>",
  });

  k.loadBitmapFont("Classic", "fonts/ClassicShit.png", 30, 30, {
    filter: "nearest",
    chars:
      " !&'()*+,.0123456789:;=?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  });

  k.loadFont("Menu", "fonts/MenuCard.ttf");

  k.loadSprite("TITLE", "sprites/title.png");

  k.loadSpriteAtlas("sprites/projectile-sheet.png", {
    bullet: {
      x: 0,
      y: 0,
      width: 48,
      height: 16,
      sliceX: 3,
      anims: {
        play: {
          from: 0,
          to: 2,
          loop: true,
          speed: 24,
        },
      },
    },
  });

  k.loadSpriteAtlas("sprites/gui-sheet.png", {
    diamond: {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
    point: {
      x: 16,
      y: 0,
      width: 48,
      height: 16,
      sliceX: 3,
    },
    RIP: {
      x: 0,
      y: 16,
      width: 16,
      height: 16,
    },
    border: {
      x: 48,
      y: 0,
      width: 32,
      height: 32,
      slice9: {
        left: 6,
        right: 6,
        top: 6,
        bottom: 6,
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
  k.loadSound("music", "sounds/ReClaimed.mp3");
}
