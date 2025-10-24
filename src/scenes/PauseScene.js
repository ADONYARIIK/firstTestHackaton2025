import Phaser from 'phaser';
import { changeVolume } from '../utils/soundSettings.js';
export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    create() {

        let box = this.add.image(600, 250, 'gui', 'button_square_depth_gradient.png').setOrigin(0, 0);
        box.displayWidth = 350;
        box.displayHeight = 400;


        box = this.add.container(600, 250);


        const starEmpty1 = this.add.image(90, 0, 'gui', 'star_outline.png').setScale(0.9);
        starEmpty1.angle = 45;
        const starEmpty2 = this.add.image(180, -20, 'gui', 'star_outline.png').setScale(1.1);
        const starEmpty3 = this.add.image(270, 10, 'gui', 'star_outline.png').setScale(0.9);
        starEmpty3.angle = 180;
        box.add([starEmpty1, starEmpty2, starEmpty3]);


        const homeBtn = this.add.image(80, 300, 'gui', 'check_round_grey.png')
            .setScale(1.1)
            .setInteractive({ useHandCursor: true });
        const homeIcon = this.add.image(80, 300, 'gui', 'home.png').setScale(0.5);
        box.add([homeBtn, homeIcon]);
        this.addHoverEffect(homeBtn);
        homeBtn.on('pointerdown', ()=> {
            this.scene.stop('PauseScene');
            this.scene.start('MainMenuScene');
        })


        const restartBtn = this.add.image(180, 300, 'gui', 'check_round_grey.png')
            .setScale(1.1)
            .setInteractive({ useHandCursor: true });
        const returnIcon = this.add.image(180, 300, 'gui', 'return.png').setScale(0.5);
        returnIcon.flipX = true;
        box.add([restartBtn, returnIcon]);
        this.addHoverEffect(restartBtn);
        restartBtn.on('pointerdown', ()=> {
            //придумать рестарт
        })


        const playBtn = this.add.image(280, 300, 'gui', 'check_round_grey.png')
            .setScale(1.1)
            .setInteractive({ useHandCursor: true });
        const playIcon = this.add.image(280, 300, 'gui', 'right.png').setScale(0.5);
        box.add([playBtn, playIcon]);
        this.addHoverEffect(playBtn);
        playBtn.on('pointerdown', ()=> {
            this.scene.stop('PauseScene');
            this.scene.start('GameScene');
        })



        let musicValue = 50;
        // Плюс-кнопка
        this.plusMusicBtn = this.makeButton(200, 150, 'gui', 'plusBtn.png')
        box.add(this.plusMusicBtn);

        // Минус-кнопка
        this.minusMusicBtn = this.makeButton(140, 150, 'gui', 'minusBtn.png')
        box.add(this.minusMusicBtn);



        // Текст для отображения значения
        this.musicText = this.add.text(250, 140, `${musicValue}%`, { fontSize: '20px', color: '#fff' });
        box.add(this.musicText);

        this.plusMusicBtn.on('pointerdown', () => {
            if (musicValue > 100) musicValue = 100; // ограничение
            this.musicText.setText(`${musicValue}%`);
            changeVolume(musicValue);
        });

        this.minusMusicBtn.on('pointerdown', () => {
            if (musicValue < 0) musicValue = 0; // ограничение
            this.musicText.setText(`${musicValue}%`);
            changeVolume(musicValue);
        });

        let sfxValue = 50;

        // Плюс-кнопка SFX
        this.plusSFXBtn = this.makeButton(200, 200, 'gui', 'plusBtn.png');
        box.add(this.plusSFXBtn);


        // Минус-кнопка SFX
        this.minusSFXBtn = this.makeButton(140, 200, 'gui', 'minusBtn.png');
        box.add(this.minusSFXBtn);



        this.sfxText = this.add.text(250, 190, `${sfxValue}%`, { fontSize: '20px', color: '#fff' });
        box.add(this.sfxText);


        this.plusSFXBtn.on('pointerdown', () => {
            if (sfxValue > 100) sfxValue = 100; // ограничение
            this.sfxText.setText(`${sfxValue}%`);
            changeVolume(sfxValue);
        });

        this.minusSFXBtn.on('pointerdown', () => {
            if (sfxValue < 0) sfxValue = 0; // ограничение
            this.sfxText.setText(`${sfxValue}%`);
            changeVolume(sfxValue);
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


                this.language = this.add.text(620, 330, 'Language', { fontFamily: 'Outfit', fontSize: '32px', fill: '#ffffffff' });
                

                this.musicTextPercent = this.add.text(620, 380, 'Music', { fontFamily: 'Outfit', fontSize: '32px', fill: '#ffffffff' });
                

                this.SFXText = this.add.text(620, 430, 'SFX', { fontFamily: 'Outfit', fontSize: '32px', fill: '#ffffffff' });
                
            }
        });
    }

    addHoverEffect(button) {

        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scale: 1.3,
                duration: 200,
                ease: 'Power2'
            });
        });


        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scale: 1.1,
                duration: 200,
                ease: 'Power2'
            });
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
}
