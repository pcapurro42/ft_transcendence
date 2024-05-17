// < CHANGERS > //

function changeGameMusic()
{
    let new_game_music = document.getElementById('game_theme_btn_selector');

    game_music = new_game_music.value;
    localStorage.setItem('game_music', game_music);
}

function changeGameMap()
{
    let new_game_map = document.getElementById('game_map_btn_selector');

    game_map = new_game_map.value;
    localStorage.setItem('game_map', game_map);
}

function setGameMap()
{
    if (game_map == "none")
        document.getElementById('game_map_btn_selector').selectedIndex = 0;
    else if (game_map == "...")
        document.getElementById('game_map_btn_selector').selectedIndex = 1;
}

function setGameMusic()
{
    if (game_music == "none")
        document.getElementById('game_theme_btn_selector').selectedIndex = 0;
    else if (game_music == "MGS 1 - Duel")
        document.getElementById('game_theme_btn_selector').selectedIndex = 1;
    else if (game_music == "...")
        document.getElementById('game_theme_btn_selector').selectedIndex = 2;
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

function showMapTooltip(){
	let img = document.getElementById('img_tooltip');
	if (this.value != 'none'){
		document.getElementById('map_tooltip').classList.remove('d-none');
		switch (this.value){
			case '1':
				img.src = "./Materials/images/tooltip_green_map.png";
				break;
			case '2':
				img.src = "./Materials/images/tooltip_yellow_map.png";
				break;
			case '3':
				img.src = "./Materials/images/tooltip_orange_map.png";
				break;
		}

	}
}

function removeMapTooltip(){
	document.getElementById('map_tooltip').classList.add('d-none');
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

    if (localStorage.getItem('game_map') == null)
        localStorage.setItem('game_map', 'none'), game_map = 'none'
    else
        game_map = localStorage.getItem('game_map');

    setGameMap();
    setGameMusic();
}

