import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene')
    }
    create() {
        const bg = this.add.image(0, 0, 'game', 'background.png').setOrigin(0, 0);


        this.settingsIcon = this.add.image(1500, 30, 'settingsIcon').setScale(0.09).setTintFill(0xffffff).setInteractive({useHandCursor: true});
        this.settingsIcon.on('pointerdown', () => {
            this.showSettings();
        });
        this.settingsIcon.on('pointerover', () => {
            this.rotateSettingIcon();
        });
        this.settingsContainer = this.add.container(1200, 100).setVisible(false);



        this.gfx = this.add.graphics();
        this.gfx.fillStyle(0x000000, 0.8);
        this.gfx.lineStyle(3, 0x0000f1, 0.4);
        this.gfx.fillRoundedRect(0, 0, 300, 300, 20);
        this.gfx.strokeRoundedRect(0, 0, 300, 300, 20);
        this.settingsContainer.add(this.gfx);




        // Плюс-кнопка
        // Начальное значение
        let musicValue = 0;

        // Плюс-кнопка
        this.plusMusicVolume = this.add.graphics();
        this.plusMusicVolume.fillStyle(0xffffff, 1);
        this.plusMusicVolume.lineStyle(3, 0x0000f1, 0.4);
        this.plusMusicVolume.fillRoundedRect(0, 0, 50, 20, 10);
        this.plusMusicVolume.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 20), Phaser.Geom.Rectangle.Contains);
        this.settingsContainer.add(this.plusMusicVolume);
        this.plusMusicVolume.x = 180;
        this.plusMusicVolume.y = 60;

        // Минус-кнопка
        this.minusMusicVolume = this.add.graphics();
        this.minusMusicVolume.fillStyle(0xffffff, 1);
        this.minusMusicVolume.lineStyle(3, 0x0000f1, 0.4);
        this.minusMusicVolume.fillRoundedRect(0, 0, 50, 20, 10);
        this.minusMusicVolume.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 20), Phaser.Geom.Rectangle.Contains);
        this.settingsContainer.add(this.minusMusicVolume);
        this.minusMusicVolume.x = 120;
        this.minusMusicVolume.y = 60;


        // Текст для отображения значения
        this.musicText = this.add.text(250, 60, `${musicValue}%`, { fontSize: '20px', color: '#fff' });
        this.settingsContainer.add(this.musicText);

        this.plusMusicVolume.on('pointerdown', () => {
            musicValue += 10;
            if (musicValue > 100) musicValue = 100; // ограничение
            this.musicText.setText(`${musicValue}%`);
        });

        this.minusMusicVolume.on('pointerdown', () => {
            musicValue -= 10;
            if (musicValue < 0) musicValue = 0; // ограничение
            this.musicText.setText(`${musicValue}%`);
        });


        let sfxValue = 0;

        // Плюс-кнопка SFX
        this.plusSfxVolume = this.add.graphics();
        this.plusSfxVolume.fillStyle(0xffffff, 1);
        this.plusSfxVolume.lineStyle(3, 0x0000f1, 0.4);
        this.plusSfxVolume.fillRoundedRect(0, 0, 50, 20, 10);
        this.plusSfxVolume.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 20), Phaser.Geom.Rectangle.Contains);
        this.settingsContainer.add(this.plusSfxVolume);
        this.plusSfxVolume.x = 180;
        this.plusSfxVolume.y = 100;

        // Минус-кнопка SFX
        this.minusSfxVolume = this.add.graphics();
        this.minusSfxVolume.fillStyle(0xffffff, 1);
        this.minusSfxVolume.lineStyle(3, 0x0000f1, 0.4);
        this.minusSfxVolume.fillRoundedRect(0, 0, 50, 20, 10);
        this.minusSfxVolume.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 20), Phaser.Geom.Rectangle.Contains);
        this.settingsContainer.add(this.minusSfxVolume);
        this.minusSfxVolume.x = 120;
        this.minusSfxVolume.y = 100;

        
        this.sfxText = this.add.text(250, 100, `${sfxValue}%`, { fontSize: '20px', color: '#fff' });
        this.settingsContainer.add(this.sfxText);

       
        this.plusSfxVolume.on('pointerdown', () => {
            sfxValue += 10;
            if (sfxValue > 100) sfxValue = 100; // ограничение
            this.sfxText.setText(`${sfxValue}%`);
        });

        this.minusSfxVolume.on('pointerdown', () => {
            sfxValue -= 10;
            if (sfxValue < 0) sfxValue = 0; // ограничение
            this.sfxText.setText(`${sfxValue}%`);
        });


        this.plusMusicVolume.on('pointerover', () => this.input.setDefaultCursor('pointer'));
        this.plusMusicVolume.on('pointerout', () => this.input.setDefaultCursor('default'));
        this.minusMusicVolume.on('pointerover', () => this.input.setDefaultCursor('pointer'));
        this.minusMusicVolume.on('pointerout', () => this.input.setDefaultCursor('default'));


        this.plusSfxVolume.on('pointerover', () => this.input.setDefaultCursor('pointer'));
        this.plusSfxVolume.on('pointerout', () => this.input.setDefaultCursor('default'));
        this.minusSfxVolume.on('pointerover', () => this.input.setDefaultCursor('pointer'));
        this.minusSfxVolume.on('pointerout', () => this.input.setDefaultCursor('default'));



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

                this.soundText = this.add.text(10, 50, 'Music', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);

                this.soundText = this.add.text(10, 90, 'SFX', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);
            }
        });
    }


    rotateSettingIcon(){
        this.tweens.add({
            targets: this.settingsIcon,
            angle: 360,
            duration: 1000
        })
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