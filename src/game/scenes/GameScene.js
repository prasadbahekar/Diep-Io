import Phaser from "phaser";
import { state } from "../state";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    // Initialize
    state.game.started = true;
    const cellSize = 24;
    const worldSize = 400 * cellSize;

    this.velX = 0;
    this.velY = 0;
    this.maxVelocity = 192;

    // Player Shapes
    this.pBody = this.add.circle(0, 0, 32, 0x15b5df);
    this.pBody.setStrokeStyle(4, 0x0f88a9);

    this.weapon = this.add.rectangle(32, 0, 64, 32, 0x9d9d9d);
    this.weapon.setStrokeStyle(4, 0x787878);
    this.weapons = this.add.container(0, 0, [this.weapon]);

    this.player = this.add.container(400, 300, [this.weapons, this.pBody]);

    this.physics.add.existing(this.player);
    this.player.body.setDrag(100, 100);
    this.player.body.setMaxVelocity(192, 192);
    this.player.setPosition(worldSize / 2, worldSize / 2);

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // Map
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);
    this.physics.world.setBounds(0, 0, worldSize, worldSize);
    this.cameras.main.setBounds(0, 0, worldSize, worldSize);
    this.grid = this.add
      .grid(0, 0, worldSize, worldSize, 32, 32, 0xdddddd, 1, 0xbbbbbb, 1)
      .setOrigin(0, 0);

    this.grid.setDepth(0);
    this.player.setDepth(1);

    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  update() {
    // Variables
    const body = this.player.body;
    const accel = 6;
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

    const worldPoint = this.cameras.main.getWorldPoint(
      this.mouseX,
      this.mouseY,
    );

    this.weapons.rotation = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      worldPoint.x,
      worldPoint.y,
    );
  }
}
