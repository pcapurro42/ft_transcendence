function tournamentTypeHandler(){
	let submit_btn = document.getElementById('submit_player_nbr');

	if (this.value == 1)
		submit_btn.setAttribute('disabled', true);
	else
		submit_btn.removeAttribute('disabled');

	tournamentFullReset();

	document.getElementById('submit_player_nbr').onclick = () =>{
		displayTournamentForm(this.value);
	};
}

async function nextGameHandler(){

	active = false;
	removeTournamentGame();
	if (game_nbr < max_game){
		document.getElementById('game_toolbar').style.display = 'none';
		document.getElementById('game_page_tournament').style.display = 'none';
		winner_array.push(nicknames[game_nbr])  //here will go the code to add the winner to new player array.
		await sleep(1000);
		game_nbr += 1;
		displayNextGame(game_nbr, nicknames);
	}
	else{
		document.getElementById('game_toolbar').style.display = 'none';
		document.getElementById('game_page_tournament').style.display = 'none';
		winner_array.push(nicknames[game_nbr]) //here will go the code to add the winner to new player array.
		await sleep(1000);
		document.getElementById('main_menu_page').style.display = 'block';
		startTournament(winner_array, winner_array.length);
		game_nbr = 1;
	}
}



