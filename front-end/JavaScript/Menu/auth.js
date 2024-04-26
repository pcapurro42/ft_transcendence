window.onload = handleRedirection;

/****************************************** Log in | Log Out ***********************************************/

async function login()
{
    setTimeout(() => {window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;}, 800);


    localStorage.setItem("status", "connected");
    account_status = "connected";
}

async function logout()
{
    setTimeout(() => {window.location.href = `https://127.0.0.1/`;}, 800);

    localStorage.setItem("status", "not connected");
    localStorage.removeItem("user_info");
    account_status = "not connected";
}

/********************************************** API UTILS ************************************************/

async function handleRedirection(){
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    const err = query.get('error');

    if ((!code && !err) || localStorage.getItem("status") == "not connected"){
        localStorage.setItem("status", "not connected");
        account_status == "not connected";
        refreshLogin();
        return;
    }
    else if (err){
        localStorage.setItem("status", "not connected");
        account_status == "not connected";
        refreshLogin();
        console.error(`Error during login: ${err}`);
        return;
    }
    sessionStorage.setItem('auth_code', code);
    if (!sessionStorage.getItem('access_token'))
        await getAccessToken(code);

    try {
        const userinfo = await sendAccessToken();
        if (userinfo){
            localStorage.setItem('user_info', JSON.stringify(userinfo));
            document.getElementById('intra_login').innerHTML = ` ${userinfo.login}`;
        }
        else{
            throw("Error: user_info not retrieved.");
        }
    } catch (error) {
        localStorage.setItem("status", "not connected");
        refreshLogin();
        console.error('Failed to retrieve or process user info:', error);
    }
}

async function sendAccessToken(){
    const endpoint = '/v2/me';
    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${sessionStorage.getItem('accessToken')}`}
    })
    const response = await request.json();
    if (!response){
        console.log("Error: No response received.");
        return;
    }
    localStorage.setItem("status", "connected");
    account_status == "connected";
    refreshLogin();
    return response;
}

async function getAccessToken(auth_code){
    const endpoint = '/oauth/token';

    const url = new URLSearchParams({
        code: auth_code,
        grant_type : 'authorization_code',
        redirect_uri: redirect_uri,
    });

    const request = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-type' : 'application/x-www-form-urlencoded'},
        body: url
    });

    const response = await request.json();
    if (response.access_token)
        sessionStorage.setItem('accessToken', response.access_token);
    else{
        const err = new URLSearchParams(window.location.href).get('error');
        console.error(`Error: ${err}`);
    }
}

// < DISPLAY > //

function refreshLogin()
{
    if (account_status == "connected")
    {
        document.getElementById('intra_login').style.display = "block";
        document.getElementById('login_btn').style.display = "none";

        // document.getElementById('play_game_btn').classList.remove('disabled');
        // document.getElementById('play_tournament_btn').classList.remove('disabled');
    }
    else
    {
        document.getElementById('login_btn').style.display = "block";
        document.getElementById('intra_login').style.display = "none";

        // document.getElementById('play_game_btn').classList.add('disabled');
        // document.getElementById('play_tournament_btn').classList.add('disabled');
    }
}

// < INIT > //

function initializeAuth()
{
    client_id = 'u-s4t2ud-328d5957a0e78853f7b035bed31812c4bd82ea90773c43b8686b35f1ae4d1353';
    redirect_uri = 'https://127.0.0.1';

    if (localStorage.getItem("status") == null)
    {
        localStorage.setItem("status", "not connected");
        account_status = "not connected";
    }
    else if (localStorage.getItem("status") == "not connected")
        account_status = "not connected";
    else
        account_status = "connected";
}
