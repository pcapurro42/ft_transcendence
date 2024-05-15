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
    constructor(game, width, height, x, y, speed, color, direction, moves)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;

        this.direction = direction;
        this.moves = moves;
    }

    print()
    {
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    isAtPlayer()
    {
        if (this.x == this.game.left_player.x + this.game.left_player.width)
        {
            if (this.y + this.height >= this.game.left_player.y && this.y <= this.game.left_player.y + this.game.left_player.height)
                return (true);
        }

        if (this.x + this.width == this.game.right_player.x)
        {
            if (this.y + this.height >= this.game.right_player.y && this.y <= this.game.right_player.y + this.game.right_player.height)
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
        if (this.x <= 0 || this.x + this.width >= this.game.game_width)
            return (true);
        return (false);
    }

    restartRound()
    {
        if (this.x >= this.game.game_width / 2)
            this.game.scores[0]++;
        else
            this.game.scores[1]++;

        this.x = this.game.game_width / 2 - (this.game.ball_width / 2);
        this.y = this.game.game_height / 2 - (this.game.ball_width / 2);
        this.direction = getRandomBallDirection();
    }

    getOpposite()
    {
        if (this.isUpOrDown() == true)
            return (this.direction * (-1));
        else
        {
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

    move()
    {
        let x_dir = this.calculateNewDirections()[0];
        let y_dir = this.calculateNewDirections()[1];

        for (let i = 0; i != this.speed; i++)
        {
            this.x = this.x + x_dir;
            this.y = this.y + y_dir;
        }
    }

    animate()
    {
        if (this.isUpOrDown() == true || this.isAtPlayer() == true)
            this.direction = this.getOpposite();
        else if (this.isOffLimit() == true)
            this.restartRound();

        // console.log(this.direction);

        this.move();
    }
}

// < KEYS > //

let keys = {
    KeyA: false,
    KeyQ: false,

    KeyU: false,
    KeyJ: false,

    ArrowUp: false,
    ArrowDown: false
};

// < TRIGGER > //

window.addEventListener('keydown', (event) => 
{
    if (mode != null)
    {
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown')
            event.preventDefault();

        if (mode == 2)
        {
            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;

            if (event.key == 'e')
                keys.KeyA = true;
            else if (event.key == 'd')
                keys.KeyQ = true;
        }
        else if (mode == 3)
        {
            if (event.key == 'e')
                keys.KeyA = true;
            else if (event.key == 'd')
                keys.KeyQ = true;

            if (event.key == 'u')
                keys.KeyU = true;
            else if (event.key == 'j')
                keys.KeyJ = true;

            if (event.key == 'ArrowUp')
                keys.ArrowUp = true;
            else if (event.key == 'ArrowDown')
                keys.ArrowDown = true;
        }
        else if (mode == 3)
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
        keys.KeyA = false;
    else if (event.key == 'd')
        keys.KeyQ = false;

    if (event.key == 'u')
        keys.KeyU = false;
    else if (event.key == 'j')
        keys.KeyJ = false;
});