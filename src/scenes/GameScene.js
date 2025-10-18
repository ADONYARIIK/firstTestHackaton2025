import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }

    create(){
        const background = this.add.image(0,0,'game','bg_castle.png').setOrigin(0,0);
        background.setScale(6);
    }
}