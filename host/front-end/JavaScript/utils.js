function generateGameID(){
	let gameId = "";
	let Alphanum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	if (user_info && user_info.login){
		let username = user_info.login;
		gameId += username + '_';
	}

	while(gameId.length < 15){
		gameId += Alphanum[Math.floor(Math.random() * 62)]
	}
	return gameId;
}

function displayStatusBar(message){
	let statusBar = document.getElementById('statusBar');
	statusBar.style.display="block";
	statusBar.style.transition = 'opacity 0.3s';
	statusBar.style.opacity = '0';
	statusBar.innerHTML = message;
	setTimeout(() => {
		statusBar.style.opacity = '1';
	}, 100);


	setTimeout(() =>{
		statusBar.style.opacity = '0';
		setTimeout(() => {
			statusBar.style.display ='none';
		}, 300);
	}, 3000);
}
