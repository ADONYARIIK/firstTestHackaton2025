export function createSprite(x, y, atlas, name) {
    const sprite = this.add.sprite(x, y, atlas, `${name}.png`);

    return sprite;
}

export function createNormalMapSprite(x, y, atlas, name) {
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

export function createPhysicsSprite(x, y, atlas, name) {
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

export function createNormalMapPhysicsSprite(x, y, atlas, name) {
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

export function createCharacterWithAnimations(x, y, atlas, name) {
    const character = this.createNormalMapPhysicsSprite(x, y, atlas, `alien${name}`);

    if (!this.anims.exists(`${name}_stand`)) {
        this.anims.create({
            key: `${name}_stand`,
            frames: [{ key: atlas, frame: `alien${name}_stand.png` }],
            frameRate: 1
        });
    }

    if (!this.anims.exists(`${name}_duck`)) {
        this.anims.create({
            key: `${name}_duck`,
            frames: [{ key: atlas, frame: `alien${name}_duck.png` }],
            frameRate: 1
        });
    }

    if (!this.anims.exists(`${name}_jump`)) {
        this.anims.create({
            key: `${name}_jump`,
            frames: [{ key: atlas, frame: `alien${name}_jump.png` }],
            frameRate: 1
        });
    }

    if (!this.anims.exists(`${name}_hurt`)) {
        this.anims.create({
            key: `${name}_hurt`,
            frames: [{ key: atlas, frame: `alien${name}_hurt.png` }],
            frameRate: 1
        });
    }

    if (!this.anims.exists(`${name}_walk`)) {
        this.anims.create({
            key: `${name}_walk`,
            frames: this.anims.generateFrameNames(atlas, {
                prefix: `alien${name}_walk`,
                start: 1,
                end: 2,
                suffix: '.png'
            }),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!this.anims.exists(`${name}_climb`)) {
        this.anims.create({
            key: `${name}_climb`,
            frames: this.anims.generateFrameNames(atlas, {
                prefix: `alien${name}_climb`,
                start: 1,
                end: 2,
                suffix: '.png'
            }),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!this.anims.exists(`${name}_swim`)) {
        this.anims.create({
            key: `${name}_swim`,
            frames: this.anims.generateFrameNames(atlas, {
                prefix: `alien${name}_swim`,
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