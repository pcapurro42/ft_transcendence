function stopKeysAnim(){
	 let keys_anim = document.querySelectorAll('.keysup, .keysdown');
    (keys_anim).forEach(element => {
		element.getAnimations().forEach	(animation => animation.pause());
		element.style.display = 'none';
		element.style.visibility ='hidden';
		element.style.opacity = '0';
	});
}

function resumeKeysAnim(){
	 let keys_anim = document.querySelectorAll('.keysup, .keysdown');
    (keys_anim).forEach(element => {
		element.getAnimations().forEach(animation => animation.play());
		element.style.display = 'block';
		element.style.visibility ='visible';
		element.style.opacity = '1';

	});
}

function getIceConfig(){
	let iceConf = {
		iceTransportPolicy : 'all',
		bundlePolicy : 'max-compat',
	}
	return iceConf;
}

function freeInputAndForms(){
	let t_invalid_alias = document.getElementById('invalid-alias');
    t_invalid_alias.style.display = 'none';

    let t_duplicate = document.getElementById('duplicate_nick');
    t_duplicate.style.display = 'none';

    let input = document.getElementById('alias_input');
    input.value = '';

	let paste_inv_code = document.getElementById('paste_inv_code');
	paste_inv_code.value = '';

	let inv_code = document.getElementById('invitation_code');
	inv_code.value = '';

	let create_lobby_msg = document.getElementById('create_lobby_msg');
	create_lobby_msg.innerHTML = '';
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

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

function displayStatusBarSuccess(message){
	let statusBar = document.getElementById('statusBarSuccess');
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

function displayStatusBarAlert(message){
	let statusBar = document.getElementById('statusBarAlert');
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

function displayStatusBarWarning(message){
	let statusBar = document.getElementById('statusBarWarning');
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
	}, 4500);
}

