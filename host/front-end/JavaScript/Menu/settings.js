// < CHANGERS > //

function changeHighContrast()
{
    if (high_contrast == "true")
    {
        high_contrast = "false";
        localStorage.setItem("high_contrast", "false");
    }
    else
    {    
        high_contrast = "true";
        localStorage.setItem("high_contrast", "true");
    }
    refreshDisplay();
}

function changeDescriptiveImages()
{
    if (descriptive_images == "true")
    {
        descriptive_images = "false";
        localStorage.setItem("descriptive_images", "false");
    }
    else
    {
        descriptive_images = "true";
        localStorage.setItem("descriptive_images", "true");
    }
    refreshDisplay();
}

function changeSoundsVolume()
{
    let sound_slider = document.getElementById('sound_volume_slider');
    let new_volume = sound_slider.value;

    localStorage.setItem('sounds_volume', new_volume);
    sounds_volume = new_volume;

    refreshSounds();
}

function changeMusicVolume()
{
    let music_slider = document.getElementById('music_volume_slider');
    let new_volume = music_slider.value;

    localStorage.setItem('music_volume', new_volume);
    music_volume = new_volume;

    refreshMusics();
}

function changeTextSize()
{
    let text_size_btn_selector = document.getElementById('text_size_btn_selector');
    let new_size = (text_size_btn_selector.value).toLowerCase();

    localStorage.setItem("text_size", new_size);
    text_size = new_size;

    refreshDisplay();
}

function changeLanguage()
{
    let language_btn_selector = document.getElementById('language_btn_selector');
    let new_language = language_btn_selector.value;
    
    localStorage.setItem("language", new_language);
    language = new_language;

    refreshLanguage();
}

// < DISPLAY/REMOVE > //

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

// < INIT > //

function initializeSettings()
{
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
        localStorage.setItem("high_contrast", "false"), high_contrast = "false"
    else
        high_contrast = localStorage.getItem("high_contrast");
    
    refreshDisplay();
}