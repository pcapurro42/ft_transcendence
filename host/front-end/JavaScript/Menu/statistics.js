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

        this.text_color = null;
        this.title_text_format = "27px Arial";
        this.basic_text_format = "18px Arial";

        this.circle = null;
        this.histogram = null;

        this.histogram_center_x;
        this.histogram_left_x;
        this.histogram_right_x;

        this.left_text_x;
        this.center_text_x;
        this.right_text_x;

        this.histogram_data_width;
        this.histogram_data_max_height;
        this.histogram_last_line_y = 451;
    }

    initialize()
    {
        this.canvas = document.getElementById('stats_canvas');
        this.display = this.canvas.getContext('2d');

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (high_contrast == "true")
            this.global_color = "white", this.text_color = "white", this.background_color = "black";
        else
            this.global_color = "black", this.text_color = "black", this.background_color = "white";

        this.circle = new Image();
        if (this.global_color == "white")
            this.circle.src = 'Materials/images/circle_white.png';
        else
            this.circle.src = 'Materials/images/circle_black.png';

        this.histogram = new Image();
        if (this.global_color == "white")
            this.histogram.src = 'Materials/images/histogram_white.png';
        else
            this.histogram.src = 'Materials/images/histogram_black.png';

        this.histogram_data_width = 100;
        this.histogram_data_max_height = 325;

        this.center_text_x = (this.width / 2);
        this.left_text_x = this.center_text_x - 175;
        this.right_text_x = this.center_text_x + 175;

        this.histogram_center_x = (this.width / 2) - this.histogram_data_width / 2;
        this.histogram_left_x = this.histogram_center_x - 175;
        this.histogram_right_x = this.histogram_center_x + 175;
    }

    displayCamembert()
    {
        this.clean();

        this.display.fillStyle = "yellow";

        let victory = (onl_victory * 100) / onl_played;
        let defeat = 100 - victory;

        let x = this.width / 2;
        let y = this.height / 2 + 15;

        for (let i = 0; i != 361; i++)
        {
            let radian = ((i * (-1)) * Math.PI) / 180;
            let x_dir = Math.cos(radian);
            let y_dir = Math.sin(radian);

            if (i )

            for (let j = 0; j != 250; j++)
            {
                this.display.fillRect(x, y, 4, 4);
                x = x + x_dir;
                y = y + y_dir;
            }

            x = this.width / 2;
            y = this.height / 2 + 15;
        }

        this.circle.onload = this.display.drawImage(this.circle, 0, 25);

        this.display.font = this.title_text_format;
        this.display.fillStyle = this.text_color;

        let text = getTranslation("Game(s) played");
        let text_size = this.display.measureText("– " + text + " –").width;
        this.display.fillText("– " + text + " –", this.width / 2 - (text_size / 2), 35);

        // ...
    }

    displayBarChartOne()
    {
        this.clean();

        this.histogram.onload = this.display.drawImage(this.histogram, 0, 0);

        // texts

        this.display.font = this.title_text_format;
        this.display.fillStyle = this.text_color;

        let title = getTranslation("Ball return(s)");
        let title_size = this.display.measureText("– " + title + " –").width;
        this.display.fillText("– " + title + " –", this.width / 2 - (title_size / 2), 35);

        this.display.font = this.basic_text_format;

        let left_text = getTranslation("Returned");
        let left_text_size = this.display.measureText(left_text).width;
        this.display.fillText(left_text, this.left_text_x - (left_text_size / 2), 500);

        let center_text = getTranslation("Received");
        let center_text_size = this.display.measureText(center_text).width;
        this.display.fillText(center_text, this.center_text_x - (center_text_size / 2), 500);

        let right_text = getTranslation("Missed");
        let right_text_size = this.display.measureText(right_text).width;
        this.display.fillText(right_text, this.right_text_x - (right_text_size / 2), 500);

        // total

        let y_pos_total = this.histogram_last_line_y - this.histogram_data_max_height;
        
        this.display.fillStyle = "green";
        this.display.fillRect(this.histogram_center_x, y_pos_total, this.histogram_data_width, this.histogram_data_max_height);

        this.display.fillStyle = this.text_color;
        let center_data_size = this.display.measureText("100%").width;
        this.display.fillText("100%", this.center_text_x - (center_data_size / 2), (y_pos_total - 10));

        // returned

        let returned_value = (onl_ball_return * 100) / onl_ball_received;
        let returned_height = ((returned_value) * this.histogram_data_max_height) / 100;
        let y_pos_returned = this.histogram_last_line_y - returned_height;
        
        this.display.fillStyle = "yellow";
        this.display.fillRect(this.histogram_left_x, y_pos_returned, this.histogram_data_width, returned_height);

        this.display.fillStyle = this.text_color;
        let left_data_size = this.display.measureText(returned_value + "%").width;
        this.display.fillText(returned_value + "%", this.left_text_x - (left_data_size / 2), (y_pos_returned - 10));

        // missed

        let missed_value = (onl_ball_missed * 100) / onl_ball_received;
        let missed_height = ((missed_value) * this.histogram_data_max_height) / 100;
        let y_pos_missed = this.histogram_last_line_y - missed_height;
        
        this.display.fillStyle = "purple";
        this.display.fillRect(this.histogram_right_x, y_pos_missed, this.histogram_data_width, missed_height);

        this.display.fillStyle = this.text_color;
        let right_data_size = this.display.measureText(missed_value + "%").width;
        this.display.fillText(missed_value + "%", this.right_text_x - (right_data_size / 2), (y_pos_missed - 10));
    }

    displayBarChartTwo()
    {
        this.clean();

        this.histogram.onload = this.display.drawImage(this.histogram, 0, 0);

        // texts

        this.display.font = this.title_text_format;
        this.display.fillStyle = this.text_color;

        let title = getTranslation("Bonus taken");
        let title_size = this.display.measureText("– " + title + " –").width;
        this.display.fillText("– " + title + " –", this.width / 2 - (title_size / 2), 35);

        this.display.font = this.basic_text_format;

        let left_text = getTranslation("Taken");
        let left_text_size = this.display.measureText(left_text).width;
        this.display.fillText(left_text, this.left_text_x - (left_text_size / 2), 500);

        let center_text = getTranslation("Received");
        let center_text_size = this.display.measureText(center_text).width;
        this.display.fillText(center_text, this.center_text_x - (center_text_size / 2), 500);

        let right_text = getTranslation("Missed");
        let right_text_size = this.display.measureText(right_text).width;
        this.display.fillText(right_text, this.right_text_x - (right_text_size / 2), 500);

        // total

        let y_pos_total = this.histogram_last_line_y - this.histogram_data_max_height;
        
        this.display.fillStyle = "yellow";
        this.display.fillRect(this.histogram_center_x, y_pos_total, this.histogram_data_width, this.histogram_data_max_height);

        this.display.fillStyle = this.text_color;
        let center_data_size = this.display.measureText("100%").width;
        this.display.fillText("100%", this.center_text_x - (center_data_size / 2), (y_pos_total - 10));

        // returned

        let taken_value = (onl_bonus_taken * 100) / onl_bonus_received;
        let taken_height = ((taken_value) * this.histogram_data_max_height) / 100;
        let y_pos_taken = this.histogram_last_line_y - taken_height;
        
        this.display.fillStyle = "purple";
        this.display.fillRect(this.histogram_left_x, y_pos_taken, this.histogram_data_width, taken_height);

        this.display.fillStyle = this.text_color;
        let left_data_size = this.display.measureText(taken_value + "%").width;
        this.display.fillText(taken_value + "%", this.left_text_x - (left_data_size / 2), (y_pos_taken - 10));

        // missed

        let missed_value = (onl_bonus_missed * 100) / onl_bonus_received;
        let missed_height = ((missed_value) * this.histogram_data_max_height) / 100;
        let y_pos_missed = this.histogram_last_line_y - missed_height;
        
        this.display.fillStyle = "green";
        this.display.fillRect(this.histogram_right_x, y_pos_missed, this.histogram_data_width, missed_height);

        this.display.fillStyle = this.text_color;
        let right_data_size = this.display.measureText(missed_value + "%").width;
        this.display.fillText(missed_value + "%", this.right_text_x - (right_data_size / 2), (y_pos_missed - 10));
    }

    displayObject()
    {
        if (stats_tab == 0)
            this.displayCamembert();
        if (stats_tab == 1)
            this.displayBarChartOne();
        if (stats_tab == 2)
            this.displayBarChartTwo();
    }

    clean()
    {
        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.width, this.height);
    }
}

// < controls > //

window.addEventListener('keydown', (event) =>
{
    if (visual == true)
    {
        if (event.key == 'ArrowLeft' && stats_tab > 0)
            stats_tab--, stats.displayObject();
        if (event.key == 'ArrowRight' && stats_tab < 2)
            stats_tab++, stats.displayObject();
    }
});


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
        stats.displayObject();
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