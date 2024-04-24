// localStorage.clear();

// < CUSTOMIZE > //

let game_music;
let game_map;

initializeCustomize();

// < SETTINGS > //

let language;
let sounds_volume;
let music_volume;
let text_size;
let descriptive_images;
let high_contrast;

initializeLanguage();
initializeSettings();

// < SOUNDS > //

initializeSounds();

// < 42 CONNECT > //

const client_id = 'u-s4t2ud-328d5957a0e78853f7b035bed31812c4bd82ea90773c43b8686b35f1ae4d1353';
const redirect_uri = 'https://127.0.0.1';

initializeAuth();

// < REFRESH > //

defaultHide();

refreshLanguage();
refreshDisplay();

refreshSounds();
refreshMusics();