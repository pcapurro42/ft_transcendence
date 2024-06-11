function enableDisableSounds()
{
    let sounds = document.querySelectorAll('.sounds');
	let toggler = this;
	let other_toggler;

	console.log(toggler);
	if (toggler == document.getElementById('sound_toggle_btn')){
		toggler = document.getElementById('sound_toggle');
		other_toggler = document.getElementById('game_sound_toggle');
	}
	else{
		toggler = document.getElementById('game_sound_toggle');
		other_toggler = document.getElementById('sound_toggle');
	}

	let allMuted = Array.from(sounds).every(sounds => sounds.muted);
	if (allMuted)
	{
		for (let i = 0; i < sounds.length; i++)
	    	sounds[i].muted = false;
		localStorage.setItem('sound', 'on');
		toggler.src = './Materials/images/sound-on.png';
		other_toggler.src = './Materials/images/sound-on.png'
	}
	else
	{
		for (let i = 0; i < sounds.length; i++)
	    	sounds[i].muted = true;
		localStorage.setItem('sound', 'off');
		toggler.src = './Materials/images/sound-off.png';
		other_toggler.src = './Materials/images/sound-off.png';
	}
}

function alertSound(event)
{
	let loginSound = document.getElementById('alert_sound');

	loginSound.play();

}

function hoverSound(event)
{
    let hoverSound = document.getElementById('hover_sound');

    hoverSound.play();

}

function clickSound(event)
{
    let clickSound = document.getElementById('click_sound');

    clickSound.play();

}

function closeSound(event)
{
	let closeSound = document.getElementById('close_sound');

    closeSound.play();

}

function refreshSounds()
{
	let sounds = document.querySelectorAll('.sounds');
	let sound_togglers = document.querySelectorAll('.sound_togglers')

	if (localStorage.getItem('sound') == null)
		localStorage.setItem('sound', 'off');

	if (localStorage.getItem('sound') == 'off'){
		for (let i = 0; i < sounds.length; i++)
			sounds[i].muted = true;
		let allMuted = Array.from(sounds).every(sounds => sounds.muted);
		sound_togglers[0].src = './Materials/images/sound-off.png';
		sound_togglers[1].src = './Materials/images/sound-off.png';
	}
	else{
		sound_togglers[0].src = './Materials/images/sound-on.png';
		sound_togglers[1].src = './Materials/images/sound-on.png';
	}

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
