function readHostMsg(event){
	console.log(event.data);
	let msg = event.data;
	if (msg === 'lobby ok'){
		document.getElementById("join_classic_lobby").style.visibility = 'visible';
		 document.getElementById('answer_timeout').style.visibility = 'hidden';
	}
	else if (msg ==='normal')
		gameMode = 'normal';
	else if(msg ==='bonus')
		gameMode = 'bonus';
	else if (msg === 'countdown start')
		displayGuest1v1();
	else if (msg.startsWith('rpy:')){
		game.right_player.y = +(msg.substring(4))
		console.log(game.right_player.y);
	}
	else if (msg.startsWith('lpy:')){
		game.left_player.y = +(msg.substring(4))
		console.log(game.left_player.y);
	}
	else if (msg.startsWith('bx:')){
		game.ball.x = +(msg.substring(3))
		console.log(game.left_player.x);
	}
	else if (msg.startsWith('by:')){
		game.ball.y = +(msg.substring(3))
		console.log(game.ball.y);
	}
	else if (msg.startsWith('lscore:')){
		game.score[0] = +(msg.substring(7));
		console.log(game.score[0]);
	}
	else if (msg.startsWith('rscore:')){
		game.score[1] = +(msg.substring(7));
		console.log(game.score[0]);
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
		// displayGuestPage_classic();
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
