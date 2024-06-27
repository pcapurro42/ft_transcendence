// < general > //

let originalUrl = window.location.pathname;
let keys_register = null;

// < settings > //

let language;
let sounds_volume;
let music_volume;
let text_size;
let descriptive_images;
let high_contrast;

initializeLanguage();
initializeSettings();

// < history > //

let previous_url_path;
let path;

let pushHistory;
window.addEventListener('popstate', handleLocation);

// < 42 > //

const csrfToken = document.cookie.replace("csrftoken=", "");
let auth_code = new URLSearchParams(window.location.search).get('code');

initializeAuthToken();

let account_status;
let user_info;
let client_id;
let redirect_uri;

//database stored data

let gamesPlayedNb = 0;
let wonGamesNb = 0;
let loseGameNb = 0;
let ballDistance = 0;
let ballReturned = 0;
let ballReceived = 0;
let bonusTaken = 0;
let bonusTotal = 0;
let gameHistory;

initializeAuth();
refreshLogin();

// < customize > //

let game_music;
let game_map;

initializeCustomize();

// < rgpd > //

initializeDataAuths();

// < music/sounds > //

initializeMusics();
initializeSounds();

// < game > //

let type;
let players_nb;

let game;
let active;
let bonus_type;

let gameMode;

let pos;
let role;

let ping = true;
let stop_ping = false;

initializeGameMode();

// < stats > //

let visual = false;

let historic = null;
let history_tab = 0;

let stats = null;
let stats_tab = 0;

// < tournament > //

let stop_flag = false;
let nicknames;
let originalNicknames;
let winner_array;
let loser_array;
let game_nbr;
let gameWinner;
let gameLoser;
let max_game;
let final = false;
let turn = false;

setTournamentSelector();

// < p2p > //

let timeoutInterval;
let RTC_o;
let RTC_a;
let data_channel;
let isDisplayModal;

// < language > //

languageSwitch(language);

// < refresh > //

refreshDisplay();

refreshSounds();
refreshMusics();

refreshStats();
refreshHistory();
refreshStatsDisplaySwitch();
refreshLogin();

ARIAButtonState();

// < backend > //

// handleRedirection();
// handleLocation();

if (localStorage.getItem('status') == 'connected')
    retrieveUserInfo();
window.addEventListener('DOMContentLoaded', ()=>{document.body.style.display = "block"});
hideBackgrounds()

