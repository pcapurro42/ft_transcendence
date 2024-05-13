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
        this.game.infos.display.fillRect(this.x, this.y, this.width, this.height);
    }

    isAtPlayer()
    {
        if (this.x == this.game.left_player.x + this.game.left_player.width)
        {
            if (this.y >= this.game.left_player.y && this.y <= this.game.left_player.y + this.game.left_player.height)
                return (true);
        }

        if (this.x + this.width == this.game.right_player.x)
        {
            if (this.y >= this.game.right_player.y && this.y <= this.game.right_player.y + this.game.right_player.height)
                return (true);
        }
        return (false);
    }

    isUpOrDown()
    {
        if (this.y <= 0 || this.y + this.height >= this.game.infos.game_height)
            return (true);
        return (false);
    }

    isOffLimit()
    {
        if (this.x <= 0 || this.x + this.width >= this.game.infos.game_width)
            return (true);
        return (false);
    }

    restartRound()
    {
        if (this.x >= this.game.infos.game_width / 2)
            this.game.scores[0]++;
        else
            this.game.scores[1]++;

        this.x = this.game.infos.game_width / 2 - (this.game.infos.ball_width / 2);
        this.y = this.game.infos.game_height / 2 - (this.game.infos.ball_width / 2);
        this.direction = getRandomBallDirection(12);
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

    moveIncrease(element, sign)
    {
        if (element == "x")
        {
            if (sign == "-")
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.x - 1 >= 0)
                        this.x = this.x - 1, this.moves++;
                    if (this.isAtPlayer() == true)
                        return ;
                }
            }
            else
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.x + this.width + 1 <= this.game.infos.game_width)
                        this.x = this.x + 1, this.moves++;
                    if (this.isAtPlayer() == true)
                        return ;
                }
            }
        }

        if (element == "y")
        {
            if (sign == "-")
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.y - 1 >= 0)
                        this.y = this.y - 1, this.moves++;
                    if (this.isAtPlayer() == true)
                        return ;
                }
            }
            else
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.y + this.height + 1 <= this.game.infos.game_height)
                        this.y = this.y + 1, this.moves++;
                    if (this.isAtPlayer() == true)
                        return ;
                }
            }
        }
    }

    move()
    {        
        // Nord-Est
        if (this.direction == 30)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "+");
            this.moveIncrease("x", "+");
            this.moveIncrease("y", "-");
        }
        
        if (this.direction == 60)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "+");
            this.moveIncrease("y", "-");
        }

        if (this.direction == 45)
        {
            this.moveIncrease("x", "+");
            this.moveIncrease("y", "-");
        }

        // Nord-Ouest
        if (this.direction == 120)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "-");
            this.moveIncrease("y", "-");
        }

        if (this.direction == 135)
        {
            this.moveIncrease("x", "-");
            this.moveIncrease("y", "-");
        }

        if (this.direction == 150)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "-");
            this.moveIncrease("x", "-");
            this.moveIncrease("y", "-");
        }

        // Sud-Ouest
        if (this.direction == -120)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "-");
            this.moveIncrease("y", "+");
        }

        if (this.direction == -135)
        {
            this.moveIncrease("x", "-");
            this.moveIncrease("y", "+");
        }

        if (this.direction == -150)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "-");
            this.moveIncrease("x", "-");
            this.moveIncrease("y", "+");
        }

        // Sud-Est
        if (this.direction == -30)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "+");
            this.moveIncrease("y", "+");
        }

        if (this.direction == -45)
        {
            this.moveIncrease("x", "+");
            this.moveIncrease("y", "+");
        }

        if (this.direction == -60)
        {
            if (this.moves % 2 == 0)
                this.moveIncrease("x", "+");
            
            this.moveIncrease("x", "+");
            this.moveIncrease("y", "+");
        }
    }

    animate()
    {
        if (this.isUpOrDown() == true || this.isAtPlayer() == true)
            this.direction = this.getOpposite();
        else if (this.isOffLimit() == true)
            this.restartRound();

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