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

function displayTournamentMenu(event)
{
    let tournament_menu = document.getElementById('play_tournament_menu');
    let sub_menu = document.getElementById('form_alias');
    let play_menu = document.getElementById('play_menu');
    sub_menu.style.display = "none";
    play_menu.style.display = "none";
    tournament_menu.style.display = "block";

    event.preventDefault(); //empeche le bouton back de form_alias de revenir au menu principal plutot qu'au menu des tournois.
}

function removeTournamentMenu()
{
    let tournament_menu = document.getElementById('play_tournament_menu');
    tournament_menu.style.display = "none";
    displayPlay();
}

function displayTournamentForm(){
    // if (sessionStorage.getItem('alias'))
    //     return;
    let tournament_menu = document.getElementById('play_tournament_menu');
    tournament_menu.style.display = 'none';
    let form = document.getElementById('form_alias');
	form.style.display = 'block';

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
