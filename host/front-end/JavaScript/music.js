function enableDisableMusic()
{
	let music = document.getElementById('mgs');
    let game_music = document.querySelectorAll('.game_music');
	let toggler = document.getElementById('music_toggle');

	music.loop = true;
	for (let i = 0; i < game_music.length; i++)
		game_music[i].loop = true;
	let allMuted = Array.from(game_music).every(audio => audio.muted);
	let allPaused = Array.from(game_music).every(audio => audio.paused);
	if (music.muted && allMuted)
	{
		music.muted = false;
		for (let i = 0; i < game_music.length; i++)
	    	game_music[i].muted = false;
		if (allPaused)
			music.play();
		localStorage.setItem('music', 'on');
		toggler.src = './Materials/images/menu/music-on.png';
	}
	else
	{
		for (let i = 0; i < game_music.length; i++)
	    	game_music[i].muted = true;
		music.muted = true;
		localStorage.setItem('music', 'off');
		toggler.src = './Materials/images/menu/music-off.png';
	}
}

function gameMusicSelector(){
	let selector = +document.getElementById('game_theme_btn_selector').value;
	switch (selector){
		case 1:
			localStorage.setItem('game_music', 'duel-theme')
			return document.getElementById('duel-theme');
		case 2:
			localStorage.setItem('game_music', 'sneaky-theme')
			return document.getElementById('sneaky-theme')
		case 3:
			localStorage.setItem('game_music', 'alert-theme');
			return document.getElementById('mgs3-alert-theme')
	}

}
function refreshMusics()
{
	let menu_theme = document.getElementById('mgs');
	let game_theme = document.querySelectorAll('.game_music');
	let credits_theme = document.getElementById('vid_credits');
	let music_toggler = document.getElementById('music_toggle_btn');

	if (localStorage.getItem('music') == null)
		localStorage.setItem('music', 'off');

	if (localStorage.getItem('music') == 'on'){
		music_toggler.src = './Materials/images/menu/music-on.png';
		menu_theme.muted = false;
		game_theme.forEach(element => {element.muted = false;});
		window.addEventListener('click', () =>{
			menu_theme.play();
		}, {once: true});
	}
	else{
		menu_theme.muted = true;
		music_toggler.src = './Materials/images/menu/music-off.png'

	}

	menu_theme.volume = music_volume / 100;
	for (let i = 0; i != game_theme.length; i++)
		game_theme[i].volume = music_volume / 100;
	credits_theme.volume = music_volume / 100;

	let music_slider_label = document.getElementById('music_volume_slider_label');
    music_slider_label.innerHTML = "(" + music_volume + "%)";

	updateMusicsSlider();
}

function updateMusicsSlider()
{
	let music_volume_slider = document.getElementById('music_volume_slider');
	music_volume_slider.value = music_volume;
	ARIASoundsSlider();
}

function initializeMusics()
{
	updateMusicsSlider();
}
