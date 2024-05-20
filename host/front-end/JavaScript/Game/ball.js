// < Ball class > //

class Ball
{
    constructor(game, width, height, x, y, speed, color, direction, bonus_speed)
    {
        this.game = game;

        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;

        this.color = color;

        this.direction = direction;
        this.bonus_speed = bonus_speed;

        this.bounce = true;
    }

    print()
    {
        this.game.display.fillStyle = this.color;
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    // < Verifyers > //

    isAtPlayer() //
    {
        if (this.isAcrossPlayer() == true)
            return (true);
        if (this.isAboveOrUnderPlayer() == true || this.isFrontPlayer() == true)
            return (true);
        return (false);
    }

    isAcrossPlayer()
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

    isFrontPlayer()
    {
        if (Math.ceil(this.x) == this.game.left_player.x + this.game.left_player.width)
        {
            if (this.y + this.height >= this.game.left_player.y && this.y <= this.game.left_player.y + this.game.left_player.height)
                return (true);
        }

        if (Math.ceil(this.x) + this.width == this.game.right_player.x)
        {
            if (this.y + this.height >= this.game.right_player.y && this.y <= this.game.right_player.y + this.game.right_player.height)
                return (true);
        }
        return (false);
    }

    isAboveOrUnderPlayer()
    {
        if (this.x + this.width >= this.game.left_player.x && this.x <= this.game.left_player.x + this.game.left_player.width)
        {
            if (Math.ceil(this.y) + this.height == this.game.left_player.y)
                return (true);
            if (Math.ceil(this.y) == this.game.left_player.y + this.game.left_player.height)
                return (true);
        }
        if (this.x + this.width >= this.game.right_player.x && this.x <= this.game.right_player.x + this.game.right_player.width)
        {
            if (Math.ceil(this.y) + this.height == this.game.right_player.y)
                return (true);
            if (Math.ceil(this.y) == this.game.right_player.y + this.game.right_player.height)
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

    isOffLimit()
    {
        if (this.x + this.width < 0 || this.x > this.game.game_width)
            return (true);
        if (this.y + this.height < 0 || this.y > this.game.game_height)
            return (true);
        return (false);
    }

    // < Extras > //

    addExtraDirection() //
    {
        if (this.x < this.game.game_width / 2)
        {
            if (keys.KeyE == true)
                this.direction = this.direction + 5;
            else if (keys.KeyD == true)
                this.direction = this.direction - 5;
        }
        else
        {
            if (keys.ArrowUp == true)
                this.direction = this.direction + 5;
            else if (keys.ArrowDown == true)
                this.direction = this.direction - 5;
        }
    }

    addExtraSpeed() //
    {
        if (this.bonus_speed == 3)
            return ;

        if (this.x < this.game_width / 2)
        {
            if (keys.ArrowUp == true || keys.ArrowDown == true)
                this.bonus_speed++;
        }
        else
        {
            if (keys.KeyE == true || keys.KeyD == true)
                this.bonus_speed++;
        }
    }

    // < Calculate > //

    getOpposite()
    {
        if (this.isUpOrDown() == true || this.isAboveOrUnderPlayer() == true)
            return (this.direction * (-1));
        else if (this.isAboveOrUnderPlayer() == true && this.bounce == true)
        {
            this.bounce = false;
            return (this.direction * (-1));
        }
        else if (this.isFrontPlayer() == true)
        {
            this.addExtraDirection();
            this.addExtraSpeed();

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

        // console.log(x_dir);
        // console.log(y_dir);

        for (let i = 0; this.isAtPlayer() == false && i != (this.speed + this.bonus_speed); i++)
        {
            this.x = this.x + x_dir;
            this.y = this.y + y_dir;
        }
    }

    getAwayFromPlayers()
    {
        if (this.isFrontPlayer() == true)
        {
            if (this.x < this.game.game_width / 2)
                this.x = this.x + this.speed;
            else
                this.x = this.x - this.speed;
        }
        if (this.isAboveOrUnderPlayer() == true)
        {
            if (Math.ceil(this.y) + this.height == this.game.left_player.y || Math.ceil(this.y) + this.height == this.game.right_player.y)
                this.y = this.y - this.speed;
            else
                this.y = this.y + this.speed;
        }
    }

    reset()
    {
        this.x = this.game.game_width / 2 - (this.game.ball_width / 2);
        this.y = this.game.game_height / 2 - (this.game.ball_width / 2);

        this.direction = getRandomBallDirection();
        this.speed = this.game.ball_speed;
        this.bonus_speed = 0;

        if (this.bounce == false)
            this.bounce = true;
    }

    animate()
    {
        if (this.isOffLimit() == true)
            this.game.restartRound();
        else if (this.isUpOrDown() == true || this.isAtPlayer() == true)
            this.direction = this.getOpposite(), this.getAwayFromPlayers();

        this.move();
    }
}
