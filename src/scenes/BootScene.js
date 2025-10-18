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
        });
    }

    loadAssets() {
        this.load.atlas('game', './src/assets/atlas/spritesheet.png', './src/assets/atlas/spritesheet.json');
        this.load.image('fullScreen', './src/assets/sprites/fullScreen.svg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
}