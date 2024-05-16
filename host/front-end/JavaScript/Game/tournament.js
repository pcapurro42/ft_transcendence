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
