if (localStorage.getItem("language") == null)
    localStorage.setItem("language", "en");

if (localStorage.getItem("status") == null)
    localStorage.setItem("status", "not connected");

if (localStorage.getItem("status") == "not connected")
    document.getElementById('welcome').style.visibility = "hidden";
else
    document.getElementById('welcome').style.display = "block";

localStorage.setItem("language", "en");

document.getElementById("main_menu_settings").style.display = "none";
