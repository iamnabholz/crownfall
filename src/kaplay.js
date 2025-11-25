import kaplay from "kaplay";
import { loadAssets } from "./loader";

// import "kaplay/global"; // uncomment if you want to use without the k. prefix

export const k = kaplay({
  global: false,
  //width: 240,
  //height: 208,
  scale: window.screen.orientation.type.includes("landscape") ? 4 : 8,
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

loadAssets();

k.onLoading((progress) => {
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
