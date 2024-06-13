async function dropdownAddSvg(){
	let logout = document.getElementById('drop_logout');
	let custom = document.getElementById('drop_customize');
	let settings = document.getElementById('drop_settings');
	let stats = document.getElementById('drop_stats');
	let github_p = document.getElementById('pcap_git');
	let github_b = document.getElementById('bgales_git');
	let rgpd = document.getElementById('rgpd_btn');
	let light_switch = document.getElementById('light_switch');
	let letter_switch = document.getElementById('letter_switch');

	let logout_svg = '<img class="svg m-1" 	src="./Materials/images/logout.svg" alt="Icon">';
	let custom_svg = '<img class="svg m-1" src="./Materials/images/customize.svg" alt="Icon">';
	let settings_svg = '<img class="svg m-1" src="./Materials/images/settings.svg" alt="Icon">';
	let stats_svg = '<img class="svg m-1" src="./Materials/images/stats.svg" alt="Icon">';
	let github_svg = '<img class="svg foot m-1" src="./Materials/images/github.svg" alt="Icon">'
	let rgpd_svg = '<img class="svg foot m-1" src="./Materials/images/rgpd.svg" alt="Icon">'
	let moon_svg = '<img class="svg moon foot" src="./Materials/images/dark.svg" alt="Icon">';
	let sun_svg = '<img class="sun" src="./Materials/images/light.svg" alt="Icon">';


	logout.innerHTML = logout_svg + '  ' + logout.innerHTML;
	custom.innerHTML =  custom_svg + '  ' + custom.innerHTML;
	settings.innerHTML = settings_svg + '  ' + settings.innerHTML;
	stats.innerHTML = stats_svg + '  ' + stats.innerHTML;
	github_p.innerHTML = github_svg + "Pcapurro";
	github_b.innerHTML = github_svg + "Bgales";
	rgpd.innerHTML = rgpd_svg + getTranslation('Privacy policy');

	if (high_contrast == 'true'){
		light_switch.innerHTML = moon_svg;
		light_switch.style.backgroundColor = '#AD1400';
		setImagesColor('white');
	}
	else{
		light_switch.style.backgroundColor = '';
		light_switch.innerHTML = sun_svg;
		setImagesColor('black');
	}
	if (text_size == 'normal'){
		letter_switch.innerHTML = 'a';
		letter_switch.style.backgroundColor = "";
		if (high_contrast == false)
			letter_switch.classList.replace('text-white', 'text-black');
	}
	else{
		letter_switch.innerHTML = 'A';
		letter_switch.style.backgroundColor = "#AD1400";
		letter_switch.classList.replace('text-black', 'text-white');
	}

}

function addBeforeUnloadWarning() {
    window.addEventListener('beforeunload', handleBeforeUnload);
	window.addEventListener('unload', handleUnload);
}

function removeBeforeUnloadWarning() {
    window.removeEventListener('beforeunload', handleBeforeUnload);
	window.removeEventListener('unload', handleUnload);

}

function handleBeforeUnload(event){
	event.preventDefault();
	return getTranslation('Refresh Warning');
}

function handleUnload(){
	localStorage.setItem('no_confirmation', 'true');
}

function backBtnColor_toBlack(){
	this.style.transition = '0.15s';
	this.classList.replace("text-white", "text-black");
}

function backBtnColor_toWhite(){
	this.style.transition = '0.15s';
	this.classList.replace("text-black", "text-white");
}

function removeChangeBackColor(){

}

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
	let t_invalid_alias = document.getElementById('invalid-alias-msg');
    t_invalid_alias.style.display = 'none';

	let t_cross = document.querySelectorAll('.invalid-feedback');
	t_cross.forEach(element => {
		element.style.display = 'none';
	});
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

