import { k, GameState, setTintColor } from "../kaplay";
import "./lose";
import { hero } from "../objects/hero";
import { enemy } from "../objects/enemy";

k.scene("game", () => {
  const bg = "bg" + k.randi(5);

  k.add([
    k.sprite(bg.toString()),
    k.pos(k.center()),
    k.anchor("center"),
    k.layer("background"),
  ]);

  const player = hero();
  player.canShoot = true;

  let enemy_obj = enemy();

  k.onDestroy("crown", () => {
    k.wait(0.25, () => {
      enemy_obj = enemy();
      setTintColor();
    });
  });

  k.onCollide("crown", "bullet", (crown, bullet) => {
    k.shake(1);
    player.ammo += 1;
  });

  k.onCollide("shield", "bullet", (shield, bullet) => {
    k.shake(1);
  });

  k.onUpdate(() => {
    if (player.ammo === 0 && k.get("bullet").length <= 0) {
      //console.log("loser");
      GameState.mode = "over";
    }
  });

  function shootProjectile() {
    if (GameState.mode === "start") {
      GameState.mode = "game";
    } else {
      player.shoot();
    }
  }

  k.onButtonPress("secondary", () => {
    //player.maxAmmo += 1;
    player.ammo = player.maxAmmo;
  });

  k.onButtonDown("primary", () => {
    shootProjectile();
  });

  k.onDraw(() => {
    if (GameState.mode == "start") {
      /*k.drawSprite({
        sprite: "TITLE",
        pos: k.center(),
        anchor: "center",
      });*/

      /*k.drawText({
        text: "CROWNFALL",
        anchor: "center",
        align: "center",
        pos: k.center(),
        size: 32,
        font: "Alkhemikal",
        letterSpacing: -4,
      });*/

      k.drawSprite({
        sprite: "inputs",
        pos: k.vec2(k.center().x - 7.7, k.center().y + 20),
        frame: 1,
        anchor: "center",
      });

      k.drawText({
        text: "Press     to shoot",
        anchor: "center",
        align: "center",
        pos: k.vec2(k.center().x, k.center().y + 20),
        letterSpacing: -5,
        //font: "Menu",
        size: 14,
      });

      k.drawText({
        text: "by FABRIC VISIONS",
        anchor: "center",
        align: "center",
        pos: k.vec2(k.center().x, k.height() - 10),
        letterSpacing: -2.8,
        size: 8,
        opacity: 0.4,
      });
    } else if (GameState.mode == "game") {
      if (GameState.score >= 0) {
        const pos = k.vec2(k.center().x + GameState.xOffset, player.pos.y);

        // SCORE TEXT
        k.drawSprite({
          sprite: "border",
          pos: k.vec2(pos.x - 1, pos.y - 1),
          width: 56,
          height: 48,
          anchor: "center",
        });

        k.drawText({
          text: String(GameState.score).padStart(2, "0"),
          size: 28,
          pos: k.vec2(pos.x, pos.y - 6),
          anchor: "center",
          align: "center",
          font: "Numbers",
          letterSpacing: -18,
        });

        k.drawText({
          text: "SCORE",
          size: 8,
          pos: k.vec2(pos.x - 0.4, pos.y + 6),
          anchor: "center",
          align: "center",
          letterSpacing: -2,
          opacity: 0.5,
        });
      }
    } else if (GameState.mode == "over") {
      k.go("over");
    }
  });
});
