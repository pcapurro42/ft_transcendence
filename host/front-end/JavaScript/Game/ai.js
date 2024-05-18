function displayGamePage_ai()
{
    let game_toolbar = document.getElementById('game_toolbar');
    let game_page_ai = document.getElementById('game_page_ai');
    let main_page = document.getElementById('main_page');
    let player_left_won = document.getElementById('you_won_text');
    player_left_won.style.display = "none";

    let player_right_won = document.getElementById('ai_won_text');
    player_right_won.style.display = "none";

    main_page.style.display = "none";
    game_toolbar.style.display = "block";
    game_page_ai.style.display = "block";
}

function ai()
{
    displayGamePage_ai();
}

// function displayVsAi()
// {
//     let start_btn = document.getElementById('start_vs_ai');
//     start_btn.style.visibility = "hidden";


//     let timer = document.getElementById('ai_local_timer');
//     timer.style.display = "block";

//     type = 'ai';
//     ai_displayCountDown(3);
// }

// function removeVsAi()
// {
//     let timer = document.getElementById('ai_local_timer');
//     timer.style.display = "none";

//     let start_btn = document.getElementById('vs_ai_local');
//     start_btn.innerHTML = getTranslation("Launch a game");
//     start_btn.style.visibility = "visible";
// }

// function ai_displayCountDown(nb)
// {
//     let timer = document.getElementById('ai_local_timer');
//     if (nb == 3)
//         timer.innerHTML = "3";
//     else if (nb == 2)
//         timer.innerHTML = "2";
//     else if (nb == 1)
//         timer.innerHTML = "1";
//     else if (nb == 0)
//         timer.innerHTML = getTranslation("Go!")
//     else if (nb == -1)
//     {
//         timer.style.display = "none";
//         active = true;
//         startLocal1v1();
//         return ;
//     }
//     console.log(nb)
//     setTimeout(ai_displayCountDown, 1000, --nb);
// }
