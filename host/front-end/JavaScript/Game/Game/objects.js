// < OBJECT > //

class Bar
{
    constructor(width, height, x, y, speed, color)
    {
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;
    }

    print()
    {
        infos.display.fillStyle = infos.bar_color;
        infos.display.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        if (this.y > 0)
        {
            displayBackground();
            this.y = this.y - this.speed;
            this.print();
        }
        console.log(this.y);
    }

    moveDown()
    {
        if (this.y + infos.bar_height < game_height)
        {
            displayBackground();
            this.y = this.y + this.speed;
            this.print();
        }
    }

    getInfo()
    {
        return ([this.x, this.y]);
    }
}

// < INFO STRUCT > //

infos = {
    canvas: null,
    display: null,

    theme: 'black',

    bar_speed: 10,
    bar_height: 100,
    bar_width: 20,

    bar_color: 'white'
}

// < GAME STRUCT > //

game = {
    left_player: null,
    right_player: null,

    ball: null
}