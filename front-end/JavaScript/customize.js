function displayCustomize()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let customize_menu = document.getElementById('customize_menu');
    let customize_back_btn = document.getElementById('customize_back_btn');

    customize_menu.style.display = 'block';
    customize_back_btn.style.display = 'block';
    
    main_menu.style.display = 'none';
}

function removeCustomize()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let customize_menu = document.getElementById('customize_menu');
    let customize_back_btn = document.getElementById('customize_back_btn');

    customize_menu.style.display = 'none';
    customize_back_btn.style.display = 'none';
    
    main_menu.style.display = 'block';
}