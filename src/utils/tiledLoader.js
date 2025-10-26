import { createSprite, createNormalMapSprite, createPhysicsSprite, createNormalMapPhysicsSprite, createPlayer } from './createHelper.js';

export function loadTiledObjects(scene, map) {
    const objectsLayer = map.getObjectLayer('Entities').objects;
    const objects = {};

    objectsLayer.forEach(obj => {
        const { name, type, bodyType, sensor, normalMap, value } = obj.properties.reduce((acc, prop) => {
            acc[prop.name] = prop.value;
            return acc;
        }, {});

        let entity;

        // if (type === 'player') {
        //     entity = createPlayer(scene, obj.x, obj.y, 'sprites', name);
        // } else if (normalMap && bodyType !== 'none') {
        //     entity = createNormalMapPhysicsSprite(scene, obj.x, obj.y, 'sprites', name);
        // } else if (bodyType !== 'none') {
        //     entity = createPhysicsSprite(scene, obj.x, obj.y, 'sprites', name);
        // } else if (normalMap) {
        //     entity = createNormalMapSprite(scene, obj.x, obj.y, 'sprites', name);
        // } else {
        //     entity = createSprite(scene, obj.x, obj.y, 'sprites', name);
        // }

        // Дополнительные настройки
        // if (entity.setSensor && sensor) { entity.setSensor(true) };
        // if (entity.setStatic && bodyType === 'static') { entity.setStatic(true) };
        // if (value !== undefined) { entity.value = value };

        objects[name] = entity;
    });

    return objects;
}