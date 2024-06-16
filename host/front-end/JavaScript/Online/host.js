document.getElementById("cpy_inv_code").onclick = cpyGameCode;

function cpyGameCode(){
	let content = document.getElementById("invitation_code");
	let cpy_btn = document.getElementById("cpy_inv_code");
	navigator.clipboard.writeText(content.value);
	displayStatusBarSuccess(getTranslation("Copy Success"));
}

function readGuestMsg(event){
	let msg = event.data;
	if (msg.startsWith('rpy:'))
		game.right_player.y = +(msg.substring(4));
	else if (msg == 'ping')
		ping = true;
	else if (msg === 'ready'){
		document.getElementById('start_1v1_online').classList.remove('d-none');
	}
	else if (msg === 'go')
		displayOnline1v1();
}

function hostConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success") + localStorage.getItem('opponent_login') +'!');
	document.getElementById('create_lobby_msg').innerHTML = getTranslation('Please Create Lobby') + localStorage.getItem('opponent_login') + '.'
	data_channel.onmessage = event => readGuestMsg(event);
	pingGuest();

	let	create_btn = document.getElementById("create_classic_lobby");
	create_btn.style.visibility = 'visible';
	create_btn.onclick = async () => {
		pos = "left";
		role = "host";
		await sleep(100);
		try{
			if (gameMode == "normal")
				data_channel.send('normal');
			else
				data_channel.send("bonus");
			data_channel.send('lobby ok');
		}
		catch (error){
			handleDisconnection();
		}
		nav.displayOneVsOneGameOnline();
	}
	checkHostPing()
}

async function pingGuest(){
	if (stop_ping)
		return;
	data_channel.send('ping');
	await sleep(900);
	pingGuest();
}

async function checkHostPing(){
	if (ping == true){
		ping = false
		await sleep(1100);
		checkHostPing();
		return;
	}
	handleDisconnection();
}
