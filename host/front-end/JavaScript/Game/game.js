/** @type {HTMLCanvasElement} */

// < INFO STRUCT > //

infos = {
    canvas: null,
    display: null,

    screen_width: 1100,
    screen_heigth: 720,

    theme: 'black',

    bar_speed: 10,
    bar_height: 100,
    bar_width: 20,

    bar_color: 'white'
}

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
        console.log(this.y);
    }

    moveDown()
    {
        if (this.y + infos.bar_height < infos.height)
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

// < FUNCTIONS > //

infos.canvas = document.getElementById('game');
infos.display = infos.canvas.getContext('2d');

infos.canvas.width = infos.screen_width;
infos.canvas.height = infos.screen_heigth;

function displayBackground()
{
    infos.display.fillStyle = infos.theme;
    infos.display.fillRect(0, 0, infos.screen_width, infos.screen_height);

    displayCenterBar();
}

function displayCenterBar()
{
    infos.display.fillStyle = "white";
    infos.display.fillRect((infos.width / 2) - (infos.bar_width / 2), 20, 10, infos.height - 40);
}

// window.addEventListener('keydown', (event) => 
// {
//     if (event.key == 'ArrowDown')
//         left_player.moveDown();
//     else if (event.key == 'ArrowUp')
//         left_player.moveUp();

//     console.log(left_player.getInfo());
//     console.log(right_player.getInfo());

//     right_player.print();
// });

// < CONSTANTS > //

// const x_end = (infos.width - infos.bar_width) - infos.bar_width;
// const y_middle = (infos.height / 2) - infos.bar_height / 2;

// < CODE > //

displayBackground();

// let left_player = new Bar(infos.bar_width, infos.bar_height, 0 + infos.bar_width, y_middle, infos.bar_speed, "white");
// let right_player = new Bar(infos.bar_width, infos.bar_height, x_end, y_middle, infos.bar_speed, "white");

// left_player.print();
// right_player.print();