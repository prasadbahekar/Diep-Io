import Phaser from "phaser";
import { enterFullscreen } from "../utils/functions";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {}

  create() {
    const ui = document.getElementById("ui");
    const button = document.getElementById("startBtn");
    ui.style.display = "flex";

    button.onclick = async () => {
      try {
        await enterFullscreen();
        ui.style.display = "none";
      } catch (err) {
        alert("Please allow fullscreen to play the game!");
      }
    };

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement)
        document.getElementById("ui").style.display = "flex";
    });
  }
}
