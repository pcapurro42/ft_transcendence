function initializeDataAuths()
{
    if (localStorage.getItem('data_anonymize') == null)
        localStorage.setItem('data_anonymize', 'false');

    if (localStorage.getItem('data_share') == null)
        localStorage.setItem('data_share', 'false');

    setAuthsState();
}

function changeAnonymizeAuth()
{
    if (localStorage.getItem('data_anonymize') == 'false')
        localStorage.setItem('data_anonymize', 'true');
    else
        localStorage.setItem('data_anonymize', 'false');

    anonymizeOnlineData();

    setAuthsState();
}

function setAuthsState()
{
    if (localStorage.getItem('data_anonymize') == 'true')
        document.getElementById('data_anonymize_btn').setAttribute('data-oname', 'Anonymized');
    else
        document.getElementById('data_anonymize_btn').setAttribute('data-oname', 'Public');

    refreshLanguage();
}

function readLocalData()
{
    let ui = ["language", "high_contrast", "descriptive_images", "text_size", "visual_mode", "music", "sound", "music_volume", "sounds_volume", "status", "konami_code"];
    let game = ["game_music", "game_mod", "game_map", "t_player_nbr", "no_confirmation"];
    let _42 = ["login", "auth_code"];
    let local_stats = ["lcl_ball_exit_nb", "lcl_ball_bounce_nb", "lcl_game_played_nb", "lcl_bonus_taken_nb"];
    let online_stats = ["onl_played", "onl_victory", "onl_defeat", "onl_dist", "onl_ball_return", "onl_ball_received", "onl_bonus_taken", "onl_bonus_received"];

    for (let i = 2; i != 8; i++)
        document.getElementById('storage_info_' + i).style.display = "none";

    for (let i = 0; i != ui.length; i++)
    {
        if (localStorage.getItem(ui[i]) != null)
            document.getElementById('storage_info_2').style.display = "block";
    }

    for (let i = 0; i != _42.length; i++)
    {
        if (localStorage.getItem(_42[i]) != null)
            document.getElementById('storage_info_3').style.display = "block";
    }

    for (let i = 0; i != game.length; i++)
    {
        if (localStorage.getItem(game[i]) != null)
            document.getElementById('storage_info_4').style.display = "block";
    }

    for (let i = 0; i != local_stats.length; i++)
    {
        if (localStorage.getItem(local_stats[i]) != null)
        {
            if (localStorage.getItem(local_stats[i]) != '0')
                document.getElementById('storage_info_5').style.display = "block";
        }
    }

    for (let i = 0; i != online_stats.length; i++)
    {
        if (localStorage.getItem(online_stats[i]) != null)
        {
            if (localStorage.getItem(online_stats[i]) != '0')
                document.getElementById('storage_info_6').style.display = "block";
        }
    }

    let history_data = JSON.parse(localStorage.getItem('history_data'));
    if (history_data != null && (history_data.exist != false || localStorage.getItem("opponent_login") != null))
        document.getElementById('storage_info_7').style.display = "block";
}

function deleteLocalData()
{
    localStorage.clear();
    nav.displayMenu();
	refreshSite();
}

function anonymizeOnlineData()
{
    // anonymiser le login sur le site comme dans la db
    // ...
}

async function deleteOnlineData()
{
    const endpoint = "https://127.0.0.1:8080/backend/delete-user/"
    let login = localStorage.getItem('login');
    let token = localStorage.getItem('token');
    let body = JSON.stringify({ login: login, token: token });
    const request = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrfToken,
        },
        body : body
    })
    if (request.status == 200)
        displayStatusBarSuccess(getTranslation('Logged User Data Delete'));
    else
        displayStatusBarAlert(getTranslation('Logged User Verification Failure'));
}
