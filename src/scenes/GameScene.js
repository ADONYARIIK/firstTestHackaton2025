import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // // Привязываем normal map к атласу
        // this.textures.get("sprites").setNormalMap("sprites_n");
        // Освещение
        // this.lights.enable();
        // this.lights.setAmbientColor(0x555555);

        // // Пример источника света
        // this.lights.addLight(400, 300, 250).setColor(0xffddaa).setIntensity(2.0);

        // Загружаем карту
        // const map = this.make.tilemap({ key: 'map' });

        // Привязываем тайлсет
        // const tileset = map.addTilesetImage('tileset', 'tiles');

        // Создаём слои
        // const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        // const decoLayer = map.createLayer('Deco', tileset, 0, 0);

        // groundLayer.setPipeline('Light2D');
        // decoLayer.setPipeline('Light2D');

        // this.lights.addLight(400, 200, 250, 0xffaa66, 2.0);

        // const shapes = this.cache.json.get('shapes');
        // const objectLayer = map.getObjectLayer('Objects');

        // objectLayer.objects.forEach(obj => {
        //     const name = obj.name;
        //     const x = obj.x;
        //     const y = obj.y;

        //     const sprite = this.createSpriteWithPhysics(name, x, y, shapes);
        //     sprite.setPipeline('Light2D');
        // });




        // const background = this.add.image(0, 0, 'game', 'bg_castle.png').setOrigin(0, 0);
        // background.setScale(6);

        // const player = this.matter.add.sprite(400, 300, 'game', 'p3_front.png');
        // const platrorm = this.matter.add.sprite(0, 1024, 'game', 'castleMid.png', { isStatic: true });
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