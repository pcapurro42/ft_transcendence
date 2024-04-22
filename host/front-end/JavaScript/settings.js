document.getElementById('settings_btn').onclick = displaySettings;
document.getElementById('settings_back_btn').onclick = removeSettings;

function displaySettings()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let settings_menu = document.getElementById('settings_menu');
    let settings_back_btn = document.getElementById('settings_back_btn');

    settings_menu.style.display = 'block';
    settings_back_btn.style.display = 'block';
    
    main_menu.style.display = 'none';
}

function removeSettings()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let settings_menu = document.getElementById('settings_menu');
    let settings_back_btn = document.getElementById('settings_back_btn');

    settings_menu.style.display = 'none';
    settings_back_btn.style.display = 'none';

    main_menu.style.display = 'block';
}

function initializeSettings()
{
    let language;
    let sound_volume;
    let music_volume;

    let text_size;
    let image_description;
    let high_contrast;
}