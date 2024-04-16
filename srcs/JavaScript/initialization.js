if (localStorage.getItem("language") == null)
    localStorage.setItem("language", "en");

{
    let value = generateNumber(3);

    if (value == 1)
        tab_icon.innerHTML = "";
    else if (value == 2)
        tab_icon.innerHTML = "";
    else if (value == 3)
        tab_icon.innerHTML = "";
}

if (localStorage.getItem("status") == null)
    localStorage.setItem("status", "not connected");