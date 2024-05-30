// < visual stats > //

class VisualStats
{
    constructor()
    {
        this.width = 900;
        this.height = 520;

        this.canvas = null;
        this.display = null;

        this.background_color = null;
        this.global_color = null;
    }

    initialize()
    {
        this.canvas = document.getElementById('stats_canvas');
        this.display = this.canvas.getContext('2d');

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (high_contrast == "true")
            this.global_color = "white", this.background_color = "black";
        else
            this.global_color = "black", this.background_color = "white";

        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.width, this.height);
    }

    displayCamembert()
    {
        this.clean();

        let image = new Image();
        if (this.global_color == "white")
            image.src = 'Materials/images/circle_white.png';
        else
            image.src = 'Materials/images/circle_black.png';
        this.display.drawImage(image, 0, 0);

        // ...
    }

    displayBarChartOne()
    {
        this.clean();

        let image = new Image();
        if (this.global_color == "white")
            image.src = 'Materials/images/histograph_white.png';
        else
            image.src = 'Materials/images/histograph_black.png';
        this.display.drawImage(image, 0, 0);

        // ...
    }

    displayBarChartTwo()
    {
        this.clean();

        let image = new Image();
        if (this.global_color == "white")
            image.src = 'Materials/images/histograph_white.png';
        else
            image.src = 'Materials/images/histograph_black.png';
        this.display.drawImage(image, 0, 0);

        // ...
    }

    clean()
    {
        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.width, this.height);
    }
}

// < display > //

function refreshStats()
{
    // load global variables from local storage

    // ...

    // load html data from variables

    document.getElementById('lcl_game_played_nb').innerHTML = "[ " + lcl_played + " ]";
    document.getElementById('lcl_bonus_taken_nb').innerHTML = "[ " + lcl_bonus_taken + " ]";
    document.getElementById('lcl_ball_exit_nb').innerHTML = "[ " + lcl_ball_out + " ]";
    document.getElementById('lcl_ball_bounce_nb').innerHTML = "[ " + lcl_ball_hit + " ]";
    document.getElementById('lcl_longest_exchange').innerHTML = "[ " + lcl_longest_exchange + " ]";
    document.getElementById('lcl_shortest_game').innerHTML = "[ " + lcl_shortest_game + " ]";

    let win_rate = ~~(onl_victory * 100 / onl_played);
    let lose_rate = ~~(onl_defeat * 100 / onl_played);

    document.getElementById('onl_game_played_nb').innerHTML = "[ " + onl_played + " ]";
    document.getElementById('onl_game_won_nb').innerHTML = "[ " + onl_victory + " ] [ " + win_rate + "% ]";
    document.getElementById('onl_game_lost_nb').innerHTML = "[ " + onl_defeat + " ] [ " + lose_rate + "% ]";
    document.getElementById('onl_dist').innerHTML = "[ " + onl_dist + " px ]";
    document.getElementById('onl_ball_return').innerHTML = "[ " + onl_ball_return + "/" + onl_ball_received + " ]";
    document.getElementById('onl_bonus_taken_nb').innerHTML = "[ " + onl_bonus_taken + "/" + onl_bonus_received + " ]";
    document.getElementById('onl_longest_exchange').innerHTML = "[ " + onl_longest_exchange + " ]";
    document.getElementById('onl_shortest_game').innerHTML = "[ " + onl_shortest_game + " ]";
}

function changeStatsDisplayMode()
{
    let switch_box = document.getElementById('switch_visual_input');

    if (switch_box.checked == true)
        localStorage.setItem('visual_mode', 'true'), visual = true;
    else
        localStorage.setItem('visual_mode', 'false'), visual = false;

    if (document.getElementById('online_stats').style.display == 'block')
        displayOnlineStats();
}

function refreshStatsDisplaySwitch()
{
    if (localStorage.getItem('visual_mode') == true)
        document.getElementById('switch_visual_input').checked = true, visual = true;
    else
        document.getElementById('switch_visual_input').checked = false, visual = false;
}

function displayStats()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let stats_menu = document.getElementById('stats_menu');
    let stats_menu_btn = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');

    stats_menu.style.display = 'block';
    stats_menu_btn.style.display = 'block';
    stats_back_btn.style.display = 'block';

    main_menu.style.display = 'none';
}

function removeStats()
{
    let main_menu = document.getElementById('main_menu_buttons');

    let stats_menu = document.getElementById('stats_menu');
    let stats_back_btn = document.getElementById('stats_back_btn');

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';

    main_menu.style.display = 'block';
}

function displayLocalStats()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let local_stats = document.getElementById('local_stats');

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';
    local_stats.style.display = 'block';

    document.getElementById('local_stats_nv').style.display = 'block';
}

function removeLocalStats()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let local_stats = document.getElementById('local_stats');

    stats_menu.style.display = 'block';
    stats_back_btn.style.display = 'block';
    local_stats.style.display = 'none';
}

function displayOnlineStats()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let online_stats = document.getElementById('online_stats');

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';
    online_stats.style.display = 'block';

    if (visual == true)
    {
        document.getElementById('online_stats_v').style.display = 'block';
        document.getElementById('online_stats_nv').style.display = 'none';

        stats = new VisualStats();
        stats.initialize();
        // stats.displayBarChartOne();
        // stats.displayBarChartTwo();
        // stats.displayCamembert();
    }
    else
    {
        document.getElementById('online_stats_nv').style.display = 'block';
        document.getElementById('online_stats_v').style.display = 'none';
    }
}

function removeOnlineStats()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let online_stats = document.getElementById('online_stats');

    stats_menu.style.display = 'block';
    stats_back_btn.style.display = 'block';
    online_stats.style.display = 'none';
}

function displayHistory()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let history = document.getElementById('history');

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';
    history.style.display = 'block';
}

function removeHistory()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let history = document.getElementById('history');

    stats_menu.style.display = 'block';
    stats_back_btn.style.display = 'block';
    history.style.display = 'none';
}