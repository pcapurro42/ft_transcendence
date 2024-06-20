function displayTournamentGame()
{
    let start_btn = document.getElementById('t_start_game');
    start_btn.style.display = "none";
    stopKeysAnim();

    let timer = document.getElementById('tournament_timer');
    timer.style.display = "block";
    document.getElementById('t_leaderboard').classList.add('d-none');
	type = 'tournament';
    initializeLocal1v1();
    tournamentDisplayCountDown(3);
}

function removeTournamentGame()
{
    document.getElementById('mgs').play();
    
    gameMusicSelector().pause();

    document.getElementById('tournament_timer').style.display = "none";
    document.getElementById('t_next_game').style.display = "block";
}

function displayTournamentLeaderboard(){
    let round_clone = document.getElementById('leaderboard_wrap').cloneNode(true);
    round_clone.id = 'm_leaderboard_body';
    round_clone.style.transition = '';
    document.getElementById('leaderboard_body').appendChild(round_clone);
    round_clone.querySelectorAll('[id]').forEach(element => {
            element.id = "m_" + element.id;
            element.style.transition = '';
            if (element.classList.contains('game_nbr'))
                if (element.nextElementSibling.innerHTML.startsWith(' undefined')){
                    element.nextElementSibling.remove()
                    element.remove();
                }
        }
    );

    let round_block = document.getElementById('m_round_block');
    let curr_match;
    switch (nicknames.length){
        case 16:
            round_block.innerHTML = getTranslation('Round of 16');
            curr_match = document.getElementById('m_Roundof16')
            break;
        case 8:
            round_block.innerHTML = getTranslation('Final 8');
            curr_match = document.getElementById('m_Final8');
            break;
        case 4:
            round_block.innerHTML = getTranslation('Final 4');
            curr_match = document.getElementById('m_Final4')
            break;
        case 2:
            round_block.innerHTML = getTranslation('Final');
            curr_match = document.getElementById('m_Final')
            break;
    }
    if (winner_array.length){
            let games = curr_match.querySelectorAll('p');
        for (let i = 0; i < winner_array.length; i++){
            for (let c = 0; c <= i; c++){
                games[c].innerHTML = games[c].innerHTML.replace
                (` ${winner_array[i]} `, `${winner_array[i]} ` + getTranslation('Qualified'));

                games[c].innerHTML = games[c].innerHTML.replace(` ${loser_array[i]} `, `${loser_array[i]} ` + getTranslation('Eliminated'));
                games[c].innerHTML = games[c].innerHTML.replace('vs', ' ');
            }
        }
    }
    round_block.style.opacity = '1';
    curr_match.classList.add('visible');
    document.getElementById('leaderboard_modal').style.display = 'block'
    curr_match.classList.remove('d-none');

    document.getElementById('m_nick_announce').classList.add('d-none');
    document.getElementById('m_Roundof16').classList.add('w-75');
    document.getElementById('m_Roundof16').classList.add('mx-auto');
    document.getElementById('m_tournament_announcer').classList.remove('security_margin');
    document.getElementById('close_leaderboard').onclick = () => {removeTournamentLeaderboard()};
    document.querySelectorAll('button:not(.not-disabled), a').forEach(element => {element.setAttribute('disabled', true)});
}

function removeTournamentLeaderboard(){
    let del = document.getElementById('leaderboard_body').querySelectorAll('[id]');

    for (let i = 1; i < del.length; i++)
        del[i].remove();

    document.querySelectorAll('button:not(.not-disabled), a').forEach(element => {element.removeAttribute('disabled')});
    document.getElementById('leaderboard_modal').style.display="none";
}

function tournamentDisplayCountDown(nb)
{
    active = true;
    let timer = document.getElementById('tournament_timer');

    if (nb == 3){
        document.getElementById('mgs').pause();
        document.getElementById('3_sound').play();
        timer.innerHTML = "3";
    }
    else if (nb == 2){
        document.getElementById('2_sound').play();
        timer.innerHTML = "2";
    }
    else if (nb == 1){
        document.getElementById('1_sound').play();
        timer.innerHTML = "1";
    }
    else if (nb == 0)
        timer.innerHTML = getTranslation("Go!");
    else if (nb == -1)
    {
        document.getElementById('mgs').pause();
        gameMusicSelector().play();
        timer.style.display = "none";
        addKeyboardMonitoring();
        startLocal1v1();
        return ;
    }
    setTimeout(tournamentDisplayCountDown, 1000, --nb);
}

function tournamentLeftWin(){
    let player_left = document.getElementById('nick_reminder');
    player_left.innerHTML = player_left.innerHTML.trim(' ');
    gameLoser = player_left.innerHTML.substring(player_left.innerHTML.indexOf(' ', player_left.innerHTML.indexOf(' ') + 1) + 1)
    player_left.innerHTML = player_left.innerHTML.substring(0, player_left.innerHTML.indexOf(' ')) + " won the game!";

    gameWinner = player_left.innerHTML.substring(0, player_left.innerHTML.indexOf(' '))

}

function tournamentRightWin(){
    let player_right = document.getElementById('nick_reminder');
    player_right.innerHTML = player_right.innerHTML.trim(' ');
    gameLoser = player_right.innerHTML.substring(0, player_right.innerHTML.indexOf(' '))
    player_right.innerHTML = player_right.innerHTML.substring(player_right.innerHTML.indexOf(' ', player_right.innerHTML.indexOf(' ') + 1) + 1) + " won the game!";
    gameWinner = player_right.innerHTML.substring(0, player_right.innerHTML.indexOf(' '));
}
