import { createSprite, createPhysicsSprite, createPlayer } from './createHelper.js';

export function loadTiledObjects(scene, map) {
    const objectsLayer = map.getObjectLayer('Objects').objects;
    const objects = {};

    objectsLayer.forEach(obj => {
        const props = (obj.properties || []).reduce((acc, prop) => {
            acc[prop.name] = prop.value;
            return acc;
        }, {});

        let object;

        if (obj.type === 'player') {
            object = createPlayer(scene, obj.x, obj.y, 'sprites', obj.name);
        } else if (props.normalMap && props.bodyType !== 'none') {
            object = createPhysicsSprite(scene, obj.x, obj.y, 'sprites', obj.name);
            object.sprite.setPipeline('Light2D');
        } else if (props.bodyType !== 'none') {
            object = createPhysicsSprite(scene, obj.x, obj.y, 'sprites', obj.name);
        } else if (props.normalMap) {
            object = createSprite(scene, obj.x, obj.y, 'sprites', obj.name);
            object.setPipeline('Light2D');
        } else {
            object = createSprite(scene, obj.x, obj.y, 'sprites', obj.name);
        }

        if (props.sensor) { object.setSensor(true) };
        if (props.bodyType === 'static') {
            object.setStatic(true)
        } else if (props.bodyType === 'kinematic') {
            object.setStatic(false);
            object.body.setIgnoreGravity(true);
            object.body.setFrictionAir(0);
            object.body.isKinematic = true;
        };
        if (props.value !== undefined) { object.value = props.value };

        objects[obj.name] = object;
    });

    return objects;
}

export function loadTiledTriggerZones(scene, map) {
    const triggersLayer = map.getObjectLayer('Triggers').objects;
    const triggers = {};

    triggersLayer.forEach(obj => {
        const props = (obj.properties || []).reduce((acc, prop) => {
            acc[prop.name] = prop.value;
            return acc;
        }, {});

        const zone = scene.matter.add.rectangle(
            obj.x + obj.width / 2,
            obj.y + obj.height / 2,
            obj.width,
            obj.height,
            {
                isSensor: true,
                isStatic: true,
                label: obj.name
            }
        );

        triggers[obj.name] = { zone, props };

        const debugRect = scene.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height, 0x00ff00, 0.2);
        debugRect.setDepth(1000);
    });

    return triggers;
}