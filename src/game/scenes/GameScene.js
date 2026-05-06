import Phaser from "phaser";
import { state } from "../state";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    state.game.started = true;
    const cellSize = 24;
    const worldSize = 400 * cellSize;

    this.player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(this.player);

    this.player.body.setDrag(100, 100);
    this.player.body.setMaxVelocity(260, 260);
    this.player.setPosition(worldSize / 2, worldSize / 2);

    this.velX = 0;
    this.velY = 0;
    this.maxVelocity = 200;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);
    this.physics.world.setBounds(0, 0, worldSize, worldSize);
    this.cameras.main.setBounds(0, 0, worldSize, worldSize);
    this.grid = this.add
      .grid(
        0,
        0,
        worldSize,
        worldSize,
        32,
        32,
        0xdddddd,
        1, // fill (transparent)
        0xbbbbbb,
        1, // grid line color (green)
      )
      .setOrigin(0, 0);

    this.grid.setDepth(0);
    this.player.setDepth(1);
  }

  update() {
    // Variables
    const body = this.player.body;
    const accel = 8;
    const friction = 0.95;
    let inputX = 0;
    let inputY = 0;

    // Input
    if (this.cursors.left.isDown || this.keys.left.isDown) inputX -= 1;
    if (this.cursors.right.isDown || this.keys.right.isDown) inputX += 1;
    if (this.cursors.up.isDown || this.keys.up.isDown) inputY -= 1;
    if (this.cursors.down.isDown || this.keys.down.isDown) inputY += 1;

    // Acceleration and Friction
    this.velX += inputX * accel;
    this.velY += inputY * accel;

    if (inputX === 0) this.velX *= friction;
    if (inputY === 0) this.velY *= friction;

    // Cap
    if (this.velX > this.maxVelocity) this.velX = this.maxVelocity;
    if (this.velY > this.maxVelocity) this.velY = this.maxVelocity;
    if (this.velX < -this.maxVelocity) this.velX = -this.maxVelocity;
    if (this.velY < -this.maxVelocity) this.velY = -this.maxVelocity;
    if (Math.abs(this.velX) < 0.01) this.velX = 0;
    if (Math.abs(this.velY) < 0.01) this.velY = 0;

    body.velocity.x = this.velX;
    body.velocity.y = this.velY;
  }
}
