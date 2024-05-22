document.getElementById("cpy_inv_code").onclick = cpyGameCode;

function cpyGameCode(){
	let content = document.getElementById("invitation_code");

	navigator.clipboard.writeText(content.value);
	displayStatusBarSuccess(getTranslation("Copy Success"));
}

function readGuestMsg(event){
	console.log(event.data);
	if (event.data === 'lobby ok'){
		document.getElementById('start_1v1_online').classList.remove('d-none');
	}
	if (event.data === 'arrowDown'){
		keys.guestDown = true;
	}
	if (event.data ==='arrowUp'){
		keys.guestUp = true;
	}
	if (event.data ==='noKeys'){
		keys.guestDown = false;
		keys.guestUp = false;
	}
}

function hostConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));

	data_channel.onerror = function(error) {
		handleDisconnection();
    	console.error("Data Channel Error:", error);
	};
	data_channel.onmessage = event => readGuestMsg(event);
	data_channel.send('Hello from host!');

	let	create_btn = document.getElementById("create_classic_lobby");
	create_btn.style.visibility = 'visible';
	create_btn.onclick = () => {
		// displayHostPage_classic();
		data_channel.send('lobby ok');
	}

	let launch_game = document.getElementById('start_1v1_online');
	launch_game.onclick = () => {
		data_channel.send("countdown start");
		displayHost1v1();
	}
}
