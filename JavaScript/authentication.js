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

function connect()
{
    ;
}

function disconnect()
{
    ;
}