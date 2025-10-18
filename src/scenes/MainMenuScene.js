import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene')
    }
    preload() {
        this.load.image('bg', '../src/assets/sprites/Background.png');
        this.load.image('fullScreen', '../src/assets/sprites/fullScreen.svg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create() {
        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        const fullScreen = this.add.image(1490, 0, 'fullScreen').setOrigin(0, 0).setScale(0.05).setTintFill(0xffffff);
       
        // this.add.text(400, 200, 'Hackaton Game', {
        //     fontSize: '28px',
        //     color: '#00ff88'
        // }).setOrigin(0.5);

        // const playButton = this.add.text(600, 200, '▶ Играть', {
        //     fontSize: '28px',
        //     color: '#00ff88'
        // }).setOrigin(0.5).setInteractive();

        // playButton.on('pointerdown', () => {
        //     this.scene.start('GameScene');
        // })
        WebFont.load({
            google: {
                families: ['Outfit']
            },
            active: () => {
                this.add.text(230, 500, 'START', {
                    fontFamily: 'Outfit',
                    fontSize: '32px',
                    color: '#ffffffff'
                }).setScale(1);
                this.add.text(650, 100, 'GAME NAME', {
                    fontFamily: 'Outfit',
                    fontSize: '32px',
                    color: '#ffffffff'
                }).setScale(1);
                this.settings = this.add.text(1330, 0, 'SETTINGS', {
                    fontFamily: 'Outfit',
                    fontSize: '32px',
                    color: '#fff'
                }).setInteractive({useHandCursor: true});
                this.settings.on('pointerdown')
            }
        });
        
        
        // fullScreen.setInteractive({useHandCursor: true});
        // fullScreen.on('pointerdown', ()=>{
        //     if(!this.scale.fullscreen){
        //         this.scale.startFullscreen();
        //     }
        //     else{
        //         this.scale.stopFullscreen();
        //     }
        // })
    }
}