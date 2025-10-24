import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    create() {
        const box = this.add.image(0,0,'gui','button_square_depth_gradient.png')
    }
}