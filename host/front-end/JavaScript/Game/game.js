/** @type {HTMLCanvasElement} */

let canvas;
let display;

let theme = "black";
let bar_speed = 15;
let bar_height = 105;
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

function displayCenterBar()
{
    display.fillStyle = "white";
    display.fillRect((canvas.width / 2) - (bar_width / 2), 0, 15, canvas.height);
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
        if (this.y != 0)
        {
            displayBackground();
            this.y = this.y - this.speed;
            this.print();
        }
    }

    moveDown()
    {
        if (this.y + bar_height < canvas.height)
        {
            displayBackground();
            this.y = this.y + this.speed;
            this.print();
        }
    }
}

window.addEventListener('keydown', (event) => 
{
    if (event.key == 'ArrowDown')
        left_player.moveDown();
    else if (event.key == 'ArrowUp')
        left_player.moveUp();

    console.log(event.key);

    console.log(left_player.y);

    right_player.print();
});

// < CODE > //

initializeCanvas();
displayBackground();
displayCenterBar();

let left_player = new Bar(bar_width, bar_height, 0 + bar_width, 150, bar_speed, "white");
let right_player = new Bar(bar_width, bar_height, (canvas.width - bar_width) - bar_width, 400, bar_speed, "white");

left_player.print();
right_player.print();