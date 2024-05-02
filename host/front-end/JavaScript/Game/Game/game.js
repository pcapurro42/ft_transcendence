/** @type {HTMLCanvasElement} */

// < CONSTANTS > //

const game_width = 1100;
const game_height = 720;

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

function displayBackground()
{
    infos.display.fillStyle = infos.theme;
    infos.display.fillRect(0, 0, game_width, game_height);

    displayCenterBar();
}

function displayCenterBar()
{
    infos.display.fillStyle = "white";
    infos.display.fillRect((game_width / 2) - (infos.bar_width / 2), 20, 10, game_height - 40);
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

window.addEventListener('keydown', (event) => 
{
    if (event.key == 'ArrowDown')
        game.left_player.moveDown();
    else if (event.key == 'ArrowUp')
        game.left_player.moveUp();

    console.log(game.left_player.getInfo());
    console.log(game.right_player.getInfo());

    game.right_player.print();
});

// < MAIN CODE > //

initializeCanvas();

displayBackground();

initializePlayers();
initializeBall();