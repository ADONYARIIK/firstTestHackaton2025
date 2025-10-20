import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene')
    }
    create() {
        const bg = this.add.image(0, 0, 'mainMenuBackground').setOrigin(0, 0);
        this.startBtn = this.add.image(270, 520, 'gui', 'start.png').setScale(0.15).setInteractive({ useHandCursor: true });
        this.startBtn.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
        this.startBtn.on('pointerover', () => {
            this.tweens.add({
                targets: this.startBtn,
                scale: 0.2,
                duration: 150,
                ease: 'Power2'
            });
        });

        // Уход курсора
        this.startBtn.on('pointerout', () => {
            this.tweens.add({
                targets: this.startBtn,
                scale: 0.15,
                duration: 150,
                ease: 'Power2'
            });
        });
        this.gameName = this.add.image(800, 130, 'gui', 'gameName.png').setScale(0.4)
        this.settingsIcon = this.add.image(1500, 30, 'gui', 'settingsIcon.png').setScale(0.09).setTintFill(0xffffff).setInteractive({ useHandCursor: true });
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


        this.closeBtn = this.add.image(270, 20, 'gui', 'close.png').setVisible(false).setScale(0.05).setTintFill(0xffffff).setInteractive({ useHandCursor: true });
        this.settingsContainer.add(this.closeBtn);

        this.closeBtn.on('pointerdown', () => {
            this.hideSettings();
            this.closeBtn.setVisible(false);
        });
        this.closeBtn.on('pointerover', () => {
            this.rotateCloseIcon();
        });



        // Плюс-кнопка
        // Начальное значение
        let musicValue = 0;

        // Плюс-кнопка
        this.plusMusicBtn = this.makeButton(200, 70, 'gui', 'plusBtn.png')
        this.settingsContainer.add(this.plusMusicBtn);

        // Минус-кнопка
        this.minusMusicBtn = this.makeButton(140, 70, 'gui', 'minusBtn.png')
        this.settingsContainer.add(this.minusMusicBtn);



        // Текст для отображения значения
        this.musicText = this.add.text(250, 60, `${musicValue}%`, { fontSize: '20px', color: '#fff' });
        this.settingsContainer.add(this.musicText);

        this.plusMusicBtn.on('pointerdown', () => {
            musicValue += 10;
            if (musicValue > 100) musicValue = 100; // ограничение
            this.musicText.setText(`${musicValue}%`);
        });

        this.minusMusicBtn.on('pointerdown', () => {
            musicValue -= 10;
            if (musicValue < 0) musicValue = 0; // ограничение
            this.musicText.setText(`${musicValue}%`);
        });


        let sfxValue = 0;

        // Плюс-кнопка SFX
        this.plusSFXBtn = this.makeButton(200, 110, 'gui', 'plusBtn.png');
        this.settingsContainer.add(this.plusSFXBtn);


        // Минус-кнопка SFX
        this.minusSFXBtn = this.makeButton(140, 110, 'gui', 'minusBtn.png');
        this.settingsContainer.add(this.minusSFXBtn);



        this.sfxText = this.add.text(250, 100, `${sfxValue}%`, { fontSize: '20px', color: '#fff' });
        this.settingsContainer.add(this.sfxText);


        this.plusSFXBtn.on('pointerdown', () => {
            sfxValue += 10;
            if (sfxValue > 100) sfxValue = 100; // ограничение
            this.sfxText.setText(`${sfxValue}%`);
        });

        this.minusSFXBtn.on('pointerdown', () => {
            sfxValue -= 10;
            if (sfxValue < 0) sfxValue = 0; // ограничение
            this.sfxText.setText(`${sfxValue}%`);
        });

        this.plusMusicBtn.on('pointerout', () => this.input.setDefaultCursor('default'));
        this.minusMusicBtn.on('pointerout', () => this.input.setDefaultCursor('default'));


        this.plusSFXBtn.on('pointerout', () => this.input.setDefaultCursor('default'));
        this.minusSFXBtn.on('pointerout', () => this.input.setDefaultCursor('default'));



        WebFont.load({
            google: {
                families: ['Outfit']
            },
            active: () => {


                this.language = this.add.text(10, 10, 'Language', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.language);

                this.soundText = this.add.text(10, 50, 'Music', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);

                this.soundText = this.add.text(10, 90, 'SFX', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);
            }
        });
    }


    makeButton = (x, y, atlas, name) => {
        const btn = this.add.image(x, y, atlas, name).setScale(0.5).setInteractive({ useHandCursor: true });;
        // Наведение
        btn.on('pointerover', () => {
            this.tweens.add({
                targets: btn,
                scale: 0.7,
                duration: 150,
                ease: 'Power2'
            });
        });

        // Уход курсора
        btn.on('pointerout', () => {
            this.tweens.add({
                targets: btn,
                scale: 0.5,
                duration: 150,
                ease: 'Power2'
            });
        });


        return btn;
    };
    rotateCloseIcon() {
        this.tweens.add({
            targets: this.closeBtn,
            angle: 360,
            duration: 500
        })
    }
    rotateSettingIcon() {
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