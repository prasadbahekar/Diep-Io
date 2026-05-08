import Phaser from "phaser";
import MenuScene from "./game/scenes/MenuScene";
import { enterFullscreen } from "./game/utils/functions";
import GameScene from "./game/scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  parent: document.body,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#9a9a9e",
  scene: [MenuScene, GameScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
  game.scale.resize(window.innerWidth, window.innerHeight);
  game.scale.resize(window.innerWidth, window.innerHeight);
});
