// < Initialisation > //

function initializeOnline1v1()
{
    players_nb = 1;
    if (role == 'host')
        game = new OnlineGame1v1_host();
    else
        game = new OnlineGame1v1_guest();
    game.initialize();
    game.refreshBackground();
    active = true;

}

// < Menu display management > //

function displayOnline1v1()
{
    let timer = document.getElementById('1v1_online_timer');
    timer.classList.remove('d-none');
    timer.style.display = "block";
	document.getElementById('online_winner').pause();
	document.getElementById('online_loser').pause();

    if (role == "host")
    {
		let won_msg = document.getElementById('h_win_text');
        won_msg.style.display = 'none';

        let start_btn = document.getElementById('start_1v1_online');
        start_btn.style.visibility = "hidden";
        data_channel.send("go");
    }
    else
    {
		let won_msg = document.getElementById('g_win_text');
        won_msg.style.display = 'none';

        let waiting_msg = document.getElementById('waiting_host');
        waiting_msg.style.visibility = "hidden";
    }

    displayCountDown(3);
}

function removeOnline1v1()
{
    let menu_music = document.getElementById('mgs');
    let game_music = gameMusicSelector();

    game_music.pause();
    menu_music.play();
    let timer = document.getElementById('1v1_online_timer');
    timer.style.display = "none";

    let start_btn = document.getElementById('start_1v1_online');
    start_btn.innerHTML = getTranslation("Launch a game");
    start_btn.style.visibility = "visible";

	let waiting_host = document.getElementById('waiting_host')
	waiting_host.style.visibility = 'visible';
}

function startOnline1v1()
{
    const frame = 1000 / 120; //=120fps
    setTimeout(() => {
        if (game.isOver() == true || active == false)
        {
            game.refreshBackground();
            game.resetGame();
            active = false;

            localStorage.setItem('onl_played', (parseInt(localStorage.getItem('onl_played')) + 1).toString());

            removeOnline1v1();
        }
        else
        {
            game.refreshDisplay();
            requestAnimationFrame(startOnline1v1);
        }
    }, frame);
}
