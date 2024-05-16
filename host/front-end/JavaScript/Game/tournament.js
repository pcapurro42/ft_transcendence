function displayTournamentGame()
{
    let start_btn = document.getElementById('t_start_game');
    start_btn.style.display = "none";

    let timer = document.getElementById('tournament_timer');
    timer.style.display = "block";

	type = 'tournament';
    initializeLocal1v1();
   	t_displayCountDown(3);
}

function removeTournamentGame()
{
    let timer = document.getElementById('tournament_timer');
    timer.style.display = "none";

    let next_game_btn = document.getElementById('t_next_game');
    next_game_btn.style.display = "block";
}

function t_displayCountDown(nb)
{
    let timer = document.getElementById('tournament_timer');

    if (nb == 3)
        timer.innerHTML = "3";
    else if (nb == 2)
        timer.innerHTML = "2";
    else if (nb == 1)
        timer.innerHTML = "1";
    else if (nb == 0)
        timer.innerHTML = getTranslation("Go!")
    else if (nb == -1)
    {
        timer.style.display = "none";
        active = true;
        startLocal1v1();
        return ;
    }
    setTimeout(t_displayCountDown, 1000, --nb);
}

function t_LeftWin(){
    let player_left = document.getElementById('nick_reminder');
    player_left.innerHTML = player_left.innerHTML.substring(0, player_left.innerHTML.indexOf(' ')) + " won the game!";
    gameWinner = player_left.innerHTML.substring(0, player_left.innerHTML.indexOf(' '))
}

function t_RightWin(){
    let player_right = document.getElementById('nick_reminder');
    player_right.innerHTML = player_right.innerHTML.substring(player_right.innerHTML.indexOf(' ', player_right.innerHTML.indexOf(' ') + 1) + 1) + " won the game!";
    gameWinner = player_right.innerHTML.substring(0, player_right.innerHTML.indexOf(' '));
}
