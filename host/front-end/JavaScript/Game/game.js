/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('game');
let display = canvas.getContext('2d');

canvas.width = 1100;
canvas.height = 720;

let theme = "black";
// theme = "white";

display.fillStyle = theme;
display.fillRect(0, 0, canvas.width, canvas.height);

let bar_speed = 30;

let bar_height = 100;
let bar_width = 30;

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

    display()
    {
        display.fillStyle = this.color;
        display.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        console.log("ok");
        this.y = this.y + this.speed;
        this.display();
    }

    moveDown()
    {
        console.log("ok2");
        this.y = this.y - this.speed;
        this.display();
    }
}

let left_player = new Bar(bar_width, bar_height, 0, 150, bar_speed, "white");
left_player.display();

let right_player = new Bar(bar_width, bar_height, canvas.width - bar_width, 400, bar_speed, "white");
right_player.display();

window.addEventListener('keyup', left_player.moveUp());
window.addEventListener('keydown', left_player.moveDown());