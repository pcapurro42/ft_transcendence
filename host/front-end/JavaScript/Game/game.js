// <<<<<<< GAME >>>>>>> //

    // < GENERAL > //

    theme = "dark";
    // theme = "light";

    // < OBJECT > //

    class Bar
    {
        constructor(game, width, height, x, y, speed, color)
        {
            this.game = game;

            this.width = width;
            this.height = height;

            this.x = x;
            this.y = y;

            this.speed = speed;

            this.color = color;
        }

        print()
        {
            this.game.infos.display.fillStyle = this.game.infos.bar_color;
            this.game.infos.display.fillRect(this.x, this.y, this.width, this.height);
        }

        moveUp()
        {
            if (this.y > 0)
            {
                displayBackground(this.game);
                this.y = this.y - this.speed;
                this.print();
            }
        }

        moveDown()
        {
            if (this.y + this.game.infos.bar_height < this.game.infos.game_height)
            {
                displayBackground(this.game);
                this.y = this.y + this.speed;
                this.print();
            }
        }

        getInfo()
        {
            return ([this.x, this.y]);
        }
    }

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
        left_score_x = (game.infos.game_width / 4) - game.infos.text_size / 2;
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
        
            game.left_player = new Bar(...Object.values(left_player_data));
            game.right_player = new Bar(...Object.values(right_player_data));
        }
        else
        {
            ;
        }
    }

    // < REFRESH > //

    function refreshPlayerPos(event, game1v1, game2v2)
    {
        let game;
        
        if (game1v1.enabled == true)
            game = game1v1;
        else
            game = game2v2;

        if (event.key == 'ArrowDown')
            game.left_player.moveDown();
        else if (event.key == 'ArrowUp')
            game.left_player.moveUp();

        refreshGameDisplay(game);

        // console.log(game.left_player.getInfo());
        // console.log(game.right_player.getInfo());
    }

    function refreshGameDisplay(game)
    {
        displayBackground(game);
        displayCenterBar(game);
        displayScores(game);

        game.left_player.print();
        game.right_player.print();
    }

    // < TRIGGER > //

    window.addEventListener('keydown', (event) => {
        refreshPlayerPos(event, game_1v1, game_2v2); });

// <<<<<<< 2V2 >>>>>>> //

    // < INFO STRUCT > //

    infos_2v2 = {
        canvas: null,
        /** @type {HTMLCanvasElement} */ display: null,

        game_width: 1100,
        game_height: 720,

        bar_speed: 10,

        bar_height: 100,
        bar_width: 15,

        text_size: 100,
        text_font: 'Arial',

        separator_height: 20,
        separator_width: 3,
        separator_space: 17,

        menu_color: null,
        background_color: null,
        bar_color: null
    }

    // < GAME STRUCT > //

    game_2v2 = {
        enabled: false,

        left_player_1: null,
        right_player_1: null,

        left_player_2: null,
        right_player_2: null,

        ball: null,

        scores: [0, 0],

        infos: infos_2v2
    }

// <<<<<<< 1V1 >>>>>>> //

    // < INFO STRUCT > //

    infos_1v1 = {
        canvas: null,
        /** @type {HTMLCanvasElement} */ display: null,

        game_width: 1100,
        game_height: 720,

        bar_speed: 10,

        bar_height: 100,
        bar_width: 15,

        text_size: 100,
        text_font: 'Arial',

        separator_height: 20,
        separator_width: 3,
        separator_space: 17,

        menu_color: null,
        background_color: null,
        bar_color: null
    }

    // < GAME STRUCT > //

    game_1v1 = {
        enabled: false,

        left_player: null,
        right_player: null,

        ball: null,

        scores: [0, 0],

        infos: infos_1v1
    }

    function initialize1v1(game)
    {
        initializeCanvas(game);
        initializeColors(game);

        initializePlayers(2, game);
        // initializeBall();
    }

    function start1v1(game)
    {
        refreshGameDisplay(game);

        // ...
    }

    // < MAIN CODE > //

    initialize1v1(game_1v1); // when page is loaded
    start1v1(game_1v1); // to start game