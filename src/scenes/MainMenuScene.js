import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene')
    }
    create() {
        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        const fullScreen = this.add.image(1490, 0, 'fullScreen').setOrigin(0, 0).setScale(0.05).setTintFill(0xffffff);
        this.settingsContaner = this.add.container(1200, 100).setVisible(false);
        
        this.closeBtn = this.add.text(260, 10, 'X', { fontSize: '32px', fill: '#fff' }).setInteractive({ useHandCursor: true }).setVisible(false);
         this.closeBtn.on('pointerdown', () => {
            this.hideSettings();
            this.closeBtn.setVisible(false);
        });
        this.gfx = this.add.graphics();
        this.gfx.fillStyle(0x000000, 0.8);
        this.gfx.lineStyle(3, 0xffffff, 0.4);
        this.gfx.fillRoundedRect(0, 0, 300, 300, 20);
        this.gfx.strokeRoundedRect(0, 0, 300, 300, 20);
        this.settingsContaner.add(this.gfx);
         this.settingsContaner.add(this.closeBtn);



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
                }).setInteractive({ useHandCursor: true });
                this.settings.on('pointerdown', () => {
                    this.showSettings();
                })
            }
        });

    }

    showSettings() {
        setTimeout(()=>{
            this.closeBtn.setVisible(true);
        }, '150');
        this.settingsContaner.setVisible(true);
        this.tweens.add({
            targets: this.settingsContaner,
            alpha: 1,
            scale: 1,
            duration: 300,
            ease: 'Back.Out'
        });
    }
    hideSettings() {
        this.tweens.add({
            targets: this.settingsContaner,
            alpha: 0,
            scale: 0,
            duration: 200,
            ease: 'Back.In',
            onComplete: () => {
                this.settingsContaner.setVisible(false);
            }
        });
    }
}