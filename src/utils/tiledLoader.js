import { createSprite, createNormalMapSprite, createPhysicsSprite, createNormalMapPhysicsSprite, createCharacterWithAnimations } from './createHelper.js';

export function loadTiledObjects(scene, map) {
    const objectsLayer = map.getObjectLayer('Objects').objects;
    const objects = {};

    objectsLayer.forEach(obj => {
        const { name, type, bodyType, sensor, normalMap } = obj.properties.reduce((acc, prop) => {
            acc[prop.name] = prop.value;
            return acc;
        }, {});

        if (type === 'character') {
            objects[name] = scene.createCharacterWithAnimations(obj.x, obj.y, 'sprites', name);
            objects[name].setPipeline('Light2D');
        } else if (normalMap && bodyType !== 'none') {
            objects[name] = scene.createNormalMapPhysicsSprite(obj.x, obj.y, 'sprites', name);
            objects[name].setPipeline('Light2D');
        } else if (bodyType !== 'none') {
            objects[name] = scene.createPhysicsSprite(obj.x, obj.y, 'sprites', name);
        } else if (normalMap) {
            objects[name] = scene.createNormalMapSprite(obj.x, obj.y, 'sprites', name);
            objects[name].setPipeline('Light2D');
        } else {
            objects[name] = scene.createSprite(obj.x, obj.y, 'sprites', name);
        }

        // Дополнительные настройки
        if (sensor) objects[name].setSensor(true);
        if (bodyType === 'static') objects[name].setStatic(true);
    });

    return objects;
}