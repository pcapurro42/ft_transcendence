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

        this.bonus = false;
        this.bonus_message = 0;
    }

    print()
    {
        this.game.display.fillStyle = this.color;
        this.game.display.fillRect(this.x, this.y, this.width, this.height);
    }

    // < Verifyers > //

    isAtPlayer() //
    {
        let player;
        
        if (this.x <= this.game.game_width / 2)
            player = this.game.left_player;
        else
        {
            if (players_nb == 2)
                player = this.game.right_player;
            else
            {
                if (this.y < this.game.game_height / 2)
                    player = this.game.right_player_1;
                else
                    player = this.game.right_player_2;
            }
        }

        if (this.y + this.height >= player.y && this.y <= player.y + player.height)
        {
            if (this.x <= player.x + player.width && this.x >= player.x + (player.width / 2))
                return (true);
            if (this.x + this.width >= player.x && this.x + this.width <= player.x + (player.width / 2))
                return (true);
        }
        if (this.x + this.width >= player.x && this.x <= player.x + player.width)
        {
            if (this.y <= player.y + player.height && this.y + this.height >= player.y + (player.height / 2))
                return (true);
            if (this.y + this.height >= player.y && this.y + this.height <= player.y + (player.height / 2))
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

    displayBonusMessage()
    {
        this.game.display.font = this.game.text_size / 4 + "px " + this.game.text_font;
        this.game.display.fillStyle = "green";

        if (this.object == "ball")
            this.game.display.fillText("+" + getTranslation("speed"), this.game.ball.x + this.game.ball.x + 25, this.game.ball.y);
        else
        {
            if (this.object == "left" && players_nb == 2)
            {
                if (this.value == 1)
                    this.game.display.fillText("+" + getTranslation("speed"), this.game.left_player.x + this.game.left_player.width + 25, this.game.left_player.y);
                else
                    this.game.display.fillText("-" + getTranslation("size"), this.game.right_player.x + this.game.right_player.width + 25, this.game.right_player.y);
            }
            if (this.object == "right" && players_nb == 2)
            {
                if (this.value == 1)
                    this.game.display.fillText("+" + getTranslation("speed"), this.game.right_player.x - 25, this.game.right_player.y);
                else
                    this.game.display.fillText("-" + getTranslation("size"), this.game.left_player.x + this.game.left_player.width + 25, this.game.left_player.y);
            }
            if (this.object == "left" && players_nb == 3)
            {
                if (this.value == 1)
                    this.game.display.fillText("+" + getTranslation("speed"), this.game.left_player.x + this.game.left_player.width + 25, this.game.left_player.y);
                else
                    this.game.display.fillText("-" + getTranslation("size"), this.game.right_player_1.x + this.game.right_player_1.width + 25, this.game.right_player_1.y), this.game.display.fillText("-" + getTranslation("size"), this.game.right_player_2.x + this.game.right_player_2.width + 25, this.game.right_player_2.y);
            }
            if (this.object == "right1")
            {
                if (this.value == 1)
                    this.game.display.fillText("+" + getTranslation("speed"), this.game.right_player_1.x - 25, this.game.right_player_1.y);
                else
                    this.game.display.fillText("-" + getTranslation("size"), this.game.left_player.x + this.game.left_player.width + 25, this.game.left_player.y);
            }
            if (this.object == "right2")
            {
                if (this.value == 1)
                    this.game.display.fillText("+" + getTranslation("speed"), this.game.right_player_2.x + - 25, this.game.right_player_2.y);
                else
                    this.game.display.fillText("-" + getTranslation("size"), this.game.left_player.x + this.game.left_player.width + 25, this.game.left_player.y);
            }
        }
    }

    displayBonus()
    {
        if (this.bonus == true)
        {
            if (this.bonus_message < 250)
                this.displayBonusMessage(), this.bonus_message++;
            else
                this.bonus = false;
        }
    }

    applyPlayerBonus()
    {
        let value = generateNumber(2);
        
        if (players_nb == 2)
        {
            if (this.x <= this.game.game_width / 2)
            {
                if (value == 1)
                    this.game.left_player.speed = this.game.left_player.speed * 2;
                else
                    this.game.right_player.height = this.game.right_player.height - 40;
                this.object = "left";
            }
            else
            {
                if (value == 1)
                    this.game.right_player.speed = this.game.right_player.speed * 2;
                else
                    this.game.left_player.height = this.game.left_player.height - 40;
                this.object = "right";
            }
        }

        if (players_nb == 3)
        {
            if (this.x <= this.game.game_width / 2)
            {
                if (value == 1)
                    this.game.left_player.speed = this.game.left_player.speed * 2;
                else
                    this.game.right_player_1.height = this.game.right_player_1.height - 40, this.game.right_player_2.height = this.game.right_player_2.height - 40;
                this.object = "left";
            }
            else
            {
                if (this.y < this.game.game_height / 2)
                {
                    if (value == 1)
                        this.game.right_player_1.speed = this.game.right_player_1.speed * 2;
                    else
                        this.game.left_player.height = this.game.left_player.height - 40;
                    this.object = "right1";
                }
                else
                {
                    if (value == 1)
                        this.game.right_player_2.speed = this.game.right_player_2.speed * 2;
                    else
                        this.game.left_player.height = this.game.left_player.height - 40;
                    this.object = "right2";
                }
            }
        }
        this.bonus = true;
        this.bonus_message = 0;
    }

    applyBallBonus()
    {
        this.game.ball.speed = this.game.ball.speed + 2;
        
        this.object = "ball";
        this.bonus = true;
        this.bonus_message = 0;
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
            this.applyPlayerBonus(), this.alive = false;
        else if (this.isAtBall() == true)
            this.applyBallBonus(), this.alive = false;

        this.move();
    }
}
