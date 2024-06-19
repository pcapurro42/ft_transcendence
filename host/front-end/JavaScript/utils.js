function resetMusicAndSounds(){
	let sounds_and_musics = document.querySelectorAll('.sounds, .game_music');

	sounds_and_musics.forEach(element => {
		element.pause();
		element.currentTime = 0;
	});
}

async function hideSidebar(){
	let canvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('sideMenu'));
	canvas.hide();
}

function dropdownAddSvg(){
	let logout = document.getElementById('drop_logout');
	let custom = document.getElementById('drop_customize');
	let settings = document.getElementById('drop_settings');
	let stats = document.getElementById('drop_stats');
	let github_p = document.getElementById('pcap_git');
	let github_b = document.getElementById('bgales_git');
	let rgpd = document.getElementById('rgpd_btn');
	let light_switch = document.getElementById('light_switch');
	let letter_switch = document.getElementById('letter_switch');

	let logout_svg = '<img class="svg m-1" 	src="./Materials/images/menu/logout.svg" alt="">';
	let custom_svg = '<img class="svg m-1" src="./Materials/images/menu/customize.svg" alt="">';
	let settings_svg = '<img class="svg m-1" src="./Materials/images/menu/settings.svg" alt="">';
	let stats_svg = '<img class="svg m-1" src="./Materials/images/menu/stats.svg" alt="">';
	let github_svg = '<img class="svg foot m-1" src="./Materials/images/menu/github.svg" alt="">'
	let rgpd_svg = '<img class="svg foot m-1" src="./Materials/images/menu/rgpd.svg" alt="">'
	let moon_svg = '<img class="svg w-100 light_switch" src="./Materials/images/menu/dark.svg" alt="">';
	let sun_svg = '<img class="sun w-100 light_switch" src="./Materials/images/menu/light.svg" alt="">';

	logout.innerHTML = logout_svg + '  ' + logout.innerHTML;
	custom.innerHTML =  custom_svg + '  ' + custom.innerHTML;
	settings.innerHTML = settings_svg + '  ' + settings.innerHTML;
	stats.innerHTML = stats_svg + '  ' + stats.innerHTML;
	github_p.innerHTML = github_svg + "Pcapurro";
	github_b.innerHTML = github_svg + "Bgales";
	rgpd.innerHTML = rgpd_svg + getTranslation('Privacy policy');
	letter_switch.innerHTML = 'A';
	if (text_size == 'normal'){
    	letter_switch.setAttribute('aria-label', getTranslation('Small text'));
		letter_switch.style.backgroundColor = "";
		letter_switch.setAttribute('aria-pressed', 'false');
		if (high_contrast == false)
			letter_switch.classList.replace('text-white', 'text-black');
	}
	else{
		letter_switch.setAttribute('aria-label', getTranslation('Large text'))
		letter_switch.setAttribute('aria-pressed', 'true');
		letter_switch.style.backgroundColor = "#AD1400";
		letter_switch.classList.replace('text-black', 'text-white');
	}
	if (high_contrast == 'true'){
		light_switch.setAttribute('aria-pressed', 'true');
		light_switch.setAttribute('aria-label', getTranslation('Light Switch Off'));
		light_switch.innerHTML = moon_svg;
		light_switch.style.backgroundColor = '#AD1400';
		setImagesColor('white');
	}
	else{
		light_switch.setAttribute('aria-label', getTranslation('Light Switch On'));
		light_switch.setAttribute('aria-pressed', 'false');
		light_switch.style.backgroundColor = '';
		light_switch.innerHTML = sun_svg;
		setImagesColor('black');
	}
}

async function languageSwitch(lang){
	let dropdownMenu = document.getElementById('lang_switch_menu');
	dropdownMenu.style.minWidth = '0px';
	let fr = document.getElementById('sb_fr');
	let en = document.getElementById('sb_en');
	let es = document.getElementById('sb_es');

	if (lang == 'en'){
		document.getElementById('language_btn_selector').value = 'en';
		changeLanguage();
		en.setAttribute('aria-current', true);
		en.style.backgroundColor ='#AD1400'
		en.style.color = "white";

		fr.style.backgroundColor = '';
		high_contrast == 'true'	? fr.style.color = 'white' : fr.style.color = 'black';
		high_contrast == 'true'	? es.style.color = 'white' : fr.style.color = 'black';
		fr.removeAttribute('aria-current');
		es.removeAttribute('aria-current');
	}
	else if (lang == 'fr'){
		document.getElementById('language_btn_selector').value = 'fr';
		changeLanguage();
		fr.setAttribute('aria-current', true);
		fr.style.backgroundColor ='#AD1400';
		fr.style.color = "white";

		en.style.backgroundColor = '';
		es.style.backgroundColor = '';
		high_contrast == 'true'	? en.style.color = 'white' : en.style.color = 'black';
		high_contrast == 'true'	? es.style.color = 'white' : es.style.color = 'black';

		en.removeAttribute('aria-current');
		es.removeAttribute('aria-current');
	}
	else if (lang == 'es'){
		document.getElementById('language_btn_selector').value = 'es';
		changeLanguage();
		es.setAttribute('aria-current', true);
		es.style.backgroundColor ='#AD1400';
		es.style.color = "white";

		en.style.backgroundColor = '';
		fr.style.backgroundColor = '';
		high_contrast == 'true'	? en.style.color = 'white' : en.style.color = 'black';
		high_contrast == 'true'	? fr.style.color = 'white' : fr.style.color = 'black';
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
    t_invalid_alias.classList.add('d-none');

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

