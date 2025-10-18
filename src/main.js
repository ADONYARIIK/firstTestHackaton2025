import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import MainMenuScene from './scenes/MainMenuScene';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 1536,
    height: 1024,
    backgroundColor: '#9e2424',
    parent: 'game-container',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: true
        }
    },
    scene: [ BootScene,MainMenuScene, GameScene]
};

const game = new Phaser.Game(config);