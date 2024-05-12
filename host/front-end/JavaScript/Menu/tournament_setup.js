let nicknames = [];
let winner_array = [];
let game_nbr = 1;
let max_game=0;
let logo_logo_bool = true;

document.getElementById('next_game_tournament_btn').onclick = async function(){
	console.log('test')
	if (game_nbr < max_game){
		document.getElementById('game_toolbar').style.display = 'none';
		document.getElementById('game_page_tournament').style.display = 'none';
		winner_array.push(nicknames[game_nbr]) //here will go the code to remove the loser from nickname array.
		await sleep(1000);
		game_nbr += 1;
		displayNextGame(game_nbr, nicknames);
	}
	else{
		document.getElementById('game_toolbar').style.display = 'none';
		document.getElementById('game_page_tournament').style.display = 'none';
		winner_array.push(nicknames[game_nbr]) //here will go the code to remove the loser from nickname array.
		await sleep(1000);
		document.getElementById('main_menu_page').style.display = 'block';
		start_tournament(winner_array, winner_array.length);
		game_nbr = 1;
	}
}


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

async function start_tournament(names, i){
	console.log('hello from Start Tournament');
	tournamentResetBlocks();
	console.log(names);
	nicknames = names;
	winner_array = [];
	stop_flag = false;
	max_game = i / 2;
	if (nicknames == null)
		return;
	document.getElementById('main_menu_page').style.opacity = '1';
	document.getElementById('submit_alias').setAttribute('disabled', true);
	document.getElementById('tournament_nickname_menu').style.display = 'none';
	document.getElementById('tournament_announcer').style.display = 'block';

	if (i == 16)
		await roundOfSixteen(nicknames);
	else if (i == 8)
		await finalEight(nicknames);
	else if (i == 4)
		await finalFour(nicknames);
	else if (i == 2)
		await final(nicknames);

	if (stop_flag == true){
		tournamentResetBlocks();
		document.getElementById('submit_alias').removeAttribute('disabled');
		return;
	}
	if (i != 2)
		displayNextGame(game_nbr, nicknames)
}

async function tournamentGameStart(game_nbr, nicknames){
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

async function displayNextGame(game_nbr, nicknames){

	let main_menu = document.getElementById('main_menu_page')
	if (logo_bool == true)
		logo_bool = false;
	else
		main_menu.style.opacity = '0';
	main_menu.style.display = 'block';


	tournamentResetBlocks();
	fillNicknames(nicknames);


	let round_announce = document.getElementById('round_block');
	let player_block;

	player_block = document.getElementById('nick_announce');

	switch(game_nbr){
		case 1 :
			round_announce.innerHTML = getTranslation('1st Game');
			player_block.innerHTML = document.getElementById('1stGameNicks').innerHTML;
			break;
		case 2 :
			round_announce.innerHTML = getTranslation('2nd Game')
			player_block.innerHTML = document.getElementById('2ndGameNicks').innerHTML;
			break;
		case 3 :
			round_announce.innerHTML = getTranslation('3rd Game')
			player_block.innerHTML = document.getElementById('3rdGameNicks').innerHTML;
			break;
		case 4 :
			round_announce.innerHTML = getTranslation('4th Game')
			player_block.innerHTML = document.getElementById('4thGameNicks').innerHTML;
			break;
		case 5 :
			round_announce.innerHTML = getTranslation('5th Game')
			player_block.innerHTML = document.getElementById('5thGameNicks').innerHTML;
			break;
		case 6 :
			round_announce.innerHTML = getTranslation('6th Game')
			player_block.innerHTML = document.getElementById('6thGameNicks').innerHTML;
			break;
		case 7 :
			round_announce.innerHTML = getTranslation('7th Game')
			player_block.innerHTML = document.getElementById('7thGameNicks').innerHTML;
			break;
		case 8 :
			round_announce.innerHTML = getTranslation('8th Game')
			player_block.innerHTML = document.getElementById('8thGameNicks').innerHTML;
			break;
	}


	player_block.style.opacity = '0';
	round_announce.style.opacity = '0';

	await sleep(100);

	player_block.style.transition = 'opacity 1s';
	round_announce.style.transition = 'opacity 1s';
	main_menu.style.transition = 'opacity 1s';

	await sleep(100);

	main_menu.style.opacity = '1';
	round_announce.style.opacity = '1';

	await sleep(1000);

	player_block.style.opacity = '1';

	await sleep(2000);

	player_block.style.opacity = '0';
	round_announce.style.opacity = '0';
	main_menu.style.opacity = '0'
	await sleep(1000);


	if (stop_flag == true){
		tournamentResetBlocks();
		document.getElementById('submit_alias').removeAttribute('disabled');
		return;
	}
	tournamentGameStart(game_nbr, nicknames)

}

async function roundOfSixteen(nicknames){
	let round_announce = document.getElementById('round_block')
	round_announce.innerHTML = getTranslation('Round of 16');
	round_announce.innerHTML = getTranslation('Final 8');
	round_announce.style.transition = 'opacity 1s';
	round_announce.style.opacity = '0';

	let round = document.getElementById('Roundof16');
	round.style.transition = 'opacity 1s';
	round.style.opacity = '0';
	round.style.visibility = 'visible';

	fillNicknames(nicknames);

	await sleep(10);
	round_announce.style.opacity = '1';
	await sleep(1500);
	round.style.opacity = '1';
	await sleep(4000);
	round_announce.style.opacity = '0';
	round.style.opacity = '0';
	await sleep(1000);


}


async function finalEight(nicknames){
	document.getElementById('Roundof16').style.visibility = 'hidden';

	let round_announce = document.getElementById('round_block')
	round_announce.innerHTML = getTranslation('Final 8');
	round_announce.style.opacity = '0';
	round_announce.style.transition = 'opacity 1s';

	let round = document.getElementById('Final8');
	round.style.opacity = '0';
	round.style.transition = 'opacity 1s';
	round.style.visibility = 'visible';

	fillNicknames(nicknames);

	await sleep(10);
	round_announce.style.opacity = '1';
	await sleep(1500);
	round.style.opacity = '1';
	await sleep(4000);
	round_announce.style.opacity = '0';
	round.style.opacity = '0';
	await sleep(1000);
}

async function finalFour(nicknames){
	document.getElementById('Roundof16').style.visibility = 'hidden';
	document.getElementById('Final8').style.visibility = 'hidden';

	let round_announce = document.getElementById('round_block')
	round_announce.innerHTML = getTranslation('Final 4');
	round_announce.style.transition = 'opacity 1s';
	round_announce.style.opacity = '0';


	let round = document.getElementById('Final4');
	round.style.transition = 'opacity 1s';
	round.style.opacity = '0';
	round.style.visibility = 'visible';

	fillNicknames(nicknames);

	await sleep(10);
	round_announce.style.opacity = '1';
	await sleep(1500);
	round.style.opacity = '1';
	await sleep(4000);
	round_announce.style.opacity = '0';
	round.style.opacity = '0';
	await sleep(1000);
	round.style.opacity = '1';
	round.style.visibility = 'hidden';


}

async function final(nicknames){
	document.getElementById('Roundof16').style.visibility = 'hidden';
	document.getElementById('Final8').style.visibility = 'hidden';
	document.getElementById('Final4').style.visibility = 'hidden';

	let round_announce = document.getElementById('round_block')
	round_announce.innerHTML = getTranslation('Final');
	round_announce.style.transition = 'opacity 1s';
	round_announce.style.opacity = '0';


	let round = document.getElementById('Final');
	round.style.transition = 'opacity 1s';
	round.style.opacity = '0';
	round.style.visibility = 'visible';

	fillNicknames(nicknames);

	await sleep(10);
	round_announce.style.opacity = '1';
	await sleep(1500);
	round.style.opacity = '1';
	await sleep(4000);
	round_announce.style.opacity = '0';
	round.style.opacity = '0';
	await sleep(1000);
}

function fillNicknames(nicknames){
	document.getElementById('1stGameNicks').innerHTML = `${nicknames[0]} vs ${nicknames[1]}`;
	document.getElementById('2ndGameNicks').innerHTML = `${nicknames[2]} vs ${nicknames[3]}`;
	document.getElementById('3rdGameNicks').innerHTML = `${nicknames[4]} vs ${nicknames[5]}`;
	document.getElementById('4thGameNicks').innerHTML = `${nicknames[6]} vs ${nicknames[7]}`;
	document.getElementById('5thGameNicks').innerHTML = `${nicknames[8]} vs ${nicknames[9]}`;
	document.getElementById('6thGameNicks').innerHTML = `${nicknames[10]} vs ${nicknames[11]}`;
	document.getElementById('7thGameNicks').innerHTML = `${nicknames[12]} vs ${nicknames[13]}`;
	document.getElementById('8thGameNicks').innerHTML = `${nicknames[14]} vs ${nicknames[15]}`;

}
