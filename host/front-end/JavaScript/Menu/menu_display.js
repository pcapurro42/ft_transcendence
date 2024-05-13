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

    resetConnection();
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

    freeInputAndForms();

    let submit_btn = document.getElementById('submit_answer');
    submit_btn.removeAttribute('disabled');

    let create_btn = document.getElementById('create_classic_lobby');
    create_btn.style.visibility = 'hidden';

    resetConnection();
    offerGenerator();
}

async function displayOneVsOneOnlineJoinGame(){
    let classic_menu = document.getElementById('one_vs_one_online_choice_menu');
    classic_menu.style.display = "none";

    let create_classic_menu = document.getElementById('join_classic_menu');
    create_classic_menu.style.display = 'block';

    let countdown = document.getElementById('answer_timeout');
    countdown.style.display = 'none';
    clearInterval(timeoutInterval);

    let submit_btn = document.getElementById('submit_offer');
    submit_btn.removeAttribute('disabled');

    freeInputAndForms();

     let join_btn = document.getElementById('join_classic_lobby');
    join_btn.style.visibility = 'hidden';

    resetConnection();
}

function removeTournamentForm(event)
{
    event.preventDefault();
    freeInputAndForms();
    let tournament_nickname_menu = document.getElementById('tournament_nickname_menu');
	tournament_nickname_menu.style.display = 'none';

    let form_alias =  document.getElementById('form_alias');
    form_alias.style.display = 'none';



    let t_setup = document.getElementById('tournament_setup');
    t_setup.style.display = "block";
}

function displayTournamentForm(value){
    let t_setup = document.getElementById('tournament_setup');
    t_setup.style.display = "none";

    let tournament_nickname_menu = document.getElementById('tournament_nickname_menu');
	tournament_nickname_menu.style.display = 'block';

    let form_alias =  document.getElementById('form_alias');
    form_alias.style.display = 'block';

    let i = formDuplicator(value);
    document.getElementById('submit_alias').onclick = function(event){
        parse_alias(i, event)
    };

}

function displayTournamentSetup(){
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = "none";
    let tournament_setup = document.getElementById('tournament_setup');
	tournament_setup.style.display = 'block';

}

function removeTournamentSetup()
{
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = "block";
    let tournament_setup = document.getElementById('tournament_setup');
	tournament_setup.style.display = 'none';
    freeInputAndForms();
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

    one_vs_two_local_page = document.getElementById('one_vs_two_local_page');
    one_vs_two_local_page.style.display = "block";

    initializeLocal1v2();
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
