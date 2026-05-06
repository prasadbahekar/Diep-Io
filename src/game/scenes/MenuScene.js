import Phaser from "phaser";
import { enterFullscreen } from "../utils/functions";
import { state } from "../state";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {}

  create() {
    const ui = document.getElementById("home-menu");
    const button = document.getElementById("startBtn");
    ui.style.display = "flex";
    state.game.started = false;

    button.onclick = async () => {
      try {
        await enterFullscreen();
        ui.style.display = "none";
        this.scene.start("GameScene");
      } catch (err) {
        alert("Please allow fullscreen to play the game!");
      }
    };

    // document.addEventListener("fullscreenchange", () => {
    //   if (!document.fullscreenElement)
    //     document.getElementById("home-menu").style.display = "flex";
    // });
  }
}
