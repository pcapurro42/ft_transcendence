// <<<<<<< GAME >>>>>>> //

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
        this.game.infos.display.fillStyle = this.color;
        this.game.infos.display.fillRect(this.x, this.y, this.width, this.height);
    }

    moveNO()
    {
        this.x = this.x - this.speed;
        this.y = this.y + this.speed;
    }

    moveNE()
    {
        this.x = this.x + this.speed;
        this.y = this.y - this.speed;
    }

    moveSE()
    {
        this.x = this.x + this.speed;
        this.y = this.y + this.speed;
    }

    moveSO()
    {
        this.x = this.x - this.speed;
        this.y = this.y - this.speed;
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

            if (event.key == 'a')
                keys.KeyA = true;
            else if (event.key == 'q')
                keys.KeyQ = true;
        }
        else if (mode == "local1v2")
        {
            if (event.key == 'a')
                keys.KeyA = true;
            else if (event.key == 'q')
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

    if (event.key == 'a')
        keys.KeyA = false;
    else if (event.key == 'q')
        keys.KeyQ = false;

    if (event.key == 'u')
        keys.KeyU = false;
    else if (event.key == 'j')
        keys.KeyJ = false;
});