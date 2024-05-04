// < ... > //

function displayClassicMenu()
{
    let classic_menu = document.getElementById('classic_menu');
    classic_menu.style.display = "block";
    let create_sub_menu = document.getElementById('create_classic_menu');
    create_sub_menu.style.display = 'none';

    let join_sub_menu = document.getElementById('join_classic_menu');
    join_sub_menu.style.display = 'none';

    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = 'none';
}

function removeClassicMenu()
{
    let classic_menu = document.getElementById('classic_menu');
    classic_menu.style.display = "none";
    displayPlay();
}


async function displayClassicCreateGame(){
    let classic_menu = document.getElementById('classic_menu');
    classic_menu.style.display = "none";

    let create_classic_menu = document.getElementById('create_classic_menu');
    create_classic_menu.style.display = 'block';
    offerGenerator();

}

async function displayClassicJoinGame(){
    let classic_menu = document.getElementById('classic_menu');
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

function displayTournamentForm(){
    // if (sessionStorage.getItem('alias'))
    //     return;
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
