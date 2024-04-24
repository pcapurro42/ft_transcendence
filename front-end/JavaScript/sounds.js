function alertSound(event)
{
	let loginSound = document.getElementById('alert_sound');

	loginSound.play();

	event.stopPropagation();
}

function hoverSound(event)
{
    let hoverSound = document.getElementById('hover_sound');

    hoverSound.play();

    event.stopPropagation();
}

function clickSound(event)
{
    let clickSound = document.getElementById('click_sound');

    clickSound.play();

    event.stopPropagation();
}

function closeSound(event)
{
	let closeSound = document.getElementById('close_sound');

    closeSound.play();

	event.stopPropagation();
}

function refreshSounds()
{
	let hover_sound = document.getElementById('hover_sound');
	let close_sound = document.getElementById('close_sound');
	let click_sound = document.getElementById('click_sound');
	let login_sound = document.getElementById('alert_sound');

	hover_sound.volume = sounds_volume / 100;
	close_sound.volume = sounds_volume / 100;
	click_sound.volume = sounds_volume / 100;
	login_sound.volume = sounds_volume / 100;

	let sound_slider_label = document.getElementById('sound_volume_slider_label');
    sound_slider_label.innerHTML = "(" + sounds_volume + "%)";
}

function initializeSounds()
{
	const simple_buttons = document.getElementsByClassName('btn-simple');

	for (let i = 0; i < simple_buttons.length; i++)
	{
    	simple_buttons[i].addEventListener('mouseover', hoverSound);
    	simple_buttons[i].addEventListener('click', clickSound);
	}

	let complex_buttons = document.getElementsByClassName('btn-complex');

	for (let i = 0; i != complex_buttons.length; i++)
		complex_buttons[i].addEventListener('click', closeSound);
}