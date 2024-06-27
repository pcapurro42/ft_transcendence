function readHostMsg(event)
{
	let msg = event.data;
	let time;

	if (msg.startsWith('lpy:')){
		game.left_player.y = +(msg.substring(4));
		return;
	}
	else if (msg.startsWith('bpos:')){
		game.ball.y = +msg.substring(5, msg.indexOf('/'));
		game.ball.x = +msg.substring(msg.indexOf('/') + 1);
		return;
	}
	else if (msg.startsWith('score_h:')){
		time = (getActualTimeSeconds() - game.start_time);
		game.scores[0] = +msg.substring(8);
		game.scores_time.push([time, "1"]);
		game.end_time = time;
		return;
	}
	else if (msg.startsWith('score_g:')){
		time = (getActualTimeSeconds() - game.start_time);
		game.scores[1] = +msg.substring(8);
		game.scores_time.push([time, "2"]);
		game.end_time = time;
		return;
	}
	else if (msg.startsWith('b1:')){
		game.bonus_one.x = +msg.substring(3, msg.indexOf('_'));
		game.bonus_one.y = +msg.substring(msg.indexOf('_') + 1);
		return;
	}
	else if (msg.startsWith('b2:')){
		game.bonus_two.x = +msg.substring(3, msg.indexOf('_'));
		game.bonus_two.y = +msg.substring(msg.indexOf('_') + 1);
		return;
	}
	else if (msg.startsWith('b-type:')){
		bonus_type = +msg.substring(7, msg.indexOf('_'));
		let bonus_name = +msg.substring(msg.indexOf('_') + 1);
		bonus_name == 1 ? game.bonus_one.applyPlayerBonus() : game.bonus_two.applyPlayerBonus();
		return;
	}
	else if (msg == 'b1_dead'){
		game.bonus_one.alive = false;
		return;
	}
	else if (msg == 'b2_dead'){
		game.bonus_two.alive = false;
		return;
	}
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
	console.error(getTranslation('Unauthorized Data Channel'));
	handleDisconnection();
}

async function guestConnectionHandler(){
	stop_ping = false;
	isDisplayModal = true;
	displayStatusBarSuccess(getTranslation("Peer Connection Success") + localStorage.getItem('opponent_login') +'!');
	data_channel.onmessage = event => readHostMsg(event);
	pingHost();
	document.getElementById('answer_timeout').textContent = getTranslation("Waiting Lobby Creation") + localStorage.getItem('opponent_login') + '...';

	document.getElementById("join_classic_lobby").onclick = () => {
		pos = "right";
		role = "guest";
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


