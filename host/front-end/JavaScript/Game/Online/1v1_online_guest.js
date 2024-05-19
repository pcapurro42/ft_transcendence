function displayGuest1v1()
{
    let timer = document.getElementById('guest_local_timer');
    timer.classList.remove('d-none');
    type = 'online_guest';
    guestCountDown(3);
}

function removeGuest1v1()
{
    let timer = document.getElementById('guest_local_timer');
    timer.classList.add('d-none');

    let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();

    menu_music.play();
    game_music.pause();

}

function startGuest1v1()
{
    if (game.isOver() == true || active == false)
    {
        game.refreshBackground();
        game.resetGame();
        removeGuest1v1();
    }
    else
    {
        game.refreshDisplay();
        requestAnimationFrame(startGuest1v1);
    }
}

function guestCountDown(nb)
{
    let timer = document.getElementById('guest_local_timer');
    let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();

    if (nb == 3){
        document.getElementById('3_sound').play();
        timer.innerHTML = "3";
    }
    else if (nb == 2){
        document.getElementById('2_sound').play();
        timer.innerHTML = "2";
    }
    else if (nb == 1){
        document.getElementById('1_sound').play();
        timer.innerHTML = "1";
    }
    else if (nb == 0)
        timer.innerHTML = getTranslation("Go!");
    else if (nb == -1)
    {
        timer.style.display = "none";
        active = true;
        menu_music.pause();
        game_music.play();
        startGuest1v1();
        document.addEventListener('keydown', moveListener);
        document.addEventListener('keyup', stopMoveListener);
        return ;
    }
    setTimeout(guestCountDown, 1000, --nb);
}
