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

window.addEventListener('keydown', (event) => 
{
    if (event.key == 'ArrowDown')
        left_player.moveDown();
    else if (event.key == 'ArrowUp')
        left_player.moveUp();

    console.log(left_player.getInfo());
    console.log(right_player.getInfo());

    right_player.print();
});

// < CODE > //

initializeCanvas();
displayBackground();

let left_player = new Bar(infos.bar_width, infos.bar_height, 0 + infos.bar_width, y_middle, infos.bar_speed, "white");
let right_player = new Bar(infos.bar_width, infos.bar_height, x_end, y_middle, infos.bar_speed, "white");

left_player.print();
right_player.print();