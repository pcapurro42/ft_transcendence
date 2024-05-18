function displayGuest1v1()
{
    let timer = document.getElementById('guest_local_timer');
    timer.classList.remove('d-none');

    guestCountDown(3);
}

function removeGuest1v1()
{
    let timer = document.getElementById('guest_local_timer');
    timer.classList.add('d-none');

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
        startGuest1v1();
        return ;
    }
    setTimeout(guestCountDown, 1000, --nb);
}
