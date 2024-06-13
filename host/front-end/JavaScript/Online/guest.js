function readHostMsg(event)
{
	let msg = event.data;
	// console.log(msg);
	if (msg.startsWith('lpy:')){
		game.left_player.y = +(msg.substring(4));
		return;
	}
	else if (msg.startsWith('bpos:')){
		game.ball.y = +msg.substring(5, msg.indexOf('/'));
		game.ball.x = +msg.substring(msg.indexOf('/') + 1, msg.indexOf('_'));
		return;
	}
	else if (msg.startsWith('score:')){
		game.scores[0] = +msg.substring(6, msg.indexOf('_'));
		game.scores[1] = +msg.substring(msg.indexOf('_') + 1);
	}
	else{
	switch (msg){
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
		nav.displayOneVsOneGameOnline();
	};

}


