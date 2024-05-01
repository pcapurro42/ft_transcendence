/** @type {HTMLCanvasElement} */

let canvas;
let display;

let theme = "black";
let bar_speed = 30;
let bar_height = 100;
let bar_width = 30;
let bar_color = "white";

function initializeCanvas()
{
    canvas = document.getElementById('game');
    display = canvas.getContext('2d');

    canvas.width = 1100;
    canvas.height = 720;
}

function displayBackground()
{
    display.fillStyle = theme;
    display.fillRect(0, 0, canvas.width, canvas.height);
}

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
        display.fillStyle = bar_color;
        display.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        this.y = this.y + this.speed;
        this.print();
    }

    moveDown()
    {
        this.y = this.y - this.speed;
        this.print();
    }
}

window.addEventListener('keyup', (event) => {
    left_player.moveUp();
});

window.addEventListener('keydown', (event) => {
    left_player.moveDown();
});

// < CODE > //

initializeCanvas();
displayBackground();

let left_player = new Bar(bar_width, bar_height, 0, 150, bar_speed, "white");
let right_player = new Bar(bar_width, bar_height, canvas.width - bar_width, 400, bar_speed, "white");

left_player.print();
right_player.print();