
// < game class > //

class OnlineGame1v1_guest
{
    constructor()
    {
        // stats initialization

        this.player = localStorage.getItem('login');
        this.other_player = localStorage.getItem('opponent_login');
        this.date = getActualDate();
        this.start_time = 0;
        this.end_time = 0;
        this.scores_time = [];

        // global infos initialization

        this.player_nb = 1;

        this.scores = [0, 0];

        this.game_width = 1100;
        this.game_height = 720;

        this.bar_speed = 10;
        this.bar_height = 80;
        this.bar_width = 10;

        this.ball_speed = 10;
        this.ball_height = 20;
        this.ball_width = 20;

        this.separator_height = 20;
        this.separator_width = 2;
        this.separator_space = 17;

        if (text_size == "normal")
            this.text_size = 85;
        else
            this.text_size = 140;

        this.text_font = "Arial";

        this.bonus_color = "green";
        this.ball_direction = getRandomBallDirection();

        this.dist = 0;
        this.alert = 0;

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
        if (game_map != null && game_map != "default")
        {
            if (game_map == "red")
                this.background_color = "brown";
            else
                this.background_color = game_map;
        }

        // displaying background

        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.game_width, this.game_height);

        // displaying center bar

        let x_bar_center = (this.game_width / 2) - (this.separator_width / 2);
        let nb = ~~(this.game_height / (this.separator_height + this.separator_space));

        this.display.fillStyle = this.menu_color;
        for (let value = 0; value != nb; value++)
        {
            this.display.fillRect(x_bar_center, ((this.separator_height * value) + this.separator_space * (value + 1)), this.separator_width, this.separator_height);
        }

        // displaying scores

        let score_y = this.game_height / 6;
        let left_score_x = (this.game_width / 4) - this.text_size / 4;
        let right_score_x = (this.game_width - this.game_width / 4) - this.text_size / 4;

        this.display.fillStyle = this.bar_color;

        this.display.font = this.text_size + "px " + this.text_font;
        this.display.fillText(this.scores[0], left_score_x, score_y);
        this.display.fillText(this.scores[1], right_score_x, score_y);

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
                name: 1,
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
                name: 2,
            }

            this.bonus_one = new PowerUp(...Object.values(bonus_one_data));
            this.bonus_two = new PowerUp(...Object.values(bonus_two_data));
        }
        else
            this.bonus_one = null, this.bonus_two = null;

        // sounds initialization

        let the_sounds = {
            alert: document.getElementById('alert_sound'),
            limit: document.getElementById('knock_sound'),
            powerup: document.getElementById('bonus_sound')
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
        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.game_width, this.game_height);

        let x_bar_center = (this.game_width / 2) - (this.separator_width / 2);
        let nb = ~~(this.game_height / (this.separator_height + this.separator_space));

        this.display.fillStyle = this.menu_color;
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

        this.display.fillStyle = this.bar_color;

        this.display.font = this.text_size + "px " + this.text_font;
        this.display.fillText(this.scores[0], left_score_x, score_y);
        this.display.fillText(this.scores[1], right_score_x, score_y);
    }

    refreshPlayers()
    {
        if (gameKeys.KeyO == true){
            data_channel.send(`rpy:${this.right_player.y}`)
            this.right_player.moveUp();
            this.dist++;
        }
        if (gameKeys.KeyL == true){
            data_channel.send(`rpy:${this.right_player.y}`)
            this.right_player.moveDown();
            this.dist++;
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
        this.ball.print();
    }

    refreshBonus()
    {
        if (this.bonus_one.alive == true && (this.scores[0] >= 2 || this.scores[1] >= 2))
        {
            this.bonus_one.print();
            this.bonus_one.applyStats();
        }

        if (this.bonus_two.alive == true && (this.scores[0] >= 4 || this.scores[1] >= 4))
        {
            this.bonus_two.print();
            this.bonus_two.applyStats();
        }
    }

    resetGame()
    {
        this.scores[0] = 0;
        this.scores[1] = 0;

        this.start_time = 0;
        this.end_time = 0;
        this.scores_time = [];

        this.left_player.reset();
        this.right_player.reset();

        this.dist = 0;
        this.alert = 0;

        this.ball.reset();

        if (gameMode != "normal")
            this.bonus_one.reset('one'), this.bonus_two.reset('two');
    }

    restartRound()
    {
        this.ball.replace();
        this.refreshDisplay();
    }

    isOver()
    {
        if (active == false)
            return (true);
        if (this.scores[0] > 9)
        {
            if (this.end_time == 0)
                this.end_time = getActualTimeSeconds();

            document.getElementById('g_win_text').innerHTML = localStorage.getItem('opponent_login') + getTranslation('Online Win');
            document.getElementById('g_win_text').style.display = "block";
            document.getElementById('online_loser').play();

            return (true);
        }
        if (this.scores[1] > 9)
        {
            if (this.end_time == 0)
                this.end_time = getActualTimeSeconds();

            document.getElementById('g_win_text').innerHTML = localStorage.getItem('login') + getTranslation('Online Win');
            document.getElementById('g_win_text').style.display = "block";
            document.getElementById('online_winner').play();

            return (true);
        }
        return (false);
	}
}

