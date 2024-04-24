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

// < SETTINGS > //

document.getElementById('language_btn_selector').onchange = changeLanguage;
document.getElementById('text_size_btn_selector').onchange = changeTextSize;
document.getElementById('sound_volume_slider').onchange = changeSoundVolume;
document.getElementById('music_volume_slider').onchange = changeMusicVolume;
document.getElementById('high_contrast_btn_y').onclick = enableDisableHighContrast.bind(null, "true");
document.getElementById('high_contrast_btn_n').onclick = enableDisableHighContrast.bind(null, "false");
document.getElementById('image_desc_btn_y').onclick = enableDisableDescriptiveImages.bind(null, "true");
document.getElementById('image_desc_btn_n').onclick = enableDisableDescriptiveImages.bind(null, "false");