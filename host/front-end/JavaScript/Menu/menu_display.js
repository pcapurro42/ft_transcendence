// < ... > //

function displayClassicChoice()
{
    let classic_buttons = document.getElementById('classic_buttons');
    classic_buttons.style.display = "block";
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = 'none';
}

function removeClassicChoice()
{
    let classic_menu = document.getElementById('classic_buttons');
    classic_menu.style.display = "none";
    displayPlay();
}

function displayOneVsOneChoice()
{
    removeClassicChoice();

    let classic_menu = document.getElementById('one_vs_one_online_choice_menu');
    classic_menu.style.display = "block";
    let create_sub_menu = document.getElementById('create_classic_menu');
    create_sub_menu.style.display = 'none';

    let join_sub_menu = document.getElementById('join_classic_menu');
    join_sub_menu.style.display = 'none';

    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = 'none';
}

function removeOneVsOneChoice()
{
    displayClassicChoice();

    one_vs_one_online_choice_menu = document.getElementById('one_vs_one_online_choice_menu');
    one_vs_one_online_choice_menu.style.display = "none";
}

async function displayOneVsOneOnlineCreateGame(){
    let classic_menu = document.getElementById('one_vs_one_online_choice_menu');
    classic_menu.style.display = "none";

    let create_classic_menu = document.getElementById('create_classic_menu');
    create_classic_menu.style.display = 'block';
    offerGenerator();

}

async function displayOneVsOneOnlineJoinGame(){
    let classic_menu = document.getElementById('one_vs_one_online_choice_menu');
    classic_menu.style.display = "none";

    let create_classic_menu = document.getElementById('join_classic_menu');
    create_classic_menu.style.display = 'block';
    let peerOffer = document.getElementById('peer_offer');
    try{
        peerOffer.value = await offerGenerator();
    }
    catch (error){
        peerOffer.value = `ERROR: ${error}`;
    }

}

function removeTournamentForm()
{
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = "block";
    let tournament_nickname_menu = document.getElementById('tournament_nickname_menu');
	tournament_nickname_menu.style.display = 'none';
}

function displayTournamentForm(){
    // if (sessionStorage.getItem('alias'))
    //     return;
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = "none";
    let tournament_nickname_menu = document.getElementById('form_alias');
	tournament_nickname_menu.style.display = 'block';

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


function displayTwoVsOneGameLocal()
{
    main_menu_page = document.getElementById('main_menu_page');
    main_menu_page.style.display = "none";
    game_toolbar = document.getElementById('game_toolbar');
    game_toolbar.style.display = "block";

    one_vs_two_local_game = document.getElementById('one_vs_two_local_game');
    one_vs_two_local_game.style.display = "block";

    initializeLocal2v1();
}

function displayOneVsOneGameLocal()
{
    main_menu_page = document.getElementById('main_menu_page');
    main_menu_page.style.display = "none";
    game_toolbar = document.getElementById('game_toolbar');
    game_toolbar.style.display = "block";

    one_vs_one_local_page = document.getElementById('one_vs_one_local_page');
    one_vs_one_local_page.style.display = "block";

    initializeLocal1v1();
}