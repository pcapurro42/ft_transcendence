// <<<<<<< GAME >>>>>>> //

// < OBJECTS UTILS > //

function generateNumber(limit)
{
    let value = Math.floor(Math.random() * limit) + 1;
    return (value);
}

function getRandomBallDirection()
{
    value = generateNumber(12);

    if (value == 1)
        return (30);
    else if (value == 2)
        return (45);
    else if (value == 3)
        return (60);
    else if (value == 4)
        return (120);
    else if (value == 5)
        return (135);
    else if (value == 6)
        return (150);

    if (value == 7)
        return (-30);
    else if (value == 8)
        return (-45);
    else if (value == 9)
        return (-60);
    else if (value == 10)
        return (-120);
    else if (value == 11)
        return (-135);
    else if (value == 12)
        return (-150);
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

    isUpOrDown()
    {
        if (this.y <= 0 || this.y + this.height >= this.game.infos.game_height)
            return (true);
        return (false);
    }

    isLeftOrRight()
    {
        if (this.x <= 0 || this.x + this.width >= this.game.infos.game_width)
            return (true);
        return (false);
    }

    isAtPlayer()
    {
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

    isAtLimit()
    {
        if (this.x - 1 <= -1 || this.x + this.width + 1 >= this.game.infos.game_width + 1)
            return (true);
        if (this.y - 1 <= -1 || this.y + this.height + 1 >= this.game.infos.game_height + 1)
            return (true);
        return (false);
    }

    moveIncrease(element, sign)
    {
        if (element == "x")
        {
            if (sign == "-")
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.isAtPlayer() == false && this.isAtLimit() == false)
                        this.x = this.x - 1;
                }
            }
            else
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.isAtPlayer() == false && this.isAtLimit() == false)
                        this.x = this.x + 1;
                }
            }
        }

        if (element == "y")
        {
            if (sign == "-")
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.isAtPlayer() == false && this.isAtLimit() == false)
                        this.y = this.y - 1;
                }
            }
            else
            {
                for (let i = 0; i != this.speed; i++)
                {
                    if (this.isAtPlayer() == false && this.isAtLimit() == false)
                        this.y = this.y + 1;
                }
            }
        }
    }

    move()
    {        
        this.moves++;
        
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

        if (this.isUpOrDown() == true || this.isLeftOrRight() == true || this.isAtPlayer() == true)
            this.direction = this.getOpposite();
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