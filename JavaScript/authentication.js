let login_id = document.getElementById("login-42");

if (localStorage.getItem("status") == "connected")
    login_id.innerHTML = "CONNECTED";
else
    login_id.innerHTML = "LOGIN WITH 42";

login_id.onclick = auth;

function auth()
{
    console.log("authentication...");
}