// <<<<<<< GAME >>>>>>> //

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    KeyA: false,
    KeyQ: false
};

// < OBJECT > //

class Ball
{
    ;
}

// < TRIGGER > //

window.addEventListener('keydown', (event) => 
{
    if (mode != null)
    {
        if (mode == "local1v1")
        {
            if (event.key == 'ArrowUp' || keys.ArrowUp == true)
                game.game.right_player.moveUp(), keys.ArrowUp = true;
            else if (event.key == 'ArrowDown' || keys.ArrowDown == true)
                game.game.right_player.moveDown(), keys.ArrowDown = true;

            if (event.key == 'a' || keys.KeyA == true)
                game.game.left_player.moveUp(), keys.KeyA = true;
            else if (event.key == 'q' || keys.KeyQ == true)
                game.game.left_player.moveDown(), keys.KeyQ = true;

        }
        else if (mode == "local1v2")
        {
            ;
        }
    }
    game.refreshDisplay();
});

window.addEventListener('keyup', (event) => 
{
    if (event.key == 'ArrowUp')
        keys.ArrowUp = false;
    else if (event.key == 'ArrowDown')
        keys.ArrowDown = false;

    if (event.key == 'a')
        keys.KeyA = false;
    else if (event.key == 'q')
        keys.KeyQ = false;
});