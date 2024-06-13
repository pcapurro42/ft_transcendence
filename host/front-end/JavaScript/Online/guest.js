function readHostMsg(event)
{
	let msg = event.data;
	if (msg.startsWith('lpy:')){
		game.left_player.y = +(msg.substring(4));
		return;
	}
	else if (msg.startsWith('bpos:')){
		game.ball.y = +msg.substring(5, msg.indexOf('/'));
		game.ball.x = +msg.substring(msg.indexOf('/') + 1, msg.indexOf('_'));
		return;
	}
	else if (msg.startsWith('score_h:')){
		game.scores[0] = +msg.substring(8);
	}
	else if (msg.startsWith('score_g:'))
		game.scores[1] = +msg.substring(8);

	else{
		switch (msg){
			case 'ping':
				ping = true;
				return;
			case 'lobby ok' :
				document.getElementById("join_classic_lobby").style.visibility = 'visible';
				document.getElementById('answer_timeout').	style.visibility = 'hidden';
				return;
			case 'normal':
				gameMode = 'normal';
				return;
			case 'bonus':
				gameMode = 'bonus';
				return;
			case 'go':
				displayOnline1v1();
				return;
		}
	}

}

async function guestConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success") + sessionStorage.getItem('opponent_login') +'!');
	data_channel.onmessage = event => readHostMsg(event);
	pingHost();
	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = getTranslation("Waiting Lobby Creation") + sessionStorage.getItem('opponent_login') + '...';

	let	join_btn = document.getElementById("join_classic_lobby");
	join_btn.onclick = () => {
		pos = "right";
		role = "guest";
		data_channel.send('lobby ok')
		nav.displayOneVsOneGameOnline();
	};
	checkGuestPing()
}

async function pingHost(){
	if (stop_ping)
		return;
	data_channel.send('ping');
	await sleep(900);
	pingHost();
}
async function checkGuestPing(){
	if (ping == true){
		ping = false
		await sleep(1100);
		checkGuestPing();
		return;
	}
	handleDisconnection();
}


