/** @type {HTMLCanvasElement} */

theme = "dark";
// theme = "light";

// < CONSTANTS > //

const game_width = 1100;
const game_height = 720;

const bar_speed = 10;

const bar_height = 100;
const bar_width = 20;

const separator_height = 20;
const separator_width = 10;
const separator_space = 17;

const x_center = game_width / 2;

const x_end = (game_width - infos.bar_width) - infos.bar_width;
const y_middle = (game_height / 2) - infos.bar_height / 2;

// < FUNCTIONS > //

function initializeCanvas()
{
    infos.canvas = document.getElementById('game');
    infos.display = infos.canvas.getContext('2d');
    
    infos.canvas.width = game_width;
    infos.canvas.height = game_height;
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
    infos.display.fillRect(0, 0, game_width, game_height);
}

function displayCenterBar()
{
    let x_bar_center = x_center - (separator_width / 2);
    let nb = ~~(game_height / (separator_height + separator_space));

    infos.display.fillStyle = infos.menu_color;
    for (let value = 0; value != nb; value++)
    {
        infos.display.fillRect(x_bar_center, ((separator_height * value) + separator_space * (value + 1)), separator_width, separator_height);
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

    console.log(game.left_player.getInfo());
    console.log(game.right_player.getInfo());
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