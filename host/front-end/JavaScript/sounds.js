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

const buttons = document.getElementsByClassName('btn');

for (let i = 0; i < buttons.length; i++)
{
    buttons[i].addEventListener('mouseover', hoverSound);
    buttons[i].addEventListener('click', clickSound);
}

const settingsModal = document.getElementById('settings_modal');
const closeSound = document.getElementById('close_sound');

settingsModal.addEventListener('hidden.bs.modal', function ()
{
	closeSound.volume = sounds_volume / 100;
    closeSound.play();
});