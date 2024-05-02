/** @type {HTMLCanvasElement} */

theme = "dark";
// theme = "light";

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