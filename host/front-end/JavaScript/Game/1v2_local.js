// <<<<<<< 2V2 LOCAL >>>>>>> //

// < Game class > //

class LocalGame1v2
{
    constructor()
    {
        this.player_nb = 3;

        this.left_player = null;
        this.right_player_1 = null;
        this.right_player_2 = null;

        this.ball = null;

        this.bonus_one = null;
        this.bonus_two = null;
        this.bonus_color = "green";

        this.scores = [0, 0];

        this.canvas = null;

        this.game_width = 1100;
        this.game_height = 720;

        this.bar_speed = 10;
        this.bar_height = 80;
        this.bar_width = 10;

        this.ball_speed = 10;
        this.ball_height = 20;
        this.ball_width = 20;
        this.ball_color = null;

        this.ball_direction = getRandomBallDirection();

        this.text_size = 100;
        this.text_font = "Arial";

        this.separator_height = 20;
        this.separator_width = 3;
        this.separator_space = 17;
    }

    initialize()
    {
        // canvas creation

        this.canvas = document.getElementById('one_vs_two_local_game');
        this.display = this.canvas.getContext('2d');

        this.canvas.width = this.game_width;
        this.canvas.height = this.game_height;

        // game display loading

        if (high_contrast == "true")
            this.menu_color = "white", this.background_color = "black", this.bar_color = "white", this.ball_color = "white";
        else
            this.menu_color = "black", this.background_color = "white", this.bar_color = "black", this.ball_color = "black";

        if (game_map != null && game_map != "none")
        {
            if (game_map == "red")
                this.background_color = "brown";
            else
                this.background_color = game_map;
        }

        // players creation

        let left_player_data = {
            game: this,

            object_width: this.bar_width,
            object_heigth : this.bar_height,

            map_x: 0 + this.bar_width,
            map_y: ((this.game_height / 2) - this.bar_height / 2),

            bar_speed: this.bar_speed,
            color: this.bar_color
        }

        let right_player_one_data = {
            game: this,

            object_width: this.bar_width,
            object_heigth : this.bar_height,

            map_x: ((this.game_width - this.bar_width) - this.bar_width),
            map_y: ((this.game_height / 4) - this.bar_height / 2),

            bar_speed: this.bar_speed,
            color: this.bar_color
        }

        let right_player_two_data = {
            game: this,

            object_width: this.bar_width,
            object_heigth : this.bar_height,

            map_x: ((this.game_width - this.bar_width) - this.bar_width),
            map_y: ((this.game_height / 2 + this.game_height / 2) - this.bar_height / 2),

            bar_speed: this.bar_speed,
            color: this.bar_color
        }

        this.left_player = new Bar1v1(...Object.values(left_player_data))
        this.right_player_1 = new Bar1v2(...Object.values(right_player_one_data));
        this.right_player_2 = new Bar1v2(...Object.values(right_player_two_data));

        // ball creation

        let x, y;

        x = this.game_width / 2 - (this.ball_width / 2);
        y = this.game_height / 2 - (this.ball_width / 2);
        
        let ball_data = {
            game: this,
        
            object_width: this.ball_width,
            object_heigth: this.ball_height,
        
            x_pos : x,
            y_pos : y,
        
            speed: this.ball_speed,
            color: this.ball_color,
        
            direction : this.ball_direction,
            bonus_speed: 0
        }
        
        this.ball = new Ball(...Object.values(ball_data));
        
        // bonus creation
        
        if (gameMode != "normal")
        {
            let bonus_one_data = {
                game: this,
        
                object_width: this.ball_width,
                object_heigth: this.ball_height,
        
                x_pos : (this.game_width / 4),
                y_pos : (this.game_height / 2),
        
                speed: 2,
                color: this.bonus_color,
        
                direction : this.ball_direction,
            }
        
            let bonus_two_data = {
                game: this,
        
                object_width: this.ball_width,
                object_heigth: this.ball_height,
        
                x_pos : (this.game_width / 2 + (this.game_width / 4)),
                y_pos : (this.game_height / 2),
                speed: 2,
                color: this.bonus_color,
        
                direction : this.ball_direction + 90,
            }
        
            this.bonus_one = new PowerUp(...Object.values(bonus_one_data));
            this.bonus_two = new PowerUp(...Object.values(bonus_two_data));
        }
    }
}