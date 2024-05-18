// < TOOLBAR > //

document.getElementById('music_toggle').onclick = enableDisableMusic;
document.getElementById("login_btn").onclick = login;
document.getElementById("logout_btn").onclick = logout;

// < MAIN MENU > //

document.getElementById('title_logo').onclick = displayMenu;
document.getElementById('disconnection_back_btn').onclick = displayMenu;

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

document.getElementById('one_vs_one_online_btn').onclick = displayOneVsOneChoice;

document.getElementById('one_vs_one_local_btn').onclick = displayOneVsOneGameLocal;
document.getElementById('two_vs_two_local_btn').onclick = displayTwoVsOneGameLocal;

document.getElementById('play_classic_btn').onclick = displayClassicChoice;
document.getElementById('classic_back_btn').onclick = removeClassicChoice;

document.getElementById('start_1v1_local').onclick = displayLocal1v1;

document.getElementById('start_vs_ai').onclick = displayVsAi;

// < CLASSIC > //

document.getElementById('create_one_vs_one_online_btn').onclick = displayOneVsOneOnlineCreateGame;
document.getElementById('create_classic_back_btn').onclick = displayOneVsOneChoice;

document.getElementById('join_one_vs_one_online_btn').onclick = displayOneVsOneOnlineJoinGame;
document.getElementById('join_classic_back_btn').onclick = displayOneVsOneChoice;

document.getElementById('one_vs_one_online_choice_back_btn').onclick = removeOneVsOneChoice;

// < AI > //

document.getElementById('ai_game_btn').onclick = ai;

// < TOURNAMENT > //

document.getElementById('play_tournament_btn').onclick = displayTournamentSetup;
document.getElementById('back_tournament_btn').onclick = removeTournamentSetup;
document.getElementById('next_game_tournament_btn').onclick = nextGameHandler;
document.getElementById('tournament_players_selector').onchange = tournamentTypeHandler;
document.getElementById('back_tournament_form_btn').onclick = removeTournamentForm;

document.getElementById('start_tournament_game').onclick = displayTournamentGame;

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

// < PEER ANSWERS/OFFERS> //

document.getElementById('submit_offer').onclick = answerGenerator;
document.getElementById('submit_answer').onclick = submitAnswer;
// document.getElementById('submit_answer').onclick = offerHandler;

document.getElementById('game_map_btn_selector').onmouseover = showMapTooltip;

document.getElementById('game_map_btn_selector').onmouseout = removeMapTooltip;
