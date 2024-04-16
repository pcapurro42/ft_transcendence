let log_button = document.getElementById("login-42");

if (localStorage.getItem("status") == "connected")
    log_button.innerHTML = "LOG OUT";
else
    log_button.innerHTML = "LOGIN WITH 42";

log_button.onclick = log;

function log()
{
    if (localStorage.getItem("status") == "connected")
    {
        disconnect();
        localStorage.setItem("status", "not connected");
        log_button.innerHTML = "LOG IN WITH 42";
    }
    else
    {
        connect();
        localStorage.setItem("status", "connected");
        log_button.innerHTML = "LOG OUT";
    }
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
function connect()
{
    ;
}

function disconnect()
{
    ;
}
