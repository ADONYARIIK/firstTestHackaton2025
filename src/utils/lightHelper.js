export function setupLights(scene, map) {
    scene.lights.enable().setAmbientColor(0x000);

    const lightsLayer = map.getObjectLayer('Lights').objects;
    const lights = {};

    lightsLayer.forEach(obj => {
        const props = (obj.properties || []).reduce((acc, prop) => {
            acc[prop.name] = prop.value;
            return acc;
        }, {});

        let light;

        if (obj.name === 'Torch') {
            light = createTorchLight(scene, obj.x + obj.width / 2, obj.y + obj.height / 2);
        } else if (obj.name === 'Lava') {
            light = createLavaLight(scene, obj.x + obj.width / 2, obj.y + obj.height / 1, obj.width);
        }

        lights[obj.name] = light;
    });

    return lights;
}

function createTorchLight(scene, x, y) {
    const light = scene.lights.addLight(x, y, 2000, 0xeb750e, 0.6);
    // const light = scene.lights.addLight(x, y, 2000, 0xe36f09, 0.6);
    // const light = scene.lights.addLight(x, y, 2000, 0xff8b33, 0.6);

    const duration = Phaser.Math.Between(1000, 3000);
    const delay = Phaser.Math.Between(0, 1000);

    scene.tweens.add({
        targets: light,
        radius: { from: 1800, to: 2200 },
        intensity: { from: 0.5, to: 0.7 },
        duration: duration,
        yoyo: delay,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    scene.time.addEvent({
        delay: Phaser.Math.Between(100, 300),
        loop: true,
        callback: () => {
            light.intensity = Phaser.Math.FloatBetween(0.4, 0.7);
            light.radius = Phaser.Math.Between(1800, 2200);
        }
    });

    return light;
}

function createLavaLight(scene, x, y, width = 300) {
    const light = scene.lights.addLight(x, y, width * 0.4, 0xff3300, 0.5);

    const duration = Phaser.Math.Between(1500, 4000);
    const delay = Phaser.Math.Between(0, 1000);

    scene.tweens.add({
        targets: light,
        radius: { from: width * 0.35, to: width * 0.45 },
        intensity: { from: 0.45, to: 0.55 },
        duration: duration,
        yoyo: delay,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    return light;
}