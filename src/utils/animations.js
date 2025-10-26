export function playerAnimations(scene, atlas, name) {

    const makeAnim = (key, config) => {
        if (!scene.anims.exists(key)) { scene.anims.create(config) }
    };

    makeAnim(`${name}_stand`, {
        key: `${name}_stand`,
        frames: [{ key: atlas, frame: `alien${name}_stand.png` }],
        frameRate: 1
    });

    makeAnim(`${name}_duck`, {
        key: `${name}_duck`,
        frames: [{ key: atlas, frame: `alien${name}_duck.png` }],
        frameRate: 1
    });

    makeAnim(`${name}_jump`, {
        key: `${name}_jump`,
        frames: [{ key: atlas, frame: `alien${name}_jump.png` }],
        frameRate: 1
    });

    makeAnim(`${name}_hurt`, {
        key: `${name}_hurt`,
        frames: [{ key: atlas, frame: `alien${name}_hurt.png` }],
        frameRate: 1
    });

    makeAnim(`${name}_walk`, {
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

    makeAnim(`${name}_climb`, {
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

    makeAnim(`${name}_swim`, {
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