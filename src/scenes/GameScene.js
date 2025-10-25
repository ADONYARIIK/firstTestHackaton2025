import Phaser from 'phaser';
/*import { createSprite, createNormalMapSprite, createPhysicsSprite, createNormalMapPhysicsSprite, createPlayer } from '../utils/createHelper.js';*/
import { setupLights } from '../utils/lightHelper.js';
import { loadTiledObjects } from '../utils/tiledLoader.js';
// import {} from '../utils/mechanics.js';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const testLevel = this.make.tilemap({ key: 'test' });

        this.matter.world.setBounds(0, 0, testLevel.widthInPixels, testLevel.heightInPixels);
        this.cameras.main.setBounds(0, 0, testLevel.widthInPixels, testLevel.heightInPixels);

        const background = testLevel.addTilesetImage('background', 'background');
        const blocks = testLevel.addTilesetImage('blocks', 'blocks');
        const decor = testLevel.addTilesetImage('decor', 'decor');

        const bgLayer = testLevel.createLayer('Background', background, 0, 0);
        const groundLayer = testLevel.createLayer('Ground', blocks, 0, 0);
        const decorLayer = testLevel.createLayer('Decor', decor, 0, 0);

        setupLights(this);

        // loadTiledObjects(this, testLevel);
        // const objectsLayer = testLevel.getObjectLayer('Entities');
        // const collidersLayer = testLevel.getObjectLayer('Colliders');
        // const lightsLayer = testLevel.getObjectLayer('Lights');

        this.matter.world.convertTilemapLayer(groundLayer);

        bgLayer.setPipeline('Light2D');
        groundLayer.setPipeline('Light2D');
        decorLayer.setPipeline('Light2D');

        this.cameras.main.setScroll(0, 500);
    }
}