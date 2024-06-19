// < initialisation > //

function initializeOnline1v1()
{
    players_nb = 2;
    if (role == 'host')
        game = new OnlineGame1v1_host();
    else
        game = new OnlineGame1v1_guest();
    game.refreshBackground();

}

// < menu display management > //

function displayOnline1v1()
{
	document.getElementById('online_winner').pause();
	document.getElementById('online_loser').pause();
    document.getElementById('o_host_foot').style.display = 'none';
    document.getElementById('o_guest_foot').style.display = 'none';

    if (role == "host")
    {
        document.getElementById('1v1_host_timer').classList.remove('d-none');
        document.getElementById('1v1_host_timer').style.display = "block";
        document.getElementById('h_win_text').style.display = 'none';
        document.getElementById('start_1v1_online').style.visibility = "hidden";

        data_channel.send("go");
    }
    else
    {
        document.getElementById('1v1_guest_timer').classList.remove('d-none');
        document.getElementById('1v1_guest_timer').style.display = "block";
        document.getElementById('g_win_text').style.display = 'none';
        document.getElementById('waiting_host').style.visibility = "hidden";
    }

    displayCountDown(3);
}

function removeOnline1v1()
{
    gameMusicSelector().pause();

    document.getElementById('mgs').play();
    document.getElementById('1v1_host_timer').style.display = "none";
    document.getElementById('1v1_host_timer') = document.getElementById('1v1_guest_timer');
    document.getElementById('1v1_host_timer').style.display = "none";

    document.getElementById('start_1v1_online').innerHTML = getTranslation("Launch a game");
    document.getElementById('start_1v1_online').style.visibility = "visible";

	document.getElementById('waiting_host').style.visibility = 'visible';
    document.getElementById('o_host_foot').style.display = 'block';
    document.getElementById('o_guest_foot').style.display = 'block';
}

function startOnline1v1()
{
    let frame;
    if (role == 'host')
        frame = 1000 / 120;
    else
        frame = 1000 / 120;

    setTimeout(() => {
        if (game.isOver() == true || active == false)
        {
            game.refreshBackground();

            if (game.scores[0] > 9 || game.scores[1] > 9)
            {
                addHistoryEntry(game.player, game.other_player, ([game.scores[0], game.scores[1]]), game.date, (game.end_time - game.start_time), game.scores_time, role);

                if (role == 'host')
                {
                    if (game.scores[0] > 9)
                        localStorage.setItem('onl_victory', (parseInt(localStorage.getItem('onl_victory')) + 1).toString());
                    else
                        localStorage.setItem('onl_defeat', (parseInt(localStorage.getItem('onl_defeat')) + 1).toString());
                    game.ball.onl_received = game.scores[1] + game.ball.onl_return;
                }
                else
                {
                    if (game.scores[1] > 9)
                        localStorage.setItem('onl_victory', (parseInt(localStorage.getItem('onl_victory')) + 1).toString());
                    else
                        localStorage.setItem('onl_defeat', (parseInt(localStorage.getItem('onl_defeat')) + 1).toString());
                    game.ball.onl_received = game.scores[0] + game.ball.onl_return;
                }

                localStorage.setItem('onl_dist', (parseInt(localStorage.getItem('onl_dist')) + game.dist).toString());
                localStorage.setItem('onl_played', (parseInt(localStorage.getItem('onl_played')) + 1).toString());

                localStorage.setItem('onl_ball_received', (parseInt(localStorage.getItem('onl_ball_received')) + game.ball.onl_received).toString());
                localStorage.setItem('onl_ball_return', (parseInt(localStorage.getItem('onl_ball_return')) + game.ball.onl_return).toString());

                if (game.bonus_one != null && game.bonus_two != null)
                {                    
                    localStorage.setItem('onl_bonus_received', (parseInt(localStorage.getItem('onl_bonus_received')) + 2).toString());
                    localStorage.setItem('onl_bonus_taken', (parseInt(localStorage.getItem('onl_bonus_taken')) + game.bonus_one.onl_taken).toString());
                    localStorage.setItem('onl_bonus_taken', (parseInt(localStorage.getItem('onl_bonus_taken')) + game.bonus_two.onl_taken).toString());
                }
            }

            removeOnline1v1();
            game.resetGame();
            active = false;
        }
        else
        {
            game.refreshDisplay();
            requestAnimationFrame(startOnline1v1);
        }
    }, frame);
}
