// < PowerUp class > //

class PowerUp
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
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    // < Verifyers > //

    isAtPlayer() //
    {
        return (false);
    }

    isAtBall()
    {
        ;
    }

    isUpOrDown()
    {
        if (this.y <= 0 || this.y + this.height >= this.game.game_height)
            return (true);
        return (false);
    }

    isLeftOrRight()
    {
        return (false);
    }

    isAtLimits()
    {
        if (this.isUpOrDown() == true || this.isLeftOrRight() == true)
            return (true);
        return (false);
    }

    shouldStop()
    {
        return (false);
    }

    // < Calculators > //

    getOpposite()
    {
        if (this.isUpOrDown() == true)
            return (this.direction * (-1));
        else if (this.isLeftOrRight() == true)
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

    // < Animate > //

    move()
    {
        let x_dir = this.calculateNewDirections()[0];
        let y_dir = this.calculateNewDirections()[1];

        x_dir = Math.round(x_dir * 100) / 100;
        y_dir = Math.round(y_dir * 100) / 100;

        for (let i = 0; this.shouldStop() == false && i != (this.speed + this.bonus_speed); i++)
        {
            this.x = this.x + x_dir;
            this.y = this.y + y_dir;
        }
    }

    ApplyPlayerBonus()
    {
        ;
    }

    ApplyBallBonus()
    {
        ;
    }

    reset()
    {
        this.x = this.game.game_width / 2 - (this.game.ball_width / 2);
        this.y = this.game.game_height / 2 - (this.game.ball_width / 2);

        this.direction = getRandomBallDirection();
    }

    animate()
    {
        if (this.isAtLimits() == true)
            this.direction = this.getOpposite();
        else if (this.isAtPlayer() == true)
            this.ApplyPlayerBonus(), this.reset();
        else if (this.isAtBall() == true)
            this.ApplyBallBonus(), this.reset();

        this.move();
    }
}
