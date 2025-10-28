import Phaser from 'phaser';
// import { createSprite, createPhysicsSprite, createPlayer } from '../utils/createHelper.js';
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

        const background = testLevel.addTilesetImage('background', 'background');
        const blocks = testLevel.addTilesetImage('blocks', 'blocks');
        const decor = testLevel.addTilesetImage('decor', 'decor');

        const bgLayer = testLevel.createLayer('Background', background, 0, 0);
        const groundLayer = testLevel.createLayer('Ground', blocks, 0, 0);
        const decorLayer = testLevel.createLayer('Decor', decor, 0, 0);

        groundLayer.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(groundLayer);

        const objects = loadTiledObjects(this, testLevel);
        const triggers = loadTiledTriggerZones(this, testLevel);
        const lights = setupLights(this, testLevel);

        bgLayer.setPipeline('Light2D');
        groundLayer.setPipeline('Light2D');
        decorLayer.setPipeline('Light2D');

        this.player = objects.Pink;

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.player.jumpCount = 0;
        this.player.maxJumps = 2;
        this.player.body.setFriction(0);
        this.player.body.setFrictionStatic(0);
        this.player.body.setFrictionAir(0.05);
        this.player.body.setFixedRotation();
        this.player.body.velocity = this.player.body.body.velocity || { x: 0, y: 0 };

        this.matter.world.on('collisionactive', (event) => {
            event.pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;

                if (bodyA === this.player.body || bodyB === this.player.body) {
                    pair.friction = 0;
                    pair.frictionStatic = 0;
                }
            });
        });

        // console.log('Player:', this.player);
        // console.log('Player animations:', this.player.animations);
        // console.log('Player body:', this.player.body);
        // console.log('Player body body:', this.player.body.body);
    }

    update() {
        if (!this.player || !this.player.body || !this.player.body.velocity) {
            return;
        }

        const { up, left, down, right } = this.keys;
        const body = this.player.body;

        const moveForce = 0.1;
        let maxSpeed = 4;
        const jumpForce = -0.15;

        const gravityBoost = 0.002;
        const fallMultiplier = 1.1;
        const fastFallMultiplier = 1.5;

        const jumpBufferTime = 150;
        const coyoteTime = 100;

        if (!this.player.jumpBuffer) { this.player.jumpBuffer = 0 };
        if (!this.player.coyoteTimer) { this.player.coyoteTimer = 0 };

        if (Phaser.Input.Keyboard.JustDown(up)) {
            this.player.jumpBuffer = jumpBufferTime;
        } else {
            this.player.jumpBuffer -= this.game.loop.delta;
        }

        const onGround = Math.abs(body.velocity.y) == 0;
        if (onGround) {
            body.setFriction(1);
            body.setFrictionAir(0.05);
            this.player.jumpCount = 0;
            this.player.coyoteTimer = coyoteTime;
        } else {
            body.setFriction(0);
            body.setFrictionAir(0.02);
            this.player.coyoteTimer -= this.game.loop.delta;
        }

        const touchingWall = Math.abs(body.velocity.x) < 0.1 && !onGround && (left.isDown || right.isDown);
        if (touchingWall) {
            body.applyForce({ x: (right.isDown ? -0.15 : left.isDown ? 0.15 : 0), y: 0 });
        }

        if (!onGround) {
            maxSpeed = 3;
        }

        if (down.isDown && onGround) {
            maxSpeed = 1;
        }

        if (left.isDown) {
            if (body.velocity.x > -maxSpeed) {
                body.applyForce({ x: -moveForce, y: 0 });
                // console.log(maxSpeed);
            }
            this.player.sprite.flipX = true;
        } else if (right.isDown) {
            if (body.velocity.x < maxSpeed) {
                body.applyForce({ x: moveForce, y: 0 });
                // console.log(maxSpeed);
            }
            this.player.sprite.flipX = false;
        } else {
            body.setVelocityX(body.velocity.x * 0.99);
        }

        if (this.player.jumpBuffer > 0 && (this.player.coyoteTimer > 0 || this.player.jumpCount < this.player.maxJumps)) {
            let vX = body.velocity.x;

            if (right.isDown) { vX += 1.5 };
            if (left.isDown) { vX -= 1.5 };

            body.setVelocity(vX, jumpForce * 80);

            this.player.jumpCount++;
            this.player.jumpBuffer = 0;
            this.player.coyoteTimer = 0;
            this.player.play(this.player.animations.jump, true);
        }

        if (Phaser.Input.Keyboard.JustUp(up) && body.velocity.y < 0) {
            body.setVelocityY(body.velocity.y * 0.5);
        }

        if (!onGround && body.velocity.y > 0) {
            body.setFrictionAir(0);
            body.setFriction(1);

            const multiplier = down.isDown ? fastFallMultiplier : fallMultiplier;
            const extraForce = gravityBoost * multiplier;

            body.applyForce({ x: 0, y: extraForce });
        }

        if (down.isDown && onGround) {
            this.player.play(this.player.animations.duck, true);
        } else if (Math.abs(body.velocity.y) > 0.01) {
            this.player.play(this.player.animations.jump, true);
        } else if (Math.abs(body.velocity.x) > 0.01) {
            this.player.play(this.player.animations.walk, true);
        } else {
            this.player.play(this.player.animations.stand, true);
        }

        this.cameras.main.startFollow(body, true, 0.05, 0.05);
    }
}