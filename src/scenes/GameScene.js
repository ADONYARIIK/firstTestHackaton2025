import Phaser from 'phaser';
import { createSprite, createPhysicsSprite, createPlayer } from '../utils/createHelper.js';
import { setupLights } from '../utils/lightHelper.js';
import { loadTiledObjects, loadTiledTriggerZones } from '../utils/tiledLoader.js';
// import {} from '../utils/mechanics.js';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const testLevel = this.make.tilemap({ key: 'test' });

        this.matter.world.setBounds(0, 0, testLevel.widthInPixels, testLevel.heightInPixels);
        this.cameras.main.setBounds(0, 0, testLevel.widthInPixels, testLevel.heightInPixels);

        this.cameras.main.setScroll(0, 500);
        // objects.Pink.sprite.anims.play(objects.Pink.sprite.animations.walk);

        const background = testLevel.addTilesetImage('background', 'background');
        const blocks = testLevel.addTilesetImage('blocks', 'blocks');
        const decor = testLevel.addTilesetImage('decor', 'decor');

        const bgLayer = testLevel.createLayer('Background', background, 0, 0);
        const groundLayer = testLevel.createLayer('Ground', blocks, 0, 0);
        const decorLayer = testLevel.createLayer('Decor', decor, 0, 0);

        groundLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(groundLayer);

        this.objects = loadTiledObjects(this, testLevel);
        // const triggers = loadTiledTriggerZones(this, testLevel);
        const lights = setupLights(this, testLevel);

        bgLayer.setPipeline('Light2D');
        groundLayer.setPipeline('Light2D');
        decorLayer.setPipeline('Light2D');

        this.player = this.objects.Pink;

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.player.jumpCount = 0;
        this.player.maxJumps = 2;
        this.player.body.frictionAir = 0.05;
        this.player.body.setFixedRotation();
    }

    update() {
        if (!this.player || !this.player.body) {
            return;
        }

        const { up, left, down, right } = this.keys;
        const body = this.player.body;

        const moveForce = 0.05;
        const maxSpeed = 3;
        const jumpForce = -0.05;
        const gravityBoost = 0.3;
        const fallMultiplier = 1.3;
        const fastFallMultiplier = 2.2;

        const vel = body.velocity || { x: 0, y: 0 };

        if (left.isDown) {
            if (vel.x > -maxSpeed) {
                body.applyForce({ x: -moveForce, y: 0 });
            }
            body.flipX = true;
        } else if (right.isDown) {
            if (vel.x < maxSpeed) {
                body.applyForce({ x: moveForce, y: 0 });
            }
            body.flipX = false;
        } else {
            body.setVelocityX(vel.x * 0.9);
        }

        const onGround = Math.abs(vel.y) < 0.1;
        if (onGround) {
            this.player.jumpCount = 0;
        }

        if (up.isDown && this.canJump()) {
            body.setVelocityY(jumpForce * 60);
            this.player.jumpCount++;
            this.player.sprite.anims.play(this.player.sprite.animations.jump, true);
        }

        if (!onGround && vel.y > 0) {
            const multiplier = down.isDown ? fastFallMultiplier : fallMultiplier;
            const extraForce = gravityBoost * multiplier;

            body.applyForce({ x: 0, y: extraForce });
        }

        if (down.IsDown && onGround) {
            this.player.sprite.anims.play(this.player.sprite.animations.duck, true);
        } else if (Math.abs(vel.y) > 1) {
            this.player.sprite.anims.play(this.player.sprite.animations.jump, true);
        } else if (Math.abs(vel.x) > 0.5) {
            this.player.sprite.anims.play(this.player.sprite.animations.walk, true);
        } else {
            this.player.sprite.anims.play(this.player.sprite.animations.stand, true);
        }

        // this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    canJump() {
        return this.player.jumpCount < this.player.maxJumps;
    }
}