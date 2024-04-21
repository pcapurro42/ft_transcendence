document.getElementById('play_btn').onclick = displayPlay;
// document.getElementById('play_back_btn').onclick = removePlay;

function displayPlay()
{
    let main_menu = document.getElementById('main_menu_buttons');
    let play_menu = document.getElementById('play_menu');

    play_menu.style.display = 'block';
    main_menu.style.display = 'none';
}

function removePlay()
{
    let main_menu = document.getElementById('main_menu_buttons');
    let play_menu = document.getElementById('play_menu');

    play_menu.style.display = 'none';
    main_menu.style.display = 'block';
}