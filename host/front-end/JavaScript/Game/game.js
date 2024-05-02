/** @type {HTMLCanvasElement} */

theme = "dark";
// theme = "light";

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
    }

    moveDown()
    {
        if (this.y + infos.bar_height < infos.game_height)
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

// < INFO STRUCT > //

infos = {
    canvas: null,
    display: null,

    game_width: 1100,
    game_height: 720,

    bar_speed: 10,

    bar_height: 100,
    bar_width: 20,

    separator_height: 20,
    separator_width: 10,
    separator_space: 17,

    menu_color: null,
    background_color: null,
    bar_color: null
}

// < GAME STRUCT > //

game = {
    left_player: null,
    right_player: null,

    ball: null,

    scores: [0, 0]
}

// < CONSTANTS > //

const x_center = infos.game_width / 2;

const x_end = (infos.game_width - infos.bar_width) - infos.bar_width;
const y_middle = (infos.game_height / 2) - infos.bar_height / 2;

// < FUNCTIONS > //

function initializeCanvas()
{
    infos.canvas = document.getElementById('game');
    infos.display = infos.canvas.getContext('2d');
    
    infos.canvas.width = infos.game_width;
    infos.canvas.height = infos.game_height;
}

function initializeColors()
{
    if (theme == "dark")
    {
        infos.menu_color = 'white';
        infos.background_color = 'black';
        infos.bar_color = 'white';
    }
    else
    {
        infos.menu_color = 'black';
        infos.background_color = 'white';
        infos.bar_color = 'black';
    }
}

function displayBackground()
{
    infos.display.fillStyle = infos.background_color;
    infos.display.fillRect(0, 0, infos.game_width, infos.game_height);
}

function displayCenterBar()
{
    let x_bar_center = x_center - (infos.separator_width / 2);
    let nb = ~~(infos.game_height / (infos.separator_height + infos.separator_space));

    infos.display.fillStyle = infos.menu_color;
    for (let value = 0; value != nb; value++)
    {
        infos.display.fillRect(x_bar_center, ((infos.separator_height * value) + infos.separator_space * (value + 1)), infos.separator_width, infos.separator_height);
    }
}

function displayScores()
{
    ;
}

function initializePlayers()
{
    left_player_data = {
        object_width: infos.bar_width,
        object_heigth : infos.bar_height,

        map_x: 0 + infos.bar_width,
        map_y: y_middle,

        bar_speed: infos.bar_speed,
        color: "white"
    }

    right_player_data = {
        object_width: infos.bar_width,
        object_heigth : infos.bar_height,

        map_x: x_end,
        map_y: y_middle,

        bar_speed: infos.bar_speed,
        color: "white"
    }

    game.left_player = new Bar(...Object.values(left_player_data));
    game.right_player = new Bar(...Object.values(right_player_data));

    game.left_player.print();
    game.right_player.print();
}

function initializeBall()
{
    ;
}

function refreshGameDisplay(event)
{
    if (event.key == 'ArrowDown')
        game.left_player.moveDown();
    else if (event.key == 'ArrowUp')
        game.left_player.moveUp();

    game.right_player.print();
    
    displayCenterBar();
    displayScores();

    // console.log(game.left_player.getInfo());
    // console.log(game.right_player.getInfo());
}

window.addEventListener('keydown', (event) => {
    refreshGameDisplay(event); });

// < MAIN CODE > //

initializeCanvas();
initializeColors();

displayBackground();
displayCenterBar();

initializePlayers();
initializeBall();