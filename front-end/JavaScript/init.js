localStorage.clear();

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

let client_id;
let redirect_uri;

initializeAuth();

// < REFRESH > //

defaultHide();

refreshLanguage();
refreshDisplay();

refreshSounds();
refreshMusics();