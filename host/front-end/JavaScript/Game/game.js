/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('game');
let display = canvas.getContext('2d');

canvas.width = 1100;
canvas.height = 720;

// let theme = "black";
theme = "white";

display.fillStyle = theme;
display.fillRect(0, 0, canvas.width, canvas.height);

let bar_speed = 10;

let bar_height = 135;
let bar_width = 30;

class Bar
{
    constructor(width, height, x, y, speed)
    {
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.speed = speed;
    }

    moveUp()
    {
        ;
    }

    moveDown()
    {
        ;
    }

    display()
    {
        display.fillStyle = "green";
        display.fillRect(this.x, this.y, this.width, this.height);
    }
}

let left_player = new Bar(bar_width, bar_height, 0, 150, bar_speed);
left_player.display();

let right_player = new Bar(bar_width, bar_height, canvas.width - bar_width, 400, bar_speed);
right_player.display();