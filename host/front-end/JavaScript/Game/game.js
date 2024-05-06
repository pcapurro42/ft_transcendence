// <<<<<<< GAME >>>>>>> //

// < OBJECTS UTILS > //

function getRandomBallPos(infos)
{
    let value = generateNumber(4);
    if (value == 1) // left
    {
        x = (infos.game_width / 4) - (infos.ball_width / 2);
        y = infos.game_height / 2 + infos.game_height / 4;
    }
    if (value == 2) // right
    {
        x = (infos.game_width / 2 + infos.game_width / 4) - (infos.ball_width / 2);
        y = infos.game_height / 4;
    }
    if (value == 3) // right
    {
        x = (infos.game_width / 2 + infos.game_width / 4) - (infos.ball_width / 2);
        y = infos.game_height / 2 + infos.game_height / 4;
    }
    if (value == 4) // left
    {
        x = (infos.game_width / 4) - (infos.ball_width / 2);
        y = infos.game_height / 2 - infos.game_height / 4;
    }
    return ([x, y]);
}

// < OBJECT > //

class Ball
{
    constructor(game, width, height, x, y, speed, color, direction)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;

        this.direction = direction;
    }

    print()
    {
        this.game.infos.display.fillRect(this.x, this.y, this.width, this.height);
    }

    getOpposite(value)
    {
        if (value >= 30 && value <= 240)
            return (value + 90);
        else
            return (value - 270);
    }

    isUpOrDown()
    {
        if (this.y <= 0 || this.y >= this.game.infos.game_height || this.y + this.height >= this.game.infos.game_height)
            return (true);
        return (false);
    }

    isAtPlayer()
    {
        if (this.y >= this.game.left_player.y && this.y <= this.game.left_player.y + this.game.left_player.height)
        {
            if (this.x <= this.game.left_player.x + this.game.left_player.width)
                return (true);
        }
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

        let [x, y] = getRandomBallPos(this.game.infos);
        this.x = x;
        this.y = y;
    }

    move()
    {
        // Nord-Est
        if (this.direction == 45)
        {
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
        if (this.direction == 225)
        {
            this.x = this.x - this.speed;
            this.y = this.y + this.speed;
        }

        // Sud-Est
        if (this.direction == 315)
        {
            this.x = this.x + this.speed;
            this.y = this.y + this.speed;
        }

        if (this.isAtPlayer() == true || this.isUpOrDown() == true)
            this.direction = this.getOpposite(this.direction);
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