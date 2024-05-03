theme = "dark";
// theme = "light";

// < INFO STRUCT > //

infos = {
    canvas: null,
    /** @type {HTMLCanvasElement} */ display: null,

    game_width: 1100,
    game_height: 720,

    bar_speed: 10,

    bar_height: 100,
    bar_width: 15,

    text_size: 100,
    text_font: 'Arial',

    separator_height: 20,
    separator_width: 3,
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

// < INIT > //

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

// < DISPLAY > //

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
    score_y = infos.game_height / 6;
    left_score_x = (infos.game_width / 4) - infos.text_size / 2;
    right_score_x = (infos.game_width - infos.game_width / 4) - infos.text_size / 4;

    infos.display.font = infos.text_size + "px " + infos.text_font;
    infos.display.fillText(game.scores[0], left_score_x, score_y);
    infos.display.fillText(game.scores[1], right_score_x, score_y);
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
}

function initializeBall()
{
    ;
}

// < REFRESH > //

function refreshPlayerPos(event)
{
    if (event.key == 'ArrowDown')
        game.left_player.moveDown();
    else if (event.key == 'ArrowUp')
        game.left_player.moveUp();

    refreshGameDisplay();

    // console.log(game.left_player.getInfo());
    // console.log(game.right_player.getInfo());
}

function refreshGameDisplay()
{
    displayBackground();
    displayCenterBar();
    displayScores();

    game.left_player.print();
    game.right_player.print();
}

// < TRIGGER > //

window.addEventListener('keydown', (event) => {
    refreshPlayerPos(event); });

// < MAIN CODE > //

initializeCanvas();
initializeColors();

initializePlayers();
initializeBall();

refreshGameDisplay();