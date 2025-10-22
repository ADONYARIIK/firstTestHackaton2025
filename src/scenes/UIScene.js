import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        this.playerG = this.add.image(25,25,'gui','hud_p1.png').setVisible(false);
        this.playerGAlt = this.add.image(25,25,'gui','hud_p1Alt.png');
        const keyObject = scene.input.keyboard.addKey("W")


        if(keyObject){

        }
    }
}