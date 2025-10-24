export function setupLights(scene) {
    scene.lights.enable().setAmbientColor(0x222222);

    scene.lights.addLight(100, 100, 10000).setIntensity(2.5);
    scene.lights.addLight(100, 1000, 10000, 0xda711b).setIntensity(1.5);

    // scene.lights.addLight(100, 1600, 10000).setColor(0xda711b).setIntensity(2.5);
    // scene.lights.addLignt(x, y, radius, color, intensity);
}