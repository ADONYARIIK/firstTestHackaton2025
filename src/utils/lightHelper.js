export function setupLights(scene) {
    // scene.lights.enable().setAmbientColor(0xf0f0f0);
    scene.lights.enable().setAmbientColor(0x000);

    createTorchLight(scene, 105, 1000);
    createLavaLight(scene, 390, 1200);

    // scene.lights.addLight(100, 100, 10000).setIntensity(2.5);
    // scene.lights.addLight(100, 1000, 10000, 0xda711b).setIntensity(1.5);
}

function createTorchLight(scene, x, y) {
    const light = scene.lights.addLight(x, y, 5000, 0xffaa33, 1.5);

    scene.tweens.add({
        targets: light,
        radius: { from: 4500, to: 5500 },
        intensity: { from: 1.4, to: 1.6 },
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    return light;
}

function createLavaLight(scene, x, y, width = 300) {
    const light = scene.lights.addLight(x, y, width*0.8, 0xff3300, 1);

    scene.tweens.add({
        targets: light,
        radius: { from: width * 0.7, to: width * 0.9 },
        intensity: { from: 0.9, to: 1.1 },
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    return light;
}