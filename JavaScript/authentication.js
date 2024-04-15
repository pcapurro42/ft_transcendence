let login_id = document.getElementById("login-42");

localStorage.setItem("status", "not connected");

if (localStorage.getItem("status") == "connected")
    login_id.innerHTML = "CONNECTED";
else
    login_id.innerHTML = "LOGIN WITH 42";

login_id.onclick = auth;

function auth()
{
    if (localStorage.getItem("status") == "not connected")
    {
        localStorage.setItem("status", "connected");
        login_id.innerHTML = "CONNECTED";
    }
}
