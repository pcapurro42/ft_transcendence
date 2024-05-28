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

let type; // tournament or no
let players_nb; // number of local players

let game; // object of the game
let active; // should display the game or no

let gameMode; // bonus or normal;

let pos; // left or right (online)
let role; // host or guest (online)

initializeGameMode();

// < STATS > //

let onl_games;

let onl_played;
let onl_victory;
let onl_defeat;
let onl_ball_out;
let onl_ball_hit;
let onl_bonus_taken;

let lcl_played;
let lcl_victory;
let lcl_defeat;
let lcl_ball_out;
let lcl_ball_hit;
let lcl_bonus_taken;

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

//<Backend> //

let csrfToken = document.cookie.replace("csrftoken=", "");

document.addEventListener('DOMContentLoaded', function() {fetchCsrfToken();});

async function fetchCsrfToken() {
    const response = await fetch('https://hostname:8080/backend/csrf/', {
        credentials: 'include'
	});
}
// console.log(document.cookie);
