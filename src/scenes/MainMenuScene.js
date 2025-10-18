import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene')
    }
    create() {
        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        const fullScreen = this.add.image(1490, 0, 'fullScreen').setOrigin(0, 0).setScale(0.05).setTintFill(0xffffff);
        this.settingsContaner = this.add.container(1200, 100).setVisible(false);
        let settingsBackground = this.add.rectangle(0, 0, 300, 300, 0x000000, 0.8).setOrigin(0);
        this.settingsContaner.add(settingsBackground);
        this.closeBtn = this.add.text(1480, 100, 'X', { fontSize: '32px', fill: '#fff' }).setInteractive({ useHandCursor: true }).setVisible(false);
        





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

        this.closeBtn.on('pointerdown', () => {
            this.hideSettings();
            this.closeBtn.setVisible(false);
        });
    }

    showSettings() {
        this.closeBtn.setVisible(true);
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