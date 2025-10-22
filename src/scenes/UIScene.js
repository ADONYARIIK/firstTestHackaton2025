import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        this.playerGAlt = this.add.image(25, 25, 'gui', 'hud_p1Alt.png');
        this.playerG = this.add.image(25, 25, 'gui', 'hud_p1.png');
        this.playerBAlt = this.add.image(75, 25, 'gui', 'hud_p2Alt.png');
        this.playerB = this.add.image(75, 25, 'gui', 'hud_p2.png');
        this.playerPAlt = this.add.image(125, 25, 'gui', 'hud_p3Alt.png');
        this.playerP = this.add.image(125, 25, 'gui', 'hud_p3.png');
        this.keyBlue = this.add.image(25, 75, 'gui', 'hud_keyBlue_disabled.png').setScale(0.7);
        this.keyGreen = this.add.image(60, 75, 'gui', 'hud_keyGreem_disabled.png').setScale(0.7);
        this.keyYellow = this.add.image(95, 75, 'gui', 'hud_keyYellow_disabled.png').setScale(0.7);
        this.keyRed = this.add.image(130, 75, 'gui', 'hud_keyRed_disabled.png').setScale(0.7);
        this.hearts = [];
        const spacing = 1; // расстояние между элементами
        const startX = 180;  // начальная позиция по X
        const startY = 35;  // позиция по Y
        for (let i = 0; i < 3; i++) {
            const x = startX + i * (30 + spacing); // 32 = ширина спрайта (пример)
            this.heart = this.add.image(x, startY, 'gui', 'hud_heartFull.png').setScale(0.5);
            this.hearts.push(this.heart);
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);



        this.isAltVisible = true;
    }
    update() {
        //над логикой нажатий буду думать еще
        // this.isAltVisible =  !this.isAltVisible;
        // if(Phaser.Input.Keyboard.JustDown(this.keyOne) && !Phaser.Input.Keyboard.JustDown(this.keyTwo) && !Phaser.Input.Keyboard.JustDown(this.keyThree)){ // && и ecть возможность переключиться
        //     this.playerGAlt.setVisible(!this.isAltVisiblerue);
        //     this.playerG.setVisible(true)
        //     this.playerBAlt.setVisible(true);
        //     this.playerPAlt.setVisible(true);
        //     this.playerP.setVisible(!this.isAltVisible)
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.keyTwo) && !Phaser.Input.Keyboard.JustDown(this.keyOne) && !Phaser.Input.Keyboard.JustDown(this.keyThree)) { // && и подобрано что то
        //     this.playerGAlt.setVisible(true);
        //     this.playerBAlt.setVisible(!this.isAltVisiblerue);
        //     this.playerB.setVisible(true)
        //     this.playerPAlt.setVisible(true);
        //     this.playerP.setVisible(!this.isAltVisible)
        // }
        // if (Phaser.Input.Keyboard.JustDown(this.keyThree) && !Phaser.Input.Keyboard.JustDown(this.keyOne) && !Phaser.Input.Keyboard.JustDown(this.keyTwo)) { // && и подобрано что то
        //     this.playerGAlt.setVisible(true);
        //     this.playerG.setVisible(!this.isAltVisible)
        //     this.playerBAlt.setVisible(true);
        //     this.playerB.setVisible(this.isAltVisible)
        //     this.playerPAlt.setVisible(!this.isAltVisiblerue);
        //     this.playerP.setVisible(true)
        // }
    }
}