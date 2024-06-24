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

async function removeOnline1v1()
{
    gameMusicSelector().pause();

    document.getElementById('mgs').play();
    document.getElementById('1v1_host_timer').style.display = "none";
    document.getElementById('1v1_guest_timer').style.display = "none";

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

    setTimeout(async () => {
        if (game.isOver() == true || active == false)
        {
            game.refreshBackground();
            let gameStat = {};

            if (game.scores[0] > 9 || game.scores[1] > 9)
            {
                gameStat['gameHistory'] = addHistoryEntry(game.player, game.other_player, ([game.scores[0], game.scores[1]]), game.date, (game.end_time - game.start_time), game.scores_time, role);
                if (role == 'host')
                {
                    if (game.scores[0] > 9){
                        gameStat['wonGamesNb'] = 1;
                        gameStat['loseGameNb'] = 0;
                        wonGamesNb += 1;
                    }
                    else{
                        gameStat['loseGameNb'] = 1;
                        gameStat['wonGamesNb'] = 0;
                        loseGameNb += 1;
                    }
                    game.ball.onl_received = game.scores[1] + game.ball.onl_return;
                }
                else
                {
                    if (game.scores[1] > 9){
                        gameStat['wonGamesNb'] = 1;
                        gameStat['loseGameNb'] = 0;
                        wonGamesNb += 1;
                    }
                    else{
                        gameStat['loseGameNb'] = 1;
                        gameStat['wonGamesNb'] = 0;
                        loseGameNb += 1;
                    }
                    game.ball.onl_received = game.scores[0] + game.ball.onl_return;
                }
                gameStat['ballDistance'] = game.dist;
                ballDistance += game.dist;

                gameStat['gamesPlayedNb'] = 1;
                gamesPlayedNb += 1;

                gameStat['ballReceived'] = game.ball.onl_received;
                ballReceived += game.ball.onl_received;

                gameStat['ballReturned'] = game.ball.onl_return;
                ballReturned += game.ball.onl_return;

                if (game.bonus_one != null && game.bonus_two != null)
                {
                    gameStat['bonusTotal'] = 2;
                    bonusTotal += 2;

                    gameStat['bonusTaken'] = game.bonus_one.onl_taken + game.bonus_two.onl_taken;
                    bonusTaken += gameStat['bonusTaken']
                }
                else{
                    gameStat['bonusTotal'] = 0;
                    gameStat['bonusTaken'] = 0;
                }
            }
            removeOnline1v1();
            game.resetGame();
            active = false;
            await storeOnlineStats(gameStat);
        }
        else
        {
            game.refreshDisplay();
            requestAnimationFrame(startOnline1v1);
        }
    }, frame);
}
