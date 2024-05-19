function displayHost1v1()
{
    let start_btn = document.getElementById('start_1v1_online');
    start_btn.style.visibility = "hidden";

    let timer = document.getElementById('host_local_timer');
    timer.classList.remove('d-none');

    type = 'online_host';
    hostCountDown(3);
}

function removeHost1v1()
{
    let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();

    menu_music.play();
    game_music.pause();

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
        removeHost1v1();
    }
    else
    {
        game.refreshDisplay();
        requestAnimationFrame(startHost1v1);
    }
}

function hostCountDown(nb)
{
    let timer = document.getElementById('host_local_timer');
    let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();


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
        menu_music.pause();
        game_music.play();
        startHost1v1();
        return ;
    }
    setTimeout(hostCountDown, 1000, --nb);
}
