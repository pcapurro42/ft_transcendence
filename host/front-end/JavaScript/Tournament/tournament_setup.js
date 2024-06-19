function tournamentTypeHandler(){
	tournamentFullReset();
	nav.displayTournamentForm();
}

async function nextGameHandler(){

	active = false;
	removeTournamentGame();
	if (game_nbr < max_game){
		document.getElementById('game_toolbar').style.display = 'none';
		document.getElementById('game_page_tournament').style.display = 'none';
		winner_array.push(nicknames[nicknames.indexOf(gameWinner)]);
		loser_array.push(nicknames[nicknames.indexOf(gameLoser)]);
		await sleep(1000);
		game_nbr += 1;
		displayNextGame(game_nbr, nicknames);
	}
	else{
		document.getElementById('game_toolbar').style.display = 'none';
		document.getElementById('game_page_tournament').style.display = 'none';
		winner_array.push(nicknames[nicknames.indexOf(gameWinner)])
		loser_array.push(nicknames[nicknames.indexOf(gameLoser)]);

		await sleep(1000);
		document.getElementById('main_menu_page').style.display = 'block';
		startTournament(winner_array, winner_array.length);
		game_nbr = 1;
	}
}

document.getElementById('restart_tournament').onclick = restart_tournament;
document.getElementById('end_tournament').onclick = end_tournament;

function restart_tournament(){
	document.getElementById('Roundof16').style.display = '';
	document.getElementById('end_tournament_btn').classList.add('d-none');
	tournamentFinalReset();
	originalNicknames = shuffleArray(originalNicknames);
	startTournament(originalNicknames, originalNicknames.length);
}

async function end_tournament(){
	let end_btn = document.getElementById('end_tournament_btn');
	document.getElementById('restart_tournament').setAttribute('disabled', true);
	document.getElementById('end_tournament').setAttribute('disabled', true);

	document.getElementById('round_block').style.opacity = '0';
	end_btn.style.opacity = '0'

	await sleep(1000);

	document.getElementById('restart_tournament').removeAttribute('disabled');
	document.getElementById('end_tournament').removeAttribute('disabled');
	end_btn.classList.add('d-none');
	end_btn.style.opacity = ''
	document.getElementById('Roundof16').style.display = '';
	tournamentFinalReset();

	nav.displayMenu();
}

