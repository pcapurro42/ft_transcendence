// <<<<<<< GAME >>>>>>> //

    // < GENERAL > //

    theme = "dark";
    // theme = "light";

    // < OBJECT > //

    class Ball
    {
        ;
    }

    // < DISPLAY > //

    function initializePlayers(player_nb, game)
    {
        if (player_nb == 2)
        {

        }
        else
        {
            left_player_data_1 = {
                game: game,

                id: 1,

                object_width: game.infos.bar_width,
                object_heigth : game.infos.bar_height,
        
                map_x: 0 + game.infos.bar_width,
                map_y: (game.infos.game_height / 4) - (game.infos.bar_height / 2),
        
                bar_speed: game.infos.bar_speed,
                color: "white"
            }
        
            right_player_data_1 = {
                game: game,

                id: 1,

                object_width: game.infos.bar_width,
                object_heigth : game.infos.bar_height,
        
                map_x: ((game.infos.game_width - game.infos.bar_width) - game.infos.bar_width),
                map_y: (game.infos.game_height / 4) - (game.infos.bar_height / 2),
        
                bar_speed: game.infos.bar_speed,
                color: "white"
            }

            left_player_data_2 = {
                game: game,

                id: 2,

                object_width: game.infos.bar_width,
                object_heigth : game.infos.bar_height,
        
                map_x: 0 + game.infos.bar_width,
                map_y: (game.infos.game_height / 4 + (game.infos.game_height / 2)) - (game.infos.bar_height / 2),
        
                bar_speed: game.infos.bar_speed,
                color: "white"
            }
        
            right_player_data_2 = {
                game: game,

                id: 2,

                object_width: game.infos.bar_width,
                object_heigth : game.infos.bar_height,
        
                map_x: ((game.infos.game_width - game.infos.bar_width) - game.infos.bar_width),
                map_y: (game.infos.game_height / 4 + (game.infos.game_height / 2)) - (game.infos.bar_height / 2),
        
                bar_speed: game.infos.bar_speed,
                color: "white"
            }
        
            game.left_player_1 = new Bar2v2(...Object.values(left_player_data_1));
            game.right_player_1 = new Bar2v2(...Object.values(right_player_data_1));
            game.left_player_2 = new Bar2v2(...Object.values(left_player_data_2));
            game.right_player_2 = new Bar2v2(...Object.values(right_player_data_2));
        }
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