async function startTournament(newNicksArray, i){
	tournamentResetBlocks();
	nicknames = newNicksArray;
	winner_array = [];
	stop_flag = false;
	max_game = i / 2;

	if (nicknames == null)
		return;

	document.getElementById('main_menu_page').style.opacity = '1';
	document.getElementById('main_menu_toolbar').style.opacity = '0';
	document.getElementById('submit_alias').setAttribute('disabled', true);
	document.getElementById('tournament_nickname_menu').style.display = 'none';
	document.getElementById('tournament_announcer').style.display = 'block';

	await displayTournamentStage(nicknames);

	if (stop_flag == true){
		tournamentResetBlocks();
		document.getElementById('submit_alias').removeAttribute('disabled');
		return;
	}
	if (i != 2)
		displayNextGame(game_nbr, nicknames)
}

async function tournamentGameStart(){
	removeMenu();
	let game_toolbar = document.getElementById('game_toolbar');
	let game_page_tournament = document.getElementById('game_page_tournament');

	let player_block = document.getElementById('nick_reminder');
	player_block.innerHTML = document.getElementById('nick_announce').innerHTML;

	game_toolbar.style.opacity = '0';
	game_toolbar.style.display = 'block';
	game_toolbar.style.transition = 'opacity 1s';

	game_page_tournament.style.opacity = '0';
	game_page_tournament.style.display = 'block';
	game_page_tournament.style.transition = 'opacity 1s';

	await sleep (10);
	game_page_tournament.style.opacity = '1';
	game_toolbar.style.opacity = '1';
	await sleep(1000);
}
