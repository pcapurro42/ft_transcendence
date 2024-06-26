// < history class > //

class History
{
    constructor(history_data)
    {
        // global infos initialization

        this.history_data = history_data;

        if (this.history_data != null)
            this.role = this.history_data.data[history_tab][6];

        this.data_width = 900;
        this.data_height = 200;

        this.graph_width = 550;
        this.graph_height = 350;
        this.graph_point_size = 6;

        this.histogram_width = 300;
        this.histogram_height = 350;

        this.left_player_color = "purple";
        this.right_player_color = "yellow";

        if (text_size == "normal")
        {
            this.score_text_format = "47px Arial";
            this.title_text_format = "32px Arial";
            this.medium_text_format = "23px Arial";
            this.small_text_format = "18px Arial";
            this.ridiculous_text_format = "12px Arial";
        }
        else
        {
            this.score_text_format = "57px Arial";
            this.title_text_format = "42px Arial";
            this.medium_text_format = "33px Arial";
            this.small_text_format = "28px Arial";
            this.ridiculous_text_format = "22px Arial";
        }

        if (high_contrast == "true")
            this.global_color = "white", this.background_color = "black";
        else
            this.global_color = "black", this.background_color = "white";

        // canvas creation and config

        this.initializeData();
        this.initializeGraph();
        this.initializeHistogram();
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
            this.graph.src = 'Materials/images/stats/graph_white.png';
        else
            this.graph.src = 'Materials/images/stats/graph_black.png';

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

    displayInfos()
    {
        let aria_tmp;

        if (this.history_data == null)
        {
            this.data_display.font = this.title_text_format;
            this.data_display.fillStyle = this.global_color;
            let text = getTranslation("[No available data to display]");
            let center_text = this.data_display.measureText(text).width;
            this.data_display.fillText(text, this.data_width / 2 - (center_text / 2), this.data_height / 2);
        }
        else
        {
            this.data_display.fillStyle = this.global_color;

            let player1;
            let player2;

            player1 = this.history_data.data[history_tab][0];
            player2 = this.history_data.data[history_tab][1];

            this.data_display.font = "bold " + this.title_text_format;
            let player1_len = this.data_display.measureText(player1).width;

            this.data_display.font = "italic " + this.title_text_format;
            let versus = "     vs     ";
            let versus_len = this.data_display.measureText(versus).width;

            this.data_display.font = "bold " + this.title_text_format;
            this.data_display.fillText(player1, 20, 50);

            this.data_display.font = "italic " + this.title_text_format;
            this.data_display.fillText("     vs     ", 20 + player1_len, 50);

            this.data_display.font = "bold " + this.title_text_format;
            this.data_display.fillText(player2, 20 + player1_len + versus_len, 50);

            this.data_display.font = this.score_text_format;
            let score = "[ " + this.left_score + " – " + this.right_score + " ]";
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

            let duration = "≈ " + (this.history_data.data[history_tab][4]).toFixed(1) + "s";
            let duration_size = this.data_display.measureText(duration).width;
            this.data_display.fillText(duration, this.data_width - 20 - duration_size, this.data_height - 20);

            this.data_display.font = "bold italic " + this.title_text_format;

            let end;

            if (this.left_score == '10')
            {
                if (parseInt(this.right_score) <= 3)
                    end = getTranslation("crushing victory");
                else
                    end = getTranslation("victory");
            }
            else
            {
                if (parseInt(this.left_score) <= 3)
                    end = getTranslation("total defeat");
                else
                    end = getTranslation("defeat");
            }

            let end_size = this.data_display.measureText(end).width;
            this.data_display.fillText(end, this.data_width - 20 - end_size, 50);

            let win_txt;

            this.left_score > this.right_score ? win_txt = getTranslation('You Won') : win_txt = getTranslation('You Lose');

            aria_tmp = ' ' + player1 + ' versus ' + player2 + '.....' + win_txt + ' ' + score + '......' + getTranslation("Game Duration") + ' ' + duration.substring(2, duration.indexOf('.')) + ' ' + getTranslation('Seconds') + '.....' + end;
            document.getElementById('history_data').setAttribute('aria-label', getTranslation('ARIA History Data') + ' ' + aria_tmp);
        }
    }

    displayGraph()
    {
        if (this.history_data != null)
        {
            let total_distance = 445;
            let bottom_y = this.graph_height - 43;
            let scores_nb = this.history_data.data[history_tab][5].length;
            let game_length = this.history_data.data[history_tab][4];
            let scores_data = this.history_data.data[history_tab][5];

            let old_x, old_y;
            for (let i = 0; i != scores_nb; i++)
            {
                let color;
                if (this.role == "host")
                {
                    if (scores_data[i][1] == '1')
                        color = this.left_player_color;
                    else if (scores_data[i][1] == '2')
                        color = this.right_player_color;
                }
                else
                {
                    if (scores_data[i][1] == '1')
                        color = this.right_player_color;
                    else if (scores_data[i][1] == '2')
                        color = this.left_player_color;
                }

                this.graph_display.fillStyle = color;

                let y_pos = bottom_y - (i * 13);
                let x_pos = 63 + (parseInt(scores_data[i][0].toFixed(2)) * total_distance) / game_length;
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
        let value_1;
        let value_2;
        let aria_tmp = getTranslation('ARIA History Diagram');

        if (this.history_data == null)
        {
            this.drawCircleSurface(360, this.background_color);
            value_1 = 0, value_2 = 0;
        }
        else
        {
            let total = parseInt(this.left_score) + parseInt(this.right_score);
            value_1 = (parseInt(this.left_score) * 100 / total);
            value_2 = (parseInt(this.right_score) * 100 / total);
            aria_tmp += ' ' + getTranslation('Your Domination') + ' ' + Math.round(value_1) +'%...' + getTranslation('Opponent Domination') + ' ' + Math.round(value_2) + '%...';
            let value_p1 = value_1 * 360 / 100;
            let value_p2 = value_2 * 360 / 100;

            if (value_p1.toFixed(1) > value_p2.toFixed(1))
                this.drawCircleSurface(360, this.left_player_color), this.drawCircleSurface(value_p2.toFixed(1), this.right_player_color);
            else
                this.drawCircleSurface(360, this.right_player_color), this.drawCircleSurface(value_p1.toFixed(1), this.left_player_color)
        }
        document.getElementById('history_diagram_data').setAttribute('aria-label', aria_tmp);
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
        if (this.history_data != null)
        {
            if (this.role == 'guest')
                this.left_score = this.history_data.data[history_tab][2][1], this.right_score = this.history_data.data[history_tab][2][0];
            else
                this.left_score = this.history_data.data[history_tab][2][0], this.right_score = this.history_data.data[history_tab][2][1];
        }

        refreshNavButtons();

        this.clean();

        this.displayInfos();
        this.displayGraph();
        this.displayHistogram();
    }

    length()
    {
        if (this.history_data == null)
            return (0);
        return (this.history_data.length);
    }
}

// < display > //

function getActualTimeSeconds()
{
    return (performance.now() / 1000);
}

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

function refreshNavButtons()
{
    if (history_tab == 0)
        document.getElementById('prev_history').classList.add('disabled');
    else
        document.getElementById('prev_history').classList.remove('disabled');

    if (history_tab == historic.length() - 1 || historic.length() == 0)
        document.getElementById('next_history').classList.add('disabled');
    else
        document.getElementById('next_history').classList.remove('disabled');
}

function displayPrevHistoryPage()
{
    if (historic != null)
    {
        if (history_tab > 0)
            history_tab--, historic.display();
    }
}

function displayNextHistoryPage()
{
    if (historic != null)
    {
        if (history_tab < historic.length() - 1)
            history_tab++, historic.display();
    }
}

function initializeHistory()
{
    let new_history_data = {
        exist: false,
        login: localStorage.getItem('login'),
        length: 0,
        data: null
    }
    if (gameHistory == null)
        gameHistory = JSON.stringify(new_history_data);
}

function addHistoryEntry(player1, player2, final_score, date, duration, scores, role)
{
    let new_data = [];

    new_data = [player1, player2, final_score, date, duration, scores, role];

    let history_data = JSON.parse(gameHistory);
    if (history_data.data == null)
        history_data.data = [], history_data.exist = true;
    history_data.data.push(new_data);

    history_data.length++;
    if (history_data.length == 11)
        history_data.data = history_data.data.shift(), history_data.length--;

    gameHistory = JSON.stringify(history_data);

    refreshHistory();
    return JSON.stringify(history_data);
}

function refreshHistory()
{
    if (localStorage.getItem('status') == 'connected')
    {
        if (gameHistory == null)
            initializeHistory();
        else
        {
            let history_data = JSON.parse(gameHistory);
            if (history_data.login != localStorage.getItem('login'))
                initializeHistory();
        }
    }
}

nav.displayHistory = function()
{
    if (!isConnected())
        return;
    nav.hideEveryDiv();

    document.getElementById('history_info').style.display = 'block';
    document.getElementById('history_info').style.visibility = 'visible';

    document.getElementById('stats_menu').style.display = 'block';
    document.getElementById('stats_menu_buttons').style.display = 'none';
    document.getElementById('stats_back_btn').style.display = 'none';
    document.getElementById('history').style.display = 'block';

    let history_data = JSON.parse(gameHistory);
    if (history_data.exist != true)
        history_data = null;
    else
        history_tab = history_data.length - 1;

    if (history_data == null)
        document.getElementById('prev_history').classList.add('disabled'), document.getElementById('next_history').classList.add('disabled');

    setBackground('/game-history');
    addToHistory('/game-history');

    historic = new History(history_data);
    historic.display();
    document.title = getTranslation('Game History');
}

nav.removeHistory = function()
{
    document.getElementById('history_info').style.display = 'none';
    document.getElementById('history_info').style.visibility = 'hidden';

    document.getElementById('stats_menu_buttons').style.display = 'block';
    document.getElementById('stats_back_btn').style.display = 'block';
    document.getElementById('history').style.display = 'none';

    historic = null;
    setBackground('/statistics');
    addToHistory('/statistics');
    document.title = getTranslation('Statistics');
}
