function alertSound(event)
{
	let loginSound = document.getElementById('alert_sound');

	loginSound.volume = sounds_volume / 100;
	loginSound.play();

	event.stopPropagation();
}

function hoverSound(event)
{
    let hoverSound = document.getElementById('hover_sound');

	hoverSound.volume = sounds_volume / 100;
    hoverSound.play();

    event.stopPropagation();
}

function clickSound(event)
{
    let clickSound = document.getElementById('click_sound');

	clickSound.volume = sounds_volume / 100;
    clickSound.play();

    event.stopPropagation();
}

function closeSound(event)
{
	let closeSound = document.getElementById('close_sound');

	closeSound.volume = sounds_volume / 100;
    closeSound.play();

	event.stopPropagation();
}

function initializeSounds()
{
	const settingsModal = document.getElementById('settings_modal');
	settingsModal.addEventListener('hidden.bs.modal', closeSound);

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
