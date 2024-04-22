// localStorage.clear();

// < SETTINGS > //

let language;
let sounds_volume;
let music_volume;
let text_size;
let descriptive_images;
let high_contrast;

initializeSettings();

// < SOUNDS AND MUSICS > //

initializeSounds();

// < SETTINGS > //

initializeSettings();

// < 42 CONNECT > //

if (localStorage.getItem("status") == null)
    localStorage.setItem("status", "not connected");

if (localStorage.getItem("status") == "not connected")
    document.getElementById('welcome').style.visibility = "hidden";
else
    document.getElementById('welcome').style.display = "block";

// < REFRESH > //

refreshLanguage();
refreshDisplay();
defaultHide();
refreshSounds();