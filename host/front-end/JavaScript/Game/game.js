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
    let timer;
    let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();

    if (players_nb == 1)
        timer = document.getElementById('1v1_online_timer');
    else if (players_nb == 2)
        timer = document.getElementById('1v1_local_timer');
    else
        timer = document.getElementById('2v1_local_timer');

    timer.classList.remove("d-none");

    if (nb == 3){
        menu_music.pause();
        document.getElementById('3_sound').play();
        timer.innerHTML = "3";
        game.refreshBackground();
    }
    else if (nb == 2){
        document.getElementById('2_sound').play();
        timer.innerHTML = "2";
        game.refreshScores();
    }
    else if (nb == 1){
        document.getElementById('1_sound').play();
        timer.innerHTML = "1";
        game.refreshPlayers();
    }
    else if (nb == 0)
        timer.innerHTML = getTranslation("Go!")
    else if (nb == -1)
    {
        timer.classList.add("d-none");
        game_music.play();
        active = true;
        if (players_nb == 1)
            startOnline1v1();
        else if (players_nb == 2)
            startLocal1v1();
        else
            startLocal1v2();
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
};

// < TRIGGER > //

window.addEventListener('keydown', (event) =>
{
    if (players_nb != 0 && players_nb != null)
    {
        if (players_nb == 1)
        {
            if (role == "host")
            {
                if (event.key == 'e')
                    keys.KeyE = true;
                else if (event.key == 'd')
                    keys.KeyD = true;
            }
            else
            {
                event.preventDefault();

                if (event.key == 'ArrowUp')
                    keys.ArrowUp = true
                else if (event.key == 'ArrowDown')
                    keys.ArrowDown = true
            }
        }
        if (players_nb == 2)
        {
            event.preventDefault();

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
            event.preventDefault();

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
    }
});

window.addEventListener('keyup', (event) =>
{
    if (players_nb == 1)
    {
        if (role == "host")
        {
            if (event.key == 'e')
                keys.KeyE = false;
            else if (event.key == 'd')
                keys.KeyD = false;
        }
        else
        {
            if (event.key == 'ArrowUp')
                keys.ArrowUp = false
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = false
        }
    }
    else
    {
        if (event.key == 'ArrowUp')
            keys.ArrowUp = false;
        else if (event.key == 'ArrowDown')
            keys.ArrowDown = false;

        if (event.key == 'e')
            keys.KeyE = false;
        else if (event.key == 'd')
            keys.KeyD = false;

        if (players_nb == 3)
        {
            if (event.key == 'u')
                keys.KeyU = false;
            else if (event.key == 'j')
                keys.KeyJ = false;
        }
    }
});
