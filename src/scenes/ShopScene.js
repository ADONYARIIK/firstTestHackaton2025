import Phaser from 'phaser';

export default class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene')
    }
    create() {
        const bg = this.add.image(0, 0, 'sprites', 'bg_castle.png').setOrigin(0, 0);
        const shopText = this.add.text(700, 30, 'SHOP', { fontSize: '70px', color: '#fff' }) //заменить на норм картинку
        bg.setScale(2)
        this.createItemBox(200, 200);
        this.createItemBox(700, 200);
        this.createItemBox(1200, 200);
        this.createItemBox(200, 600);
        this.createItemBox(700, 600);
        this.createItemBox(1200, 600);

    }
    createItemBox(x, y) {       
        const ladder = this.add.image(x, y, 'sprites', 'boxEmpty.png').setOrigin(0, 0);
        ladder.setScale(2)
    }
}
