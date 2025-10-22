import Phaser from 'phaser';

export default class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene')
    }
    create() {
        const bg = this.add.image(0, 0, 'sprites', 'bg_castle.png').setOrigin(0, 0);
        const shopText = this.add.text(700,30,'SHOP',{ fontSize: '70px', color: '#fff' }) //заменить на норм картинку
        bg.setScale(2)
        this.createItemBox(100,200);
        this.createItemBox(600,200);
        this.createItemBox(1100,200);
        this.createItemBox(100,600);

    }
    createItemBox(x,y){
        const ladder = this.add.image(x, y, 'sprites', 'fenceGate.png').setOrigin(0, 0);
        ladder.setScale(2)
        const bridge = this.add.image(x, y, 'sprites', 'bridge.png').setOrigin(0, 0);
        bridge.setScale(2)
    }
}