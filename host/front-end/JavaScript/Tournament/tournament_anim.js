async function displayNextGame(game_nbr, nicknames){

	tournamentResetBlocks();
	fillNicknames(nicknames);

	document.getElementById('round_block').textContent = document.getElementById('Roundof16').querySelectorAll('.game_nbr')[game_nbr - 1].textContent;
	document.getElementById('nick_announce').textContent = document.getElementById('Roundof16').querySelectorAll('.nicks')[game_nbr - 1].textContent

	await tournamentGameAnimation(document.getElementById('nick_announce'), document.getElementById('round_block'));

	tournamentResetBlocks();
	fillNicknames(nicknames);

	if (stop_flag == true){
		tournamentResetBlocks();
		document.getElementById('submit_alias').removeAttribute('disabled');
		return;
	}

	await tournamentGameStart()
}

async function displayTournamentStage(nicknames){
	let incomingGames;
	let round = document.getElementById('round_block');
	let gamesArray = document.getElementById('tournament_announcer').querySelectorAll('.rounds_state');

	fillNicknames(nicknames);

	switch (nicknames.length){
        case 16:
            round.textContent = getTranslation('Round of 16');
            incomingGames = gamesArray[0];
            break;
        case 8:
            round.textContent = getTranslation('Final 8');
            hideUnused(8);
            incomingGames = gamesArray[1];
            break;
        case 4:
            round.textContent = getTranslation('Final 4');
            hideUnused(4);
            incomingGames = gamesArray[2];
            break;
        case 2:
            round.textContent = getTranslation('Final');
            hideUnused(2);
            incomingGames = document.getElementById('nick_announce')
            incomingGames.textContent = document.getElementById('1stGameNicks').textContent;
            break;
    }
	
	await tournamentStageAnimation(round, incomingGames);

	if (nicknames.length == 2){
		final = true;
		await tournamentGameStart();
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
	let main_page = document.getElementById('main_page')
	
	document.getElementById("Roundof16").classList.add('d-none');
	main_page.style.opacity = '0';
	main_page.style.display = 'block';

	player.style.opacity = '0';
	round.style.opacity = '0';

	await sleep(100);

	player.style.transition = 'opacity 1s';
	round.style.transition = 'opacity 1s';
	main_page.style.transition = 'opacity 1s';

	await sleep(100);

	main_page.style.opacity = '1';
	round.style.opacity = '1';

	await sleep(1000);

	player.style.opacity = '1';

	await sleep(2000);

	player.style.opacity = '0';
	round.style.opacity = '0';
	main_page.style.opacity = '0'
	await sleep(1000);
	document.getElementById("Roundof16").classList.remove('d-none');

}

async function displayFinalWinner(){
	let winner = document.getElementById('nick_reminder').textContent
	winner = winner.substring(0, winner.indexOf(' '));

	let game_page = document.getElementById('game_page_tournament');
	let top_logo = document.getElementById('game_toolbar');

	game_page.style.transition = 'opacity 1s';
	top_logo.style.transition = 'opacity 1s';

	await sleep(10);

	top_logo.style.opacity = '0';
	game_page.style.opacity = '0';

	await sleep(2000);

	top_logo.style.display = 'none';
	game_page.style.display = 'none';
	top_logo.style.opacity = '';
	game_page.style.opacity = '';
	top_logo.style.transition = '';
	game_page.style.transition = '';

	document.getElementById('main_page').style.display = 'block';
	document.getElementById('main_menu_page').style.display = 'block';
	document.getElementById('Roundof16').style.display = 'none';

	document.getElementById('round_block').textContent = getTranslation('Tournament Win Msg');
	document.getElementById('nick_announce').textContent = getTranslation('Congratulations') + ' ' + winner + '.';

	let end_btn = document.getElementById('end_tournament_btn');

	end_btn.style.opacity = '0';
	end_btn.style.transition = 'opacity 1s';
	end_btn.classList.remove('d-none');

	await sleep(10);

	document.getElementById('round_block').style.opacity = '1';
	document.getElementById('nick_announce').style.opacity = '1';
	end_btn.style.opacity = '1';

	await sleep (1000)
}
