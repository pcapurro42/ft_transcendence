// <<<<<<< GAME >>>>>>> //

// < OBJECTS UTILS > //

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
        this.game.infos.display.fillRect(this.x, this.y, this.width, this.height);
    }

    isUpOrDown()
    {
        if (this.y <= 0 || this.y >= this.game.infos.game_height || this.y + this.height >= this.game.infos.game_height)
            return (true);
        return (false);
    }

    isAtLeftPlayer()
    {
        if (this.y >= this.game.left_player.y && this.y <= this.game.left_player.y + this.game.left_player.height)
        {
            if (this.x <= this.game.left_player.x + this.game.left_player.width)
                return (true);
        }
        return (false);
    }

    isAtRightPlayer()
    {
        if (this.y >= this.game.right_player.y && this.y <= this.game.right_player.y + this.game.right_player.height)
        {
            if (this.x + this.width >= this.game.right_player.x)
                return (true);
        }
        return (false);
    }

    restartRound()
    {
        if (this.x >= this.game.infos.game_width)
            this.game.scores[0]++;
        else
            this.game.scores[1]++;

        this.x = this.game.infos.game_width / 2 - (this.game.infos.ball_width / 2);
        this.y = this.game.infos.game_height / 2 - (this.game.infos.ball_width / 2);
    }

    getCollision()
    {
        if (this.isAtLeftPlayer() == true)
            return ("left");
        else if (this.isAtRightPlayer() == true)
            return ("right");
        else if (this.isUpOrDown() == true)
        {
            if (this.y <= 0)
                return ("up");
            else
                return ("down")
        }
    }

    getOpposite(value, collision)
    {
        if (value == 45)
        {
            if (collision == "up")
                return (-45);
            else if (collision == "right")
                return (135);
        }
        
        if (value == 135)
        {
            if (collision == "up")
                return (-135);
            else if (collision == "left")
                return (45);
        }

        if (value == -135)
        {
            if (collision == "down")
                return (135);
            else if (collision == "left")
                return (-45);
        }

        if (value == -45)
        {
            if (collision == "down")
                return (45);
            else if (collision == "right")
                return (-135);
        }
    }

    move()
    {
        this.moves++;
        
        // Nord-Est
        if (this.direction == 30)
        {
            if (this.moves % 2 == 0)
                this.x = this.x + this.speed;
            this.y = this.y - this.speed;
        }

        if (this.direction == 45)
        {
            this.x = this.x + this.speed;
            this.y = this.y - this.speed;
        }

        if (this.direction == 60)
        {
            if (this.moves % 2 == 0)
                this.x = this.x + this.speed;

            this.x = this.x + this.speed;
            this.y = this.y - this.speed;
        }

        // Nord-Ouest
        if (this.direction == 135)
        {
            this.x = this.x - this.speed;
            this.y = this.y - this.speed;
        }

        // Sud-Ouest
        if (this.direction == -135)
        {
            this.x = this.x - this.speed;
            this.y = this.y + this.speed;
        }

        // Sud-Est
        if (this.direction == -45)
        {
            this.x = this.x + this.speed;
            this.y = this.y + this.speed;
        }

        if (this.isAtLeftPlayer() == true || this.isAtRightPlayer() == true || this.isUpOrDown() == true)
            this.direction = this.getOpposite(this.direction, this.getCollision());
        else if (this.x <= 0 || this.x >= this.game.infos.game_width)
            this.restartRound();
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
        if (mode == "local1v1")
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
        else if (mode == "local1v2")
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