// < Player class > //

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

    moveUp()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y > 0 && this.game.ball.isAboveOrUnderPlayer() == false)
            {
                this.y = this.y - 1;
                this.print();
            }
        }
    }

    moveDown()
    {
        for (let i = 0; i != this.speed; i++)
        {
            if (this.y + this.height < this.game.game_height && this.game.ball.isAboveOrUnderPlayer() == false)
            {
                this.y = this.y + 1;
                this.print();
            }
        }
    }

    reset()
    {
        if (this.x < this.game.game_width / 2)
        {
            this.x = 0 + this.game.bar_width;
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
        else
        {
            this.x = ((this.game.game_width - this.game.bar_width) - this.game.bar_width);
            this.y = ((this.game.game_height / 2) - this.game.bar_height / 2);
        }
    }

    getInfo()
    {
        return ([this.x, this.y]);
    }
}
