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
    closeSound.play();
});