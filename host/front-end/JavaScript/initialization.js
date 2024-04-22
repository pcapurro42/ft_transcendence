// localStorage.clear();

// < SETTINGS > //

let language;
let sounds_volume;
let music_volume;
let text_size;
let descriptive_images;
let high_contrast;

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

high_contrast = "true";

// localStorage.setItem("language", "en"), language = "en";

refreshLanguage();
refreshDisplay();