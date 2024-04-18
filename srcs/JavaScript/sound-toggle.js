document.getElementById('soundtoggle').onclick = audio;

function audio()
{
	let audio = document.getElementById('mgs');
	let img = document.getElementById('soundtoggle')

	if (audio.muted)
	{
		audio.muted = false;
		audio.play();
		img.src = './Materials/images/sound-on.png';
	}
	else
	{
		audio.muted = true;
		img.src = './Materials/images/sound-off.png';
	}
}

function hoverSound(event) {
    let audio = document.getElementById('mgs');
    let hoverSound = document.getElementById('hover_sound');

    if (!audio.muted) {
        hoverSound.play();
    }

    event.stopPropagation();
}

function clickSound(event) {
    let audio = document.getElementById('mgs');
    let clickSound = document.getElementById('click_sound');

    if (!audio.muted) {
        clickSound.play();
    }

    event.stopPropagation();
}

const buttons = document.getElementsByClassName('btn');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseover', hoverSound);
    buttons[i].addEventListener('click', clickSound);
}

const settingsModal = document.getElementById('settings_modal');
const closeSound = document.getElementById('close_sound');

settingsModal.addEventListener('hidden.bs.modal', function () {
    let audio = document.getElementById('mgs');
    if (!audio.muted)
        closeSound.play();
});
