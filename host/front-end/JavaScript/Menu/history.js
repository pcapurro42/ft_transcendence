// < DISPLAY/REMOVE > //

function displayHistory()
{
    let main_menu = document.getElementById('stats_menu');

    let history = document.getElementById('history');
    let history_back_btn = document.getElementById('history_back_btn');

    history.style.display = 'block';
    history_back_btn.style.display = 'block';

    main_menu.style.display = 'none';
}

function removeHistory()
{
    let main_menu = document.getElementById('stats_menu');

    let history = document.getElementById('history');
    let history_back_btn = document.getElementById('history_back_btn');

    history.style.display = 'none';
    history_back_btn.style.display = 'none';

    main_menu.style.display = 'block';
}