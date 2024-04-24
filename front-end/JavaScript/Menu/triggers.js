// < TOOLBAR > //

document.getElementById('music_toggle').onclick = enableDisableMusic;
document.getElementById("login_btn").onclick = log;

// < MAIN MENU > //

document.getElementById('play_btn').onclick = displayPlay;
document.getElementById('play_back_btn').onclick = removePlay;

document.getElementById('settings_btn').onclick = displaySettings;
document.getElementById('settings_back_btn').onclick = removeSettings;

document.getElementById('customize_btn').onclick = displayCustomize;
document.getElementById('customize_back_btn').onclick = removeCustomize;

document.getElementById('credits_btn').onclick = theaterCredits;
document.getElementById('vid_credits').onended = theaterClose;
document.getElementById('credit_close').onclick = theaterClose;

// < CUSTOMIZE > //

document.getElementById('game_theme_btn_selector').onchange = changeGameMusic;
document.getElementById('game_map_btn_selector').onchange = changeGameMap;

// < SETTINGS > //

document.getElementById('language_btn_selector').onchange = changeLanguage;
document.getElementById('text_size_btn_selector').onchange = changeTextSize;
document.getElementById('sound_volume_slider').onchange = changeSoundsVolume;
document.getElementById('music_volume_slider').onchange = changeMusicVolume;
document.getElementById('high_contrast_btn_y').onclick = changeHighContrast.bind(null, "true");
document.getElementById('high_contrast_btn_n').onclick = changeHighContrast.bind(null, "false");
document.getElementById('image_desc_btn_y').onclick = changeDescriptiveImages.bind(null, "true");
document.getElementById('image_desc_btn_n').onclick = changeDescriptiveImages.bind(null, "false");