function generateGameID(){
	let gameId = "";
	let Alphanum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	if (user_info && user_info.login){
		let username = user_info.login;
		gameId += username + '_';
	}

	for (let i = 0; i < 10; i++){
		gameId += Alphanum[Math.floor(Math.random() * 62)]
	}
	return gameId;
}
