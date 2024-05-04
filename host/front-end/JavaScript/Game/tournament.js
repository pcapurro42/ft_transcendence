function displayTournamentPage()
{
    game_toolbar = document.getElementById('game_toolbar');
    game_page_tournament = document.getElementById('game_page_tournament');
    main_menu_page = document.getElementById('main_menu_page');
    main_menu_page.style.display = "none";
    game_toolbar.style.display = "block";
    game_page_tournament.style.display = "block";
}

function tournament()
{
    displayTournamentPage();
}