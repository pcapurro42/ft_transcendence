/****************************************** Log in | Log Out ***********************************************/

async function login()
{
    setTimeout(() => {window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;}, 800); //
}

async function logout()
{
    setTimeout(() => {window.location.href = `https://127.0.0.1:1025/`;}, 800); //ICI

    localStorage.setItem("status", "not connected");
    localStorage.removeItem("login");
}

/********************************************** API UTILS ************************************************/

async function handleRedirection(){
    if (localStorage.getItem
    ('status') == 'connected' || !sessionStorage.getItem('auth_code')){
        refreshLogin();
        return;
    }
    let response = await getAccessToken(sessionStorage.getItem('auth_code'));
    await storeUserLogin(response);
}

async function storeUserLogin(response){
    try{
            localStorage.setItem('login', response['login']);
            auth_code = '';
    }
    catch(error){
        console.log('error:', error);

        displayStatusBarAlert(getTranslation("42 Auth Failure"));
        return;
    }
    localStorage.setItem("status", "connected");
    displayStatusBarSuccess(getTranslation('42 Auth Success') + response['login'])
    refreshLogin();
    document.getElementById('login').style.display = 'none';
}

async function getAccessToken(auth_code){
    const endpoint = 'https://127.0.0.1:8080/backend/token/'; //ICI


    try{
        const request = await fetch(endpoint, {
            method: 'POST',
            headers: {'X-CSRFToken': csrfToken,}, //token du cookie csrf
            credentials: 'include', //cookie csrf
            body: auth_code,
        });

        const response = await request.json();
        return (response)
    }
    catch(error)
    {
        console.log('error:', error);
        displayStatusBarAlert(getTranslation("42 Auth Failure"));
    }

}

// < DISPLAY > //

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
        document.getElementById('login_btn').style.display = "block";
        document.getElementById('intra_login').style.display = "none";
        localStorage.removeItem('login');
    }
    refreshDisplay();
}

// < INIT > //

function initializeAuth()
{
    client_id = 'u-s4t2ud-328d5957a0e78853f7b035bed31812c4bd82ea90773c43b8686b35f1ae4d1353';
    redirect_uri = 'https://127.0.0.1:1025'; //ICI
    user_info = JSON.parse(localStorage.getItem('user_info'));

    if (localStorage.getItem("status") == null && !user_info)
    {
        localStorage.setItem("status", "not connected");
        account_status = "not connected";
    }

}
