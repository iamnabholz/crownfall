import { k } from "../kaplay";
import { GameState } from "../main";
import "./lose";
import { buildPlayer } from "../objects/player";
import { buildEnemy } from "../objects/enemy";
import { setTintColor } from "../loader";

k.scene("game", () => {
  function setBackgroundPosition() {
    return k.vec2(k.randi(4, 32 - wid - 4), k.randi(4, 32 - wid - 4));
  }

  let bg = "bg" + 0;
  const wid = Math.floor(k.width() / 16 / 2);
  let bgPos = setBackgroundPosition();
  const aspectRatio = 192 / 32;

  const ob = k.add([k.layer("background")]);

  ob.onDraw(() => {
    k.drawSprite({
      sprite: bg.toString(),
      pos: k.vec2(bgPos.x * -16, bgPos.y * -16),
      //anchor: "center",
    });
  });

  const player = buildPlayer();
  player.canShoot = true;

  function spawnEnemy() {
    const enemy = buildEnemy({
      onDeath: (enemy) => {
        player.canShoot = false;
        GameState.enemiesBeaten += 1;

        // Game-level reactions
        k.tween(
          GameState.score,
          (GameState.score += enemy.score),
          1,
          (p) => (GameState.score = Math.ceil(p)),
          k.easings.easeOutQuint,
        );

        k.wait(0.25, () => {
          k.shader(5);
          bgPos = setBackgroundPosition();
          setTintColor();
          spawnEnemy();
          player.canShoot = true;
        });
      },
    });
  }

  spawnEnemy();

  k.onCollide("crown", "bullet", (crown, bullet) => {
    k.shake(1);
    player.ammo += 1;
  });

  k.onCollide("shield", "bullet", (shield, bullet) => {
    k.shake(1);
  });

  k.onUpdate(() => {
    if (player.ammo === 0 && k.get("bullet").length <= 0 && player.isAlive) {
      //console.log("loser");
      //animateShakingObject(sprite, timer, 2);

      player.isAlive = false;
      //enemy.unuse("health");
      k.shake(6);
      GameState.particles.pos = player.pos;

      k.loop(
        0.2,
        () => {
          GameState.particles.emit(4);
        },
        6,
      ).onEnd(() => {
        GameState.mode = "over";
      });
    }
  });

  function shootProjectile() {
    if (GameState.mode === "start") {
      GameState.mode = "game";
      k.play("music", { loop: true });
    } else {
      player.shoot();
    }
  }

  let isrec = false;
  let rec;
  k.onButtonPress("secondary", () => {
    /*if (isrec == false) {
      isrec = true;

      rec = k.record();
      console.log("record");
    } else {
      isrec = false;
      rec.download();
      console.log("download");
    }*/
  });

  k.onButtonDown("primary", () => {
    shootProjectile();
  });

  let opacityWaving = 1;
  let controlSchemeFrame = 0;
  function animateFadeToSpriteChange() {
    k.tween(
      1,
      0,
      1,
      (p) => (opacityWaving = p),
      k.easings.easeInOutCubic,
    ).onEnd(() => {
      if (controlSchemeFrame == k.getSprite("inputs").data.frames.length - 1) {
        controlSchemeFrame = 0;
      } else {
        controlSchemeFrame += 1;
      }
      k.tween(
        0,
        1,
        1,
        (p) => (opacityWaving = p),
        k.easings.easeInOutCubic,
      ).onEnd(() => {
        k.wait(3, () => {
          animateFadeToSpriteChange();
        });
      });
    });
  }

  k.wait(4, () => {
    animateFadeToSpriteChange();
  });

  GameState.particles = k.add([
    k.pos(k.center()),
    k.layer("background"),
    k.z(2),
    k.particles(
      {
        max: 100,
        speed: [60, 80],
        damping: [2.0, 3.0],
        lifeTime: [0.85, 1.2],
        angle: [0, 360],
        texture: k.getSprite("hit").data.tex, // texture of a sprite
        quads: [
          k.getSprite("hit").data.frames[0],
          k.getSprite("explode").data.frames[1],
          k.getSprite("explode").data.frames[0],
        ], // frames of a sprite
      },
      {
        direction: 0,
        spread: 360,
      },
    ),
  ]);

  k.onDraw(() => {
    if (GameState.mode == "start") {
      const titleWidthCalculation =
        window.innerWidth > 768 &&
        window.screen.orientation.type.includes("landscape")
          ? 192
          : window.innerWidth / 8;

      const titleHeightCalculation = titleWidthCalculation / aspectRatio;

      k.drawSprite({
        width: titleWidthCalculation,
        height: titleHeightCalculation,
        scale: k.vec2(1),
        sprite: "TITLE",
        pos: k.vec2(k.center().x + 1, k.center().y + 10),
        anchor: "center",
      });

      k.drawSprite({
        sprite: "inputs",
        pos: k.vec2(k.center().x - 7, k.center().y + 34),
        opacity: opacityWaving,
        frame: controlSchemeFrame,
        anchor: "center",
      });

      k.drawText({
        text: "Press     to shoot",
        anchor: "center",
        align: "center",
        pos: k.vec2(k.center().x, k.center().y + 34),
        letterSpacing: -4,
        size: 12,
      });

      k.drawText({
        text: "by FABRIC VISIONS",
        anchor: "center",
        align: "center",
        pos: k.vec2(k.center().x, k.center().y + 92),
        letterSpacing: -2.8,
        size: 8,
        opacity: 0.4,
      });
    } else if (GameState.mode == "game") {
      if (GameState.score > 0) {
        // SCORE TEXT
        k.drawText({
          text: String(GameState.score).padStart(2, "0"),
          size: 28,
          pos: k.vec2(
            k.center().x + GameState.xOffset,
            k.height() - GameState.yOffset,
          ),
          anchor: "center",
          align: "center",
          font: "Numbers",
          letterSpacing: -18,
        });

        k.drawText({
          text: "SCORE",
          size: 8,
          pos: k.vec2(
            k.center().x + GameState.xOffset,
            k.height() - GameState.yOffset - 12,
          ),
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
