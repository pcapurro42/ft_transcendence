function displayGamePage_ai()
{
    game_toolbar = document.getElementById('game_toolbar');
    game_page_ai = document.getElementById('game_page_ai');
    main_menu_page = document.getElementById('main_menu_page');
    main_menu_page.style.display = "none";
    game_toolbar.style.display = "block";
    game_page_ai.style.display = "block";
}

function ai()
{
    displayGamePage_ai();
}
