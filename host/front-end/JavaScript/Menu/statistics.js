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

        this.score_text_format = "47px Arial";
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
        this.graph_point_size = 6;

        this.histogram_canvas = null;
        this.histogram_display = null;
        this.histogram_width = 300;
        this.histogram_height = 350;

        this.left_player_color = "purple";
        this.right_player_color = "yellow";
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
            this.graph.src = 'Materials/images/graph_white.png';
        else
            this.graph.src = 'Materials/images/graph_black.png';

        this.graph.onload = () => {this.graph_display.drawImage(this.graph, 0, 20, 570, 338)};

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
    }

    initializeHistogram()
    {
        this.histogram_canvas = document.getElementById('history_diagram_data');
        this.histogram_display = this.histogram_canvas.getContext('2d');

        this.histogram_canvas.width = this.histogram_width;
        this.histogram_canvas.height = this.histogram_height;

        this.histogram_display.font = this.medium_text_format;
        this.histogram_display.fillStyle = this.global_color;

        let title = getTranslation("Game domination");
        let title_size = this.histogram_display.measureText("– " + title + " –").width;
        this.histogram_display.fillText("– " + title + " –", this.histogram_width / 2 - (title_size / 2), 35);
    }

    initialize()
    {
        if (high_contrast == "true")
            this.global_color = "white", this.background_color = "black";
        else
            this.global_color = "black", this.background_color = "white";

        this.initializeData();
        this.initializeGraph();
        this.initializeHistogram();
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
            this.data_display.fillStyle = this.global_color;

            this.data_display.font = "bold " + this.title_text_format;
            let player1 = this.history_data.data[history_tab][0];
            let player1_len = this.data_display.measureText(player1).width;

            this.data_display.font = "italic " + this.title_text_format;
            let versus = "     vs     ";
            let versus_len = this.data_display.measureText(versus).width;

            this.data_display.font = "bold " + this.title_text_format;
            let player2 = this.history_data.data[history_tab][1];

            this.data_display.fillText(player1, 20, 50);

            this.data_display.font = "italic " + this.title_text_format;
            this.data_display.fillText("     vs     ", 20 + player1_len, 50);

            this.data_display.font = "bold " + this.title_text_format;
            this.data_display.fillText(player2, 20 + player1_len + versus_len, 50);

            this.data_display.font = this.score_text_format;
            let score = "[ " + this.history_data.data[history_tab][2][0] + " – " + this.history_data.data[history_tab][2][1] + " ]";
            let score_len = this.data_display.measureText(score).width;
            this.data_display.fillText(score, this.data_width / 2 - (score_len / 2), this.data_height / 2 + 35);

            this.data_display.font = "bold " + this.title_text_format;

            let underline_left_len = player1_len;
            let underline_right_len = this.data_display.measureText(player2).width;

            this.data_display.fillStyle = this.left_player_color;
            this.data_display.fillRect(20, 60, underline_left_len, 2);

            this.data_display.fillStyle = this.right_player_color;
            this.data_display.fillRect(20 + player1_len + versus_len, 60, underline_right_len, 2);

            this.data_display.fillStyle = this.global_color;
            this.data_display.font = this.medium_text_format;

            this.data_display.fillText(this.history_data.data[history_tab][3], 20, this.data_height - 20);

            let duration = this.history_data.data[history_tab][4] + "s";
            let duration_size = this.data_display.measureText(duration).width;
            this.data_display.fillText(duration, this.data_width - 20 - duration_size, this.data_height - 20);

            this.data_display.font = "bold italic " + this.title_text_format;

            let end;
            if (this.history_data.data[history_tab][2][0] == '10')
                end = getTranslation("victory");
            else
                end = getTranslation("defeat");
            let end_size = this.data_display.measureText(end).width;
            this.data_display.fillText(end, this.data_width - 20 - end_size, 50);
        }
    }

    displayGraph()
    {
        if (this.history_data != null)
        {
            let total_distance = 444;
            let bottom_y = this.graph_height - 43;
            let scores_nb = this.history_data.data[history_tab][5].length;
            let game_length = this.history_data.data[history_tab][4];
            let scores_data = this.history_data.data[history_tab][5];

            let old_x, old_y;
            for (let i = 0; i != scores_nb; i++)
            {
                let color;
                if (scores_data[i][1] == '1')
                    color = this.left_player_color;
                else if (scores_data[i][1] == '2')
                    color = this.right_player_color;
                else
                    color = this.global_color;
                this.graph_display.fillStyle = color;

                let x_pos = 63 + (parseInt(scores_data[i][0]) * total_distance) / game_length;
                let y_pos = bottom_y - (i * 13);
                if (i == scores_nb - 1)
                    x_pos = x_pos - this.graph_point_size;
                else if (i == 0)
                    x_pos = x_pos;
                else
                    x_pos = x_pos - (this.graph_point_size / 2);

                if (i != 0)
                {
                    this.graph_display.beginPath();
                    this.graph_display.moveTo(old_x + (this.graph_point_size / 2), old_y + (this.graph_point_size / 2));
                    this.graph_display.lineTo(x_pos + (this.graph_point_size / 2), y_pos + (this.graph_point_size / 2));
                    this.graph_display.lineWidth = 1.5
                    this.graph_display.strokeStyle = color;
                    this.graph_display.stroke();
                }

                this.graph_display.fillRect(x_pos, y_pos, this.graph_point_size, this.graph_point_size);

                old_x = x_pos;
                old_y = y_pos;
            }
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
        if (this.history_data == null)
            this.drawCircleSurface(360, this.background_color);
        else
        {
            let total = parseInt(this.history_data.data[history_tab][2][0]) + parseInt(this.history_data.data[history_tab][2][1])
            let value_p1 = (parseInt(this.history_data.data[history_tab][2][0]) * 100 / total) * 360 / 100;
            let value_p2 = (parseInt(this.history_data.data[history_tab][2][1]) * 100 / total) * 360 / 100;

            if (value_p1.toFixed(1) > value_p2.toFixed(1))
                this.drawCircleSurface(360, this.left_player_color), this.drawCircleSurface(value_p2.toFixed(1), this.right_player_color);
            else
                this.drawCircleSurface(360, this.right_player_color), this.drawCircleSurface(value_p1.toFixed(1), this.left_player_color)
        }
    }

    clean()
    {
        this.data_display.fillStyle = this.background_color;
        this.graph_display.fillStyle = this.background_color;

        this.data_display.fillRect(0, 0, this.data_width, this.data_height);
        this.graph_display.fillRect(63, 66, 444, this.graph_height - 102);
    }

    display()
    {
        this.clean();

        this.displayInfos();
        this.displayGraph();
        this.displayHistogram();
    }

    length()
    {
        return (this.history_data.length);
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
    if (historic != null)
    {
        if (event.key == 'ArrowLeft' && history_tab > 0)
            history_tab--, historic.display();
        if (event.key == 'ArrowRight' && history_tab < historic.length() - 1)
            history_tab++, historic.display();
    }
});


// < stats > //

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
    let main_menu = document.getElementById('main_menu_buttons');

    let stats_menu = document.getElementById('stats_menu');
    let stats_menu_btn = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');

    stats_menu.style.display = 'block';
    stats_menu_btn.style.display = 'block';
    stats_back_btn.style.display = 'block';

    main_menu.style.display = 'none';

    // history.pushState(null, null, getTranslation('/statistics'));
    document.title = getTranslation('Statistics');
}

nav.removeStats = function()
{
    let stats_menu = document.getElementById('stats_menu');
    let stats_back_btn = document.getElementById('stats_back_btn');

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';

    nav.displayMenu();
}

nav.displayLocalStats = function()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let local_stats = document.getElementById('local_stats');

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';
    local_stats.style.display = 'block';

    document.getElementById('local_stats_nv').style.display = 'block';
    // history.pushState(null, null, getTranslation('/local-stats'));

    document.title = getTranslation('Local Stats');
}

nav.removeLocalStats = function()
{
    let local_stats = document.getElementById('local_stats');

    local_stats.style.display = 'none';
    nav.displayStats();
}

nav.displayOnlineStats = function()
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

    // history.pushState(null, null, getTranslation('/online-stats'));
    document.title = getTranslation('Online Stats');
}

nav.removeOnlineStats = function()
{
    let online_stats = document.getElementById('online_stats');

    online_stats.style.display = 'none';
    nav.displayStats();
}

// < history > //

function getActualDate()
{
    let date = new Date();
    let day = date.getDate();
    let month = (parseInt(date.getMonth()) + 1);

    if (parseInt(day) < 10)
        day = "0" + day;
    if (parseInt(month) < 10)
        month = "0" + month;

    return (day + "/" + month);
}

function initializeHistory()
{
    let new_history_data = {
        exist: false,
        login: login42,
        length: 0,
        data: null
    }
    localStorage.setItem('history_data', JSON.stringify(new_history_data));
}

function addHistoryEntry(player1, player2, final_score, date, duration, scores)
{
    let new_data = [];

    new_data = [player1, player2, final_score, date, duration, scores];

    let history_data = JSON.parse(localStorage.getItem('history_data'));
    if (history_data.data == null)
        history_data.data = [], history_data.exist = true;
    history_data.data.push(new_data);
    history_data.length++;
    localStorage.setItem('history_data', JSON.stringify(history_data));

    refreshHistory();
}

function refreshHistory()
{
    if (localStorage.getItem('history_data') == null)
        initializeHistory();
    else
    {
        let history_data = JSON.parse(localStorage.getItem('history_data'));
        if (history_data.login != login42)
            initializeHistory();
    }
    historic = JSON.parse(localStorage.getItem('history_data'));
}


nav.displayHistory = function()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let history_menu = document.getElementById('history');

    document.getElementById('history_info').style.display = 'block';
    document.getElementById('history_info').style.visibility = 'visible';

    stats_menu.style.display = 'none';
    stats_back_btn.style.display = 'none';
    history_menu.style.display = 'block';

    let history_data = JSON.parse(localStorage.getItem('history_data'));
    if (history_data.exist != true)
        history_data = null;
    else
        history_tab = history_data.length - 1;

    historic = new History(history_data);
    historic.initialize();
    historic.display();

    // history.pushState(null, null, getTranslation('/game-history'));
    document.title = getTranslation('Game History');
}


nav.removeHistory = function()
{
    let stats_menu = document.getElementById('stats_menu_buttons');
    let stats_back_btn = document.getElementById('stats_back_btn');
    let historic = document.getElementById('history');

    document.getElementById('history_info').style.display = 'none';
    document.getElementById('history_info').style.visibility = 'hidden';

    stats_menu.style.display = 'block';
    stats_back_btn.style.display = 'block';
    historic.style.display = 'none';

    historic = null;

    // history.pushState(null, null, getTranslation('/statistics'));
    document.title = getTranslation('Statistics');
}

// < code to test history graph > //

// -> init.js :

// localStorage.removeItem('history_data');

// refreshHistory();

// addHistoryEntry('pcapurro', 'bgales', ['10', '5'], '01/06', '1100', [["17", "2"], ["64", "2"], ["145", "1"], ["200", "1"], ["250", "2"], ["300", "1"], ["350", "1"], ["360", "1"], ["370", "1"], ["400", "1"], ["500", "1"], ["700", "1"], ["800", "2"], ["1050", "2"], ["1100", "1"]]);

// addHistoryEntry('pcapurro', 'bgales', ['9', '10'], '04/06', '1065', [["42", "2"], ["64", "2"], ["276", "1"], ["300", "1"], ["350", "2"], ["400", "1"], ["450", "1"], ["460", "1"], ["470", "1"], ["500", "1"], ["542", "1"], ["700", "1"], ["800", "2"], ["900", "2"], ["1005", "2"], ["1010", "2"], ["1050", "2"], ["1065", "2"]]);

// addHistoryEntry('pcapurro', 'bgales', ['10', '2'], '06/06', '778', [["0", "2"], ["145", "1"], ["200", "1"], ["250", "2"], ["300", "1"], ["350", "1"], ["360", "1"], ["370", "1"], ["400", "1"], ["500", "1"], ["650", "1"], ["778", "1"]]);

// refreshHistory();