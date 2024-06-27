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
    if (!isConnected())
        return;
    if (localStorage.getItem('data_anonymize') == 'false'){
        localStorage.setItem('data_anonymize', 'true');
        anonymizeOnlineData();
    }
    else{
        localStorage.setItem('data_anonymize', 'false');
        removeDataAnonymize();
    }

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
    let achievements = ["konami_code"];

    for (let i = 2; i != 7; i++)
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
        if (localStorage.getItem(local_stats[i]) != null && localStorage.getItem(local_stats[i]) != '0')
            document.getElementById('storage_info_5').style.display = "block";
    }

    for (let i = 0; i != achievements.length; i++)
    {
        if (localStorage.getItem(achievements[i]) != null)
            document.getElementById('storage_info_6').style.display = "block";
    }
}

function deleteLocalData()
{
    localStorage.clear();
    nav.displayMenu();
	refreshSite();
}

async function anonymizeOnlineData()
{
    const endpoint = "https://hostname:8080/backend/anonymize-user/"
    let hashLogin = localStorage.getItem('hashLogin');
    let token = localStorage.getItem('token');
    let body = JSON.stringify({ hashLogin: hashLogin, token: token });
    const request = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrfToken,
        },
        body : body
    })
    if (request.status == 200){
        displayStatusBarSuccess(getTranslation('User Anonymization Success'))
        localStorage.setItem('login', getTranslation('Anonymous'))
        refreshLogin();
        retrieveUserInfo();
    }
    else{
        displayStatusBarAlert(getTranslation('42 Security Disconnection'));
        localStorage.setItem('status', 'not connected');
        refreshLogin();
        document.getElementById('login_btn').style.display = 'block';
    }
}
async function removeDataAnonymize(){

    const endpoint = "https://hostname:8080/backend/public-user/"
    let hashLogin = localStorage.getItem('hashLogin');
    let token = localStorage.getItem('token');
    let body = JSON.stringify({ hashLogin: hashLogin, token: token, isAnonymized : false });

    const request = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrfToken,
        },
        body : body
    })
    if (request.status == 200){
        displayStatusBarWarning(getTranslation('Unanonymize Data Msg'));
        localStorage.setItem('status', 'not connected');
        document.getElementById('login_btn').style.display = 'block';
        refreshLogin();
    }
    else{
        displayStatusBarAlert(getTranslation('42 Security Disconnection'));
        localStorage.setItem('status', 'not connected');
        refreshLogin();
        document.getElementById('login_btn').style.display = 'block';
    }
}

async function deleteOnlineData()
{
    if (!isConnected())
        return;
    const endpoint = "https://hostname:8080/backend/delete-user/"
    let hashLogin = localStorage.getItem('hashLogin');
    let token = localStorage.getItem('token');
    let body = JSON.stringify({ hashLogin: hashLogin, token: token });
    const request = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrfToken,
        },
        body : body
    })
    if (request.status == 200){
        displayStatusBarSuccess(getTranslation('Logged User Data Delete'));
        localStorage.setItem('status', 'not connected');
        refreshLogin();
        document.getElementById('login_btn').style.display = 'block';
    }
    else{
        displayStatusBarAlert(getTranslation('42 Security Disconnection'));
        localStorage.setItem('status', 'not connected');
        refreshLogin();
        document.getElementById('login_btn').style.display = 'block';
    }
}
