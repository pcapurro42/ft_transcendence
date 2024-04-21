// < SETTINGS > //

if (localStorage.getItem("language") == null)
    localStorage.setItem("language", "en");

if (localStorage.getItem("sounds_volume") == null)
    localStorage.setItem("sounds_volume", "100");

if (localStorage.getItem("music_volume") == null)
    localStorage.setItem("music_volume", "100");

if (localStorage.getItem("text_size") == null)
    localStorage.setItem("text_size", "normal");

if (localStorage.getItem("descriptive_images") == null)
    localStorage.setItem("descriptive_images", "false");

if (localStorage.getItem("high_contrast_colors") == null)
    localStorage.setItem("high_contrast_colors", "false");

// < 42 CONNECT > //

if (localStorage.getItem("status") == null)
    localStorage.setItem("status", "not connected");

if (localStorage.getItem("status") == "not connected")
    document.getElementById('welcome').style.visibility = "hidden";
else
    document.getElementById('welcome').style.display = "block";