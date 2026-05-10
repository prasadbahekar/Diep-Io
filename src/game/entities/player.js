import Phaser from "phaser";
import { getLevelData } from "../data/levels";
import { state } from "../state";

export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    // Player Shapes
    const pBody = scene.add.circle(0, 0, 12, 0x15b5df);
    pBody.setStrokeStyle(2, 0x0f88a9);

    const weapon = scene.add.rectangle(12, 0, 24, 12, 0x9d9d9d);
    weapon.setStrokeStyle(2, 0x787878);

    const weapons = scene.add.container(0, 0, [weapon]);

    super(scene, x, y, [weapons, pBody]);

    this.scene = scene;
    this.weapon = weapon;
    this.weapons = weapons;

    // Movement
    this.velX = 0;
    this.velY = 0;
    this.maxVelocity = 160;
    this.autoRotate = false;

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setDrag(100, 100);
    this.body.setMaxVelocity(160, 160);

    // Mouse
    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Toggle auto rotate
    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "c") {
        this.autoRotate = !this.autoRotate;
      }
    });
  }

  update(cursors, keys, camera) {
    this.playerMovement(cursors, keys);
    this.weaponUpdate(camera);
    this.renderUpdate();
  }

  renderUpdate() {
    this.scale = getLevelData(state.game.level).tankSize;

    // Camera Zoom
    const targetZoom = 2 / this.scale;
    this.scene.cameras.main.zoom = Phaser.Math.Linear(
      this.scene.cameras.main.zoom,
      targetZoom,
      0.1,
    );
  }

  weaponUpdate(camera) {
    if (this.autoRotate) {
      this.weapons.rotation += 0.01;
    } else {
      const worldPoint = camera.getWorldPoint(this.mouseX, this.mouseY);

      this.weapons.rotation = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        worldPoint.x,
        worldPoint.y,
      );
    }
  }

  playerMovement(cursors, keys) {
    const body = this.body;

    const accel = 6;
    const friction = 0.95;

    let inputX = 0;
    let inputY = 0;

    // Input
    if (cursors.left.isDown || keys.left.isDown) inputX -= 1;
    if (cursors.right.isDown || keys.right.isDown) inputX += 1;
    if (cursors.up.isDown || keys.up.isDown) inputY -= 1;
    if (cursors.down.isDown || keys.down.isDown) inputY += 1;

    // Normalize Input
    const length = Math.sqrt(inputX * inputX + inputY * inputY);
    if (length > 0) {
      inputX /= length;
      inputY /= length;
    }

    // Accelaration and Friction
    this.velX += inputX * accel;
    this.velY += inputY * accel;

    if (inputX === 0) this.velX *= friction;
    if (inputY === 0) this.velY *= friction;

    // Cap
    this.velX = Phaser.Math.Clamp(
      this.velX,
      -this.maxVelocity,
      this.maxVelocity,
    );

    this.velY = Phaser.Math.Clamp(
      this.velY,
      -this.maxVelocity,
      this.maxVelocity,
    );

    if (Math.abs(this.velX) < 0.01) this.velX = 0;
    if (Math.abs(this.velY) < 0.01) this.velY = 0;

    body.velocity.x = this.velX;
    body.velocity.y = this.velY;
  }
}
