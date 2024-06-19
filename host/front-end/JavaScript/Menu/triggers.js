// < TOOLBAR > //

document.getElementById('music_toggle_btn').onclick = enableDisableMusic;
document.getElementById('sound_toggle_btn').onclick = enableDisableSounds;
document.getElementById('game_theme_btn_selector').onchange = gameMusicSelector;


document.getElementById("login_btn").onclick = login;
document.getElementById("drop_logout").onclick = logout;

// < MAIN MENU > //

document.getElementById('title_logo').onclick = nav.displayMenu;
document.getElementById('disconnection_back_btn').onclick = () => {
	document.querySelectorAll('button:not(.not-disabled), a').forEach(element => {element.removeAttribute('disabled')});
	location.reload(), nav.displayMenu();
}

document.getElementById('intra_login').onclick = displayDropdownMenu;
document.getElementById('play_btn').onclick = nav.displayPlay;
document.getElementById('play_back_btn').onclick = nav.removePlay;

document.getElementById('customize_btn').onclick = nav.displayCustomize;

document.getElementById('drop_customize').onclick = () => nav.displayCustomize();
document.getElementById('customize_back_btn').onclick = nav.removeCustomize;

document.getElementById('stats_btn').onclick = nav.displayStats;
document.getElementById('drop_stats').onclick = () => nav.displayStats()
document.getElementById('stats_back_btn').onclick = nav.removeStats;

document.getElementById('settings_btn').onclick = nav.displaySettings;
document.getElementById('drop_settings').onclick = () => nav.displaySettings()
document.getElementById('settings_back_btn').onclick = nav.removeSettings;

document.getElementById('credits_btn').onclick = nav.theaterCredits;

document.getElementById('vid_credits').onended = nav.theaterClose;
document.getElementById('credit_close').onclick = nav.theaterClose;

document.getElementById('rgpd_btn').onclick = nav.displayRGPD;
document.getElementById('rgpd_back_btn').onclick = nav.displayMenu;
// < PLAY > //

document.getElementById('one_vs_one_online_btn').onclick = nav.displayOnlineMenu;

document.getElementById('one_vs_one_local_btn').onclick = nav.displayOneVsOneGameLocal;

document.getElementById('play_classic_btn').onclick = nav.displayClassicChoice;
document.getElementById('classic_back_btn').onclick = nav.displayPlay;

document.getElementById('start_1v1_local').onclick = displayLocal1v1;
document.getElementById('start_2v1_local').onclick = displayLocal1v2;
document.getElementById('two_vs_one_local_btn').onclick = nav.displayTwoVsOneGameLocal;
document.getElementById('start_1v1_online').onclick = displayOnline1v1;

// < CLASSIC > //

document.getElementById('create_lobby_btn').onclick = nav.displayCreateLobby;
document.getElementById('create_classic_back_btn').onclick = nav.displayOnlineMenu;

document.getElementById('join_lobby_btn').onclick = nav.displayJoinLobby;
document.getElementById('join_classic_back_btn').onclick = nav.displayOnlineMenu;

document.getElementById('one_vs_one_online_choice_back_btn').onclick = nav.removeOnlineMenu;

// < TOURNAMENT > //

document.getElementById('play_tournament_btn').onclick = nav.displayTournamentSetup;
document.getElementById('back_tournament_btn').onclick = nav.removeTournamentSetup;
document.getElementById('t_next_game').onclick = nextGameHandler;
document.getElementById('submit_player_nbr').onclick = tournamentTypeHandler;
document.getElementById('back_tournament_form_btn').onclick = nav.removeTournamentForm;

document.getElementById('t_start_game').onclick = displayTournamentGame;
document.getElementById('t_leaderboard').onclick = displayTournamentLeaderboard;

// < CUSTOMIZE > //

document.getElementById('game_map_btn_selector').onchange = changeGameMap;
document.getElementById('switch_classic').onchange = changeGameMode;
document.getElementById('switch_tournament').onchange = changeGameMode;
// < STATS > //

document.getElementById('local_stats_btn').onclick = nav.displayLocalStats;
document.getElementById('local_stats_back_btn').onclick = nav.removeLocalStats;
document.getElementById('online_stats_btn').onclick = nav.displayOnlineStats;

document.getElementById('online_stats_back_btn').onclick = nav.removeOnlineStats;
document.getElementById('history_btn').onclick = nav.displayHistory;
document.getElementById('history_back_btn').onclick = nav.removeHistory;

document.getElementById('prev_stats').onclick = displayPrevStatsPage;
document.getElementById('next_stats').onclick = displayNextStatsPage;
document.getElementById('prev_history').onclick = displayPrevHistoryPage;
document.getElementById('next_history').onclick = displayNextHistoryPage;

document.getElementById('switch_visual_input').onchange = changeStatsDisplayMode;

// < SETTINGS > //

document.getElementById('language_btn_selector').onchange = changeLanguage;
document.getElementById('text_size_btn_selector').onchange = changeTextSize;
document.getElementById('sound_volume_slider').onchange = changeSoundsVolume;
document.getElementById('music_volume_slider').onchange = changeMusicVolume;
document.getElementById('high_contrast_btn_yn').onclick = changeHighContrast;

document.getElementById('image_desc_btn_yn').onclick = changeDescriptiveImages;

document.getElementById('prev_settings').onclick = displayFirstSettingsPage;
document.getElementById('next_settings').onclick = displaySecondSettingsPage;

document.getElementById('data_anonymize_btn').onclick = changeAnonymizeAuth;

document.getElementById('read_local_data_btn').onclick = readLocalData;
document.getElementById('delete_local_data_btn').onclick = deleteLocalData;
document.getElementById('delete_online_data_btn').onclick = deleteOnlineData;

// < GAME > //

document.getElementById('top_logo').onclick = async function(){
	hideSidebar();
	if (!(await handleSensitivePages()))
        return;
	nav.hideEveryDiv();
	nav.displayMenu();
	refreshSite();
};

document.getElementById('home_btn').onclick = async function(){
	hideSidebar();
	if (!(await handleSensitivePages()))
        return;
	nav.hideEveryDiv();
	nav.displayMenu();
};



// < PEER ANSWERS/OFFERS> //

document.getElementById('init_p2p').onclick = fetchAnswer;
document.getElementById('submit_inv_code').onclick = fetchOffer;

document.getElementById('game_map_btn_selector').onmouseover = showMapTooltip;

document.getElementById('game_map_btn_selector').onmouseout = removeMapTooltip;
