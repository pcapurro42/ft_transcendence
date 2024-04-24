window.onload = handleRedirection;

/****************************************** Log in | Log Out ***********************************************/

async function log()
{
    if (localStorage.getItem("status") == "not connected")
    {
        window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
        localStorage.setItem("status", "connected");
    }
    else
    {
        // ...
        login_btn.setAttribute("data-oname", "LOG IN WITH 42");
        refreshLanguage();
        localStorage.setItem("status", "not connected");
        localStorage.removeItem("user_info");
        document.getElementById('welcome').style.visibility = "hidden";
    }
}
/********************************************** API UTILS ************************************************/

async function handleRedirection(){
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    const err = query.get('error');

    if ((!code && !err) || localStorage.getItem("status") == "not connected"){
        localStorage.setItem("status", "not connected");
        document.getElementById('welcome').style.visibility = "hidden";
        return;
    }
    else if (err){
        localStorage.setItem("status", "not connected");
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
            document.getElementById('welcome').innerHTML += ` ${userinfo.login}.`;
            document.getElementById('welcome').style.display = "block";
        }
        else{
            throw("Error: user_info not retrieved.");
        }
    } catch (error) {
        localStorage.setItem("status", "not connected");
        console.error('Failed to retrieve or process user info:', error);
    }
}

async function sendAccessToken(){
    console.log("sendAccessToken says hello")
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
    login_btn.setAttribute("data-oname", "LOG OUT");
    refreshLanguage();
    localStorage.setItem("status", "connected");
    return response;
}

async function getAccessToken(auth_code){
    console.log("getAccessToken says hello")
    const endpoint = '/oauth/token';

    const url = new URLSearchParams({
        client_id: client_id,
        code: auth_code,
        client_secret : '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',
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

function initializeAuth()
{
    client_id = 'u-s4t2ud-328d5957a0e78853f7b035bed31812c4bd82ea90773c43b8686b35f1ae4d1353';
    redirect_uri = 'https://127.0.0.1';

    if (localStorage.getItem("status") == null)
        localStorage.setItem("status", "not connected");

    if (localStorage.getItem("status") == "not connected")
        document.getElementById('welcome').style.visibility = "hidden";
    else
        document.getElementById('welcome').style.display = "block";

    if (localStorage.getItem("status") == "connected")
        login_btn.setAttribute("data-oname", "LOG OUT");
    else
        login_btn.setAttribute("data-oname", "LOG IN WITH 42");
}