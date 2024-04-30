// < ... > //

function displayClassicMenu()
{
    let classic_menu = document.getElementById('play_classic_menu');
    classic_menu.style.display = "block";
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = 'none';
}

function removeClassicMenu()
{
    let classic_menu = document.getElementById('play_classic_menu');
    classic_menu.style.display = "none";
    displayPlay();
}


function displayClassicCreateGame(){
    let classic_menu = document.getElementById('play_classic_menu');
    classic_menu.style.display = "none";

    let create_classic_menu = document.getElementById('create_classic_menu');
    create_classic_menu.style.display = 'block';
    let gameId = document.getElementById('game_id');
    gameId.innerHTML = generateGameID();
}

function displayTournamentMenu(event)
{
    let tournament_menu = document.getElementById('play_tournament_menu');
    let sub_menu = document.getElementById('form_alias');
    let play_menu = document.getElementById('play_menu');
    sub_menu.style.display = "none";
    play_menu.style.display = "none";
    tournament_menu.style.display = "block";

    event.preventDefault(); //prevent the back button from form_alias to take us back to main menu instead of tournament menu
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
