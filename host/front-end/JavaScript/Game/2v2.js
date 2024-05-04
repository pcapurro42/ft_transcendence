// <<<<<<< 2V2 >>>>>>> //

    // < OBJECT > //

    class Bar2v2
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
            // if (this.y > 0)
            // {
            //     this.y = this.y - this.speed;
            //     this.print();
            // }
        }

        moveDown()
        {
            // if (this.y + this.game.infos.bar_height < this.game.infos.game_height)
            // {
            //     this.y = this.y + this.speed;
            //     this.print();
            // }
        }

        getInfo()
        {
            return ([this.x, this.y]);
        }
    }

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

    function initialize2v2(game)
    {
        initializeCanvas(game);
        initializeColors(game);

        initializePlayers(4, game);
        initializeBall(game);

        refreshGameDisplay(game);
        // displayPlayers2v2(game);
    }

    function displayPlayers2v2(game)
    {
        game.left_player_1.print();
        game.right_player_1.print();
        game.left_player_2.print();
        game.right_player_2.print();
    }

    function start2v2(game)
    {
        // ...
    }

    // < MAIN CODE > //

    initialize2v2(game_2v2); // when page is loaded
    // start2v2(game_2v2); // to start game