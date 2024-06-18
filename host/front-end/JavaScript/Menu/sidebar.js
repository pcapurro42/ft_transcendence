
document.getElementById('light_switch').onclick = changeHighContrast;
document.getElementById('letter_switch').onclick = letterSwitch;

document.getElementById('sb_fr').onclick = async () => {
	languageSwitch('fr')
};

document.getElementById('sb_en').onclick = async () => {
	languageSwitch('en')
};

document.getElementById('sb_es').onclick = async () => {
	languageSwitch('es')
};

document.getElementById('sb_customize').onclick = async () => {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayCustomize()
};

document.getElementById('sb_settings').onclick = async () => {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
 	nav.displaySettings();
};

document.getElementById('sb_settings_privacy').onclick = async () =>  {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	displaySecondSettingsPage()
};
document.getElementById('sb_credits').onclick = async () => {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.theaterCredits();
};
document.getElementById('sb_1v1').onclick = async () => {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayOneVsOneGameLocal();
};

document.getElementById('sb_1v2').onclick = async () => {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayTwoVsOneGameLocal();
};

document.getElementById('sb_create_lobby').onclick = async () =>{
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayCreateLobby();
};

document.getElementById('sb_join_lobby').onclick = async () =>{
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayJoinLobby();
};

document.getElementById('sb_local_stat').onclick = async () =>{
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayLocalStats();
};

document.getElementById('sb_online_stat').onclick = async () => {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayOnlineStats();
};

document.getElementById('sb_game_history').onclick = async () => {
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	nav.displayHistory();
};

document.getElementById('sb_ro16').onclick = async () =>{
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	document.getElementById('tournament_players_selector').value = '16';
	nav.displayTournamentForm();
};


document.getElementById('sb_final8').onclick = async () =>{
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	document.getElementById('tournament_players_selector').value = '8';
	nav.displayTournamentForm();
}


document.getElementById('sb_final4').onclick = async () =>{
	hideSidebar();
	if (!(await handleSensitivePages()))
		return;
	document.getElementById('tournament_players_selector').value = '4';
	nav.displayTournamentForm();
}
