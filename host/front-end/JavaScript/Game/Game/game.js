// <<<<<<< GAME >>>>>>> //

    // < OBJECT > //

    class Ball
    {
        ;
    }

    // < REFRESH > //

    function refreshPlayerPos(event, game)
    {
        refreshGameDisplay(game);

        if (game.player_nb == 2)
        {
            if (event.key == 'ArrowDown')
                game.left_player.moveDown();
            else if (event.key == 'ArrowUp')
                game.left_player.moveUp();
        }
        else
        {
            if (event.key == 'ArrowDown')
                game.left_player_1.moveDown();
            else if (event.key == 'ArrowUp')
                game.left_player_1.moveUp();
        }

        refreshPlayersDisplay(game);
    }

    function refreshGameDisplay(game)
    {
        displayBackground(game);
        displayCenterBar(game);
        displayScores(game);
    }

    // < TRIGGER > //

    window.addEventListener('keydown', (event) => 
    {
        // if (mode == "1v1")
            // refreshPlayerPos(event, game_1v1);
        // else
            // refreshPlayerPos(event, game_2v2);
    });