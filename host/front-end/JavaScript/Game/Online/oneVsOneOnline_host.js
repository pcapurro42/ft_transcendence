
// <<<<<<< 1V1 >>>>>>> //

// < Game class > //

class OnlineGame1v1_host
{
    constructor()
    {
        this.player_nb = 1;

        this.left_player = null;
        this.right_player = null;

        this.ball = null;

        this.bonus_one = null;
        this.bonus_two = null;
        this.bonus_color = "green";

        this.scores = [0, 0];

        this.canvas = null;
        this.display = null;

        this.background = null;
        this.background_ctx = null;

        this.scores_c = null;
        this.scores_ctx = null;

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

        this.sounds = null;

        this.alert = 0;
    }

    initialize()
    {
        // canvas creation

        if (role == "host")
            this.canvas = document.getElementById('one_vs_one_host_game');
        else
            this.canvas = document.getElementById('one_vs_one_guest_game');
        this.display = this.canvas.getContext('2d');


        this.canvas.width = this.game_width;
        this.canvas.height = this.game_height;

        // game display loading

        if (high_contrast == "true")
            this.menu_color = "white", this.background_color = "black", this.bar_color = "white", this.ball_color = "white";
        else
            this.menu_color = "black", this.background_color = "white", this.bar_color = "black", this.ball_color = "black";
            console.log(game_map)
        if (game_map != null && game_map != "none")
        {
            if (game_map == "red")
                this.background_color = "brown";
            else
                this.background_color = game_map;
        }

        // pre rendering background

        this.background = document.createElement('canvas');
        this.background.width = this.game_width;
        this.background.height = this.game_height;
        this.background_ctx = this.background.getContext('2d');

        let x_bar_center = (this.game_width / 2) - (this.separator_width / 2);
        let nb = ~~(this.game_height / (this.separator_height + this.separator_space));

        this.background_ctx.fillStyle = this.menu_color;
        for (let value = 0; value != nb; value++)
        {
            this.background_ctx.fillRect(x_bar_center, ((this.separator_height * value) + this.separator_space * (value + 1)), this.separator_width, this.separator_height);
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

        // sounds initialization

        let the_sounds = {
            alert: document.getElementById('alert_sound'),
            limit: document.getElementById('knock_sound'),
            powerup: document.getElementById('goal_sound')
        }

        this.sounds = the_sounds;
    }

    refreshDisplay()
    {
        this.refreshBackground();
        this.refreshScores();
        this.refreshPlayers();
        this.refreshBall();
        if (gameMode != "normal")
                this.refreshBonus();

    }

    refreshBackground()
    {
        this.display.clearRect(0, 0, this.game_width, this.game_height);
        this.display.drawImage(this.background, 0, 0);
    }

    refreshScores()
    {
        if (this.scores_c == null)
            this.drawScores();
        this.display.drawImage(this.scores_c, 0, 0);
    }


    refreshPlayers()
    {
            if (keys.KeyE == true){
                data_channel.send(`lpy:${this.left_player.y}`)
                this.left_player.moveUp();
            }
            if (keys.KeyD == true){
                data_channel.send(`lpy:${this.left_player.y}`)
                this.left_player.moveDown();
            }

            this.left_player.print();
            this.right_player.print();

            this.left_player.displayBonus();
            this.right_player.displayBonus();

    }


    refreshBall()
    {
        if (this.alert < 100)
            this.ball.printAlert(), this.alert++, this.sounds.alert.play();

        this.ball.animate();
        data_channel.send(`by:${this.ball.y}`);
        data_channel.send(`bx:${this.ball.x}`);
        this.ball.print();
    }

    refreshBonus()
    {
        if (this.bonus_one.alive == true && (this.scores[0] >= 2 || this.scores[1] >= 2))
        {
            this.bonus_one.print();
            this.bonus_one.animate();
            this.bonus_one.print();
        }

        if (this.bonus_two.alive == true && (this.scores[0] >= 4 || this.scores[1] >= 4))
        {
            this.bonus_two.print();
            this.bonus_two.animate();
            this.bonus_two.print();
        }
    }

    drawScores()
    {
        this.scores_c = document.createElement('canvas');
        this.scores_c.width = this.game_width;
        this.scores_c.height = this.game_height;
        this.scores_ctx = this.scores_c.getContext('2d');

        let score_y = this.game_height / 6;
        let left_score_x = (this.game_width / 4) - this.text_size / 4;
        let right_score_x = (this.game_width - this.game_width / 4) - this.text_size / 4;

        this.scores_ctx.fillStyle = this.bar_color;

        this.scores_ctx.font = this.text_size + "px " + this.text_font;
        this.scores_ctx.fillText(this.scores[0], left_score_x, score_y);
        this.scores_ctx.fillText(this.scores[1], right_score_x, score_y);
    }

    resetGame()
    {
        this.scores[0] = 0;
        this.scores[1] = 0;

        this.left_player.reset();
        this.right_player.reset();

        this.alert = 0;
        if (gameMode != "normal")
            this.bonus_one.reset(), this.bonus_two.reset();
    }

    restartRound()
    {
        if (this.ball.x >= this.game_width / 2)
            this.scores[0]++;
        else
            this.scores[1]++;

        this.drawScores();
        this.ball.replace();
    }

 async  isOver()
    {
        if (active == false)
            return (true);
        if (this.scores[0] > 9)
        {
            console.log('toto');
            let player_left_won = document.getElementById('h_win_text');
            player_left_won.innerHTML = localStorage.getItem('login') + getTranslation('Online Win');
            player_left_won.style.display = "block";
            document.getElementById('online_winner').play();

            this.resetGame();
            active = false;

            return (true);
        }
        if (this.scores[1] > 9)
        {
            console.log('toto');
            let player_right_won = document.getElementById('h_win_text');
            player_right_won.innerHTML = sessionStorage.getItem('opponent_login') + getTranslation('Online Win');
            player_right_won.style.display = "block";

            document.getElementById('online_loser').play();

            this.resetGame();
            active = false;

            return (true);
        }
        return (false);
	}
}
