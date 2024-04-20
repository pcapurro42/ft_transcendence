
window.onload = handleRedirection;

/****************************************** Log in | Log Out ***********************************************/

let login_btn = document.getElementById("login_btn");
login_btn.onclick = log;

const client_id = 'u-s4t2ud-328d5957a0e78853f7b035bed31812c4bd82ea90773c43b8686b35f1ae4d1353';
const redirect_uri = 'http://127.0.0.1:8080';

async function log()
{
    if (localStorage.getItem("status") == "not connected")
    {
        window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
        login_btn.setAttribute("data-oname", "LOG OUT");
        refreshLanguage();
        localStorage.setItem("status", "connected");
    }
    else
    {
        // ...

        login_btn.setAttribute("data-oname", "LOG IN WITH 42");
        refreshLanguage();
        localStorage.setItem("status", "not connected");
    }
}
/********************************************** API UTILS ************************************************/

function handleRedirection(){
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    const err = query.get('error');
    console.log('handleRedirection says hello');
    if (!code && !err){
        console.error('no code no err');
        return;
    }
    else if (err){
        console.error(`Error during login: ${err}`);
        return;
    }
    sessionStorage.setItem('auth_code', code);
    getAccessToken(code);
    sendAccessToken();
}

async function sendAccessToken(){
    console.log("sendAccessToken says hello")
    const endpoint = 'https://cors-anywhere.herokuapp.com/https://api.intra.42.fr/v2/me';
    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${sessionStorage.getItem('accessToken')}`}
    })
    const response = await request.json();
    console.log(response);
}

async function getAccessToken(auth_code){
    console.log("getAccessToken says hello")
    const endpoint = 'https://cors-anywhere.herokuapp.com/https://api.intra.42.fr/oauth/token';

    const url = new URLSearchParams({
        client_id: client_id,
        code: auth_code,
        client_secret : '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',
        grant_type : 'authorization_code',
        redirect_uri: redirect_uri,
        code_verifier: sessionStorage.getItem('code_verifier')
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


function generateCodeVerifier(){
    let bin_tab = new Uint8Array(32) // = 44 caracteres
    window.crypto.getRandomValues(bin_tab);

    const to_chars = String.fromCharCode(...bin_tab);
    const url_formatted = btoa(to_chars).replace(/\+/g, '-')
    .replace(/\//g, '_').replace(/=+$/, '');
    sessionStorage.setItem('code_verifier', url_formatted)
}

async function generateCodeChallenge(){
    const encoder = new TextEncoder(); // on instancie TextEncoder
    const bin_tab = encoder.encode(sessionStorage.getItem('code_verifier')); //on repasse le code_verifier en binaire pour l'encryption
    const hash = await crypto.subtle.digest('SHA-256', bin_tab);// on encrypte en SHA-256
    const code_challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); //on met au format URL.
    return (code_challenge);
}

/******************************************************** DISPLAY *************************************************************/



if (localStorage.getItem("status") == "connected")
    login_btn.setAttribute("data-oname", "LOG OUT"), refreshLanguage();
else
    login_btn.setAttribute("data-oname", "LOG IN WITH 42"), refreshLanguage();

/******************************************************** (TEMPORARY ?) USERFORM *************************************************************/

// document.getElementById('userForm').addEventListener('submit', function(event){
//     event.preventDefault() //empeche le rechargement de la page.
//     const username = document.getElementById('username').value;
//     const err = document.getElementById('err_username');
//     if (username.length < 4 || username.length > 15 || /[^a-zA-Z0-9-_]/.test(username))
//         err.style.display = 'block';
//     else{
//         err.style.display = 'none';
//         document.getElementById('userForm').style.display = 'none';
//         document.getElementById('main_menu_buttons').style.display = 'block';

//     }
//     sessionStorage.setItem('username', username);
// })

