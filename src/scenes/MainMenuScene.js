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




        // Плюс-кнопка
        // Начальное значение
        let volumeValue = 0;

        // Плюс-кнопка
        this.plusVolume = this.add.graphics();
        this.plusVolume.fillStyle(0xffffff, 1);
        this.plusVolume.lineStyle(3, 0x0000f1, 0.4);
        this.plusVolume.fillRoundedRect(0, 0, 50, 20, 10);
        this.plusVolume.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 20), Phaser.Geom.Rectangle.Contains);
        this.settingsContainer.add(this.plusVolume);
        this.plusVolume.x = 120;
        this.plusVolume.y = 60;

        // Минус-кнопка
        this.minusVolume = this.add.graphics();
        this.minusVolume.fillStyle(0xffffff, 1);
        this.minusVolume.lineStyle(3, 0x0000f1, 0.4);
        this.minusVolume.fillRoundedRect(0, 0, 50, 20, 10);
        this.minusVolume.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 20), Phaser.Geom.Rectangle.Contains);
        this.settingsContainer.add(this.minusVolume);
        this.minusVolume.x = 180;
        this.minusVolume.y = 60;

        // Текст для отображения значения
        this.volumeText = this.add.text(250, 60, `${volumeValue}%`, { fontSize: '20px', color: '#fff' });
        this.settingsContainer.add(this.volumeText);

        // Обновление курсора и значения при клике
        this.plusVolume.on('pointerdown', () => {
            volumeValue += 10;
            if (volumeValue > 100) volumeValue = 100; // ограничение
            this.volumeText.setText(`${volumeValue}%`);
        });

        this.minusVolume.on('pointerdown', () => {
            volumeValue -= 10;
            if (volumeValue < 0) volumeValue = 0; // ограничение
            this.volumeText.setText(`${volumeValue}%`);
        });

        // Только для курсора-руки при наведении
        this.plusVolume.on('pointerover', () => this.input.setDefaultCursor('pointer'));
        this.plusVolume.on('pointerout', () => this.input.setDefaultCursor('default'));
        this.minusVolume.on('pointerover', () => this.input.setDefaultCursor('pointer'));
        this.minusVolume.on('pointerout', () => this.input.setDefaultCursor('default'));



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

                this.soundText = this.add.text(10, 50, 'Volume', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);
            }
        });
    }

    showSettings() {
        setTimeout(() => {
            this.closeBtn.setVisible(true);
        }, '150');
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
            }
        });
    }
}