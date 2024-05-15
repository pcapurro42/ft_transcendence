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
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    isAtBall()
    {
        if (this.y == this.game.ball.y + this.game.ball.height)
            return (true);
        return (false);
    }

    moveUp()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y > 0)
            {
                if (this.isAtBall() == true)
                    this.game.ball.move(), this.game.ball.move();
                
                this.y = this.y - 1;
                this.print();
            }
        }
    }

    moveDown()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y + this.game.bar_height < this.game.game_height)
            {
                this.y = this.y + 1;
                this.print();
            }
        }
    }

    getInfo()
    {
        return ([this.x, this.y]);
    }
}

class LocalGame1v1
{
    constructor(game)
    {   
        this.game = game;
    }

    initialize()
    {
        // canvas creation

        if (type == "tournament")
            this.game.canvas = document.getElementById('');
        else
            this.game.canvas = document.getElementById('one_vs_one_local_game');
        this.game.display = this.game.canvas.getContext('2d');
        
        this.game.canvas.width = this.game.game_width;
        this.game.canvas.height = this.game.game_height;

        // players creation

        let left_player_data = {
            game: this.game,

            object_width: this.game.bar_width,
            object_heigth : this.game.bar_height,

            map_x: 0 + this.game.bar_width,
            map_y: ((this.game.game_height / 2) - this.game.bar_height / 2),
    
            bar_speed: this.game.bar_speed,
            color: this.bar_color
        }
    
        let right_player_data = {
            game: this.game,

            object_width: this.game.bar_width,
            object_heigth : this.game.bar_height,
    
            map_x: ((this.game.game_width - this.game.bar_width) - this.game.bar_width),
            map_y: ((this.game.game_height / 2) - this.game.bar_height / 2),
    
            bar_speed: this.game.bar_speed,
            color: this.bar_color
        }
    
        this.game.left_player = new Bar1v1(...Object.values(left_player_data));
        this.game.right_player = new Bar1v1(...Object.values(right_player_data));

        // ball creation

        let x, y;

        x = this.game.game_width / 2 - (this.game.ball_width / 2);
        y = this.game.game_height / 2 - (this.game.ball_width / 2);

        let ball_data = {
            game: this.game,

            object_width: this.game.ball_width,
            object_heigth: this.game.ball_height,

            x_pos : x,
            y_pos : y,

            speed: this.game.ball_speed,
            color: this.game.ball_color,
            
            direction : this.game.ball_direction,
            moves: 0
        }

        this.game.ball = new Ball(...Object.values(ball_data));
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
            this.game.display.fillStyle = this.game.background_color;
            this.game.display.fillRect(0, 0, this.game.game_width, this.game.game_height);
            this.game.display.fillStyle = this.game.menu_color;
        }
        else if (game_map == "1")
        {
            let img = new Image();
            img.src = 'Materials/images/game_back1.png';
            this.game.display.drawImage(img, 0, 0);
        }
        else if (game_map == "2")
        {
            let img = new Image();
            img.src = 'Materials/images/game_back2.png';
            this.game.display.drawImage(img, 0, 0);
        }
        else if (game_map == "3")
        {
            let img = new Image();
            img.src = 'Materials/images/game_back3.png';
            this.game.display.drawImage(img, 0, 0);
        }
    }

    refreshCenterBar()
    {
        let x_bar_center = (this.game.game_width / 2) - (this.game.separator_width / 2);
        let nb = ~~(this.game.game_height / (this.game.separator_height + this.game.separator_space));

        for (let value = 0; value != nb; value++)
        {
            this.game.display.fillRect(x_bar_center, ((this.game.separator_height * value) + this.game.separator_space * (value + 1)), this.game.separator_width, this.game.separator_height);
        }
    }

    refreshScores()
    {
        let score_y = this.game.game_height / 6;
        let left_score_x = (this.game.game_width / 4) - this.game.text_size / 4;
        let right_score_x = (this.game.game_width - this.game.game_width / 4) - this.game.text_size / 4;

        this.game.display.font = this.game.text_size + "px " + this.game.text_font;
        this.game.display.fillText(this.game.scores[0], left_score_x, score_y);
        this.game.display.fillText(this.game.scores[1], right_score_x, score_y);
    }

    refreshPlayers()
    {
        if (keys.KeyA == true)
            this.game.left_player.moveUp();
        else if (keys.KeyQ == true)
            this.game.left_player.moveDown();

        if (keys.ArrowUp == true)
            this.game.right_player.moveUp();
        else if (keys.ArrowDown == true)
            this.game.right_player.moveDown();

        this.game.left_player.print();
        this.game.right_player.print();
    }

    refreshBall()
    {
        this.game.ball.print();
        this.game.ball.animate();
        this.game.ball.print();
    }

    isOver()
    {
        if (active == false)
            return (true);
        if (this.game.scores[0] > 9 || this.game.scores[1] > 9)
        {
            if (this.game.scores[0] > 9)
            {
                let player_left_won = document.getElementById('left_player_won_text');
                player_left_won.style.display = "block";
            }
            if (this.game.scores[1] > 9)
            {
                let player_right_won = document.getElementById('right_player_won_text');
                player_right_won.style.display = "block";
            }
            active = false;
            return (true);
        }
        return (false);
    }

    reset()
    {
        this.game.scores[0] = 0;
        this.game.scores[1] = 0;
    }
}

function initializeLocal1v1()
{
    mode = 2;

    let game_1v1 = {
        player_nb: 2,

        left_player: null,
        right_player: null,

        ball: null,

        scores: [0, 0],

        canvas: null,

        // infos

        game_width: 1100,
        game_height: 720,

        bar_speed: 10,
        bar_height: 80,
        bar_width: 10,

        ball_speed: 7,
        ball_height: 20,
        ball_width: 20,

        text_size: 100,
        text_font: 'Arial',

        separator_height: 20,
        separator_width: 3,
        separator_space: 17,

        menu_color: null,
        background_color: null,
        bar_color: null,
        ball_color: null,
        
        ball_direction: getRandomBallDirection()
    }

    if (high_contrast == "true")
        game_1v1.menu_color = "white", game_1v1.background_color = "black", game_1v1.bar_color = "white", game_1v1.ball_color = "white";
    else
        game_1v1.menu_color = "black", game_1v1.background_color = "white", game_1v1.bar_color = "black", game_1v1.ball_color = "black";

    let the_game = new LocalGame1v1(game_1v1);
    the_game.initialize();
    the_game.refreshBackground();

    game = the_game;
    active = true;
}

function displayCountDown(nb)
{
    let timer = document.getElementById('1v1_local_timer');

    if (nb == 3)
        timer.innerHTML = "3";
    else if (nb == 2)
        timer.innerHTML = "2";
    else if (nb == 1)
        timer.innerHTML = "1";
    else if (nb == 0)
        timer.innerHTML = getTranslation("Go!")
    else if (nb == -1)
    {
        timer.style.display = "none";
        active = true;
        startLocal1v1();
        return ;
    }
    setTimeout(displayCountDown, 1000, --nb);
}

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
        game.reset();
        removeLocal1v1();
    }
    else
    {
        game.refreshDisplay();
        requestAnimationFrame(startLocal1v1);
    }        
}