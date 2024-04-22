document.getElementById('settings_btn').onclick = displaySettings;
document.getElementById('settings_back_btn').onclick = removeSettings;

document.getElementById('language_btn_selector').onchange = changeLanguage;

document.getElementById('high_contrast_btn_y').onclick = enableHighContrast;
document.getElementById('high_contrast_btn_n').onclick = disableHighContrast;

document.getElementById('image_desc_btn_y').onclick = enableImageDescription;
document.getElementById('image_desc_btn_n').onclick = disableImageDescription;

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

function disableHighContrast()
{
    high_contrast = "false";
    localStorage.setItem("descriptive_images", "false");
    refreshDisplay();
}

function enableHighContrast()
{
    high_contrast = "true";
    localStorage.setItem("descriptive_images", "true");
    refreshDisplay();
}

function disableImageDescription()
{
    descriptive_images = "false";
    localStorage.setItem("high_contrast", "false");
    refreshDisplay();
}

function enableImageDescription()
{
    descriptive_images = "true";
    localStorage.setItem("high_contrast", "true");
    refreshDisplay();
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
    if (localStorage.getItem("language") == null)
        localStorage.setItem("language", "en"), language = "en";
    else
        language = localStorage.getItem("language");

    if (localStorage.getItem("sounds_volume") == null)
        localStorage.setItem("sounds_volume", 15), sounds_volume = 15;
    else
        sounds_volume = localStorage.getItem("sounds_volume");

    if (localStorage.getItem("music_volume") == null)
        localStorage.setItem("music_volume", 15), music_volume = 15;
    else
        music_volume = localStorage.getItem("music_volume");

    if (localStorage.getItem("text_size") == null)
        localStorage.setItem("text_size", "normal"), text_size = "normal";
    else
        text_size = localStorage.getItem("text_size");

    if (localStorage.getItem("descriptive_images") == null)
        localStorage.setItem("descriptive_images", "false"), descriptive_images = "false";
    else
        descriptive_images = localStorage.getItem("descriptive_images");

    if (localStorage.getItem("high_contrast") == null)
        localStorage.setItem("high_contrast", "false"), high_contrast = "false";
    else
        high_contrast = localStorage.getItem("high_contrast");
}