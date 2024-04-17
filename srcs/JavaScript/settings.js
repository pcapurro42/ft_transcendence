let settings_btn = document.getElementById("settings_btn");
settings_btn.onclick = displaySettings;

function displaySettings()
{
    let main_menu_buttons = document.getElementById("main_menu_buttons");
    let main_menu_settings = document.getElementById("main_menu_settings");
    
    main_menu_buttons.style.display = "none";
    main_menu_settings.style.display = "block";
}