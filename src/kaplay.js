import kaplay from "kaplay";
import { loadAssets } from "./loader";
import { getOffsetPosition } from "./utils/utils";

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

export const k = kaplay({
  global: false,
  //width: 240,
  //height: 208,
  scale: 4,
  font: "NameHere",
  crisp: true,
  texFilter: "nearest",
  loadingScreen: true,
  background: [10, 10, 20],
  debug: true,
  buttons: {
    primary: {
      keyboard: ["x", "up"],
      gamepad: ["south"],
      mouse: ["left"],
    },
    secondary: {
      keyboard: ["z", "left"],
      gamepad: ["west"],
      mouse: ["right"],
    },
  },
});

export const GameState = {
  difficulty: "easy",
  mode: "start",
  score: 0,
  highscore: 0,
  yOffset: getOffsetPosition(),
  xOffset: 72,
  xPosition: k.center().x,
  spacing: 6,
  tintColor: [244, 78, 56],
};

k.onResize(() => {
  GameState.yOffset = getOffsetPosition();
  GameState.xPosition = k.center().x;
});

loadAssets();

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
  GameState.tintColor = colorPalettes[colorIndex];

  const [r, g, b] = colorPalettes[colorIndex].map((v) => v / 255);

  k.usePostEffect("tint", () => ({
    u_color: k.rgb(r, g, b),
  }));
}

// set initial color
setTintColor();

k.onLoading((progress) => {
  k.randSeed(Date.now());

  /*k.drawSprite({
    sprite: "TITLE",
    anchor: "center",
    pos: k.vec2(k.center().x, k.center().y + 16),
  });*/

  k.drawText({
    text: (Math.floor(progress) + " %").toString(),
    size: 10,
    width: 120,
    anchor: "center",
    align: "center",
    letterSpacing: -2,
    pos: k.center(),
    color: k.WHITE,
  });
});
