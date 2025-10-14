import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }

    create(){
        this.add.text(400, 300, 'Игра началась!', { color: '#ffffff' }).setOrigin(0.5);
    }
}