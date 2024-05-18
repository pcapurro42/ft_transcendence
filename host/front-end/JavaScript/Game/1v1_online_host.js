function displayHost1v1()
{
    let start_btn = document.getElementById('start_1v1_online');
    start_btn.style.visibility = "hidden";

    let timer = document.getElementById('host_local_timer');
    timer.classList.remove('d-none');


    hostCountDown(3);
}

function removeHost1v1()
{
    let timer = document.getElementById('host_local_timer');
    timer.classList.add('d-none');


    let start_btn = document.getElementById('start_1v1_online');
    start_btn.innerHTML = getTranslation("Launch a game");
    start_btn.style.visibility = "visible";
}

function startHost1v1()
{
    if (game.isOver() == true || active == false)
    {
        game.refreshBackground();
        game.resetGame();
        removeLocal1v1();
        if (final == false)
            removeTournamentGame();
        else
            displayFinalWinner();
    }
    else
    {
        game.refreshDisplay();
        requestAnimationFrame(startLocal1v1);
    }
}

function hostCountDown(nb)
{
    let timer = document.getElementById('host_local_timer');

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
        startHost1v1();
        return ;
    }
    setTimeout(hostCountDown, 1000, --nb);
}
