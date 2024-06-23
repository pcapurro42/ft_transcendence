/****************************************** Log in | Log Out ***********************************************/

async function login()
{
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('login_btn').style.display = 'none';
    if (localStorage.getItem('sound') == 'on')
    {
        document.getElementById('codec_sound').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));
        setTimeout(() => {window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;}, 2000);
    }
    else
        setTimeout(() => {window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;}, 800);

}

async function logout()
{
    setTimeout(() => {window.location.href = `https://127.0.0.1:1025/`;}, 800); //ICI

    localStorage.setItem("status", "not connected");
    localStorage.removeItem("login");
}

function isConnected(){
    if (localStorage.getItem('status') == 'connected')
        return true;
    document.getElementById('door_locked').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));
    displayStatusBarAlert(getTranslation('Forbidden Page'));
    return false;
}

/********************************************** API UTILS ************************************************/

async function fetchCsrfToken() {
    try{
        const response = await fetch('https://hostname:8080/backend/csrf/', {
        credentials: 'include'
	    });
    }
    catch(error){
        console.error(error);
    }
}

async function handleRedirection(){
    if (localStorage.getItem
    ('status') == 'connected' || !localStorage.getItem('auth_code')){
        refreshLogin();
        return;
    }
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('login_btn').style.display = 'none';
    let response = await getAccessToken(localStorage.getItem('auth_code'));
    await storeUserCredentials(response);
}

async function storeUserCredentials(response){
    let userInfo
    try{
            userInfo = JSON.parse(response);
            userInfo = userInfo[0].fields;
            if (userInfo['login'] == "Anonymous")
                localStorage.setItem('login', getTranslation('Anonymous'));
            else
                localStorage.setItem('login', userInfo['login']);
            localStorage.setItem('hash_login', userInfo['hash_login']);
            localStorage.setItem('token', userInfo['token']);
            retrieveOnlineStats(userInfo);
            auth_code = '';
    }
    catch(error){
        console.error(error);

        displayStatusBarAlert(getTranslation("42 Auth Failure"));
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('login_btn').style.display = 'block';
        return;
    }
    localStorage.setItem("status", "connected");
    displayStatusBarSuccess(getTranslation('42 Auth Success') + localStorage.getItem('login'))
    refreshLogin();
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('login_btn').style.display = 'none';
}

async function getAccessToken(auth_code){
    const endpoint = 'https://127.0.0.1:8080/backend/token/';


    try{
        const request = await fetch(endpoint, {
            method: 'POST',
            headers: {'X-CSRFToken': csrfToken,},
            credentials: 'include',
            body: auth_code,
        });

        const response = await request.text();
        return (response)
    }
    catch(error)
    {
        console.error(error);
        displayStatusBarAlert(getTranslation("42 Auth Failure"));
        document.getElementById('loading').classList.add('d-none');
        document.getElementById('login_btn').style.display = 'block';
    }

}

// < display > //

function refreshLogin()
{
    if (localStorage.getItem('status') == "connected")
    {
        document.getElementById('intra_login').innerHTML = localStorage.getItem('login');
        document.getElementById('intra_login').style.display = "block";
        document.getElementById('login_btn').style.display = "none";
    }
    else
    {
        document.getElementById('intra_login').style.display = "none";
        localStorage.removeItem('login');
    }

    refreshStats();
    refreshHistory();
    refreshDisplay();
}

// < init > //

function initializeAuth()
{
    client_id = 'u-s4t2ud-328d5957a0e78853f7b035bed31812c4bd82ea90773c43b8686b35f1ae4d1353';
    redirect_uri = 'https://127.0.0.1:1025';
    user_info = JSON.parse(localStorage.getItem('user_info'));

    if (localStorage.getItem("status") == null && !user_info)
    {
        localStorage.setItem("status", "not connected");
        account_status = "not connected";
    }
}

function initializeAuthToken()
{
    document.addEventListener('DOMContentLoaded', function() {fetchCsrfToken();});
    localStorage.removeItem('auth_code');
    if (auth_code)
        localStorage.setItem('auth_code', auth_code);
}
