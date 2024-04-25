// < ... > //

function displayGameMenu()
{
    let game_menu = document.getElementById('play_game_menu');
    game_menu.style.display = "block";
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = 'none';
}

function removeGameMenu()
{
    let game_menu = document.getElementById('play_game_menu');
    game_menu.style.display = "none";
    displayPlay();
}

function displayTournamentMenu()
{
    let game_menu = document.getElementById('play_tournament_menu');
    game_menu.style.display = "block";
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = 'none';
}

function removeTournamentMenu()
{
    let tournament_menu = document.getElementById('play_tournament_menu');
    tournament_menu.style.display = "none";
    displayPlay();
}

// < DISPLAY/REMOVE > //

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