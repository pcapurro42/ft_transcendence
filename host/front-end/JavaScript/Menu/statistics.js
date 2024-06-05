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

        this.onl_victory;
        this.onl_defeat;
        this.onl_played;
        this.onl_ball_return;
        this.onl_ball_received;
        this.onl_bonus_taken;
        this.onl_bonus_received;
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

        this.onl_victory = parseInt(localStorage.getItem('onl_victory'));
        this.onl_defeat = parseInt(localStorage.getItem('onl_defeat'));
        this.onl_played = parseInt(localStorage.getItem('onl_played'));
        this.onl_ball_return = parseInt(localStorage.getItem('onl_ball_return'));
        this.onl_ball_received = parseInt(localStorage.getItem('onl_ball_received'));
        this.onl_ball_missed = this.onl_ball_received - this.onl_ball_return;
        this.onl_bonus_taken = parseInt(localStorage.getItem('onl_bonus_taken'));
        this.onl_bonus_received = parseInt(localStorage.getItem('onl_bonus_received'));
        this.onl_bonus_missed = this.onl_bonus_received - this.onl_bonus_taken;
    }

    drawCircleSurface(surface, color)
    {
        this.display.beginPath();

        if (color != this.background_color)
            this.display.moveTo(this.width / 2, this.height / 2);
        this.display.arc(this.width / 2, this.height / 2, 190, 0, ((surface * Math.PI) / 180));

        this.display.fillStyle = color;
        this.display.fill();

        if (color == this.background_color)
            this.display.lineWidth = 3, this.display.strokeStyle = this.global_color, this.display.stroke();
    }

    displayCamembert()
    {
        this.clean();

        this.display.font = this.title_text_format;
        this.display.fillStyle = this.text_color;

        let title = getTranslation("Game(s) played");
        let title_size = this.display.measureText("– " + title + " –").width;
        this.display.fillText("– " + title + " –", this.width / 2 - (title_size / 2), 35);

        this.display.font = this.basic_text_format;

        let legend_one = getTranslation("Purple: Game(s) won")
        let legend_one_size = this.display.measureText(legend_one).width;
        this.display.fillText(legend_one, this.width / 2 - (legend_one_size / 2), 485);
    
        let legend_two = getTranslation("Yellow: Game(s) lost")
        let legend_two_size = this.display.measureText(legend_two).width;
        this.display.fillText(legend_two, this.width / 2 - (legend_two_size / 2), 510);

        if (this.onl_played != 0)
        {
            let victory = (this.onl_victory * 360) / this.onl_played;
            let defeat = (this.onl_defeat * 360) / this.onl_played;
    
            if (victory >= defeat)
                this.drawCircleSurface(360, "purple"), this.drawCircleSurface(defeat, "yellow");
            else
                this.drawCircleSurface(360, "yellow"), this.drawCircleSurface(victory, "purple")
        }
        else
            this.drawCircleSurface(360, this.background_color);

    }

    displayBarChartOne()
    {
        this.clean();

        this.histogram.onload = () => {this.display.drawImage(this.histogram, 0, 0)};

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

        if (this.onl_ball_received != 0)
        {
            // total

            let y_pos_total = this.histogram_last_line_y - this.histogram_data_max_height;
            
            this.display.fillStyle = "green";
            this.display.fillRect(this.histogram_center_x, y_pos_total, this.histogram_data_width, this.histogram_data_max_height);

            this.display.fillStyle = this.text_color;
            let center_data_size = this.display.measureText("100%").width;
            this.display.fillText("100%", this.center_text_x - (center_data_size / 2), (y_pos_total - 10));

            // returned

            let returned_value = ((this.onl_ball_return * 100) / this.onl_ball_received).toFixed(1);
            let returned_height = ((returned_value) * this.histogram_data_max_height) / 100;
            let y_pos_returned = this.histogram_last_line_y - returned_height;
            
            this.display.fillStyle = "yellow";
            this.display.fillRect(this.histogram_left_x, y_pos_returned, this.histogram_data_width, returned_height);

            this.display.fillStyle = this.text_color;
            let left_data_size = this.display.measureText(returned_value + "%").width;
            this.display.fillText(returned_value + "%", this.left_text_x - (left_data_size / 2), (y_pos_returned - 10));

            // missed

            let missed_value = ((this.onl_ball_missed * 100) / this.onl_ball_received).toFixed(1);
            let missed_height = ((missed_value) * this.histogram_data_max_height) / 100;
            let y_pos_missed = this.histogram_last_line_y - missed_height;
            
            this.display.fillStyle = "purple";
            this.display.fillRect(this.histogram_right_x, y_pos_missed, this.histogram_data_width, missed_height);

            this.display.fillStyle = this.text_color;
            let right_data_size = this.display.measureText(missed_value + "%").width;
            this.display.fillText(missed_value + "%", this.right_text_x - (right_data_size / 2), (y_pos_missed - 10));
        }
    }

    displayBarChartTwo()
    {
        this.clean();

        this.histogram.onload = () => {this.display.drawImage(this.histogram, 0, 0)};

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

        if (this.onl_bonus_received != 0)
        {
            // total

            let y_pos_total = this.histogram_last_line_y - this.histogram_data_max_height;
            
            this.display.fillStyle = "yellow";
            this.display.fillRect(this.histogram_center_x, y_pos_total, this.histogram_data_width, this.histogram_data_max_height);

            this.display.fillStyle = this.text_color;
            let center_data_size = this.display.measureText("100%").width;
            this.display.fillText("100%", this.center_text_x - (center_data_size / 2), (y_pos_total - 10));

            // returned

            let taken_value = ((this.onl_bonus_taken * 100) / this.onl_bonus_received).toFixed(1);
            let taken_height = ((taken_value) * this.histogram_data_max_height) / 100;
            let y_pos_taken = this.histogram_last_line_y - taken_height;
            
            this.display.fillStyle = "purple";
            this.display.fillRect(this.histogram_left_x, y_pos_taken, this.histogram_data_width, taken_height);

            this.display.fillStyle = this.text_color;
            let left_data_size = this.display.measureText(taken_value + "%").width;
            this.display.fillText(taken_value + "%", this.left_text_x - (left_data_size / 2), (y_pos_taken - 10));

            // missed

            let missed_value = ((this.onl_bonus_missed * 100) / this.onl_bonus_received).toFixed(1);
            let missed_height = ((missed_value) * this.histogram_data_max_height) / 100;
            let y_pos_missed = this.histogram_last_line_y - missed_height;
            
            this.display.fillStyle = "green";
            this.display.fillRect(this.histogram_right_x, y_pos_missed, this.histogram_data_width, missed_height);

            this.display.fillStyle = this.text_color;
            let right_data_size = this.display.measureText(missed_value + "%").width;
            this.display.fillText(missed_value + "%", this.right_text_x - (right_data_size / 2), (y_pos_missed - 10));
        }
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

class History
{
    constructor(history_data)
    {
        this.history_data = history_data;

        this.title_text_format = "32px Arial";
        this.medium_text_format = "23px Arial";
        this.small_text_format = "18px Arial";
        this.ridiculous_text_format = "12px Arial";

        this.data_canvas = null;
        this.data_display = null;
        this.data_width = 900;
        this.data_height = 200;

        this.graph = null;
        this.graph_canvas = null;
        this.graph_display = null;
        this.graph_width = 550;
        this.graph_height = 350;

        this.histogram_canvas = null;
        this.histogram_display = null;
        this.histogram_width = 300;
        this.histogram_height = 350;
    }

    initializeData()
    {
        this.data_canvas = document.getElementById('history_data');
        this.data_display = this.data_canvas.getContext('2d');

        this.data_canvas.width = this.data_width;
        this.data_canvas.height = this.data_height;
    }

    initializeGraph()
    {
        this.graph_canvas = document.getElementById('history_time_data');
        this.graph_display = this.graph_canvas.getContext('2d');

        this.graph_canvas.width = this.graph_width;
        this.graph_canvas.height = this.graph_height;

        this.graph = new Image();
        if (this.global_color == "white")
            this.graph.src = 'Materials/images/graph_black.png';
        else
            this.graph.src = 'Materials/images/graph_white.png';
    }

    initializeHistogram()
    {
        this.histogram_canvas = document.getElementById('history_diagram_data');
        this.histogram_display = this.histogram_canvas.getContext('2d');

        this.histogram_canvas.width = this.histogram_width;
        this.histogram_canvas.height = this.histogram_height;
    }

    initialize()
    {
        this.initializeData();
        this.initializeGraph();
        this.initializeHistogram();

        if (high_contrast == "true")
            this.global_color = "white", this.background_color = "black";
        else
            this.global_color = "black", this.background_color = "white";
    }

    displayInfos()
    {
        if (this.history_data == null)
        {
            this.data_display.font = this.title_text_format;
            this.data_display.fillStyle = this.global_color;
            let text = getTranslation("[No availaible data to display]");
            let center_text = this.data_display.measureText(text).width;
            this.data_display.fillText(text, this.data_width / 2 - (center_text / 2), this.data_height / 2);
        }
        else
        {
            ;
        }
    }

    displayGraph()
    {
        this.graph_display.font = this.medium_text_format;
        this.graph_display.fillStyle = this.global_color;

        let title = getTranslation("Game timelapse");
        let title_size = this.graph_display.measureText("– " + title + " –").width;
        this.graph_display.fillText("– " + title + " –", this.graph_width / 2 - (title_size / 2), 35);

        this.graph_display.font = this.ridiculous_text_format;
        this.graph_display.fillText("20%", 143, 335);
        this.graph_display.fillText("40%", 230, 335);
        this.graph_display.fillText("60%", 320, 335);
        this.graph_display.fillText("80%", 410, 335);
        
        this.graph.onload = () => {this.graph_display.drawImage(this.graph, 0, 20, 570, 338)};

        if (this.history_data != null)
        {
            ;
        }
    }

    drawCircleSurface(surface, color)
    {
        this.histogram_display.beginPath();

        if (color != this.background_color)
            this.histogram_display.moveTo(this.histogram_width / 2, this.histogram_height / 2);
        this.histogram_display.arc(this.histogram_width / 2, this.histogram_height / 2 + 15, 135, 0, ((surface * Math.PI) / 180));

        this.histogram_display.fillStyle = color;
        this.histogram_display.fill();

        if (color == this.background_color)
            this.histogram_display.lineWidth = 3, this.histogram_display.strokeStyle = this.global_color, this.histogram_display.stroke();
    }

    displayHistogram()
    {
        this.histogram_display.font = this.medium_text_format;
        this.histogram_display.fillStyle = this.global_color;

        let title = getTranslation("Game domination");
        let title_size = this.histogram_display.measureText("– " + title + " –").width;
        this.histogram_display.fillText("– " + title + " –", this.histogram_width / 2 - (title_size / 2), 35);

        if (this.history_data == null)
            this.drawCircleSurface(360, this.background_color);
        else
        {
            let victory = 0
            let defeat = 0
    
            if (victory >= defeat)
                this.drawCircleSurface(360, "purple"), this.drawCircleSurface(defeat, "yellow");
            else
                this.drawCircleSurface(360, "yellow"), this.drawCircleSurface(victory, "purple")
        }
    }

    display()
    {
        this.displayInfos();
        this.displayGraph();
        this.displayHistogram();
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
    // if (document.getElementById('history').style.display == 'block')
    // {
    //     if (event.key == 'ArrowLeft')
    //         history_tab--, history.display();
    //     if (event.key == 'ArrowRight')
    //         history_tab++, history.display();
    // }
});


// < display > //

function refreshStats()
{
    // init if uninit

    // local

    if (localStorage.getItem('lcl_game_played_nb') == null)
        localStorage.setItem('lcl_game_played_nb', 0);

    if (localStorage.getItem('lcl_bonus_taken_nb') == null)
        localStorage.setItem('lcl_bonus_taken_nb', 0);

    if (localStorage.getItem('lcl_ball_exit_nb') == null)
        localStorage.setItem('lcl_ball_exit_nb', 0);

    if (localStorage.getItem('lcl_ball_bounce_nb') == null)
        localStorage.setItem('lcl_ball_bounce_nb', 0);

    // online

    if (localStorage.getItem('onl_played') == null)
        localStorage.setItem('onl_played', 0);

    if (localStorage.getItem('onl_victory') == null)
        localStorage.setItem('onl_victory', 0);

    if (localStorage.getItem('onl_defeat') == null)
        localStorage.setItem('onl_defeat', 0);

    if (localStorage.getItem('onl_dist') == null)
        localStorage.setItem('onl_dist', 0);

    if (localStorage.getItem('onl_ball_return') == null)
        localStorage.setItem('onl_ball_return', 0);

    if (localStorage.getItem('onl_ball_received') == null)
        localStorage.setItem('onl_ball_received', 0);

    if (localStorage.getItem('onl_bonus_taken') == null)
        localStorage.setItem('onl_bonus_taken', 0);

    if (localStorage.getItem('onl_bonus_received') == null)
        localStorage.setItem('onl_bonus_received', 0);

    // load html data from variables

    document.getElementById('lcl_game_played_nb').innerHTML = "[ " + localStorage.getItem('lcl_game_played_nb') + " ]";
    document.getElementById('lcl_bonus_taken_nb').innerHTML = "[ " + localStorage.getItem('lcl_bonus_taken_nb') + " ]";
    document.getElementById('lcl_ball_exit_nb').innerHTML = "[ " + localStorage.getItem('lcl_ball_exit_nb') + " ]";
    document.getElementById('lcl_ball_bounce_nb').innerHTML = "[ " + localStorage.getItem('lcl_ball_bounce_nb') + " ]";

    let win_rate = ~~(parseInt(localStorage.getItem('onl_victory')) * 100 / parseInt(localStorage.getItem('onl_played')));
    let lose_rate = ~~(parseInt(localStorage.getItem('onl_defeat')) * 100 / parseInt(localStorage.getItem('onl_played')));

    document.getElementById('onl_game_played_nb').innerHTML = "[ " + localStorage.getItem('onl_played') + " ]";
    document.getElementById('onl_game_won_nb').innerHTML = "[ " + localStorage.getItem('onl_victory') + " ] [ " + win_rate + "% ]";
    document.getElementById('onl_game_lost_nb').innerHTML = "[ " + localStorage.getItem('onl_defeat') + " ] [ " + lose_rate + "% ]";
    document.getElementById('onl_dist').innerHTML = "[ " + localStorage.getItem('onl_dist') + " px ]";
    document.getElementById('onl_ball_return').innerHTML = "[ " + localStorage.getItem('onl_ball_return') + "/" + localStorage.getItem('onl_ball_received') + " ]";
    document.getElementById('onl_bonus_taken_nb').innerHTML = "[ " + localStorage.getItem('onl_bonus_taken') + "/" + localStorage.getItem('onl_bonus_received') + " ]";
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

        document.getElementById('visual_info').style.display = 'block';
        document.getElementById('visual_info').style.visibility = 'visible';

        stats = new VisualStats();
        stats.initialize();
        stats.displayObject();
    }
    else
    {
        document.getElementById('online_stats_nv').style.display = 'block';
        document.getElementById('online_stats_v').style.display = 'none';

        document.getElementById('visual_info').style.display = 'none';
        document.getElementById('visual_info').style.visibility = 'hidden';
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

function refreshHistory()
{
    ;
}

function displayHistory()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let history = document.getElementById('history');

    document.getElementById('history_info').style.display = 'block';
    document.getElementById('history_info').style.visibility = 'visible';

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';
    history.style.display = 'block';

    let history_data = localStorage.getItem('history_data');
    if (history_data != null)
        history_data = JSON.parse(history_data);

    history = new History(history_data);
    history.initialize();
    history.display();
}

function removeHistory()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let history = document.getElementById('history');

    document.getElementById('history_info').style.display = 'none';
    document.getElementById('history_info').style.visibility = 'hidden';

    stats_menu.style.display = 'block';
    stats_back_btn.style.display = 'block';
    history.style.display = 'none';
}