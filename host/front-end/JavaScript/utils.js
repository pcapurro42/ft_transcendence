function getIceConfig(){
	let iceConf = {
		iceTransportPolicy : 'all',
		bundlePolicy : 'max-compat',
	}
	return iceConf;
}

function tournamentResetBlocks(){
	let ro16 = document.getElementById('Roundof16')
	ro16.style.visibility = 'hidden';
	ro16.style.opacity = '1';
	ro16.style.transition = 'opacity 0s';

	let rounds = document.querySelectorAll('.rounds_state');

	for (let i = 0; i < rounds.length; i++){
		rounds[i].style.visibility = '';
		rounds[i].style.transition = 'opacity 0s';
		rounds[i].style.opacity = '1';
	}

	let game_nbr = document.querySelectorAll('.game_nbr')

	for (let i = 0; i < game_nbr.length; i++){
		game_nbr[i].style.visibility = '';
		game_nbr[i].style.transition = 'opacity 0s';
		game_nbr[i].style.opacity = '1';

	}

	let players = document.querySelectorAll('.nicks');

	for (let i = 0; i < players.length; i++){
		players[i].style.visibility = '';
		players[i].style.transition = 'opacity 0s';
		players[i].style.opacity = '1';
		players[i].innerHTML = '';
	}
}

function freeInputAndForms(){
	let t_invalid_alias = document.getElementById('invalid-alias');
    t_invalid_alias.style.display = 'none';

    let t_duplicate = document.getElementById('duplicate_nick');
    t_duplicate.style.display = 'none';

    let input = document.getElementById('alias_input');
    input.value = '';

	let paste_peer_answer = document.getElementById('paste_peer_answer');
	paste_peer_answer.value = ' ';

	let paste_peer_offer = document.getElementById('paste_peer_offer');
	paste_peer_offer.value = ' ';

	let paste_answer = document.getElementById('peer_answer');
	paste_answer.value = ' ';

	let paste_offer = document.getElementById('peer_offer');
	paste_offer.value = ' ';
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

function generateGameID(){
	let gameId = "";
	let Alphanum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	if (user_info && user_info.login){
		let username = user_info.login;
		gameId += username + '_';
	}

	while(gameId.length < 15){
		gameId += Alphanum[Math.floor(Math.random() * 62)]
	}
	return gameId;
}

function displayStatusBarSuccess(message){
	let statusBar = document.getElementById('statusBarSuccess');
	statusBar.style.display="block";
	statusBar.style.transition = 'opacity 0.3s';
	statusBar.style.opacity = '0';
	statusBar.innerHTML = message;
	setTimeout(() => {
		statusBar.style.opacity = '1';
	}, 100);


	setTimeout(() =>{
		statusBar.style.opacity = '0';
		setTimeout(() => {
			statusBar.style.display ='none';
		}, 300);
	}, 3000);
}

function displayStatusBarAlert(message){
	let statusBar = document.getElementById('statusBarAlert');
	statusBar.style.display="block";
	statusBar.style.transition = 'opacity 0.3s';
	statusBar.style.opacity = '0';
	statusBar.innerHTML = message;
	setTimeout(() => {
		statusBar.style.opacity = '1';
	}, 100);


	setTimeout(() =>{
		statusBar.style.opacity = '0';
		setTimeout(() => {
			statusBar.style.display ='none';
		}, 300);
	}, 3000);
}

function displayStatusBarWarning(message){
	let statusBar = document.getElementById('statusBarWarning');
	statusBar.style.display="block";
	statusBar.style.transition = 'opacity 0.3s';
	statusBar.style.opacity = '0';
	statusBar.innerHTML = message;
	setTimeout(() => {
		statusBar.style.opacity = '1';
	}, 100);


	setTimeout(() =>{
		statusBar.style.opacity = '0';
		setTimeout(() => {
			statusBar.style.display ='none';
		}, 300);
	}, 4500);
}

