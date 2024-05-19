// < CHANGERS > //

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
			case 'green':
				img.src = "./Materials/images/tooltip_green_map.png";
				break;
			case 'yellow':
				img.src = "./Materials/images/tooltip_yellow_map.png";
				break;
			case 'orange':
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
    let game_music_selector = document.getElementById('game_theme_btn_selector');
    let game_map_selector = document.getElementById('game_map_btn_selector');
    switch(localStorage.getItem('game_music')){
        case null:
            game_music_selector.value = null;
            break;
        case "duel-theme":
            game_music_selector.value = 1;
            break;
        case "sneaky-theme":
            game_music_selector.value = 2;
            break;
        case "alert-theme":
            game_music_selector.value = 3;
            break;
    }


    switch (localStorage.getItem('game_map')){
          case null:
            game_map_selector.value = 0;
            game_map = game_map_selector.value;
            break;
        case "green":
            game_map_selector.value = "green";
            game_map = game_map_selector.value;
            break;
        case "yellow":
            game_map_selector.value = "yellow";
            game_map = game_map_selector.value;
            break;
        case "orange":
            game_map_selector.value = "orange";
            game_map = game_map_selector.value;
            break;
        case "mgs1":
            game_map_selector.value = "mgs1";
            game_map = game_map_selector.value;
            break;
        case "mgs2":
            game_map_selector.value = "mgs2";
            game_map = game_map_selector.value;
            break;
        case "mgs3":
            game_map_selector.value = "mgs3";
            game_map = game_map_selector.value;
            break;
    }


    setGameMap();
    setGameMusic();
}

