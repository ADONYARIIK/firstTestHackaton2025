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
        this.load.image('mainMenuBackground', './src/assets/sprites/backgrounds/background.png');
        //атласы
        //атлас GUI
        this.load.atlas('gui', './src/assets/atlas/gui_spritesheet.png', './src/assets/atlas/gui_spritesheet.json');
        //атлас спрайтов+нормали
        this.load.atlas('sprites', './src/assets/atlas/spritesheet.png', './src/assets/atlas/spritesheet.json');
        // this.load.image('sprites_n', './src/assets/atlas/normalmapsheet.png');
        this.load.atlas('sprites_n', './src/assets/atlas/spritesheet_n.png', './src/assets/atlas/spritesheet_n.json');
        //fonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        // Карта уровня
        // this.load.tilemapTiledJSON('map', 'assets/maps/level1.json');
        // this.load.image('tiles', 'assets/maps/tileset.png');
        // Коллайдеры
        // this.load.json("shapes", "assets/physics/shapes.json");

        // this.load.image('start', './src/assets/newSprites/start.png');
        // this.load.image('gameName', './src/assets/newSprites/gameName.png');
        // this.load.image('close', './src/assets/newSprites/close.png');
        // this.load.image('settingsIcon', './src/assets/newSprites/settingsIcon.png');
        // this.load.image('plusBtn', './src/assets/newSprites/plusBtn.png');
        // this.load.image('minusBtn', './src/assets/newSprites/minusBtn.png');
    }
}