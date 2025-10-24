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
        this.load.image('settingsIcon', './src/assets/newSprites/settingsIcon.png');
        this.load.atlas('game', './src/assets/atlas/spritesheet.png', './src/assets/atlas/spritesheet.json');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Атлас спрайтов + нормали
        // this.load.atlas("sprites", "assets/atlas/spritesheet.png", "assets/atlas/spritesheet.json");
        // this.load.image("sprites_n", "assets/atlas/spritesheet_n.png");

        // Коллайдеры
        // this.load.json("shapes", "assets/physics/shapes.json");
    }
}