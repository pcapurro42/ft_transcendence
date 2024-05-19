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
	let sounds = document.querySelectorAll('.sounds');

	for (let i = 0; i < sounds.length; i++)
		sounds[i].volume = sounds_volume / 100;
	
	let sound_slider_label = document.getElementById('sound_volume_slider_label');
    sound_slider_label.innerHTML = "(" + sounds_volume + "%)";

	updateSoundsSlider();
}

function updateSoundsSlider()
{
	let sound_volume_slider = document.getElementById('sound_volume_slider');
	sound_volume_slider.value = sounds_volume;
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

	let alert_buttons = document.getElementsByClassName('btn-alert');

	for (let i = 0; i != alert_buttons.length; i++)
	{
		alert_buttons[i].addEventListener('mouseover', hoverSound);
		alert_buttons[i].addEventListener('click', alertSound);
	}

	updateSoundsSlider();
}
