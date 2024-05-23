document.getElementById("cpy_inv_code").onclick = cpyGameCode;

function cpyGameCode(){
	let content = document.getElementById("invitation_code");

	navigator.clipboard.writeText(content.value);
	displayStatusBarSuccess(getTranslation("Copy Success"));
}

function readGuestMsg(event){
	console.log(event.data);
	if (event.data === 'ready'){
		document.getElementById('start_1v1_online').classList.remove('d-none');
	}
	if (event.data === 'up'){
		game.right_player.y--;
	}
	if (event.data ==='down'){
		game.right_player.y++;
	}
}

function hostConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success") + sessionStorage.getItem('opponent_login') +'!');
	document.getElementById('create_lobby_msg').innerHTML = getTranslation('Please Create Lobby') + sessionStorage.getItem('opponent_login') + '.'

	data_channel.onerror = function(error) {
		handleDisconnection();
    	console.error("Data Channel Error:", error);
	};
	data_channel.onmessage = event => readGuestMsg(event);
	data_channel.send('Hello from host!');

	let	create_btn = document.getElementById("create_classic_lobby");
	create_btn.style.visibility = 'visible';
	create_btn.onclick = () => {
		pos = "left";
		role = "host";
		if (gameMode == "normal")
			data_channel.send('normal');
		else
			data_channel.send("bonus");
		data_channel.send('lobby ok');
		console.log("displaying game page...");
		data_channel.send('displaying game page...')
		displayOneVsOneGameOnline();
	}
}
