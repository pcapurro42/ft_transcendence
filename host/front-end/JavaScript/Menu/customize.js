// < CHANGERS > //

function changeGameMap()
{
    let new_game_map = document.getElementById('game_map_btn_selector');

    game_map = new_game_map.value;
    localStorage.setItem('game_map', game_map);
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

nav.displayCustomize = function()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let customize_menu = document.getElementById('customize_menu');
    let customize_back_btn = document.getElementById('customize_back_btn');

    customize_menu.style.display = 'block';
    customize_back_btn.style.display = 'block';

    main_menu.style.display = 'none';

    history.pushState(getTranslation('Customization'), null, getTranslation('/customize'));
    document.title = getTranslation('Customize');
}

nav.removeCustomize = function()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let customize_menu = document.getElementById('customize_menu');
    let customize_back_btn = document.getElementById('customize_back_btn');

    customize_menu.style.display = 'none';
    customize_back_btn.style.display = 'none';

    nav.displayMenu();
}

function showMapTooltip(){
	let img = document.getElementById('img_tooltip');
	if (this.value != 'none'){
		document.getElementById('map_tooltip').classList.remove('d-none');
		switch (this.value){
			case 'purple':
				img.src = "./Materials/images/tooltip_purple_map.png";
				break;
			case 'orange':
				img.src = "./Materials/images/tooltip_orange_map.png";
				break;
			case 'red':
				img.src = "./Materials/images/tooltip_red_map.png";
				break;
		}
	}
}

function removeMapTooltip(){
	document.getElementById('map_tooltip').classList.add('d-none');
}

// < INIT > //

function initializeCustomize()
{
    let game_music_selector = document.getElementById('game_theme_btn_selector');
    let game_map_selector = document.getElementById('game_map_btn_selector');
    switch(localStorage.getItem('game_music')){
        case null:
            game_music_selector.value = 1;
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
            game_map_selector.value = 'none';
            game_map = game_map_selector.value;
            break;
        case "purple":
            game_map_selector.value = "purple";
            game_map = game_map_selector.value;
            break;
        case "orange":
            game_map_selector.value = "orange";
            game_map = game_map_selector.value;
            break;
        case "red":
            game_map_selector.value = "red";
            game_map = game_map_selector.value;
            break;
    }


    setGameMusic();
}

