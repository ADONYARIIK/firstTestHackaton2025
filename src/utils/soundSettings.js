let musicValueGlobal = 50;
let sfxValueGlobal = 50;

export function changeVolume(type) {
    if (type === 'musicValue') {
        musicValueGlobal = music;
    }
    else if (type === 'sfxValue') {
        sfxValueGlobal = sfx;
    }
}