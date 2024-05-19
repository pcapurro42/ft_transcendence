// <<<<<<< GAME >>>>>>> //

// < OBJECTS UTILS > //

function generateNumber(limit)
{
    let value = Math.floor(Math.random() * limit) + 1;
    return (value);
}

function getRandomBallDirection()
{
    value = generateNumber(4);

    if (value == 1)
        return (45);
    else if (value == 2)
        return (135);

    else if (value == 3)
        return (-45);
    else if (value == 4)
        return (-135);
}

// < TIMER > //

function displayCountDown(nb)
{
    let timer = document.getElementById('1v1_local_timer');
    let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();

    if (nb == 3){
        menu_music.pause();
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
        timer.innerHTML = getTranslation("Go!")
    else if (nb == -1)
    {
        timer.style.display = "none";
        active = true;
        game_music.play();
        startLocal1v1();
        return ;
    }
    setTimeout(displayCountDown, 1000, --nb);
}

// < KEYS > //

let keys = {
    KeyE: false,
    KeyD: false,

    KeyU: false,
    KeyJ: false,

    ArrowUp: false,
    ArrowDown: false,

    guestUp: false,
    guestDown: false,
};

// < TRIGGER > //

window.addEventListener('keydown', (event) =>
{
    if (players_nb != 0 && players_nb != null)
    {
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown')
            event.preventDefault();

        if (players_nb == 2)
        {
            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;

            if (event.key == 'e')
                keys.KeyE = true;
            else if (event.key == 'd')
                keys.KeyD = true;
        }
        else if (players_nb == 3)
        {
            if (event.key == 'e')
                keys.KeyE = true;
            else if (event.key == 'd')
                keys.KeyD = true;

            if (event.key == 'u')
                keys.KeyU = true;
            else if (event.key == 'j')
                keys.KeyJ = true;

            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;
        }
        else if (players_nb == 3)
        {
            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;
        }
    }
});

window.addEventListener('keyup', (event) =>
{
    if (event.key == 'ArrowUp')
        keys.ArrowUp = false;
    else if (event.key == 'ArrowDown')
        keys.ArrowDown = false;

    if (event.key == 'e')
        keys.KeyE = false;
    else if (event.key == 'd')
        keys.KeyD = false;

    if (event.key == 'u')
        keys.KeyU = false;
    else if (event.key == 'j')
        keys.KeyJ = false;
});
