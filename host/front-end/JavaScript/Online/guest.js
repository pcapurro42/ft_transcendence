function readHostMsg(event){
	console.log(event.data);

	if (event.data === 'lobby ok'){
		document.getElementById("join_classic_lobby").style.visibility = 'visible';
		 document.getElementById('answer_timeout').style.visibility = 'hidden';
	}

	if (event.data === 'countdown start')
		displayGuest1v1();
}

async function guestConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));
	data_channel.onerror = function(error) {
		handleDisconnection();
    	console.error("Data Channel Error:", error);
	};
	data_channel.onmessage = event => readHostMsg(event);
	data_channel.send('Hello from guest!');


	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = getTranslation("Waiting Lobby Creation");

	let	join_btn = document.getElementById("join_classic_lobby");
	join_btn.onclick = () => {
		displayGuestPage_classic();
		data_channel.send('lobby ok')
	};

}

function moveListener(event){

	if (event.key === 'ArrowDown'){
		data_channel.send('arrowDown');
	}
	else if (event.key === 'ArrowUp'){
		data_channel.send('arrowUp');
	}
}

function stopMoveListener(event){

	if (event.key === 'ArrowDown' || event.key === 'ArrowUp')
		data_channel.send('noKeys');
}
