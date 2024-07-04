document.getElementById("cpy_inv_code").onclick = cpyGameCode;

function cpyGameCode(){
	navigator.clipboard.writeText(document.getElementById("invitation_code").value);
	displayStatusBarSuccess(getTranslation("Copy Success"));
}

function readGuestMsg(event){
	let msg = event.data;
	if (msg.startsWith('rpy:')){
		game.right_player.y = +(msg.substring(4));
		return;
	}
	else if (msg == 'ping'){
		ping = true;
		return;
	}
	else if (msg === 'ready'){
		document.getElementById('start_1v1_online').classList.remove('d-none');
		return;
	}
	else if (msg === 'go'){
		displayOnline1v1();
		return;
	}
	console.error(getTranslation('Unauthorized Data Channel'));
	handleDisconnection();
}

function hostConnectionHandler(){
	stop_ping = false;
	isDisplayModal = true;
	displayStatusBarSuccess(getTranslation("Peer Connection Success") + localStorage.getItem('opponent_login') +'!');
	document.getElementById('create_lobby_msg').textContent = getTranslation('Please Create Lobby') + localStorage.getItem('opponent_login') + '.'
	data_channel.onmessage = event => readGuestMsg(event);
	pingGuest();

	document.getElementById("create_classic_lobby").style.visibility = 'visible';

	document.getElementById("create_classic_lobby").onclick = async () => {
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
	try{
		if (stop_ping)
			return;
		data_channel.send('ping');
		await sleep(900);
		pingGuest();
	}
	catch(error){
		console.error(getTranslation("Disconnected"));
		return;
	}
}

async function checkHostPing(){
	try{
		if (ping == true){
			ping = false
			await sleep(1100);
			checkHostPing();
			return;
		}
		handleDisconnection();
	}
	catch(error){
		console.error(getTranslation("Disconnected"));
		return;
	}
}
