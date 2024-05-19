function enableDisableMusic()
{
	let music = document.getElementById('mgs');
    let game_music = document.querySelectorAll('.game_music');
	let toggler = this;
	let other_toggler;

	if (toggler == document.getElementById('music_toggle'))
		other_toggler = document.getElementById('game_sounds_toggle');
	else
		other_toggler = document.getElementById('music_toggle');

	music.loop = true;
	for (let i = 0; i < game_music.length; i++)
		game_music[i].loop = true;
	let allMuted = Array.from(game_music).every(audio => audio.muted);
	if (music.muted && allMuted)
	{
		music.muted = false;
		for (let i = 0; i < game_music.length; i++)
	    	game_music[i].muted = false;
		music.play();
		toggler.src = './Materials/images/music-on.png';
		other_toggler.src = './Materials/images/music-on.png'
	}
	else
	{
		for (let i = 0; i < game_music.length; i++)
	    	game_music[i].muted = true;
		music.muted = true;
		toggler.src = './Materials/images/music-off.png';
		other_toggler.src = './Materials/images/music-off.png'
	}
}

function gameMusicSelector(){
	let selector = +document.getElementById('game_theme_btn_selector').value;
	switch (selector){
		case 1:
			return document.getElementById('duel-theme');
		case 2:
			return document.getElementById('sneaky-theme')
		case 3:
			return document.getElementById('mgs3-alert-theme')
	}

}
function refreshMusics()
{
	let menu_theme = document.getElementById('mgs');
	let game_theme = gameMusicSelector();
	let credits_theme = document.getElementById('vid_credits');

	menu_theme.volume = music_volume / 100;
	game_theme.volume = music_volume / 100;
	credits_theme.volume = music_volume / 100;

	let music_slider_label = document.getElementById('music_volume_slider_label');
    music_slider_label.innerHTML = "(" + music_volume + "%)";

	updateMusicsSlider();
}

function updateMusicsSlider()
{
	let music_volume_slider = document.getElementById('music_volume_slider');
	music_volume_slider.value = music_volume;
}

function initializeMusics()
{
	updateMusicsSlider();
}
