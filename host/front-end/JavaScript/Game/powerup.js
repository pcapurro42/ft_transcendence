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

        this.alive = true;
    }

    print()
    {
        this.game.display.fillStyle = this.color;
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    // < Verifyers > //

    isAtPlayer() //
    {
        if (this.y + this.height >= this.game.left_player.y && this.y <= this.game.left_player.y + this.game.left_player.height)
        {
            if (this.x <= this.game.left_player.x + this.game.left_player.width)
                return (true);
        }
        if (this.y + this.height >= this.game.right_player.y && this.y <= this.game.right_player.y + this.game.right_player.height)
        {
            if (this.x + this.width >= this.game.right_player.x)
                return (true);
        }
        return (false);
    }

    isAtBall()
    {
        if (this.y + this.height >= this.game.ball.y && this.y <= this.game.ball.y + this.game.ball.height)
        {
            if (this.x + this.width >= this.game.ball.x && this.x + this.width <= this.game.ball.x + (this.game.ball.width / 2))
                return (true);
            if (this.x <= this.game.ball.x + this.game.ball.width && this.x >= this.game.ball.x + (this.game.ball.width / 2))
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

    isLeftOrRight()
    {
        if (this.x <= 0 || this.x + this.width >= this.game.game_width)
            return (true);
        return (false);
    }

    isAtLimits()
    {
        if (this.isUpOrDown() == true || this.isLeftOrRight() == true)
            return (true);
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

    ApplyPlayerBonus()
    {
        let value = generateNumber(2);
        let player;
        
        if (this.x <= this.game.game_width / 2)
            player = this.game.left_player;
        else
            player = this.game.right_player;

        if (value == 1)
            player.speed = player.speed * 2;
        else
            player.height = player.height * 2;
    }

    ApplyBallBonus()
    {
        this.game.ball.speed = this.game.ball.speed++;
    }

    reset()
    {
        this.x = this.game.game_width / 2 - (this.game.ball_width / 2);
        this.y = this.game.game_height / 2 - (this.game.ball_width / 2);

        this.direction = getRandomBallDirection();
        this.alive = true;
    }

    move()
    {
        let x_dir = this.calculateNewDirections()[0];
        let y_dir = this.calculateNewDirections()[1];

        x_dir = Math.round(x_dir * 100) / 100;
        y_dir = Math.round(y_dir * 100) / 100;

        for (let i = 0; i != this.speed && this.isAtLimits() == false ; i++)
        {
            this.x = this.x + x_dir;
            this.y = this.y + y_dir;
        }
    }

    getAwayFromLimits()
    {
        if (this.isUpOrDown() == true)
        {
            if (this.y <= 0)
                this.y = this.y + 1;
            else
                this.y = this.y - 1;
        }
        else
        {
            if (this.x <= 0)
                this.x = this.x + 1;
            else
                this.x = this.x - 1;
        }
    }

    animate()
    {
        if (this.isAtLimits() == true)
            this.direction = this.getOpposite(), this.getAwayFromLimits();
        else if (this.isAtPlayer() == true)
            this.ApplyPlayerBonus(), this.alive = false;
        else if (this.isAtBall() == true)
            this.ApplyBallBonus(), this.alive = false;

        this.move();
    }
}
