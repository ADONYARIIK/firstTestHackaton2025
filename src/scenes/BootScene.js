import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', '../src/assets/logo.png')
    }

    create() {
        const { width, height } = this.scale;
        const logo = thiss.add.image(width / 2, height / 2, 'logo');
        logo.setScale(0.5);

        this.load.start();

        this.load.on('complete', () => {
            this.scene.start('MainMenuScene');
        });
    }

    loadAssets() {

    }
}