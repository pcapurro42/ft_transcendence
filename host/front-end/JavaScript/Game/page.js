function displayGamePage_ai()
{
    let game_page = document.getElementById('game_page_ai');
    game_page.style.display = "block";

    removeMenu();
}

function displayGamePage_classic()
{
    let game_page = document.getElementById('game_page_classic');
    game_page.style.display = "block";

    let peer_offer = document.getElementById('peer_offer');
    let g_id_reminder = document.getElementById('game_id_reminder');
    g_id_reminder.value = peer_offer.value;
    removeMenu();
}

function displayGamePage_tournament()
{
    let game_page = document.getElementById('game_page_tournament');
    game_page.style.display = "block";

    removeMenu();
}
