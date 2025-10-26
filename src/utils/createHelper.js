export function createSprite(scene, x, y, atlas, name) {
    const sprite = scene.add.sprite(x, y, atlas, `${name}.png`);

    return sprite;
}

export function createNormalMapSprite(scene, x, y, atlas, name) {
    const sprite = scene.add.sprite(x, y, atlas, `${name}.png`);
    const normalFrame = scene.textures.getFrame(`${atlas}_n`, `${name}_n.png`);
    sprite.setPipeline('Light2D');

    if (normalFrame) {
        if (sprite.setNormalMap) {
            sprite.setNormalMap(normalFrame);
        } else {
            console.warn(`⚠️ Normal map not applied for ${name}_n.png`);
        }
    } else {
        console.warn(`⚠️ Normal map not found for ${name}_n.png`);
    }

    return sprite;
}

export function createPhysicsSprite(scene, x, y, atlas, name) {
    const shapesData = scene.cache.json.get("shapes");
    const shapeData = shapesData?.shapes?.[name];

    const options = { label: name };

    if (shapeData && shapeData.fixtures?.length > 0) {
        const fixture = shapeData.fixtures[0];

        // POLYGON или MAGIC
        if (fixture.shapeType === "POLYGON" || fixture.shapeType === "MAGIC") {
            const verts = fixture.vertices.map(polygon =>
                polygon.map(v => ({ x: v.x, y: v.y }))
            );
            options.shape = { type: "fromVerts", verts };
        }

        // RECTANGLE
        else if (fixture.shapeType === "RECTANGLE") {
            const rect = fixture.rectangle;
            options.vertices = [
                { x: rect.x, y: rect.y },
                { x: rect.x + rect.w, y: rect.y },
                { x: rect.x + rect.w, y: rect.y + rect.h },
                { x: rect.x, y: rect.y + rect.h }
            ];
        }

        // CIRCLE
        else if (fixture.shapeType === "CIRCLE") {
            options.circleRadius = fixture.radius || 10;
        }
    }

    // Создаём физическое тело
    const sprite = scene.matter.add.sprite(x, y, atlas, `${name}.png`, options);

    return sprite;
}

export function createNormalMapPhysicsSprite(scene, x, y, atlas, name) {
    const shapesData = scene.cache.json.get("shapes");
    const shapeData = shapesData?.shapes?.[name];

    const options = { label: name };

    if (shapeData && shapeData.fixtures?.length > 0) {
        const fixture = shapeData.fixtures[0];

        // POLYGON или MAGIC
        if (fixture.shapeType === "POLYGON" || fixture.shapeType === "MAGIC") {
            const verts = fixture.vertices.map(polygon =>
                polygon.map(v => ({ x: v.x, y: v.y }))
            );
            options.shape = { type: "fromVerts", verts };
        }

        // RECTANGLE
        else if (fixture.shapeType === "RECTANGLE") {
            const rect = fixture.rectangle;
            options.vertices = [
                { x: rect.x, y: rect.y },
                { x: rect.x + rect.w, y: rect.y },
                { x: rect.x + rect.w, y: rect.y + rect.h },
                { x: rect.x, y: rect.y + rect.h }
            ];
        }

        // CIRCLE
        else if (fixture.shapeType === "CIRCLE") {
            options.circleRadius = fixture.radius || 10;
        }
    }

    // создаём тело
    const body = scene.matter.add.sprite(x, y, atlas, `${name}.png`, options);
    body.setVisible(false);

    const sprite = createNormalMapSprite(scene, x, y, atlas, name);

    scene.events.on('update', () => {
        sprite.x = body.x;
        sprite.y = body.y;
        sprite.rotation = body.rotation;
    });

    sprite.playAnimation = (key) => {
        if (scene.anims.exists(key)) {
            sprite.anims.play(key, true);
        } else {
            console.warn(`⚠️ Animation ${key} not found`);
        }
    }

    const combined = {
        sprite,
        body,
        setPosition: (x, y) => {
            body.setPosition(x, y);
            sprite.setPosition(x, y);
        },
        play: (key) => sprite.playAnimation(key),
        setVisible: (v) => sprite.setVisible(v),
        setStatic: (v) => body.setStatic(v),
        setSensor: (v) => body.setSensor(v),
        setVelocity: (x, y) => body.setVelocity(x, y),
    };

    return combined;
}

export function createPlayer(scene, x, y, atlas, name) {
    const character = scene.createNormalMapPhysicsSprite(scene, x, y, atlas, `alien${name}`);

    if (!scene.anims.exists(`${name}_stand`)) {
        scene.anims.create({
            key: `${name}_stand`,
            frames: [{ key: atlas, frame: `alien${name}_stand.png` }],
            frameRate: 1
        });
    }

    if (!scene.anims.exists(`${name}_duck`)) {
        scene.anims.create({
            key: `${name}_duck`,
            frames: [{ key: atlas, frame: `alien${name}_duck.png` }],
            frameRate: 1
        });
    }

    if (!scene.anims.exists(`${name}_jump`)) {
        scene.anims.create({
            key: `${name}_jump`,
            frames: [{ key: atlas, frame: `alien${name}_jump.png` }],
            frameRate: 1
        });
    }

    if (!scene.anims.exists(`${name}_hurt`)) {
        scene.anims.create({
            key: `${name}_hurt`,
            frames: [{ key: atlas, frame: `alien${name}_hurt.png` }],
            frameRate: 1
        });
    }

    if (!scene.anims.exists(`${name}_walk`)) {
        scene.anims.create({
            key: `${name}_walk`,
            frames: scene.anims.generateFrameNames(atlas, {
                prefix: `alien${name}_walk`,
                start: 1,
                end: 2,
                suffix: '.png'
            }),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!scene.anims.exists(`${name}_climb`)) {
        scene.anims.create({
            key: `${name}_climb`,
            frames: scene.anims.generateFrameNames(atlas, {
                prefix: `alien${name}_climb`,
                start: 1,
                end: 2,
                suffix: '.png'
            }),
            frameRate: 6,
            repeat: -1
        });
    }

    if (!scene.anims.exists(`${name}_swim`)) {
        scene.anims.create({
            key: `${name}_swim`,
            frames: scene.anims.generateFrameNames(atlas, {
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