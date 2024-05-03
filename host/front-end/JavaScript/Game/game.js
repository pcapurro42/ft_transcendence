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
    }

    moveDown()
    {
        if (this.y + infos.bar_height < infos.game_height)
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

class Ball
{
    ;
}