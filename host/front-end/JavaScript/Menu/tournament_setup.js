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

async function start_tournament(nicknames, i){
	console.log(i);
	if (nicknames == null)
		return;

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

	displayNextGame(1)

}

async function displayNextGame(i){
	switch(i){
		case 1 :
			// document.getElementById('1stGame').classList.add(d)
		case 2 :

		case 3 :

		case 4 :

		case 5 :

		case 6 :

		case 7 :

		case 8 :


	}
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

	await sleep(1000);
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
	round_announce.style.transition = 'opacity 1s';
	round_announce.style.opacity = '0';

	let round = document.getElementById('Final8');
	round.style.transition = 'opacity 1s';
	round.style.opacity = '0';
	round.style.visibility = 'visible';

	fillNicknames(nicknames);

	await sleep(1000);
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

	await sleep(1000);
	round_announce.style.opacity = '1';
	await sleep(1500);
	round.style.opacity = '1';
	await sleep(4000);
	round_announce.style.opacity = '0';
	round.style.opacity = '0';
	await sleep(1000);
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

	await sleep(1000);
	round_announce.style.opacity = '1';
	await sleep(1500);
	round.style.opacity = '1';
	await sleep(4000);
	round_announce.style.opacity = '0';
	round.style.opacity = '0';
	await sleep(1000);
}

function fillNicknames(nicknames){
	console.log(nicknames);
	document.getElementById('1stGameNicks').innerHTML = `${nicknames[0]} vs ${nicknames[1]}`;
	document.getElementById('2ndGameNicks').innerHTML = `${nicknames[2]} vs ${nicknames[3]}`;
	document.getElementById('3rdGameNicks').innerHTML = `${nicknames[4]} vs ${nicknames[5]}`;
	document.getElementById('4thGameNicks').innerHTML = `${nicknames[6]} vs ${nicknames[7]}`;
	document.getElementById('5thGameNicks').innerHTML = `${nicknames[8]} vs ${nicknames[9]}`;
	document.getElementById('6thGameNicks').innerHTML = `${nicknames[10]} vs ${nicknames[11]}`;
	document.getElementById('7thGameNicks').innerHTML = `${nicknames[12]} vs ${nicknames[13]}`;
	document.getElementById('8thGameNicks').innerHTML = `${nicknames[14]} vs ${nicknames[15]}`;

}
