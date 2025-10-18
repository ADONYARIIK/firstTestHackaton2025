import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene')
    }
    create() {
        const bg = this.add.image(0, 0, 'game', 'background.png').setOrigin(0, 0);

        const fullScreen = this.add.image(1490, 0, 'fullScreen').setOrigin(0, 0).setScale(0.05).setTintFill(0xffffff);

        this.settingsContainer = this.add.container(1200, 100).setVisible(false);




        this.gfx = this.add.graphics();
        this.gfx.fillStyle(0x000000, 0.8);
        this.gfx.lineStyle(3, 0x0000f1, 0.4);
        this.gfx.fillRoundedRect(0, 0, 300, 300, 20);
        this.gfx.strokeRoundedRect(0, 0, 300, 300, 20);
        this.settingsContainer.add(this.gfx);



        WebFont.load({
            google: {
                families: ['Outfit']
            },
            active: () => {

                this.startBtn = this.add.text(230, 500, 'START', {
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


                this.language = this.add.text(10, 10, 'Language', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });

                this.closeBtn = this.add.text(260, 10, 'X', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' }).setInteractive({ useHandCursor: true }).setVisible(false);

                this.settingsContainer.add(this.closeBtn);
                this.settingsContainer.add(this.language);
                this.closeBtn.on('pointerdown', () => {
                    this.hideSettings();
                    this.closeBtn.setVisible(false);
                });

                this.startBtn.setInteractive({ useHandCursor: true });
                this.startBtn.on('pointerdown', () => {
                    this.scene.start('GameScene');
                });

                this.soundText = this.add.text(10, 50, 'Sound', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);
            }
        });
        this.container = document.getElementById('game-container');
        this.input = document.createElement("input");
        this.input.type = "number";
        this.input.style.position = "relative";   
        this.input.style.bottom = "48.7em";
        this.input.style.left = "85%";
        this.input.min = "0";
        this.input.max = "100";
        this.input.value = '0';
        this.input.step= "10"
        this.input.style.width = "100px";
        this.input.style.height = "20px";
        this.input.style.fontSize = "18px";
        this.input.style.padding = "5px";
        this.input.style.borderRadius = "6px";
        this.container.appendChild(this.input);
        this.input.style.display = 'none';

    }

    showSettings() {
        setTimeout(() => {
            this.closeBtn.setVisible(true);
        }, '150');
        setTimeout(() => {
            this.input.style.display = 'block';
        }, '250');
        this.settingsContainer.setVisible(true);
        this.tweens.add({
            targets: this.settingsContainer,
            alpha: 1,
            scale: 1,
            duration: 300,
            ease: 'Back.Out'
        });
    }
    hideSettings() {
        this.tweens.add({
            targets: this.settingsContainer,
            alpha: 0,
            scale: 0,
            duration: 200,
            ease: 'Back.In',
            onComplete: () => {
                this.settingsContainer.setVisible(false);
                this.input.style.display = 'none';
            }
        });
    }
}