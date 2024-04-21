document.getElementById('soundtoggle').onclick = enableDisableMusic;

function enableDisableMusic()
{
	let music = document.getElementById('mgs');
	let img = document.getElementById('soundtoggle')

	if (music.muted)
	{
		music.muted = false;
        console.log(music_volume);
        music.volume = music_volume / 100;
		music.play();
		img.src = './Materials/images/sound-on.png';
	}
	else
	{
		music.muted = true;
		img.src = './Materials/images/sound-off.png';
	}
}