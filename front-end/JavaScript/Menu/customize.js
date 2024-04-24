// < SETERS > //

function setGameMusci()
{
    ;
}

function setGameMap()
{
    ;
}

// < CHANGERS > //

function changeGameMusic()
{
    let new_game_music = document.getElementById('game_theme_btn_selector');
    game_music = new_game_music.value;
}

function changeGameMap()
{
    let new_game_map = document.getElementById('game_map_btn_selector');
    game_map = new_game_map.value;
}

// < DISPLAY/REMOVE > //

function displayCustomize()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let customize_menu = document.getElementById('customize_menu');
    let customize_back_btn = document.getElementById('customize_back_btn');

    customize_menu.style.display = 'block';
    customize_back_btn.style.display = 'block';
    
    main_menu.style.display = 'none';
}

function removeCustomize()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let customize_menu = document.getElementById('customize_menu');
    let customize_back_btn = document.getElementById('customize_back_btn');

    customize_menu.style.display = 'none';
    customize_back_btn.style.display = 'none';
    
    main_menu.style.display = 'block';
}

// < INIT > //

function initializeCustomize()
{
    if (localStorage.getItem('game_music') == null)
        localStorage.setItem('game_music', 'none'), game_music = 'none'
    else
        game_music = localStorage.getItem('game_music');
    setGameMusic(game_music);

    if (localStorage.getItem('game_map') == null)
        localStorage.setItem('game_map', 'none'), game_map = 'none'
    else
        game_map = localStorage.getItem('game_map');
    setGameMap(game_map);
}