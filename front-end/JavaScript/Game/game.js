function displayGameTopBar()
{
    let game_top_bar = document.getElementById('game_toolbar');
    game_top_bar.style.display = "block";
}

function displayCreateGame()
{
    removeMenu();
    displayGameTopBar();
}

function displayJoinGame()
{
    removeMenu();
    displayGameTopBar();
}