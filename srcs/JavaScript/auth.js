let login_btn = document.getElementById("login_btn");

login_btn.onclick = log;

if (localStorage.getItem("status") == "connected")
login_btn.setAttribute("data-oname", "LOG OUT"), refreshLanguage();
else
    login_btn.setAttribute("data-oname", "LOG IN WITH 42"), refreshLanguage();

/****************************************** Code Verifier | Code Challenge | API ***********************************************/

const client_id = 'u-s4t2ud-328d5957a0e78853f7b035bed31812c4bd82ea90773c43b8686b35f1ae4d1353';
const redirect_uri = 'http%3A%2F%2F127.0.0.1%3A8080';

function log()
{
    if (localStorage.getItem("status") == "not connected")
    {
        generateCodeVerifier(), generateCodeChallenger();
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

function generateCodeVerifier(){
    let bin_tab = new Uint8Array(32) // = 44 caracteres
    window.crypto.getRandomValues(bin_tab);

    const to_chars = String.fromCharCode(...bin_tab);
    const url_formatted = btoa(to_chars).replace(/\+/g, '-')
    .replace(/\//g, '_').replace(/=+$/, '');
    sessionStorage.setItem('code_verifier', url_formatted)
}

async function generateCodeChallenger(){
    const encoder = new TextEncoder(); // on instancie TextEncoder
    const bin_tab = encoder.encode(sessionStorage.getItem('code_verifier')); //on repasse le code_verifier en binaire pour l'encryption
    const code_challenge = await crypto.subtle.digest('SHA-256', data);// on encrypte en SHA-256
    code_challenge = String.fromCharCode(...code_challenge)
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); //on met au format URL.
}