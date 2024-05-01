function displayMenu()
{
    let game_page_ai = document.getElementById('game_page_ai');
    game_page_ai.style.display = "none";

    let game_page_classic = document.getElementById('game_page_classic');
    game_page_classic.style.display = "none";

    let game_page_tournament = document.getElementById('game_page_tournament');
    game_page_tournament.style.display = "none";

    let main_menu_page = document.getElementById('main_menu_page');
    main_menu_page.style.display = "block";

    let play_menu = document.getElementById('play_menu');
    play_menu.style.display = "none";

    let customize_menu = document.getElementById('customize_menu');
    customize_menu.style.display = "none";

    let settings_menu = document.getElementById('settings_menu');
    settings_menu.style.display = "none";

    let play_classic_buttons = document.getElementById('play_classic_menu');
    play_classic_buttons.style.display = "none";

    let create_classic_menu = document.getElementById('create_classic_menu');
    create_classic_menu.style.display = 'none';

    let play_tournament_buttons = document.getElementById('play_tournament_menu');
    play_tournament_buttons.style.display = "none";

    let tournament_form = document.getElementById('form_alias')
    tournament_form.style.display = 'none';

    let statusBar = document.getElementById('statusBar');
    statusBar.style.display = 'none';

    let main_menu_buttons = document.getElementById('main_menu_buttons');
    main_menu_buttons.style.display = "block";

    refreshLogin();
}

function removeMenu()
{
    let main_menu_page = document.getElementById('main_menu_page');
    main_menu_page.style.display = "none";
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
    let forms_select = document.getElementsByClassName("form-select");
    let dropdowns = document.getElementsByClassName("dropdown");
    let lines = document.getElementsByClassName("line");
    let materials = [...forms_select, ...dropdowns, ...lines];


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

    if (size == "data-tsnormal")
        document.getElementById('text_size_btn_selector').selectedIndex = 0;
    else
        document.getElementById('text_size_btn_selector').selectedIndex = 1;

    for (let i = 0; i != texts.length; i++)
    {
        let value = texts[i].getAttribute(size);
        texts[i].style.fontSize = value;
    }
}

function setHighContrast(value)
{
    if (high_contrast == "true")
    {
        document.getElementById('high_contrast_btn_yn').setAttribute('data-oname', 'Enabled');
        document.getElementById('high_contrast_btn_yn').style.backgroundColor = "red";

        setBackgroundColor("black");
        setTextColor("white");
        setMaterialsColor("black");
        setImagesColor("white");
    }
    else
    {
        document.getElementById('high_contrast_btn_yn').setAttribute('data-oname', 'Disabled');
        document.getElementById('high_contrast_btn_yn').style.backgroundColor = "";

        setBackgroundColor("white");
        setTextColor("black");
        setMaterialsColor("white");
        setImagesColor("black");
    }
}

function setDescriptiveImages(value)
{
    let descriptions = document.querySelectorAll('[title]');

    if (value == "enable")
    {
        document.getElementById('image_desc_btn_yn').setAttribute('data-oname', 'Enabled');
        document.getElementById('image_desc_btn_yn').style.backgroundColor = "red";
    }
    else
    {
        document.getElementById('image_desc_btn_yn').setAttribute('data-oname', 'Disabled');
        document.getElementById('image_desc_btn_yn').style.backgroundColor = "";
        for (let i = 0; i != descriptions.length; i++)
            descriptions[i].setAttribute('title', "");
    }
    refreshLanguage();
}

function refreshDisplay()
{
    setHighContrast();

    if (text_size == "normal")
        setTextSize("data-tsnormal"), setImageSize("data-isnormal");
    else
        setTextSize("data-tslarge"), setImageSize("data-islarge");

    if (descriptive_images == "true")
        setDescriptiveImages("enable");
    else
        setDescriptiveImages("disable");
}
