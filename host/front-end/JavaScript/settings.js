document.getElementById('settings_btn').onclick = displaySettings;
document.getElementById('settings_back_btn').onclick = removeSettings;

document.getElementById('language_btn_selector').onchange = changeLanguage;

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

function changeLanguage()
{
    let language_btn_selector = document.getElementById('language_btn_selector');
    let new_language = (language_btn_selector.value).toLowerCase();
    new_language = (new_language[0] + new_language[1]);
    
    localStorage.setItem("language", new_language);
    language = new_language;

    refreshLanguage();
}

function initializeSettings()
{
    let s_language;
    let s_sound_volume;
    let s_music_volume;

    let s_text_size;
    let s_image_description;
    let s_high_contrast;
}