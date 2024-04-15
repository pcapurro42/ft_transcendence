document.getElementById('soundtoggle').onclick = audio;

function audio()
{
	let audio = document.getElementById('mgs');
	let img = document.getElementById('soundtoggle')

	if (audio.muted)
	{
		audio.muted = false;
		audio.play();
		img.src = './ressources/images/sound-on.png';
	}
	else
	{
		audio.muted = true;
		img.src = './ressources/images/sound-off.png';
	}
}