import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', './src/assets/logo.png')
    }

    create() {
        const { width, height } = this.scale;
        const logo = this.add.image(width / 2, height / 2, 'logo');
        logo.setScale(0.5);

        this.loadAssets();
        this.load.start();

        this.load.on('complete', () => {
            this.scene.start('MainMenuScene');
            // this.scene.start('GameScene');
        });
    }

    loadAssets() {
        //atlases
        this.load.atlas('gui', './src/assets/atlas/gui_spritesheet.png', './src/assets/atlas/gui_spritesheet.json');
        this.load.atlas('sprites', './src/assets/atlas/spritesheet.png', './src/assets/atlas/spritesheet.json');
        this.load.atlas('sprites_n', './src/assets/atlas/spritesheet_n.png', './src/assets/atlas/spritesheet_n.json');
        //fonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        //levelmaps
        this.load.tilemapTiledJSON('test', './src/assets/maps/testLevel.json');
        this.load.image('background', './src/assets/sprites/level1/background/bg_castle.png');
        this.load.image('blocks', './src/assets/maps/tilesets/tileset_blocks.png');
        this.load.image('decor', './src/assets/maps/tilesets/tileset_decor.png');
        //colliders
        this.load.json('shapes', './src/assets/physics/shapes.json');
    }
}