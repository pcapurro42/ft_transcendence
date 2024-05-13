async function displayNextGame(game_nbr, nicknames){

	let round = document.getElementById('round_block');
	let player = document.getElementById('nick_announce');

	let roundArray = document.getElementById('Roundof16').querySelectorAll('.game_nbr');
	let playerArray = document.getElementById('Roundof16').querySelectorAll('.nicks')

	tournamentResetBlocks();
	fillNicknames(nicknames);

	round.innerHTML = roundArray[game_nbr - 1].innerHTML;
	player.innerHTML = playerArray[game_nbr - 1].innerHTML

	await tournamentGameAnimation(player, round);

	if (stop_flag == true){
		tournamentResetBlocks();
		document.getElementById('submit_alias').removeAttribute('disabled');
		return;
	}

	tournamentGameStart()
}

async function displayTournamentStage(nicknames){
	let incomingGames;
	let round = document.getElementById('round_block');
	let gamesArray = document.getElementById('tournament_announcer').querySelectorAll('.rounds_state');

	fillNicknames(nicknames);

	switch (nicknames.length){
		case 16:
			round.innerHTML = getTranslation('Round of 16');
			incomingGames = gamesArray[0];
			break;
		case 8:
			round.innerHTML = getTranslation('Final 8');
			incomingGames = gamesArray[1];
			break;
		case 4:
			round.innerHTML = getTranslation('Final 4');
			incomingGames = gamesArray[2];
			break;
		case 2:
			round.innerHTML = getTranslation('Final');
			incomingGames = document.getElementById('nick_announce')
			incomingGames.innerHTML = document.getElementById('1stGameNicks').innerHTML;
			break;
	}

	await tournamentStageAnimation(round, incomingGames);

	if (nicknames.length == 2){
		tournamentGameStart();
	}
}

async function tournamentStageAnimation(round, incomingGames){
	round.style.opacity = '0';
	round.style.transition = 'opacity 1s';

	incomingGames.style.opacity = '0';
	incomingGames.style.transition = 'opacity 1s';
	incomingGames.style.visibility = 'visible';


	await sleep(10);

	round.style.opacity = '1';

	await sleep(1500);

	incomingGames.style.opacity = '1';

	await sleep(4000);

	round.style.opacity = '0';
	incomingGames.style.opacity = '0';

	await sleep(1000);

}
async function tournamentGameAnimation(player, round)
{
	let main_menu = document.getElementById('main_menu_page')

	main_menu.style.opacity = '0';
	main_menu.style.display = 'block';

	player.style.opacity = '0';
	round.style.opacity = '0';

	await sleep(100);

	player.style.transition = 'opacity 1s';
	round.style.transition = 'opacity 1s';
	main_menu.style.transition = 'opacity 1s';

	await sleep(100);

	main_menu.style.opacity = '1';
	round.style.opacity = '1';

	await sleep(1000);

	player.style.opacity = '1';

	await sleep(2000);

	player.style.opacity = '0';
	round.style.opacity = '0';
	main_menu.style.opacity = '0'
	await sleep(1000);


}
