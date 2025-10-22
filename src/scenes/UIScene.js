import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        this.playerGAlt = this.add.image(25, 25, 'gui', 'hud_p1Alt.png');
        this.playerG = this.add.image(25, 25, 'gui', 'hud_p1.png');
        this.playerBAlt = this.add.image(75, 25, 'gui', 'hud_p2Alt.png');
        this.playerB = this.add.image(75, 25, 'gui', 'hud_p2.png');
        this.playerPAlt = this.add.image(125, 25, 'gui', 'hud_p3Alt.png');
        this.playerP = this.add.image(125, 25, 'gui', 'hud_p3.png');
        this.keyBlue = this.add.image(25, 75, 'gui', 'hud_keyBlue_disabled.png').setScale(0.7);
        this.keyGreen = this.add.image(60, 75, 'gui', 'hud_keyGreem_disabled.png').setScale(0.7);
        this.keyYellow = this.add.image(95, 75, 'gui', 'hud_keyYellow_disabled.png').setScale(0.7);
        this.keyRed = this.add.image(130, 75, 'gui', 'hud_keyRed_disabled.png').setScale(0.7);
        this.hearts = [];
        const spacing = 1; // расстояние между элементами
        const startX = 180;  // начальная позиция по X
        const startY = 35;  // позиция по Y
        for (let i = 0; i < 3; i++) {
            const x = startX + i * (30 + spacing); // 32 = ширина спрайта (пример)
            this.heart = this.add.image(x, startY, 'gui', 'hud_heartFull.png').setScale(0.5);
            this.hearts.push(this.heart);
        }
        this.points = [];
        const pointStartX = 1350;  // начальная позиция по X
        const pointStartY = 35;  // позиция по Y
        for (let i = 0; i < 10; i++) {
            const x = pointStartX + i * (16 + spacing);
            this.point = this.add.image(x, pointStartY, 'gui', 'hud_0.png').setScale(0.5);
            this.points.push(this.point);
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

        this.settingsIcon = this.add.image(1550, 30, 'gui', 'settingsIcon.png').setScale(0.09).setTintFill(0xffffff).setInteractive({ useHandCursor: true });
        this.settingsIcon.on('pointerdown', () => {
            this.showSettings();
        });
        //анимация прокрута настроек
        this.settingsIcon.on('pointerover', () => {
            this.rotateSettingIcon();
        });


        this.settingsContainer = this.add.container(800, 250).setVisible(false); //создание settingsContainer

        //создание контейнера настроек (видимый)
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
                this.mainMenuBtn = this.add.text(80, 230, 'Main Menu', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' }).setInteractive({ useHandCursor: true });
                this.mainMenuBtn.on('pointerdown', () => {
                    this.scene.start('MainMenuScene');
                });
                this.settingsContainer.add(this.mainMenuBtn);

                this.language = this.add.text(10, 10, 'Language', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.language);

                this.soundText = this.add.text(10, 50, 'Music', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);

                this.soundText = this.add.text(10, 90, 'SFX', { fontFamily: 'Outfit', fontSize: '32px', fill: '#fff' });
                this.settingsContainer.add(this.soundText);
            }
        });
        this.isAltVisible = true;
    }
    update() {
        this.isAltVisible = !this.isAltVisible;
        if (Phaser.Input.Keyboard.JustDown(this.keyOne)) {
            this.changePoints();
        }
        //над логикой нажатий буду думать еще
        // this.isAltVisible =  !this.isAltVisible;
        // if(Phaser.Input.Keyboard.JustDown(this.keyOne) && !Phaser.Input.Keyboard.JustDown(this.keyTwo) && !Phaser.Input.Keyboard.JustDown(this.keyThree)){ // && и ecть возможность переключиться
        //     this.playerGAlt.setVisible(!this.isAltVisiblerue);
        //     this.playerG.setVisible(true)
        //     this.playerBAlt.setVisible(true);
        //     this.playerPAlt.setVisible(true);
        //     this.playerP.setVisible(!this.isAltVisible)
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.keyTwo) && !Phaser.Input.Keyboard.JustDown(this.keyOne) && !Phaser.Input.Keyboard.JustDown(this.keyThree)) { // && и подобрано что то
        //     this.playerGAlt.setVisible(true);
        //     this.playerBAlt.setVisible(!this.isAltVisiblerue);
        //     this.playerB.setVisible(true)
        //     this.playerPAlt.setVisible(true);
        //     this.playerP.setVisible(!this.isAltVisible)
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.keyThree) && !Phaser.Input.Keyboard.JustDown(this.keyOne) && !Phaser.Input.Keyboard.JustDown(this.keyTwo)) { // && и подобрано что то
        //     this.playerGAlt.setVisible(true);
        //     this.playerG.setVisible(!this.isAltVisible)
        //     this.playerBAlt.setVisible(true);
        //     this.playerB.setVisible(this.isAltVisible)
        //     this.playerPAlt.setVisible(!this.isAltVisiblerue);
        //     this.playerP.setVisible(true)
        // }
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