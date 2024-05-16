// <<<<<<< 1V1 >>>>>>> //

// < OBJECTS > //

// < Player class > //

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
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y > 0)
            {
                this.y = this.y - 1;
                this.print();
            }
        }
    }

    moveDown()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y + this.height < this.game.game_height)
            {
                this.y = this.y + 1;
                this.print();
            }
        }
    }

    reset()
    {
        if (this.x < this.game.game_width / 2)
        {
            this.x = 0 + this.game.bar_width;
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
        else
        {
            this.x = ((this.game.game_width - this.game.bar_width) - this.game.bar_width);
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
    }

    getInfo()
    {
        return ([this.x, this.y]);
    }
}

// < Game class > //

class LocalGame1v1
{
    constructor()
    {
        this.player_nb = 2;

        this.left_player = null;
        this.right_player = null;

        this.ball = null;

        this.scores = [0, 0];

        this.canvas = null;

        this.game_width = 1100;
        this.game_height = 720;

        this.bar_speed = 10;
        this.bar_height = 80;
        this.bar_width = 10;

        this.ball_speed = 3;
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

        if (type == "tournament")
            this.canvas = document.getElementById('tournament_game');
        else
            this.canvas = document.getElementById('one_vs_one_local_game');
        this.display = this.canvas.getContext('2d');

        this.canvas.width = this.game_width;
        this.canvas.height = this.game_height;

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
    }

    refreshDisplay()
    {
        this.refreshBackground();
        this.refreshCenterBar();
        this.refreshScores();
        this.refreshPlayers();
        this.refreshBall();
    }

    refreshBackground()
    {
        if (game_map == "none")
        {
            this.display.fillStyle = this.background_color;
            this.display.fillRect(0, 0, this.game_width, this.game_height);
            this.display.fillStyle = this.menu_color;
        }
        else if (game_map == "1")
        {
            let img = new Image();
            img.src = 'Materials/images/game_back1.png';
            this.display.drawImage(img, 0, 0);
        }
        else if (game_map == "2")
        {
            let img = new Image();
            img.src = 'Materials/images/game_back2.png';
            this.display.drawImage(img, 0, 0);
        }
        else if (game_map == "3")
        {
            let img = new Image();
            img.src = 'Materials/images/game_back3.png';
            this.display.drawImage(img, 0, 0);
        }
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
        if (keys.KeyE == true)
            this.left_player.moveUp();
        else if (keys.KeyD == true)
            this.left_player.moveDown();

        if (keys.ArrowUp == true)
            this.right_player.moveUp();
        else if (keys.ArrowDown == true)
            this.right_player.moveDown();

        this.left_player.print();
        this.right_player.print();
    }

    refreshBall()
    {
        this.ball.print();
        this.ball.animate();
        this.ball.print();
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
        if (this.scores[0] > 0 || this.scores[1] > 0)
        {
            if (type == 'tournament'){
                if (this.scores[0] > 0)
                {
                    let player_left = document.getElementById('nick_reminder');
                    player_left.innerHTML = player_left.innerHTML.substring(0, player_left.innerHTML.indexOf(' ')) + " won the game!";
                }
                if (this.scores[1] > 0)
                {
                    let player_right = document.getElementById('nick_reminder');
                    player_right.innerHTML = player_right.innerHTML.substring(player_right.innerHTML.indexOf(' ', player_right.innerHTML.indexOf(' ') + 1) + 1) + " won the game!";;
                }
            }
            else{
                if (this.scores[0] > 0)
                {
                    let player_left_won = document.getElementById('left_player_won_text');
                    player_left_won.style.display = "block";
                }
                if (this.scores[1] > 0)
                {
                    let player_right_won = document.getElementById('right_player_won_text');
                    player_right_won.style.display = "block";
                }
            }

            this.resetGame();
            active = false;

            return (true);
        }
        return (false);
    }
}

// < Initialisation > //

function initializeLocal1v1()
{
    mode = 2;
    game = new LocalGame1v1();

    game.initialize();
    game.refreshBackground();
    active = true;
}

// < Menu display management > //

function displayLocal1v1()
{
    let start_btn = document.getElementById('start_1v1_local');
    start_btn.style.visibility = "hidden";
    let player_left_won = document.getElementById('left_player_won_text');
    player_left_won.style.display = "none";
    let player_right_won = document.getElementById('right_player_won_text');
    player_right_won.style.display = "none";

    let timer = document.getElementById('1v1_local_timer');
    timer.style.display = "block";

    displayCountDown(3);
}

function removeLocal1v1()
{
    let timer = document.getElementById('1v1_local_timer');
    timer.style.display = "none";

    let start_btn = document.getElementById('start_1v1_local');
    start_btn.innerHTML = getTranslation("Launch a game");
    start_btn.style.visibility = "visible";
}

function startLocal1v1()
{
    if (game.isOver() == true || active == false)
    {
        game.refreshBackground();
        game.resetGame();
        removeLocal1v1();
        if (final == false)
            removeTournamentGame();
        else
            displayFinalWinner();
    }
    else
    {
        game.refreshDisplay();
        requestAnimationFrame(startLocal1v1);
    }
}
