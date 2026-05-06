import Phaser from "phaser";
import { state } from "../state";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    state.game.started = true;

    this.player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(this.player);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.setSize(50, 50);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    const speed = 200;
    const body = this.player.body;

    body.setVelocity(0);

    if (this.cursors.left.isDown || this.keys.left.isDown) {
      body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.keys.right.isDown) {
      body.setVelocityX(speed);
    }

    if (this.cursors.up.isDown || this.keys.up.isDown) {
      body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown || this.keys.down.isDown) {
      body.setVelocityY(speed);
    }

    if (body.velocity.length() > 0) {
      body.velocity.normalize().scale(speed);
    }
  }
}
