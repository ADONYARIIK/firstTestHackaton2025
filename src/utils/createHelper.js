import { playerAnimations } from './animations.js';

export function createSprite(scene, x, y, atlas, name) {
    const sprite = scene.add.sprite(x, y, atlas, `${name}.png`);

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
            options.circleRadius = fixture.circle.radius || 10;
        }
    }

    const body = scene.matter.add.sprite(x, y, atlas, `${name}.png`, options);
    body.setVisible(false);

    const sprite = createSprite(scene, x, y, atlas, name);

    if (name === 'alienPink' || name === 'alienGreen' || name === 'alienBlue' || name === 'alienBeige' || name === 'alienYellow') {
        scene.events.on('update', () => {
            sprite.x = body.x;
            sprite.y = body.y - 23;
            sprite.rotation = body.rotation;
        });
    } else {
        scene.events.on('update', () => {
            sprite.x = body.x;
            sprite.y = body.y;
            sprite.rotation = body.rotation;
        });
    }

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
    const character = createPhysicsSprite(scene, x, y, atlas, `alien${name}`);
    character.sprite.setPipeline('Light2D');

    playerAnimations(scene, atlas, name);

    character.sprite.animations = {
        stand: `${name}_stand`,
        walk: `${name}_walk`,
        jump: `${name}_jump`,
        climb: `${name}_climb`,
        swim: `${name}_swim`,
        hurt: `${name}_hurt`,
        duck: `${name}_duck`
    }

    return character
}