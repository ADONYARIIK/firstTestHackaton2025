import Phaser from 'phaser';
import { createSprite, createNormalMapSprite, createPhysicsSprite, createNormalMapPhysicsSprite, createCharacterWithAnimations } from '../utils/createHelper.js';
import { setupLights } from '../utils/lightHelper.js';
import { loadTiledObjects } from '../utils/tiledLoader.js';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        setupLights(this);
        // const level1 = this.make.tilemap({ key: 'level1' });
        const testLevel = this.make.tilemap({ key: 'test' });
        const background = testLevel.addTilesetImage('background', 'background');
        const blocks = testLevel.addTilesetImage('blocks', 'blocks');
        const decor = testLevel.addTilesetImage('decor', 'decor');
        // const background = level1.addTilesetImage('background_level1', 'background');
        // const blocks = level1.addTilesetImage('blocks', 'blocks');
        // const decor = level1.addTilesetImage('decor', 'decor');
        // const collect = level1.addTilesetImage('collect', 'collect');
        // const enemies = level1.addTilesetImage('enemies', 'enemies');
        // const playerTileset = level1.addTilesetImage('player', 'player');
        // const usable = level1.addTilesetImage('usable', 'usable');

        const bgLayer = testLevel.createLayer('Background', background, 0, 0);
        const groundLayer = testLevel.createLayer('Ground', blocks, 0, 0);
        const decorLayer = testLevel.createLayer('Decor', decor, 0, 0);
        // const bgLayer = level1.createLayer('level1/Background', background, 0, 0);
        // const decorLayer = level1.createLayer('level1/Decor', decor, 0, 0);
        // const groundLayer = level1.createLayer('level1/Ground', blocks, 0, 0);
        // const objectsLayer = level1.getObjectLayer('Objects');
        // const lightsLayer = level1.getObjectLayer('Lights');
        // const collidersLayer = level1.getObjectLayer('Colliders');
        // const illusionLayer = level1.getObjectLayer('Illusion')

        bgLayer.setPipeline('Light2D');
        groundLayer.setPipeline('Light2D');
        decorLayer.setPipeline('Light2D');

        this.cameras.main.setScroll(0, 1500);

        this.matter.world.setBounds(0, 0, testLevel.widthInPixels, testLevel.heightInPixels);
        this.cameras.main.setBounds(0, 0, testLevel.widthInPixels, testLevel.heightInPixels);
        // const tileset = map.addTilesetImage('tileset', 'tiles');
        // const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        // const decoLayer = map.createLayer('Deco', tileset, 0, 0);
        // groundLayer.setPipeline('Light2D');
        // decoLayer.setPipeline('Light2D');
    }
}