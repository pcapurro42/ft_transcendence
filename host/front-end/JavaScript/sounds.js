function enableDisableSounds()
{
    let sounds = document.querySelectorAll('.sounds');
	let toggler = document.getElementById('sound_toggle');

	let allMuted = Array.from(sounds).every(sounds => sounds.muted);
	if (allMuted)
	{
		for (let i = 0; i < sounds.length; i++)
	    	sounds[i].muted = false;
		localStorage.setItem('sound', 'on');
		toggler.src = './Materials/images/menu/sound-on.png';
	}
	else
	{
		for (let i = 0; i < sounds.length; i++)
	    	sounds[i].muted = true;
		localStorage.setItem('sound', 'off');
		toggler.src = './Materials/images/menu/sound-off.png';
	}
}

function alertSound(event)
{
	document.getElementById('alert_sound').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));
}

function hoverSound(event)
{
    document.getElementById('hover_sound').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));
}

function clickSound(event)
{
    document.getElementById('click_sound').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));
}

function closeSound(event)
{
    document.getElementById('close_sound').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));
}

function refreshSounds()
{
	let sounds = document.querySelectorAll('.sounds');
	let sound_toggler = document.getElementById('sound_toggle');

	if (localStorage.getItem('sound') == null)
		localStorage.setItem('sound', 'off');

	if (localStorage.getItem('sound') == 'off'){
		for (let i = 0; i < sounds.length; i++)
			sounds[i].muted = true;
		sound_toggler.src = './Materials/images/menu/sound-off.png';
	}
	else{
		sound_toggler.src = './Materials/images/menu/sound-on.png';
	}

	for (let i = 0; i < sounds.length; i++)
		sounds[i].volume = sounds_volume / 100;

	let sound_slider_label = document.getElementById('sound_volume_slider_label');
    sound_slider_label.innerHTML = "(" + sounds_volume + "%)";

	updateSoundsSlider();
}

function updateSoundsSlider()
{
	document.getElementById('sound_volume_slider').value = sounds_volume;
	ARIASoundsSlider();
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
