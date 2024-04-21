document.getElementById('settings_btn').onclick = displaySettings;
document.getElementById('settings_back_btn').onclick = removeSettings;

function displaySettings()
{
    let main_menu = document.getElementById('main_menu_buttons');
    let settings_menu = document.getElementById('settings_menu');

    settings_menu.style.display = 'block';
    main_menu.style.display = 'none';
}

function removeSettings()
{
    let main_menu = document.getElementById('main_menu_buttons');
    let settings_menu = document.getElementById('settings_menu');

    settings_menu.style.display = 'none';
    main_menu.style.display = 'block';
}