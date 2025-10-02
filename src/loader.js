import { k } from "./kaplay";

export function loadAssets() {
  k.loadRoot("./"); // A good idea for Itch.io publishing later

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
}
