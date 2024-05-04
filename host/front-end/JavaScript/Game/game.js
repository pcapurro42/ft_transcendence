// <<<<<<< GAME >>>>>>> //

    // < GENERAL > //

    theme = "dark";
    // theme = "light";

    mode = "2v2";

    // < OBJECT > //

    class Ball
    {
        ;
    }

    // < INIT > //

    function initializeCanvas(game)
    {
        game.enabled = true;

        game.infos.canvas = document.getElementById('game');
        game.infos.display = game.infos.canvas.getContext('2d');
        
        game.infos.canvas.width = game.infos.game_width;
        game.infos.canvas.height = game.infos.game_height;
    }

    function initializeColors(game)
    {
        if (theme == "dark")
        {
            game.infos.menu_color = 'white';
            game.infos.background_color = 'black';
            game.infos.bar_color = 'white';
        }
        else
        {
            game.infos.menu_color = 'black';
            game.infos.background_color = 'white';
            game.infos.bar_color = 'black';
        }
    }

    // < DISPLAY > //

    function displayBackground(game)
    {
        game.infos.display.fillStyle = game.infos.background_color;
        game.infos.display.fillRect(0, 0, game.infos.game_width, game.infos.game_height);
    }

    function displayCenterBar(game)
    {
        let x_bar_center = (game.infos.game_width / 2) - (game.infos.separator_width / 2);
        let nb = ~~(game.infos.game_height / (game.infos.separator_height + game.infos.separator_space));

        game.infos.display.fillStyle = game.infos.menu_color;
        for (let value = 0; value != nb; value++)
        {
            game.infos.display.fillRect(x_bar_center, ((game.infos.separator_height * value) + game.infos.separator_space * (value + 1)), game.infos.separator_width, game.infos.separator_height);
        }
    }

    function displayScores(game)
    {
        score_y = game.infos.game_height / 6;
        left_score_x = (game.infos.game_width / 4) - game.infos.text_size / 4;
        right_score_x = (game.infos.game_width - game.infos.game_width / 4) - game.infos.text_size / 4;

        game.infos.display.font = game.infos.text_size + "px " + game.infos.text_font;
        game.infos.display.fillText(game.scores[0], left_score_x, score_y);
        game.infos.display.fillText(game.scores[1], right_score_x, score_y);
    }

    function initializePlayers(player_nb, game)
    {
        if (player_nb == 2)
        {
            left_player_data = {
                game: game,

                object_width: game.infos.bar_width,
                object_heigth : game.infos.bar_height,
        
                map_x: 0 + game.infos.bar_width,
                map_y: ((game.infos.game_height / 2) - game.infos.bar_height / 2),
        
                bar_speed: game.infos.bar_speed,
                color: "white"
            }
        
            right_player_data = {
                game: game,

                object_width: game.infos.bar_width,
                object_heigth : game.infos.bar_height,
        
                map_x: ((game.infos.game_width - game.infos.bar_width) - game.infos.bar_width),
                map_y: ((game.infos.game_height / 2) - game.infos.bar_height / 2),
        
                bar_speed: game.infos.bar_speed,
                color: "white"
            }
        
            game.left_player = new Bar1v1(...Object.values(left_player_data));
            game.right_player = new Bar1v1(...Object.values(right_player_data));
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

    function initializeBall()
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

    function refreshPlayersDisplay(game)
    {
        if (game.player_nb == 2)
        {
            game.left_player.print();
            game.right_player.print();
        }
        else
        {
            game.left_player_1.print();
            game.left_player_2.print();
            game.right_player_1.print();
            game.right_player_2.print();
        }
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
        if (mode == "1v1")
            refreshPlayerPos(event, game_1v1);
        else
            refreshPlayerPos(event, game_2v2);
    });