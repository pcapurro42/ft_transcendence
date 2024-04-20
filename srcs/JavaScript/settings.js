let settings_btn = document.getElementById("settings_btn");
settings_btn.onclick = displaySettings;
let main_menu_settings_btn = document.getElementById("main_menu_settings_btn");
main_menu_settings_btn.onclick = removeSettings;

function displaySettings()
{
    let main_menu_settings = document.getElementById("main_menu_settings");
    main_menu_settings.style.display = "block";
}

function removeSettings()
{
    let main_menu_buttons = document.getElementById("main_menu_buttons");
    main_menu_buttons.style.display = "none";
}
