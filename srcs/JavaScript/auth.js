let login_btn_on = document.getElementById("login_btn_on");
let login_btn_off = document.getElementById("login_btn_off");

login_btn_on.onclick = connect;
login_btn_off.onclick = disconnect;

if (localStorage.getItem("status") == "connected")
    displayLogOut();
else
    displayLogIn();

function displayLogIn()
{
    login_btn_on.style.display = "inline";
    login_btn_off.style.display = "none";
}

function displayLogOut()
{
    login_btn_off.style.display = "inline";
    login_btn_on.style.display = "none";
}

function connect()
{
    // ...
    displayLogOut();
    localStorage.setItem("status", "not connected");
}

function disconnect()
{
    // ...
    displayLogIn();
    localStorage.setItem("status", "connected");
}

function generateCodeVerifier(){
    let bin_tab = new Uint8Array(32) // = 44 caracteres
    window.crypto.getRandomValues(bin_tab);

    const to_chars = String.fromCharCode(...bin_tab);
    const url_formatted = btoa(to_chars).replace(/\+/g, '-')
    .replace(/\//g, '_').replace(/=+$/, '');
    return url_formatted;
}

// async function generateCodeChallenger(){
//     const encoder = new TextEncoder();
//     console.log(encoder.encode(generateCodeVerifier));
// }