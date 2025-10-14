import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene')
    }

    create() {
        this.add.text(400, 200, 'Hackaton Game', {
            fontSize: '28px',
            color: '#00ff88'
        }).setOrigin(0.5);

        const playButton = this.add.text(600, 200, '▶ Играть', {
            fontSize: '28px',
            color: '#00ff88'
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        })
    }
}