// <<<<<<< 1V1 >>>>>>> //

// < Game class > //

class OnlineGameStream1v1
{
    constructor()
    {
        this.player_nb = 2;

        this.background_img = null;

        this.left_player = null;
        this.right_player = null;

        this.ball = null;

        this.bonus_one = null;
        this.bonus_two = null;
        this.bonus_color = "yellow";

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

        if (high_contrast == "true")
            this.menu_color = "white", this.background_color = "black", this.bar_color = "white", this.ball_color = "white";
        else
            this.menu_color = "black", this.background_color = "white", this.bar_color = "black", this.ball_color = "black";
    }

    initialize()
    {
        // canvas creation

        this.canvas = document.getElementById('one_vs_one_guest_game');

        this.display = this.canvas.getContext('2d');


        this.canvas.width = this.game_width;
        this.canvas.height = this.game_height;

        // background loading

        if (game_map == "none")
            this.background_img = null;
        else
        {
            if (game_map == "1")
            {
                this.background_img = new Image();
                this.background_img.src = 'Materials/images/game_back1.png';
            }
            else if (game_map == "2")
            {
                this.background_img = new Image();
                this.background_img.src = 'Materials/images/game_back2.png';
            }
            else if (game_map == "3")
            {
                this.background_img = new Image();
                this.background_img.src = 'Materials/images/game_back3.png';
            }
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

        let right_player_data = {
            game: this,

            object_width: this.bar_width,
            object_heigth : this.bar_height,

            map_x: ((this.game_width - this.bar_width) - this.bar_width),
            map_y: ((this.game_height / 2) - this.bar_height / 2),

            bar_speed: this.bar_speed,
            color: this.bar_color
        }

        this.left_player = new Bar1v1(...Object.values(left_player_data));
        this.right_player = new Bar1v1(...Object.values(right_player_data));

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

                speed: this.ball_speed,
                color: this.bonus_color,

                direction : this.ball_direction,
            }

            let bonus_two_data = {
                game: this,

                object_width: this.ball_width,
                object_heigth: this.ball_height,

                x_pos : (this.game_width / 2 + (this.game_width / 4)),
                y_pos : (this.game_height / 2),

                speed: this.ball_speed,
                color: this.bonus_color,

                direction : bonus_one_data + 90,
            }

            this.bonus_one = new PowerUp(...Object.values(bonus_one_data));
            this.bonus_two = new PowerUp(...Object.values(bonus_two_data));
        }
    }

    refreshDisplay()
    {
        this.refreshBackground();
        this.refreshCenterBar();
        this.refreshScores();
        this.refreshPlayers();
        this.refreshBall();
        if (gameMode != "normal")
            this.refreshBonus();
    }

    refreshBackground()
    {
        if (this.background_img == null)
        {
            this.display.fillStyle = this.background_color;
            this.display.fillRect(0, 0, this.game_width, this.game_height);
            this.display.fillStyle = this.menu_color;
        }
        else
            this.display.drawImage(this.background_img, 0, 0);
    }

    refreshCenterBar()
    {
        let x_bar_center = (this.game_width / 2) - (this.separator_width / 2);
        let nb = ~~(this.game_height / (this.separator_height + this.separator_space));

        for (let value = 0; value != nb; value++)
        {
            this.display.fillRect(x_bar_center, ((this.separator_height * value) + this.separator_space * (value + 1)), this.separator_width, this.separator_height);
        }
    }

    refreshScores()
    {
        let score_y = this.game_height / 6;
        let left_score_x = (this.game_width / 4) - this.text_size / 4;
        let right_score_x = (this.game_width - this.game_width / 4) - this.text_size / 4;

        this.display.font = this.text_size + "px " + this.text_font;
        this.display.fillText(this.scores[0], left_score_x, score_y);
        this.display.fillText(this.scores[1], right_score_x, score_y);
    }

    refreshPlayers()
    {
		this.left_player.print();
        this.right_player.print();
    }

    refreshBall()
    {
        this.ball.print();
        this.ball.animate();
        this.ball.print();
    }

    refreshBonus()
    {
        this.bonus_one.print();
        this.bonus_one.animate();
        this.bonus_one.print();

        this.bonus_two.print();
        this.bonus_two.animate();
        this.bonus_two.print();
    }

    resetGame()
    {
        this.scores[0] = 0;
        this.scores[1] = 0;

        this.left_player.reset();
        this.right_player.reset();
    }

    restartRound()
    {
        if (this.ball.x >= this.game_width / 2)
            this.scores[0]++;
        else
            this.scores[1]++;

        this.ball.reset();
    }

    isOver()
    {
        if (active == false)
            return (true);
        if (this.scores[0] > 9 || this.scores[1] > 9)
        {
            if (this.scores[0] > 9)
            {
            	let player_left_won = document.getElementById('left_player_won_text');
            	player_left_won.style.display = "block";
        	}
        	if (this.scores[1] > 9)
        	{
            	let player_right_won = document.getElementById('right_player_won_text');
            	player_right_won.style.display = "block";
        	}

            this.resetGame();
            active = false;

            return (true);
        }
        return (false);
    }
}

// < Initialisation > //

function initializeOnlineStream1v1()
{
    players_nb = 2;
    game = new OnlineGameStream1v1();

    game.initialize();
    game.refreshBackground();
    active = true;
}
