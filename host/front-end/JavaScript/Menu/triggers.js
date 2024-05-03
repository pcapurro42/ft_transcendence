// < TOOLBAR > //

document.getElementById('music_toggle').onclick = enableDisableMusic;
document.getElementById("login_btn").onclick = login;
document.getElementById("logout_btn").onclick = logout;

// < MAIN MENU > //

document.getElementById('title_logo').onclick = displayMenu;

document.getElementById('play_btn').onclick = displayPlay;
document.getElementById('play_back_btn').onclick = removePlay;

document.getElementById('settings_btn').onclick = displaySettings;
document.getElementById('settings_back_btn').onclick = removeSettings;

document.getElementById('customize_btn').onclick = displayCustomize;
document.getElementById('customize_back_btn').onclick = removeCustomize;

document.getElementById('credits_btn').onclick = theaterCredits;
document.getElementById('vid_credits').onended = theaterClose;
document.getElementById('credit_close').onclick = theaterClose;

// < PLAY > //

document.getElementById('play_classic_btn').onclick = displayClassicMenu;
document.getElementById('classic_back_btn').onclick = removeClassicMenu;
document.getElementById('play_tournament_btn').onclick = displayTournamentMenu;
document.getElementById('tournament_back_btn').onclick = removeTournamentMenu;
document.getElementById('tournament_submenu_back_btn').onclick = displayTournamentMenu;

// < CLASSIC > //

document.getElementById('create_classic_btn').onclick = displayClassicCreateGame;
document.getElementById('create_classic_back_btn').onclick = displayClassicMenu;
document.getElementById('create_classic_lobby').onclick = displayGamePage_classic;

document.getElementById('join_classic_btn').onclick = displayClassicJoinGame;
document.getElementById('join_classic_back_btn').onclick = displayClassicMenu;


// < TOURNAMENT > //

document.getElementById('create_tournament_btn').onclick = displayTournamentForm;
document.getElementById('join_tournament_btn').onclick = displayTournamentForm;

document.getElementById('submit_alias').onclick = parse_alias;

// document.getElementById('create_classic_btn').onclick = ;
// document.getElementById('join_classic_btn').onclick = ;
// document.getElementById('create_tournament_btn').onclick = ;
// document.getElementById('join_tournament_btn').onclick = ;
document.getElementById('ai_game_btn').onclick = ai;

// < CUSTOMIZE > //

document.getElementById('game_theme_btn_selector').onchange = changeGameMusic;
document.getElementById('game_map_btn_selector').onchange = changeGameMap;

// < SETTINGS > //

document.getElementById('language_btn_selector').onchange = changeLanguage;
document.getElementById('text_size_btn_selector').onchange = changeTextSize;
document.getElementById('sound_volume_slider').onchange = changeSoundsVolume;
document.getElementById('music_volume_slider').onchange = changeMusicVolume;
document.getElementById('high_contrast_btn_yn').onclick = changeHighContrast;
document.getElementById('image_desc_btn_yn').onclick = changeDescriptiveImages;

// < GAME > //

document.getElementById('top_logo').onclick = displayMenu;
