nav.displayMenu = async function()
{
    nav.hideEveryDiv();

    document.getElementById('main_page').style.display = 'block';
    document.getElementById('main_menu_page').style.display = "block";
    document.getElementById('main_menu_buttons').style.display = "block";
    document.getElementById('main_menu_toolbar').style.display = "block";

    stop_flag = true;
    active = false;

    freeInputAndForms();
    tournamentFinalReset();
    resetConnection();

    refreshStats();
    refreshStatsDisplaySwitch();
    refreshLogin();

    setBackground('/home');
    addToHistory('/home');
    document.title = getTranslation('Home');
}

nav.removeMenu = function()
{
    document.getElementById('main_page').style.display = "none";
}

function refreshSite()
{
    window.location.reload();
}

function setBackground(pagePath)
{
    let icons = document.querySelectorAll('.bg-icon');
    
    hideBackgrounds();
    hideAchievement();

    if (pagePath == '/home' || pagePath == '/settings' || pagePath == '/privacy-settings' || pagePath == '/statistics'
        || pagePath == '/customize' || pagePath == '/play' || pagePath == '/classic' || pagePath == '/tournament'
        || pagePath == '/game-history' || pagePath == '/online-stats' || pagePath == '/local-stats' || pagePath == '/online'
        || pagePath == '/create-lobby' || pagePath == '/join-lobby')
    {
        document.getElementById('background_menu_1').style.display = 'block';
        document.getElementById('background_menu_2').style.display = 'block';
        icons[Math.floor(Math.random() * 27)].classList.remove('d-none');
    }
}

function hideBackgrounds()
{
    document.getElementById('background_menu_1').style.display = 'none';
    document.getElementById('background_menu_2').style.display = 'none';
    let icons = document.querySelectorAll('.bg-icon')
    icons.forEach(element => {element.classList.add('d-none');});
}

function setBackgroundColor(color)
{
    if (color == "white"){
        document.body.style.setProperty("background-color", "white");

        document.getElementById('login_dropdown').style.setProperty("background-color", "white");
        document.getElementById('modal_color_disco').style.setProperty("background-color", "white");
        document.getElementById('modal_color_leaving').style.setProperty("background-color", "white");
        document.getElementById('modal_color_leaderboard').style.setProperty("background-color", "white");
    }
    else
    {
        document.body.style.setProperty("background-color", "black");

        document.getElementById('login_dropdown').style.setProperty("background-color", "black");
        document.getElementById('modal_color_disco').style.setProperty("background-color", "black");
        document.getElementById('modal_color_leaving').style.setProperty("background-color", "black");
        document.getElementById('modal_color_leaderboard').style.setProperty("background-color", "black");
    }
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

    if (color == "white")
        document.getElementById("settings_modal").style["background-color"] = "white", settings_modal.style["border"] = "black 2px solid";
    else
        document.getElementById("settings_modal").style["background-color"] = "black", settings_modal.style["border"] = "white 2px solid";
}

function setImagesColor(color)
{
    let images = document.getElementsByClassName("image");
    let svg = document.querySelectorAll('.svg');
    for (let i = 0; i != images.length; i++)
    {
        if (color == "white")
            images[i].style.filter="invert(100%)";
        else
            images[i].style.filter="invert(0%)";
    }

    svg.forEach(element => {
        if (element.classList.contains('foot')){
            element.style.filter="invert(100%)";
            return;
        }
        if (color == "white")
            element.style.filter="invert(100%)";
        else
            element.style.filter="invert(0%)";
    });
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
        images[i].style.width = value;
    }
}

function setTextSize(size)
{
    let texts = document.querySelectorAll('[data-tsnormal]');
    let sb_switch = document.querySelectorAll('.sb_switch');

    if (size == "data-tsnormal"){
        sb_switch.forEach(element => {element.style = "width: 50px; height: 50px;";});
        document.getElementById('offcanvas_foot').style = "height: 106px;"
        document.getElementById('text_size_btn_selector').selectedIndex = 0;
    }
    else{
        sb_switch.forEach(element => {element.style = "width: 70px; height: 70px;";});
        document.getElementById('offcanvas_foot').style = "height: 122px; min-height: 117px"
        document.getElementById('text_size_btn_selector').selectedIndex = 1;
    }

    for (let i = 0; i != texts.length; i++)
    {
        let value = texts[i].getAttribute(size);
        texts[i].style.fontSize = value;
    }
}

function setHighContrast(value)
{
    let btn = document.querySelectorAll('.btn, .btn_img, .btn_icon, .slider, .selector, #title_logo, #top_logo, #o-t_top_logo');
    let btn_icon = document.querySelectorAll('.btn_icon');
    let dark_btn = document.querySelectorAll('.dark_btn');
    let footer = document.getElementById('footer_div');
    let high_contrast_btn = document.getElementById('high_contrast_btn_yn');
    let side_menu = document.getElementById('sideMenu')
    let sb_dropBg = document.getElementById('lang_switch_menu');
    let sb_header = document.getElementById('offcanvas_head')

    if (high_contrast == "true")
    {
        document.body.classList.add('dark-mode');
        dark_btn.forEach(element =>{
            element.classList.remove('btn-outline-dark')
            element.classList.add('btn-outline-light')
        });

        btn.forEach(element => {
            element.classList.add('focus-white');
            element.classList.remove('focus-black');
        });

        btn_icon.forEach(element => {
            element.classList.add('focus-black');
            element.classList.remove('focus-white');
        });
        sb_dropBg.style.background = 'black';
        side_menu.style.backgroundColor = "#99999938";
        high_contrast_btn.setAttribute('data-oname', 'Enabled');
        high_contrast_btn.style.backgroundColor = "#AD1400";
        high_contrast_btn.style.color = "white";
        footer.style.backgroundColor="#9a040c";
        sb_header.style.backgroundColor="#222222";
        document.getElementById('menu_ham').classList.replace('bg-light', 'bg-black');
        setBackgroundColor("black");
        setTextColor("white");
        setMaterialsColor("black");
        setImagesColor("white");
    }
    else
    {
        document.body.classList.remove('dark-mode');
        dark_btn.forEach(element =>{
            element.classList.remove('btn-outline-light')
            element.classList.add('btn-outline-dark')
        });

        btn.forEach(element => {
            element.classList.add('focus-black')
            element.classList.remove('focus-white');
        });
        sb_dropBg.style.background = 'white';
        side_menu.style.backgroundColor = "white";
        footer.style.backgroundColor="#9a040c";
        high_contrast_btn.setAttribute('data-oname', 'Disabled');
        high_contrast_btn.style.backgroundColor = "";
        high_contrast_btn.style.color = "black";
        sb_header.style.backgroundColor="white"
        document.getElementById('menu_ham').classList.replace('bg-black', 'bg-light');
        setBackgroundColor("white");
        setTextColor("black");
        setMaterialsColor("white");
        setImagesColor("black");
    }
    languageSwitch(language);
}

function setDescriptiveImages(value)
{
    let descriptions = document.querySelectorAll('[title]');

    if (value == "enable")
    {
        document.getElementById('image_desc_btn_yn').setAttribute('data-oname', 'Enabled');
        document.getElementById('image_desc_btn_yn').style.backgroundColor = "#AD1400";
        document.getElementById('image_desc_btn_yn').classList.replace('text-black', 'text-white');
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
    setBackground('/settings');

    setHighContrast();

    if (text_size == "normal")
        setTextSize("data-tsnormal"), setImageSize("data-isnormal");
    else
        setTextSize("data-tslarge"), setImageSize("data-islarge");

    if (descriptive_images == "true")
        setDescriptiveImages("enable");
    else
        setDescriptiveImages("disable");

    ARIAButtonState();
    ARIASoundsSlider();
}

function displayDropdownMenu()
{
    document.getElementById('login_dropdown').classList.remove('d-none');
    addOutsideDropdown();
}
function addOutsideDropdown(){
    document.addEventListener('click', outsideDropdownClick)
}
function removeOutsideDropdown(){
    document.removeEventListener('click', outsideDropdownClick)
}
function outsideDropdownClick(event)
{
    if (!document.getElementById('intra_login').contains(event.target))
    {
        login_dropdown.classList.add('d-none');
        removeOutsideDropdown();
    }
}

function hideAchievement()
{
    document.getElementById('konami_toast').style.display = "none";
    // ...
}

function displayAchievement(achievement)
{
    document.getElementById('achiev_sound').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));

    if (achievement == "konami")
    {
        let konami_toast = document.getElementById('konami_toast');
        konami_toast.style.display = "block";
        if (high_contrast == "true")
        {
            konami_toast.style.backgroundColor = "black";
            document.getElementById('konami_toast_header').style.backgroundColor = "black";
            document.getElementById('achiev_symbol_kc').setAttribute('src', './Materials/images/menu/ach_symbol_w.png');
            // document.getElementById('close_btn_achiev_kc').style.color = "white";
        }
        else
        {
            konami_toast.style.backgroundColor = "white";
            document.getElementById('konami_toast_header').style.backgroundColor = "white";
            document.getElementById('achiev_symbol_kc').setAttribute('src', './Materials/images/menu/ach_symbol_b.png');
            // document.getElementById('close_btn_achiev_kc').style.color = "black";
        }

        new bootstrap.Toast(konami_toast).show();
    }
    else if (achievement == "...")
    {
        // ...
    }
}

function detectKonamiCode(event)
{
    let key = event.key;

    if (keys_register == null)
        keys_register = [];
    keys_register.push(key);

    if (keys_register.length >= 10)
    {
        for (let i = 0; i != keys_register.length; i++)
        {
            if (keys_register[i] == 'ArrowUp' && keys_register.length - i >= 10)
            {
                if (keys_register[i + 1] == 'ArrowUp' && keys_register[i + 2] == 'ArrowDown' && keys_register[i + 3] == 'ArrowDown' && keys_register[i + 4] == 'ArrowLeft' && keys_register[i + 5] == 'ArrowRight' && keys_register[i + 6] == 'ArrowLeft' && keys_register[i + 7] == 'ArrowRight' && keys_register[i + 8] == 'b' && keys_register[i + 9] == 'a' && keys_register[i + 10] == 'Enter')
                {
                    if (localStorage.getItem('konami_code') != "true")
                        displayAchievement("konami"), localStorage.setItem('konami_code', "true");
                    keys_register = [];
                    return ;
                }
            }
        }
    }
}
