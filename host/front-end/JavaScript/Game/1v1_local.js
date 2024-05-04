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
        this.game.infos.display.fillStyle = this.color;
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

class LocalGame1v1
{
    constructor(infos, game)
    {   
        this.game = game;
        this.infos = infos;
    }

    initialize()
    {
        this.game.enabled = true;

        // canvas creation

        this.game.infos.canvas = document.getElementById('one_vs_one_local_game');
        this.game.infos.display = this.game.infos.canvas.getContext('2d');
        
        this.game.infos.canvas.width = this.game.infos.game_width;
        this.game.infos.canvas.height = this.game.infos.game_height;

        // players creation

        let left_player_data = {
            game: this.game,

            object_width: this.game.infos.bar_width,
            object_heigth : this.game.infos.bar_height,
    
            map_x: 0 + this.game.infos.bar_width,
            map_y: ((this.game.infos.game_height / 2) - this.game.infos.bar_height / 2),
    
            bar_speed: this.game.infos.bar_speed,
            color: this.infos.bar_color
        }
    
        let right_player_data = {
            game: this.game,

            object_width: this.game.infos.bar_width,
            object_heigth : this.game.infos.bar_height,
    
            map_x: ((this.game.infos.game_width - this.game.infos.bar_width) - this.game.infos.bar_width),
            map_y: ((this.game.infos.game_height / 2) - this.game.infos.bar_height / 2),
    
            bar_speed: this.game.infos.bar_speed,
            color: this.infos.bar_color
        }
    
        this.game.left_player = new Bar1v1(...Object.values(left_player_data));
        this.game.right_player = new Bar1v1(...Object.values(right_player_data));

        // ball creation

        this.ball = new Ball();
    }

    refreshDisplay()
    {
        // background display

        this.game.infos.display.fillStyle = this.game.infos.background_color;
        this.game.infos.display.fillRect(0, 0, this.game.infos.game_width, this.game.infos.game_height);

        // center bar display

        let x_bar_center = (this.game.infos.game_width / 2) - (this.game.infos.separator_width / 2);
        let nb = ~~(this.game.infos.game_height / (this.game.infos.separator_height + this.game.infos.separator_space));

        this.game.infos.display.fillStyle = this.game.infos.menu_color;
        for (let value = 0; value != nb; value++)
        {
            this.game.infos.display.fillRect(x_bar_center, ((this.game.infos.separator_height * value) + this.game.infos.separator_space * (value + 1)), this.game.infos.separator_width, this.game.infos.separator_height);
        }

        // score display

        let score_y = this.game.infos.game_height / 6;
        let left_score_x = (this.game.infos.game_width / 4) - this.game.infos.text_size / 4;
        let right_score_x = (this.game.infos.game_width - this.game.infos.game_width / 4) - this.game.infos.text_size / 4;

        this.game.infos.display.font = this.game.infos.text_size + "px " + this.game.infos.text_font;
        this.game.infos.display.fillText(this.game.scores[0], left_score_x, score_y);
        this.game.infos.display.fillText(this.game.scores[1], right_score_x, score_y);

        // players display

        this.game.left_player.print();
        this.game.right_player.print();
    }
}

function initializeLocal1v1()
{
    let infos_1v1 = {
        canvas: null,

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

    let game_1v1 = {
        enabled: false,
        player_nb: 2,

        left_player: null,
        right_player: null,

        ball: null,

        scores: [0, 0],

        infos: infos_1v1
    }

    // if (high_contrast == "true")
    //     infos_1v1.menu_color = "white", infos_1v1.background_color = "black", infos_1v1.bar_color = "white";
    // else
    //     infos_1v1.menu_color = "black", infos_1v1.background_color = "white", infos_1v1.bar_color = "black";

    infos_1v1.menu_color = "white", infos_1v1.background_color = "black", infos_1v1.bar_color = "white"; //

    the_game = new LocalGame1v1(infos_1v1, game_1v1);
    the_game.initialize();
    the_game.refreshDisplay();
}