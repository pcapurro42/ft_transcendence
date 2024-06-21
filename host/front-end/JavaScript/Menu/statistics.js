// < visual stats > //

class VisualStats
{
    constructor()
    {
        // global infos initialization

        this.width = 900;
        this.height = 520;

        this.histogram_last_line_y = 451;

        this.histogram_data_width = 100;
        this.histogram_data_max_height = 325;

        this.center_text_x = (this.width / 2);
        this.left_text_x = this.center_text_x - 175;
        this.right_text_x = this.center_text_x + 175;

        this.histogram_center_x = (this.width / 2) - this.histogram_data_width / 2;
        this.histogram_left_x = this.histogram_center_x - 175;
        this.histogram_right_x = this.histogram_center_x + 175;

        this.onl_victory = wonGamesNb;
        this.onl_defeat = loseGameNb;

        this.onl_played = gamesPlayedNb;

        this.onl_ball_return = ballReturned;
        this.onl_ball_received = ballReceived;
        this.onl_ball_missed = this.onl_ball_received - this.onl_ball_return;

        this.onl_bonus_taken = bonusTaken;
        this.onl_bonus_received = bonusTotal;
        this.onl_bonus_missed = this.onl_bonus_received - this.onl_bonus_taken;

        // canvas creation and config

        this.canvas = document.getElementById('stats_canvas');
        this.display = this.canvas.getContext('2d');

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (text_size == "normal")
            this.title_text_format = "27px Arial", this.basic_text_format = "18px Arial";
        else
            this.title_text_format = "32px Arial", this.basic_text_format = "23px Arial";

        if (high_contrast == "true")
            this.global_color = "white", this.text_color = "white", this.background_color = "black";
        else
            this.global_color = "black", this.text_color = "black", this.background_color = "white";

        this.histogram = new Image();
        if (this.global_color == "white")
            this.histogram.src = 'Materials/images/stats/histogram_white.png';
        else
            this.histogram.src = 'Materials/images/stats/histogram_black.png';
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

        let title = getTranslation("Games played");
        let title_size = this.display.measureText("– " + title + " –").width;
        this.display.fillText("– " + title + " –", this.width / 2 - (title_size / 2), 35);

        this.display.font = this.basic_text_format;

        let legend_one = getTranslation("Purple: Games won")
        let legend_one_size = this.display.measureText(legend_one).width;
        this.display.fillText(legend_one, this.width / 2 - (legend_one_size / 2), 485);

        let legend_two = getTranslation("Yellow: Games lost")
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

        this.histogram.onload = this.display.drawImage(this.histogram, 0, 0);

        // texts

        this.display.font = this.title_text_format;
        this.display.fillStyle = this.text_color;

        let title = getTranslation("Ball returns");
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
            if (returned_value % 1 == 0)
                returned_value = ~~returned_value;

            let returned_height = ((returned_value) * this.histogram_data_max_height) / 100;
            let y_pos_returned = this.histogram_last_line_y - returned_height;

            this.display.fillStyle = "yellow";
            this.display.fillRect(this.histogram_left_x, y_pos_returned, this.histogram_data_width, returned_height);

            this.display.fillStyle = this.text_color;
            let left_data_size = this.display.measureText(returned_value + "%").width;
            this.display.fillText(returned_value + "%", this.left_text_x - (left_data_size / 2), (y_pos_returned - 10));

            // missed

            let missed_value = ((this.onl_ball_missed * 100) / this.onl_ball_received).toFixed(1);
            if (missed_value % 1 == 0)
                missed_value = ~~missed_value;

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
            if (taken_value % 1 == 0)
                taken_value = ~~taken_value;

            let taken_height = ((taken_value) * this.histogram_data_max_height) / 100;
            let y_pos_taken = this.histogram_last_line_y - taken_height;

            this.display.fillStyle = "purple";
            this.display.fillRect(this.histogram_left_x, y_pos_taken, this.histogram_data_width, taken_height);

            this.display.fillStyle = this.text_color;
            let left_data_size = this.display.measureText(taken_value + "%").width;
            this.display.fillText(taken_value + "%", this.left_text_x - (left_data_size / 2), (y_pos_taken - 10));

            // missed

            let missed_value = ((this.onl_bonus_missed * 100) / this.onl_bonus_received).toFixed(1);
            if (missed_value % 1 == 0)
                missed_value = ~~missed_value;

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
            this.displayCamembert(), document.getElementById('prev_stats').classList.add('disabled');
        else
            document.getElementById('prev_stats').classList.remove('disabled');

        if (stats_tab == 1)
            this.displayBarChartOne();

        if (stats_tab == 2)
            this.displayBarChartTwo(), document.getElementById('next_stats').classList.add('disabled');
        else
            document.getElementById('next_stats').classList.remove('disabled');
    }

    clean()
    {
        this.display.fillStyle = this.background_color;
        this.display.fillRect(0, 0, this.width, this.height);
    }
}

function displayNextStatsPage()
{
    if (visual == true)
    {
        if (stats_tab < 2)
            stats_tab++, stats.displayObject();
    }
}

function displayPrevStatsPage()
{
    if (visual == true)
    {
        if (stats_tab > 0)
            stats_tab--, stats.displayObject();
    }
}

function refreshStats()
{
    // init if uninit

    // local

    if (localStorage.getItem('lcl_game_played_nb') == null)
        localStorage.setItem('lcl_game_played_nb', '0');

    if (localStorage.getItem('lcl_bonus_taken_nb') == null)
        localStorage.setItem('lcl_bonus_taken_nb', '0');

    if (localStorage.getItem('lcl_ball_exit_nb') == null)
        localStorage.setItem('lcl_ball_exit_nb', '0');

    if (localStorage.getItem('lcl_ball_bounce_nb') == null)
        localStorage.setItem('lcl_ball_bounce_nb', 0);

    // online

    // if (localStorage.getItem('onl_played') == null)
    //     localStorage.setItem('onl_played', '0');

    // if (localStorage.getItem('onl_victory') == null)
    //     localStorage.setItem('onl_victory', '0');

    // if (localStorage.getItem('onl_defeat') == null)
    //     localStorage.setItem('onl_defeat', '0');

    // if (localStorage.getItem('onl_dist') == null)
    //     localStorage.setItem('onl_dist', '0');

    // if (localStorage.getItem('onl_ball_return') == null)
    //     localStorage.setItem('onl_ball_return', '0');

    // if (localStorage.getItem('onl_ball_received') == null)
    //     localStorage.setItem('onl_ball_received', '0');

    // if (localStorage.getItem('onl_bonus_taken') == null)
    //     localStorage.setItem('onl_bonus_taken', '0');

    // if (localStorage.getItem('onl_bonus_received') == null)
    //     localStorage.setItem('onl_bonus_received', '0');

    // load html data from variables

    document.getElementById('lcl_game_played_nb').innerHTML = "[ " + localStorage.getItem('lcl_game_played_nb') + " ]";
    document.getElementById('lcl_bonus_taken_nb').innerHTML = "[ " + localStorage.getItem('lcl_bonus_taken_nb') + " ]";
    document.getElementById('lcl_ball_exit_nb').innerHTML = "[ " + localStorage.getItem('lcl_ball_exit_nb') + " ]";
    document.getElementById('lcl_ball_bounce_nb').innerHTML = "[ " + localStorage.getItem('lcl_ball_bounce_nb') + " ]";

    let win_rate = ~~(wonGamesNb * 100 / gamesPlayedNb);
    let lose_rate = ~~(loseGameNb * 100 / gamesPlayedNb);

    document.getElementById('onl_game_played_nb').innerHTML = "[ " + gamesPlayedNb + " ]";
    document.getElementById('onl_game_won_nb').innerHTML = "[ " + wonGamesNb + " ] [ " + win_rate + "% ]";
    document.getElementById('onl_game_lost_nb').innerHTML = "[ " + loseGameNb + " ] [ " + lose_rate + "% ]";
    document.getElementById('onl_dist').innerHTML = "[ " + ballDistance + " px ]";
    document.getElementById('onl_ball_return').innerHTML = "[ " + ballReturned + "/" + ballReceived + " ]";
    document.getElementById('onl_bonus_taken_nb').innerHTML = "[ " + bonusTaken + "/" + bonusTotal + " ]";
}

function changeStatsDisplayMode()
{
    if (document.getElementById('switch_visual_input').checked == true)
        localStorage.setItem('visual_mode', 'true'), visual = true;
    else
        localStorage.setItem('visual_mode', 'false'), visual = false;

    if (document.getElementById('online_stats').style.display == 'block')
        nav.displayOnlineStats();
}

function refreshStatsDisplaySwitch()
{
    if (localStorage.getItem('visual_mode') == true)
        document.getElementById('switch_visual_input').checked = true, visual = true;
    else
        document.getElementById('switch_visual_input').checked = false, visual = false;
}

nav.displayStats = function()
{
    nav.hideEveryDiv();

    document.getElementById('stats_menu').style.display = 'block';
    document.getElementById('stats_menu_buttons').style.display = 'block';
    document.getElementById('stats_back_btn').style.display = 'block';

    addToHistory('/statistics');
    document.title = getTranslation('Statistics');
}

nav.removeStats = function()
{
    document.getElementById('stats_menu').style.display = 'none';
    document.getElementById('stats_back_btn').style.display = 'none';

    nav.displayMenu();
}

nav.displayLocalStats = function()
{
    nav.hideEveryDiv();

    document.getElementById('stats_menu').style.display = 'block';
    document.getElementById('stats_menu_buttons').style.display = 'none';
    document.getElementById('stats_back_btn').style.display = 'none';
    document.getElementById('local_stats').style.display = 'block';

    refreshStats();

    document.getElementById('local_stats_nv').style.display = 'block';

    addToHistory('/local-stats')
    document.title = getTranslation('Local Stats');
}

nav.removeLocalStats = function()
{
    document.getElementById('local_stats').style.display = 'none';
    nav.displayStats();
}

nav.displayOnlineStats = function()
{
    if (!isConnected())
        return;

    nav.hideEveryDiv();

    document.getElementById('stats_menu').style.display = 'block';
    document.getElementById('stats_menu_buttons').style.display = 'none';
    document.getElementById('stats_back_btn').style.display = 'none';
    document.getElementById('online_stats').style.display = 'block';

    refreshStats();

    if (visual == true)
    {
        document.getElementById('online_stats_v').style.display = 'block';
        document.getElementById('online_stats_nv').style.display = 'none';

        document.getElementById('visual_info').style.display = 'block';
        document.getElementById('visual_info').style.visibility = 'visible';

        stats = new VisualStats();
        stats.displayObject();
    }
    else
    {
        document.getElementById('online_stats_nv').style.display = 'block';
        document.getElementById('online_stats_v').style.display = 'none';

        document.getElementById('visual_info').style.display = 'none';
        document.getElementById('visual_info').style.visibility = 'hidden';
    }

    addToHistory('/online-stats');
    document.title = getTranslation('Online Stats');
}

nav.removeOnlineStats = function()
{
    document.getElementById('online_stats').style.display = 'none';
    nav.displayStats();
}
