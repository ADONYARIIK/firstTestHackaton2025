import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import MainMenuScene from './scenes/MainMenuScene';
import GameScene from './scenes/GameScene';
import UIScene from './scenes/UIScene';
import PauseScene from './scenes/PauseScene';

export const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    backgroundColor: '#c52e2eff',
    parent: 'game-container',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: true
        }
    },
    render: {
        pixelArt: false,
        roundPixels: true,
        antialias: false,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, MainMenuScene, GameScene, UIScene, PauseScene]
};