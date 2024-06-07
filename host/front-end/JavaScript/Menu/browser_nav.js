/***********BACKWARD/FORWARD NAVIGATION************/
              /** Without history push**/

const no_history_nav = {

    displayMenu : function()
    {
        let game_toolbar = document.getElementById('game_toolbar');
        game_toolbar.style.display = "none";

        let one_vs_one_online_choice_menu = document.getElementById('one_vs_one_online_choice_menu');
        one_vs_one_online_choice_menu.style.display = "none";

        let one_vs_one_local_page = document.getElementById('one_vs_one_local_page');
        one_vs_one_local_page.style.display = "none";

        let one_vs_two_local_page = document.getElementById('one_vs_two_local_page');
        one_vs_two_local_page.style.display = "none";

        let game_guest_page = document.getElementById('one_vs_one_guest_page');
        game_guest_page.style.display = 'none';

        let game_host_page = document.getElementById('one_vs_one_host_page');
        game_host_page.style.display = 'none';

        let game_page_tournament = document.getElementById('game_page_tournament');
        game_page_tournament.style.display = "none";

        let game_page_ai = document.getElementById('game_page_ai');
        game_page_ai.style.display = "none";

        let play_menu = document.getElementById('play_menu');
        play_menu.style.display = "none";

        let customize_menu = document.getElementById('customize_menu');
        customize_menu.style.display = "none";

        let stats_menu = document.getElementById('stats_menu');
        stats_menu.style.display = "none";

        let settings_menu = document.getElementById('settings_menu');
        settings_menu.style.display = "none";

        let play_classic_buttons = document.getElementById('one_vs_one_online_choice_menu');
        play_classic_buttons.style.display = "none";

        let online_stats = document.getElementById('online_stats');
        online_stats.style.display = "none";

        let local_stats = document.getElementById('local_stats');
        local_stats.style.display = "none";

        let historic = document.getElementById('history');
        historic.style.display = "none";

        let classic_buttons = document.getElementById('classic_buttons');
        classic_buttons.style.display = "none";

        let create_classic_menu = document.getElementById('create_classic_menu');
        create_classic_menu.style.display = 'none';

        let join_classic_menu = document.getElementById('join_classic_menu')
        join_classic_menu.style.display = 'none';

        let disconnectionPopup = document.getElementById('disconnectionPopup');
        disconnectionPopup.style.display = 'none';

        let leavingPopup = document.getElementById('leavingPopup');
        leavingPopup.style.display = 'none';

        let tournament_setup = document.getElementById('tournament_setup');
        tournament_setup.style.display = 'none';

        let tournament_alias = document.getElementById('tournament_nickname_menu')
        tournament_alias.style.display = 'none';

        let tournament_announcer = document.getElementById('tournament_announcer');
        tournament_announcer.style.display = 'none';

        let game_backgrounds = document.getElementById('game_backgrounds');
        game_backgrounds.style.display = 'none';

        let main_page = document.getElementById('main_page');
        main_page.style.display = 'block';

        let main_menu_page = document.getElementById('main_menu_page');
        main_menu_page.style.display = "block";

        let main_menu_buttons = document.getElementById('main_menu_buttons');
        main_menu_buttons.style.display = "block";

        stop_flag = true; // stop tournament
        active = false; // turn off the game

        freeInputAndForms();
        tournamentFinalReset();
        resetConnection();

        refreshStats();
        refreshStatsDisplaySwitch();
        refreshLogin();
        history.replaceState(null, null, getTranslation('/home'));
        document.title = getTranslation('Home');
    },

    hideEveryDiv: function (){
        document.getElementById('game_toolbar').style.display = 'none';
        document.getElementById('one_vs_one_host_page').style.display = 'none';
        document.getElementById('one_vs_one_guest_page').style.display = 'none';
        document.getElementById('one_vs_one_local_page').style.display = 'none';
        document.getElementById('one_vs_two_local_page').style.display = 'none';
        document.getElementById('game_page_tournament').style.display = 'none';
        document.getElementById('game_page_ai').style.display = 'none';
        document.getElementById('play_menu').style.display = 'none';
        document.getElementById('customize_menu').style.display = 'none';
        document.getElementById('stats_menu').style.display = 'none';
        document.getElementById('settings_menu').style.display = 'none';
        document.getElementById('one_vs_one_online_choice_menu').style.display = 'none';
        document.getElementById('online_stats').style.display = 'none';
        document.getElementById('local_stats').style.display = 'none';
        document.getElementById('history').style.display = 'none';
        document.getElementById('classic_buttons').style.display = 'none';
        document.getElementById('create_classic_menu').style.display = 'none';
        document.getElementById('join_classic_menu').style.display = 'none';
        document.getElementById('disconnectionPopup').style.display = 'none';
        document.getElementById('tournament_setup').style.display = 'none';
        document.getElementById('tournament_nickname_menu').style.display = 'none';
        document.getElementById('tournament_announcer').style.display = 'none';
        document.getElementById('game_backgrounds').style.display = 'none';
        document.getElementById('main_page').style.display = 'block';
        document.getElementById('main_menu_buttons').style.display = 'none';
        document.getElementById('main_menu_page').style.display = 'none';
        no_history_nav.theaterClose();
        freeInputAndForms();
        tournamentFinalReset();
        resetConnection();

        refreshStats();
        refreshStatsDisplaySwitch();
        refreshLogin();
        removeBeforeUnloadWarning();
    },

    displayGamePage_ai : function()
    {
        let game_toolbar = document.getElementById('game_toolbar');
        let game_page_ai = document.getElementById('game_page_ai');
        let main_page = document.getElementById('main_page');
        let player_left_won = document.getElementById('you_won_text');
        player_left_won.style.display = "none";

        let player_right_won = document.getElementById('ai_won_text');
        player_right_won.style.display = "none";

        main_page.style.display = "none";
        game_toolbar.style.display = "block";
        game_page_ai.style.display = "block";
        history.replaceState(null, null, '/vs-ai');
        document.title = getTranslation('Play vs AI');

    },

    displayCustomize : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');

        let customize_menu = document.getElementById('customize_menu');
        let customize_back_btn = document.getElementById('customize_back_btn');

        customize_menu.style.display = 'block';
        customize_back_btn.style.display = 'block';

        main_menu.style.display = 'none';

        history.replaceState(null, null, getTranslation('/customize'));
        document.title = getTranslation('Customize');

    },

    removeCustomize : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');

        let customize_menu = document.getElementById('customize_menu');
        let customize_back_btn = document.getElementById('customize_back_btn');

        customize_menu.style.display = 'none';
        customize_back_btn.style.display = 'none';

        no_history_nav.displayMenu();
    },


    displaySettings : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');

        let settings_menu = document.getElementById('settings_menu');
        let settings_back_btn = document.getElementById('settings_back_btn');

        settings_menu.style.display = 'block';
    settings_back_btn.style.display = 'block';

        main_menu.style.display = 'none';

        history.replaceState(null, null, getTranslation('/settings'));

        document.title = getTranslation('Settings');
    },

    removeSettings : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');

        let settings_menu = document.getElementById('settings_menu');
        let settings_back_btn = document.getElementById('settings_back_btn');

        settings_menu.style.display = 'none';
        settings_back_btn.style.display = 'none';

        no_history_nav.displayMenu();
    },

    displayClassicChoice : function()
    {
        let classic_buttons = document.getElementById('classic_buttons');
        let play_menu = document.getElementById('play_menu');

        classic_buttons.style.display = "block";
        play_menu.style.display = 'none';
        document.title = getTranslation('Classic');

        history.replaceState(null, null, getTranslation('/classic'));

    },

    removeClassicChoice : function()
    {
        let classic_menu = document.getElementById('classic_buttons');
        classic_menu.style.display = "none";
        no_history_nav.displayPlay();
    },

    displayOneVsOneChoice: function()
    {
        no_history_nav.removeClassicChoice();

        let classic_menu = document.getElementById('one_vs_one_online_choice_menu');
        classic_menu.style.display = "block";
        let create_sub_menu = document.getElementById('create_classic_menu');
        create_sub_menu.style.display = 'none';

        let join_sub_menu = document.getElementById('join_classic_menu');
        join_sub_menu.style.display = 'none';

        let play_menu = document.getElementById('play_menu');
        play_menu.style.display = 'none';
        freeInputAndForms();
        resetConnection();

        history.replaceState(null, null, getTranslation('/create-lobby'));
        document.title = getTranslation('Online');
    },

    removeOneVsOneChoice: function()
    {
        one_vs_one_online_choice_menu = document.getElementById('one_vs_one_online_choice_menu');
        one_vs_one_online_choice_menu.style.display = "none";

        no_history_nav.displayClassicChoice();
    },

    displayOneVsOneOnlineCreateGame : async function(){
        let classic_menu = document.getElementById('one_vs_one_online_choice_menu');
        classic_menu.style.display = "none";

        let create_classic_menu = document.getElementById('create_classic_menu');
        create_classic_menu.style.display = 'block';

        freeInputAndForms();

        let init_p2p_btn = document.getElementById('init_p2p');
        init_p2p_btn.removeAttribute('disabled');

        let create_btn = document.getElementById('create_classic_lobby');
        create_btn.style.visibility = 'hidden';

        resetConnection();
        offerGenerator();

        history.replaceState(null, null, getTranslation('/create-lobby'));
        document.title = getTranslation('Create Lobby');
    },

    displayOneVsOneOnlineJoinGame : function(){
        let classic_menu = document.getElementById('one_vs_one_online_choice_menu');
        classic_menu.style.display = "none";

        let create_classic_menu = document.getElementById('join_classic_menu');
        create_classic_menu.style.display = 'block';

        let countdown = document.getElementById('answer_timeout');
        countdown.style.display = 'none';
        clearInterval(timeoutInterval);

        let submit_btn = document.getElementById('submit_inv_code');
        submit_btn.removeAttribute('disabled');

        freeInputAndForms();

        let join_btn = document.getElementById('join_classic_lobby');
        join_btn.style.visibility = 'hidden';

        let win_msg = document.getElementById('g_win_text');
        win_msg.style.display = 'none';
        resetConnection();

        history.replaceState(null, null, getTranslation('/join-lobby'));
        document.title = getTranslation('Join Lobby');
    },


    displayTournamentSetup : function(){
        let play_menu = document.getElementById('play_menu');
        play_menu.style.display = "none";
        let tournament_setup = document.getElementById('tournament_setup');
	    tournament_setup.style.display = 'block';
        document.title = getTranslation('Tournament');
        history.replaceState(null, null, getTranslation('/tournament'));

    },

    removeTournamentSetup : function()
    {
        let tournament_setup = document.getElementById('tournament_setup');
	    tournament_setup.style.display = 'none';
        freeInputAndForms();
        no_history_nav.displayPlay();
    },


    displayTournamentForm : function(val){
        let t_setup = document.getElementById('tournament_setup');
        t_setup.style.display = "none";

        let tournament_nickname_menu = document.getElementById('tournament_nickname_menu');
	    tournament_nickname_menu.style.display = 'block';

        let form_alias =  document.getElementById('form_alias');
        form_alias.style.display = 'block';

        let i = formDuplicator(val);
        document.getElementById('submit_alias').onclick = function(event){
            parse_alias(i, event)
        };

        history.replaceState(null, null, getTranslation('/tournament-nicknames'));
        document.title = getTranslation('Tournament - Nicknames');
    },

    removeTournamentForm : function(event)
    {
        event.preventDefault();
        freeInputAndForms();
        let tournament_nickname_menu = document.getElementById('tournament_nickname_menu');
	    tournament_nickname_menu.style.display = 'none';

        let form_alias =  document.getElementById('form_alias');
        form_alias.style.display = 'none';

        no_history_nav.displayTournamentSetup();
    },
// < DISPLAY/REMOVE > //

    displayPlay : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');
        let play_menu = document.getElementById('play_menu');

        play_menu.style.display = 'block';
        main_menu.style.display = 'none';

        history.replaceState(null, null, getTranslation('/play'));
        document.title = getTranslation("Play");
    },

    removePlay : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');
        let play_menu = document.getElementById('play_menu');

        play_menu.style.display = 'none';
        no_history_nav.displayMenu()
    },

    displayOneVsOneGameOnline : function()
    {
        if (role == "host")
        {
            document.getElementById('one_vs_one_host_page').style.display = "block";
            document.getElementById('h_host_name').innerHTML = localStorage.getItem('login');
            document.getElementById('h_guest_name').innerHTML = sessionStorage.getItem('opponent_login');
            document.getElementById('waiting_host').style.display = "none";
        }
        else
        {
            document.getElementById('one_vs_one_guest_page').style.display = "block";
            document.getElementById('g_host_name').innerHTML = sessionStorage.getItem('opponent_login');
            document.getElementById('g_guest_name').innerHTML = localStorage.getItem('login');
            document.getElementById('waiting_host').style.display = "block";
            data_channel.send("ready");
        }
        document.getElementById('main_page').style.display = "none";
        document.getElementById('game_toolbar').style.display = "block";


        history.replaceState(null, null, getTranslation('/online-game'));
        document.title = getTranslation('Online Game');

        initializeOnline1v1();
    },

    displayTwoVsOneGameLocal : function()
    {
        main_page = document.getElementById('main_page');
        main_page.style.display = "none";
        game_toolbar = document.getElementById('game_toolbar');
        game_toolbar.style.display = "block";

        one_vs_two_local_page = document.getElementById('one_vs_two_local_page');
        one_vs_two_local_page.style.display = "block";

        let left_side_won = document.getElementById('left_side_won_text');
        left_side_won.style.display = "none";
        let right_side_won = document.getElementById('right_side_won_text');
        right_side_won.style.display = "none";

        history.replaceState(null, null, getTranslation('/1vs2'));
        document.title = getTranslation('1 vs 2 (local)');
        initializeLocal1v2();
    },

    displayOneVsOneGameLocal : function()
    {
        main_page = document.getElementById('main_page');
        main_page.style.display = "none";
        game_toolbar = document.getElementById('game_toolbar');
        game_toolbar.style.display = "block";

        one_vs_one_local_page = document.getElementById('one_vs_one_local_page');
        one_vs_one_local_page.style.display = "block";

        let player_left_won = document.getElementById('left_player_won_text');
        player_left_won.style.display = "none";
        let player_right_won = document.getElementById('right_player_won_text');
        player_right_won.style.display = "none";
        history.replaceState(null, null, getTranslation('/1vs1'));
        document.title = getTranslation("1 vs 1 (local)");

        initializeLocal1v1();
    },


    displayStats : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');
        let stats_menu = document.getElementById('stats_menu');

        let stats_menu_btn = document.getElementById('stats_menu_buttons');
        let stats_back_btn = document.getElementById('stats_back_btn');

        stats_menu.style.display = 'block';
        stats_menu_btn.style.display = 'block';
        stats_back_btn.style.display = 'block';

        main_menu.style.display = 'none';

        history.replaceState(null, null, getTranslation('/statistics'));
        document.title = getTranslation('Statistics');
    },

    removeStats : function()
    {
        let stats_menu = document.getElementById('stats_menu');
        let stats_back_btn = document.getElementById('stats_back_btn');

        stats_menu.style.display = 'none';
        stats_back_btn.style.display = 'none';

        no_history_nav.displayMenu();
    },

    displayLocalStats : function()
    {

        let stats_menu = document.getElementById('stats_menu_buttons');
        let stats_back_btn = document.getElementById('stats_back_btn');
        let local_stats = document.getElementById('local_stats');
        let stats_page = document.getElementById('stats_menu');
        stats_page.style.display = 'block';

        stats_menu.style.display = 'none';
        stats_back_btn.style.display = 'none';
        local_stats.style.display = 'block';

        document.getElementById('local_stats_nv').style.display = 'block';

        history.replaceState(null, null, getTranslation('/local-stats'));
        document.title = getTranslation('Local Stats');
    },

    removeLocalStats : function()
    {
        let local_stats = document.getElementById('local_stats');

        local_stats.style.display = 'none';
        no_history_nav.displayStats();
    },

    displayOnlineStats : function()
    {
        let stats_menu = document.getElementById('stats_menu_buttons');
        let stats_back_btn = document.getElementById('stats_back_btn');
        let online_stats = document.getElementById('online_stats');
        let stats_page = document.getElementById('stats_menu');
        stats_page.style.display = 'block';

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
        history.replaceState(null, null, getTranslation('/online-stats'));
        document.title = getTranslation('Online Stats');
    },

    removeOnlineStats : function()
    {
        let online_stats = document.getElementById('online_stats');

        online_stats.style.display = 'none';
        no_history_nav.displayStats();
    },

    displayHistory : function()
    {
        let stats_page = document.getElementById('stats_menu');
        let stats_menu = document.getElementById('stats_menu_buttons');
        let stats_back_btn = document.getElementById('stats_back_btn');
        let history_menu = document.getElementById('history');

        document.getElementById('history_info').style.display = 'block';
        document.getElementById('history_info').style.visibility = 'visible';

        stats_menu.style.display = 'none';
        stats_back_btn.style.display = 'none';
        stats_page.style.display = 'block';

        history_menu.style.display = 'block';

        let history_data = JSON.parse(localStorage.getItem('history_data'));
        if (history_data.exist != true)
            history_data = null;
        else
            history_tab = history_data.length - 1;

        historic = new History(history_data);
        historic.initialize();
        historic.display();

        history.replaceState(null, null, getTranslation('/game-history'));
        getTranslation('Game History');
    },

    removeHistory : function()
    {
        let stats_menu = document.getElementById('stats_menu_buttons');
        let stats_back_btn = document.getElementById('stats_back_btn');
        let historic = document.getElementById('history');

        document.getElementById('history_info').style.display = 'none';
        document.getElementById('history_info').style.visibility = 'hidden';

        stats_menu.style.display = 'block';
        stats_back_btn.style.display = 'block';
        history.style.display = 'none';

        historic = null;

        history.replaceState(null, null, getTranslation('/statistics'));
        document.title = getTranslation('Statistics');
    },

    theaterCredits : function()
    {
	    let website = document.getElementById('main_page');
	    let music_menu = document.getElementById('mgs');
	    let cross_exit = document.getElementById('credit_close');
	    let video = document.getElementById('vid_credits');

	    website.style.transition = 'opacity 0.5s';
        website.style.opacity = '0';


        setTimeout(() => {
            website.style.display = 'none';
            video.style.display = 'block';
            cross_exit.style.display = 'block';
            video.play();
        }, 500);

	    if (music_menu.muted == true)
		    boolAudio_on = false;
	    else{
		    music_menu.muted = true;
		    music_menu.pause();
		    boolAudio_on = true;
	    }
	    video.play();

        history.replaceState(null, null, getTranslation('/credits'));
	    document.title = getTranslation('Credits');
    },

    theaterClose : function()
    {
	    let website = document.getElementById('main_page');
	    let music_menu = document.getElementById('mgs');
	    let cross_exit = document.getElementById('credit_close');
	    let video = document.getElementById('vid_credits');

	    video.pause();
	    video.currentTime = 0;
	    video.style.display = 'none';
	    website.style.display = 'block';
	    cross_exit.style.display = 'none'

	    website.style.display = 'block';
        website.style.transition = 'opacity 0.5s';
        website.style.opacity = '0';

        setTimeout(() => {
            website.style.opacity = '1';
        }, 10);
	    if (boolAudio_on == true){
		    music_menu.muted = false;
	    	music_menu.play();
    	}
        history.replaceState(null, null, getTranslation('/home'));
	    document.title = getTranslation('Home');
    },

}

async function userLeaveConfirmation(){
    return new Promise(resolve => {
        document.getElementById('leavingPopup').style.display = 'block';
        document.getElementById('leave_page_btn').onclick = () => {
            resolve(true);
            removeBeforeUnloadWarning();
        }
        document.getElementById('resume_btn').onclick =  () => resolve(false);
    })
}

async function handleLocation(){

    let path;
    if (!originalUrl)
        path = window.location.pathname;
    else
        path = originalUrl;

    if ((previous_url_path == getTranslation('/tournament-game') || previous_url_path == getTranslation('/online-game') && !sessionStorage.getItem('no_confirmation'))){
        let bool = await userLeaveConfirmation();
        document.getElementById('leavingPopup').style.display = 'none';
        if (bool == false){
            history.pushState(null, null, '');
            history.replaceState(null, null, previous_url_path);
            return;
        }
        else{
            previous_url_path = '';
            path = '/home';
        }
    }
    sessionStorage.removeItem('no_confirmation');

    no_history_nav.hideEveryDiv();
    originalUrl = null;

    switch (path){
        case '':
        case '/':
        case getTranslation('/home'):
        case '/home':
            no_history_nav.displayMenu();
            return;
        case getTranslation('/play'):
        case '/play':
            no_history_nav.displayPlay();
            return;
        case getTranslation('/classic'):
        case '/classic':
            no_history_nav.displayClassicChoice()
            return;
        case getTranslation('/1vs1'):
        case '/1vs1':
            no_history_nav.displayOneVsOneGameLocal();
            return;
        case getTranslation('/1vs2'):
        case '/1vs2':
            no_history_nav.displayTwoVsOneGameLocal();
            return;
        case getTranslation('/online'):
        case '/online':
            no_history_nav.displayOneVsOneChoice();
            return;
        case getTranslation('/create-lobby'):
        case '/create-lobby':
            no_history_nav.displayOneVsOneOnlineCreateGame()
            return;
        case getTranslation('/join-lobby'):
        case '/join-lobby':
            no_history_nav.displayOneVsOneOnlineJoinGame();
            return;
        case getTranslation('/online-game'):
        case '/online-game':
            displayStatusBarWarning(getTranslation('Refresh Alert Online'))
            previous_url_path = "";
            no_history_nav.displayMenu();
            return;
        case getTranslation('/tournament'):
        case '/tournament':
            no_history_nav.displayTournamentSetup();
            return;
        case getTranslation('/tournament-nicknames'):
        case '/tournament-nicknames':
            no_history_nav.displayTournamentForm(sessionStorage.getItem('t_player_nbr'));
            return;
        case getTranslation('/tournament-game'):
        case '/tournament-game':
            previous_url_path = "";
            no_history_nav.displayMenu();
            displayStatusBarWarning(getTranslation('Refresh Alert Tournament'))
            return;
        case getTranslation('/vs-ai'):
        case '/vs-ai':
            no_history_nav.displayGamePage_ai();
            return;
        case getTranslation('/customize'):
        case '/customize':
            no_history_nav.displayCustomize();
            return;
        case getTranslation('/statistics'):
        case '/statistics':
            no_history_nav.displayStats();
            return;
        case getTranslation('/game-history'):
        case '/game-history':
            no_history_nav.displayHistory();
            return;
        case getTranslation('/local-stats'):
        case 'local-stats':
            no_history_nav.displayLocalStats();
            return;
        case getTranslation('/online-stats'):
        case '/online-stats':
            no_history_nav.displayOnlineStats();
            return;
        case getTranslation('/settings'):
        case '/settings':
            no_history_nav.displaySettings();
            return;
        case getTranslation('/credits'):
        case '/credits':
            no_history_nav.theaterCredits();
            return;
    }
    window.location.href = 'https://127.0.0.1:1025/404.html';
}
