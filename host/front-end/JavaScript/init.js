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

let login42;

let account_status;
let user_info;
let client_id;
let redirect_uri;

initializeAuth();
refreshLogin();

// < GAME > //

let type; // tournament or no
let players_nb; // number of local players

let game; // object of the game
let active; // should display the game or no

let gameMode; // bonus or normal;

let pos; // left or right (online)
let role; // host or guest (online)

initializeGameMode();

// < STATS > //

let visual = false;

let history = null;
let history_tab = 0;

let stats = null;
let stats_tab = 0;

//Tournament//

let stop_flag = false;
let nicknames;
let originalNicknames;
let winner_array;
let game_nbr;
let gameWinner;
let max_game;
let final = false;
let turn = false;

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

refreshStats();
refreshHistory();
refreshStatsDisplaySwitch();
refreshLogin();

ARIAButtonState();

//<Backend> //

let csrfToken = document.cookie.replace("csrftoken=", "");

document.addEventListener('DOMContentLoaded', function() {fetchCsrfToken();});

async function fetchCsrfToken() {
    const response = await fetch('https://hostname:8080/backend/csrf/', { //ICI
        credentials: 'include'
	});
}
// console.log(document.cookie);

localStorage.removeItem('history_data');

refreshHistory();

addHistoryEntry('pcapurro', 'bgales', '10-2', '700', ["17|2", "64|1", "145|1", "200|1", "250|2", "300|1", "350|1", "360|1", "370|1", "400|1", "500|1", "700|1"]);

addHistoryEntry('pcapurro', 'bgales', '9-10', '1065', ["17|2", "64|2", "145|1", "200|1", "250|2", "300|1", "350|1", "360|1", "370|1", "400|1", "500|1", "700|1", "800|2", "900|2", "1005|2", "1010|2", "1050|2", "1065|2"]);