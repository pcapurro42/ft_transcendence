function defaultHide()
{
    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = "none";

    let settings_menu = document.getElementById('settings_menu');
    settings_menu.style.display = "none";
    let settings_back_btn = document.getElementById('settings_back_btn');
    settings_back_btn.style.display = "none";

    let video = document.getElementById('vid_credits');
    video.style.display="none";
}

function setBackgroundColor(color)
{
    let background = document.getElementById("background");
    if (color == "white")
        background.style.setProperty("background-color", "white");
    else
        background.style.setProperty("background-color", "black");
}

function setMaterialsColor(color)
{
    materials = document.getElementsByClassName("form-select");

    for (let i = 0; i != materials.length; i++)
    {
        if (color == "white")
            materials[i].style["background-color"] = "white", materials[i].style["color"] = "black";
        else
            materials[i].style["background-color"] = "black", materials[i].style["color"] = "white";
    }
}

function setImagesColor(color)
{
    let images = document.getElementsByClassName("image");

    for (let i = 0; i != images.length; i++)
    {
        if (color == "white")
            images[i].style.filter="invert(0%)";
        else
            images[i].style.filter="invert(100%)";
    }
}

function setTextColor(color)
{
    let grey_texts = document.getElementsByClassName("text");
    let white_texts = document.getElementsByClassName("text-white");
    let black_texts = document.getElementsByClassName("text-black");

    let texts = [...white_texts, ...black_texts, ...grey_texts];

    for (let i = 0; i != texts.length; i++)
    {
        if (color == "white")
            texts[i].classList.replace("text", "text-white"), texts[i].classList.replace("text-black", "text-white");
        else
            texts[i].classList.replace("text", "text-black"), texts[i].classList.replace("text-white", "text-black");
    }
}

function setImageSize(size)
{
    let images = document.querySelectorAll('[data-isnormal]');

    for (let i = 0; i != images.length; i++)
    {
        let value = images[i].getAttribute(size);
        let nb = value[value.length - 2] + value[value.length - 1];
        images[i].style.maxWidth = nb;
    }
}

function setTextSize(size)
{
    let texts = document.querySelectorAll('[data-tsnormal]');

    for (let i = 0; i != texts.length; i++)
    {
        let value = texts[i].getAttribute(size);
        texts[i].style.fontSize = value;
    }
}

function setDescriptiveImages(value)
{
    let descriptions = document.querySelectorAll('[title]');

    if (value == "enable")
        refreshLanguage();
    else
    {
        for (let i = 0; i != descriptions.length; i++)
            descriptions[i].setAttribute('title', "");
    }
}

function refreshDisplay()
{
    if (high_contrast == "true")
        setBackgroundColor("black"), setTextColor("white"), setMaterialsColor("black"), setImagesColor("white");
    else
        setBackgroundColor("white"), setTextColor("black"), setMaterialsColor("white"), setImagesColor("black");

    if (text_size == "normal")
        setTextSize("data-tsnormal"), setImageSize("data-isnormal");
    else
        setTextSize("data-tslarge"), setImageSize("data-islarge");

    if (descriptive_images == "true")
        setDescriptiveImages("enable");
    else
        setDescriptiveImages("disable");
}
