function displayGamePage()
{
    let game_page = document.getElementById('game_page');
    game_page.style.display = "block";
}

function displayCreateGame()
{
    removeMenu();
    displayGamePage();
}

function displayJoinGame()
{
    removeMenu();
    displayGamePage();
}