function enableDisableMusic()
{
	let music = document.getElementById('mgs');
	let img = document.getElementById('music_toggle');

    music.loop = true;

	if (music.muted)
	{
		music.muted = false;
		music.play();
		img.src = './Materials/images/music-on.png';
	}
	else
	{
		music.muted = true;
		img.src = './Materials/images/music-off.png';
	}
}

function refreshMusics()
{
	let menu_theme = document.getElementById('mgs');
	let credits_theme = document.getElementById('vid_credits');

	menu_theme.volume = music_volume / 100;
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