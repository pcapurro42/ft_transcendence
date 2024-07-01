// < changers > //

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
    setBackground(window.location.pathname);
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
    localStorage.setItem('sounds_volume', document.getElementById('sound_volume_slider').value);
    sounds_volume = document.getElementById('sound_volume_slider').value;

    refreshSounds();
}

function changeMusicVolume()
{
    localStorage.setItem('music_volume', document.getElementById('music_volume_slider').value);
    music_volume = document.getElementById('music_volume_slider').value;

    refreshMusics();
}

function letterSwitch(){
    let text_size_btn_selector = document.getElementById('text_size_btn_selector');

    if (text_size_btn_selector.value == 'normal'){
        text_size_btn_selector.value = 'large';
    }
    else{
        text_size_btn_selector.value = 'normal';
    }
    changeTextSize();
}

function changeTextSize()
{
    localStorage.setItem("text_size", (document.getElementById('text_size_btn_selector').value).toLowerCase());
    text_size = (document.getElementById('text_size_btn_selector').value).toLowerCase();

    refreshDisplay();
}

function changeLanguage()
{
    localStorage.setItem("language", document.getElementById('language_btn_selector').value);
    language = document.getElementById('language_btn_selector').value;

    refreshLanguage();
}

// < display/remove > //

function displaySecondSettingsPage()
{
    nav.hideEveryDiv();

    document.getElementById('title').style.setProperty("margin-top", "120px", "important");
    document.getElementById('settings_menu').style.display = 'block';
    document.getElementById('settings_back_btn').style.display = 'block';

    document.getElementById('settings_left_panel').style.display = "none";
    document.getElementById('settings_right_panel').style.display = "none";
    document.getElementById('privacy_panel').style.display = "block";

    document.getElementById('next_settings').classList.add('disabled');
    document.getElementById('prev_settings').classList.remove('disabled');

    setBackground('/privacy-settings');
    addToHistory('/privacy-settings');
    document.title = getTranslation('Privacy Settings');
}

function displayFirstSettingsPage()
{
    document.getElementById('title').style.setProperty("margin-top", "150px", "important");
    document.getElementById('settings_left_panel').style.display = "block";
    document.getElementById('settings_right_panel').style.display = "block";
    document.getElementById('privacy_panel').style.display = "none";

    document.getElementById('next_settings').classList.remove('disabled');
    document.getElementById('prev_settings').classList.add('disabled');

    setBackground('/settings');
    addToHistory('/settings');
    document.title = getTranslation('Settings');
}

nav.displaySettings = function()
{
    nav.hideEveryDiv();
    document.getElementById('settings_menu').style.display = 'block';
    document.getElementById('settings_back_btn').style.display = 'block';

    displayFirstSettingsPage();
}

nav.removeSettings = function()
{
    document.getElementById('settings_menu').style.display = 'none';
    document.getElementById('settings_back_btn').style.display = 'none';

    nav.displayMenu();
}

// < init > //

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

function changeGameMode(){
        if (this.checked)
            localStorage.setItem('game_mode', 'bonus');
        else
            localStorage.setItem('game_mode', 'normal');
        initializeGameMode();
}
function initializeGameMode(){
    let c_switch = document.getElementById('switch_classic');
    let t_switch = document.getElementById('switch_tournament');

    if (localStorage.getItem('game_mode') == 'bonus'){
        gameMode = 'bonus';
        t_switch.checked = true;
        c_switch.checked = true;
        t_switch.nextElementSibling.textContent = getTranslation('Bonus Mode');
        c_switch.nextElementSibling.textContent = getTranslation('Bonus Mode');
        document.getElementById('surpass_metal_gear_quote').style.display = "block";
    }
    else{
        gameMode = 'normal';
        t_switch.checked = false;
        c_switch.checked = false;
        t_switch.nextElementSibling.textContent = getTranslation('Normal Mode');
        c_switch.nextElementSibling.textContent = getTranslation('Normal Mode');
        document.getElementById('surpass_metal_gear_quote').style.display = "none";
    }
}

function ARIASoundsSlider(){
	document.getElementById('sound_volume_slider').setAttribute('aria-label', getTranslation("Sound volume"));
	document.getElementById('music_volume_slider').setAttribute('aria-label', getTranslation("Music volume"));
}

function ARIAButtonState(){
    btns = document.querySelectorAll('.btn_state');

    btns.forEach(element => {
        element.nextElementSibling.setAttribute('aria-label', (getTranslation(element.getAttribute('data-oname')) + ' ' + getTranslation(element.nextElementSibling.getAttribute('data-oname'))));
    });
}
