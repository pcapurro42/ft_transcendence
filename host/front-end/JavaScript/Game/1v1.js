// <<<<<<< 1V1 >>>>>>> //

    // < OBJECT > //

    class Bar1v1
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
                this.y = this.y - this.speed;
                this.print();
            }
        }

        moveDown()
        {
            if (this.y + this.game.infos.bar_height < this.game.infos.game_height)
            {
                this.y = this.y + this.speed;
                this.print();
            }
        }

        getInfo()
        {
            return ([this.x, this.y]);
        }
    }

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

    function displayPlayers1v1(game)
    {
        game.left_player.print();
        game.right_player.print();
    }

    function start1v1(game)
    {
        refreshGameDisplay(game);
        displayPlayers1v1(game);

        // ...
    }

    // < MAIN CODE > //

    initialize1v1(game_1v1); // when page is loaded
    start1v1(game_1v1); // to start game