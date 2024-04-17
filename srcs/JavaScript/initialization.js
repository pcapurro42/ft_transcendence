if (localStorage.getItem("language") == null)
    localStorage.setItem("language", "en");

if (localStorage.getItem("status") == null)
    localStorage.setItem("status", "not connected");

localStorage.setItem("language", "en");

document.getElementById("main_menu_settings").style.display = "none";