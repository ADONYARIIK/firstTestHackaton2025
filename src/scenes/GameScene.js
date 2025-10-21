import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Освещение
        // this.lights.enable();
        // this.lights.setAmbientColor(0x555555);
        // Привязываем normal map к атласу
        // this.textures.get("sprites").setNormalMap("sprites_n");

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

    createSprite(x, y, atlas, name) {
        const sprite = this.add.sprite(x, y, atlas, `${name}.png`);

        return sprite;
    }

    createNormalMapSprite(x, y, atlas, name) {
        const sprite = this.add.sprite(x, y, atlas, `${name}.png`);
        const normalFrame = this.textures.getFrame(`${atlas}_n`, `${name}_n.png`);
        sprite.setPipeline('Light2D');

        if (normalFrame) {
            sprite.setNormalMap(normalFrame);
        } else {
            console.warn(`⚠️ Normal map not found for ${name}_n.png`);
        }

        return sprite;
    }

    createPhysicsSprite(x, y, atlas, name) {
        //Загружаем данные форм из кэша
        const shapesData = this.cache.json.get("shapes");
        const shapeData = shapesData?.shapes?.[name];

        const options = { label: name };

        //Создание коллайдера
        if (shapeData && shapeData.fixtures?.length > 0) {
            const fixture = shapeData.fixtures[0];

            if (fixture.shapeType === "POLYGON" || fixture.shapeType === "MAGIC") {
                //Собираем все полигоны (каждый из которых массив точек)
                const verts = fixture.vertices.map(polygon =>
                    polygon.map(v => ({ x: v.x, y: v.y }))
                );

                //В Phaser Matter используется fromVerts для сложных форм
                options.shape = { type: "fromVerts", verts };
            }
            else if (fixture.shapeType === "CIRCLE") {
                options.circleRadius = fixture.radius || fixture.vertices?.[0]?.[0] || 10;
            }
        }

        //Создаём физический спрайт
        const sprite = this.matter.add.sprite(x, y, atlas, `${name}.png`, options);

        //Возврат готового спрайта
        return sprite;
    }

    createNormalMapPhysicsSprite(x, y, atlas, name) {
        //Загружаем данные форм из кэша
        const shapesData = this.cache.json.get("shapes");
        const shapeData = shapesData?.shapes?.[name];

        const options = { label: name };

        //Создание коллайдера
        if (shapeData && shapeData.fixtures?.length > 0) {
            const fixture = shapeData.fixtures[0];

            if (fixture.shapeType === "POLYGON" || fixture.shapeType === "MAGIC") {
                //Собираем все полигоны (каждый из которых массив точек)
                const verts = fixture.vertices.map(polygon =>
                    polygon.map(v => ({ x: v.x, y: v.y }))
                );

                //В Phaser Matter используется fromVerts для сложных форм
                options.shape = { type: "fromVerts", verts };
            }
            else if (fixture.shapeType === "CIRCLE") {
                options.circleRadius = fixture.radius || fixture.vertices?.[0]?.[0] || 10;
            }
        }

        //Создаём физический спрайт
        const sprite = this.matter.add.sprite(x, y, atlas, `${name}.png`, options);
        sprite.setPipeline("Light2D");

        //Проверяем и подключаем карту нормалей
        const normalFrame = this.textures.getFrame(`${atlas}_n`, `${name}_n.png`);
        if (normalFrame) {
            sprite.setNormalMap(normalFrame);
        } else {
            console.warn(`⚠️ Normal map not found for ${name}_n.png`);
        }

        return sprite;
    }

    createCharacterWithAnimations(x, y, atlas, color) {
        const character = this.createNormalMapPhysicsSprite(x, y, atlas, `alien${color}`);

        if (!this.anims.exists(`${color}_stand`)) {
            this.anims.create({
                key: `${color}_stand`,
                frames: [{ key: atlas, frame: `alien${color}_stand.png` }],
                frameRate: 1
            });
        }

        if (!this.anims.exists(`${color}_duck`)) {
            this.anims.create({
                key: `${color}_duck`,
                frames: [{ key: atlas, frame: `alien${color}_duck.png` }],
                frameRate: 1
            });
        }

        if (!this.anims.exists(`${color}_jump`)) {
            this.anims.create({
                key: `${color}_jump`,
                frames: [{ key: atlas, frame: `alien${color}_jump.png` }],
                frameRate: 1
            });
        }

        if (!this.anims.exists(`${color}_hurt`)) {
            this.anims.create({
                key: `${color}_hurt`,
                frames: [{ key: atlas, frame: `alien${color}_hurt.png` }],
                frameRate: 1
            });
        }

        if (!this.anims.exists(`${color}_walk`)) {
            this.anims.create({
                key: `${color}_walk`,
                frames: this.anims.generateFrameNames(atlas, {
                    prefix: `alien${color}_walk`,
                    start: 1,
                    end: 2,
                    suffix: '.png'
                }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.anims.exists(`${color}_climb`)) {
            this.anims.create({
                key: `${color}_climb`,
                frames: this.anims.generateFrameNames(atlas, {
                    prefix: `alien${color}_climb`,
                    start: 1,
                    end: 2,
                    suffix: '.png'
                }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.anims.exists(`${color}_swim`)) {
            this.anims.create({
                key: `${color}_swim`,
                frames: this.anims.generateFrameNames(atlas, {
                    prefix: `alien${color}_swim`,
                    start: 1,
                    end: 2,
                    suffix: '.png'
                }),
                frameRate: 6,
                repeat: -1
            })
        }

        return character;
    }
}