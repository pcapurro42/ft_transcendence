// <<<<<<< GAME >>>>>>> //

// < OBJECTS UTILS > //

function generateNumber(limit)
{
    let value = Math.floor(Math.random() * limit) + 1;
    return (value);
}

function getRandomBallDirection()
{
    value = generateNumber(4);

    if (value == 1)
        return (45);
    else if (value == 2)
        return (135);
    else if (value == 3)
        return (-45);
    else if (value == 4)
        return (-135);
}

// < OBJECT > //

class Ball
{
    constructor(game, width, height, x, y, speed, color, direction, bonus_speed)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;

        this.direction = direction;
        this.bonus_speed = bonus_speed;

        this.bounce = true;
    }

    print()
    {
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    // < Verifyers > //

    isAtPlayer() //
    {
        if (this.isAboveOrUnderPlayer() == true || this.isFrontPlayer() == true)
            return (true);
        return (false);
    }

    isFrontPlayer()
    {
        if (Math.ceil(this.x) == this.game.left_player.x + this.game.left_player.width)
        {
            if (this.y + this.height >= this.game.left_player.y && this.y <= this.game.left_player.y + this.game.left_player.height)
                return (true);
        }

        if (Math.ceil(this.x) + this.width == this.game.right_player.x)
        {
            if (this.y + this.height >= this.game.right_player.y && this.y <= this.game.right_player.y + this.game.right_player.height)
                return (true);
        }
        return (false);
    }

    isAboveOrUnderPlayer()
    {
        if (this.x + this.width >= this.game.left_player.x && this.x <= this.game.left_player.x + this.game.left_player.width)
        {
            if (Math.ceil(this.y) + this.height == this.game.left_player.y)
                return (true);
            if (Math.ceil(this.y) == this.game.left_player.y + this.game.left_player.height)
                return (true);
        }
        if (this.x + this.width >= this.game.right_player.x && this.x <= this.game.right_player.x + this.game.right_player.width)
        {
            if (Math.ceil(this.y) + this.height == this.game.right_player.y)
                return (true);
            if (Math.ceil(this.y) == this.game.right_player.y + this.game.right_player.height)
                return (true);
        }
        return (false);
    }

    isUpOrDown()
    {
        if (this.y <= 0 || this.y + this.height >= this.game.game_height)
            return (true);
        return (false);
    }

    isOffLimit()
    {
        if (this.x + this.width <= 0 || this.x >= this.game.game_width)
            return (true);
        return (false);
    }

    // < Extras > //

    addExtraDirection() //
    {
        ;
    }

    addExtraSpeed() //
    {
        if (this.bonus_speed == 3)
            return ;

        if (this.x < this.game_width / 2)
        {
            if (keys.ArrowUp == true || keys.ArrowDown == true)
                this.bonus_speed++;
        }
        else
        {
            if (keys.KeyE == true || keys.KeyD == true)
                this.bonus_speed++;
        }
    }

    // < Calculate > //

    getOpposite()
    {
        if (this.isUpOrDown() == true || this.isAboveOrUnderPlayer() == true)
            return (this.direction * (-1));
        else if (this.isAboveOrUnderPlayer() == true && this.bounce == true)
        {
            this.bounce = false;
            return (this.direction * (-1));
        }
        else if (this.isFrontPlayer() == true)
        {
            // this.addExtraDirection();
            this.addExtraSpeed();

            if ((this.direction >= 30 && this.direction <= 90) || (this.direction >= -150 && this.direction <= -120))
                return (this.direction + 90);
            else
                return (this.direction - 90)
        }
    }

    calculateNewDirections()
    {
        let radian = ((this.direction * (-1)) * Math.PI) / 180;
        let x_dir = Math.cos(radian);
        let y_dir = Math.sin(radian);

        return ([x_dir, y_dir]);
    }

    // < Animate > //

    move()
    {
        let x_dir = this.calculateNewDirections()[0];
        let y_dir = this.calculateNewDirections()[1];

        x_dir = Math.round(x_dir * 100) / 100;
        y_dir = Math.round(y_dir * 100) / 100;

        // console.log(x_dir);
        // console.log(y_dir);

        for (let i = 0; this.isAtPlayer() == false && i != (this.speed + this.bonus_speed); i++)
        {
            this.x = this.x + x_dir;
            this.y = this.y + y_dir;
        }
    }

    getAwayFromPlayers()
    {
        if (this.isFrontPlayer() == true)
        {
            if (this.x < this.game.game_width / 2)
                this.x = this.x + this.speed;
            else
                this.x = this.x - this.speed;
        }
        if (this.isAboveOrUnderPlayer() == true)
        {
            if (Math.ceil(this.y) + this.height == this.game.left_player.y || Math.ceil(this.y) + this.height == this.game.right_player.y)
                this.y = this.y - this.speed;
            else
                this.y = this.y + this.speed;
        }
    }

    reset()
    {
        this.x = this.game.game_width / 2 - (this.game.ball_width / 2);
        this.y = this.game.game_height / 2 - (this.game.ball_width / 2);

        this.direction = getRandomBallDirection();
        this.bonus_speed = 0;
        
        if (this.bounce == false)
            this.bounce = true;
    }

    animate()
    {
        if (this.isUpOrDown() == true || this.isAtPlayer() == true)
            this.direction = this.getOpposite(), this.getAwayFromPlayers();
        else if (this.isOffLimit() == true)
            this.game.restartRound();

        console.log(this.direction)

        this.move();
    }
}

// < TIMER > //

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

// < KEYS > //

let keys = {
    KeyE: false,
    KeyD: false,

    KeyU: false,
    KeyJ: false,

    ArrowUp: false,
    ArrowDown: false
};

// < TRIGGER > //

window.addEventListener('keydown', (event) => 
{
    if (players_nb != 0 && players_nb != null)
    {
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown')
            event.preventDefault();

        if (players_nb == 2)
        {
            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;

            if (event.key == 'e')
                keys.KeyE = true;
            else if (event.key == 'd')
                keys.KeyD = true;
        }
        else if (players_nb == 3)
        {
            if (event.key == 'e')
                keys.KeyE = true;
            else if (event.key == 'd')
                keys.KeyD = true;

            if (event.key == 'u')
                keys.KeyU = true;
            else if (event.key == 'j')
                keys.KeyJ = true;

            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;
        }
        else if (players_nb == 3)
        {
            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;
        }
    }
});

window.addEventListener('keyup', (event) => 
{
    if (event.key == 'ArrowUp')
        keys.ArrowUp = false;
    else if (event.key == 'ArrowDown')
        keys.ArrowDown = false;

    if (event.key == 'e')
        keys.KeyE = false;
    else if (event.key == 'd')
        keys.KeyD = false;

    if (event.key == 'u')
        keys.KeyU = false;
    else if (event.key == 'j')
        keys.KeyJ = false;
});