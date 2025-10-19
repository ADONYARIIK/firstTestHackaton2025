import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // this.lights.enable();
        // this.lights.setAmbientColor(0x555555);

        // // Привязываем normal map к атласу
        // this.textures.get("sprites").setNormalMap("sprites_n");

        // // Пример источника света
        // this.lights.addLight(400, 300, 250).setColor(0xffddaa).setIntensity(2.0);

        // const bat = this.createSpriteWithPhysics("bat", 200, 300);
        // const block = this.createSpriteWithPhysics("block", 400, 500);

        // this.lights.addLight(400, 200, 250, 0xffaa66, 2.0);

        const background = this.add.image(0, 0, 'game', 'bg_castle.png').setOrigin(0, 0);
        background.setScale(6);

        const player = this.matter.add.sprite(400, 300, 'game', 'p3_front.png');
        const platrorm = this.matter.add.sprite(0, 1024, 'game', 'castleMid.png', { isStatic: true });
    }

    // createSpriteWithPhysics(name, x, y) {
    //     const shapes = this.cache.json.get("shapes");
    //     const shapeData = shapes[name];

    //     const options = { label: name };

    //     // Если есть полигоны — создаём из них Matter body
    //     if (shapeData && shapeData.fixtures?.length > 0) {
    //         const fixture = shapeData.fixtures[0];
    //         if (fixture.shapeType === "POLYGON") {
    //             const verts = fixture.vertices.map(([vx, vy]) => ({ x: vx, y: vy }));
    //             options.shape = { type: "fromVerts", verts };
    //         }
    //         if (fixture.shapeType === "CIRCLE") {
    //             options.circleRadius = fixture.radius;
    //         }
    //     }

    //     const sprite = this.matter.add.sprite(x, y, "sprites", `${name}.png`, options);
    //     sprite.setPipeline("Light2D");
    //     return sprite;
    // }

}