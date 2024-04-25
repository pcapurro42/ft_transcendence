function displayGamePage()
{
    let game_top_bar = document.getElementById('game_page');
    game_top_bar.style.display = "block";
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