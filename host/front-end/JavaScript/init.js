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

// < MUSICS AND SOUNDS > //

initializeMusics();
initializeSounds();

// < 42 CONNECT > //

let account_status;
let user_info;
let client_id;
let redirect_uri;

initializeAuth();
refreshLogin();

// < GAME > //

let type; // local1v1 or tournament (= local1v1) or local2v1 or online1v1
let mode; // 1 (online), 2 (1v1 local), or 3 (2v1 local)
let game; // object of the game
let active; // should display the game or no

//Tournament//

let stop_flag = false;
let nicknames;
let winner_array;
let game_nbr;
let max_game;

//<P2P>//

let timeoutInterval;
let RTC_o;
let RTC_a;
let data_channel;

// < REFRESH > //

displayMenu();

refreshLanguage();
refreshDisplay();

refreshSounds();
refreshMusics();
