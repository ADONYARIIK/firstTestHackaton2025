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
        // const map = this.make.tilemap({ key: 'level1' });
        // const tileset = map.addTilesetImage('tileset', 'tiles');
        // const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        // const decoLayer = map.createLayer('Deco', tileset, 0, 0);
        // groundLayer.setPipeline('Light2D');
        // decoLayer.setPipeline('Light2D');
    }
}