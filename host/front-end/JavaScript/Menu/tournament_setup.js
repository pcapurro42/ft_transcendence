document.getElementById('tournament_players_selector').onchange = function(){
	let value = this.value;
	let submit_btn = document.getElementById('submit_player_nbr');

	if (value == 1)
		submit_btn.setAttribute('disabled', true);
	else
		submit_btn.removeAttribute('disabled');

	document.getElementById('submit_player_nbr').onclick = () =>{
		displayTournamentForm(this.value);
		console.log(this.value);
	};
}

