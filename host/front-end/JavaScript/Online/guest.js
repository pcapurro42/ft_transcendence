function readHostMsg(event)
{
	let msg = event.data;

	if (msg === 'lobby ok')
	{
		document.getElementById("join_classic_lobby").style.visibility = 'visible';
		document.getElementById('answer_timeout').style.visibility = 'hidden';
	}
	else if (msg ==='normal')
		gameMode = 'normal';
	else if(msg ==='bonus')
		gameMode = 'bonus';
	else if (msg === 'go')
		displayOnline1v1();
	else if (msg.startsWith('lpy:'))
		game.left_player.y = +(msg.substring(4));
	else if (msg.startsWith('by:'))
		game.ball.y = +(msg.substring(3));
	else if (msg.startsWith('bx:'))
		game.ball.x = +(msg.substring(3));

}

async function guestConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success") + sessionStorage.getItem('opponent_login') +'!');
	data_channel.onerror = function(error) {
		handleDisconnection();
    	console.error("Data Channel Error:", error);
	};
	data_channel.onmessage = event => readHostMsg(event);
	data_channel.send('Hello from guest!');


	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = getTranslation("Waiting Lobby Creation") + sessionStorage.getItem('opponent_login') + '...';

	let	join_btn = document.getElementById("join_classic_lobby");
	join_btn.onclick = () => {
		pos = "right";
		role = "guest";
		data_channel.send('lobby ok')
		displayOneVsOneGameOnline();
	};

}


