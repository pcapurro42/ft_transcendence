/***********Classic Buttons Navigation************/
              /** With history push**/
const nav = {

    displayClassicChoice : function()
    {
        nav.hideEveryDiv();
        document.getElementById('classic_buttons').style.display = "block";

        setBackground('/classic');
        addToHistory('/classic');
        document.title = getTranslation('Classic');
    },

    removeClassicChoice : function()
    {
        document.getElementById('classic_buttons').style.display = "none";
    },

    displayOnlineMenu: function()
    {
        if (!isConnected())
            return;
        nav.hideEveryDiv();

        document.getElementById('online_menu').style.display = "block";

        freeInputAndForms();
        resetConnection();

        setBackground('/online');
        addToHistory('/online');
        document.title = getTranslation('Online');
    },

    removeOnlineMenu: function()
    {
        document.getElementById('online_menu').style.display = "none";
        nav.displayClassicChoice();
    },

    displayCreateLobby : function(){
        nav.hideEveryDiv();

        document.getElementById('create_classic_menu').style.display = 'block';
        document.getElementById('create_classic_lobby').style.visibility = 'hidden';

        freeInputAndForms();
        resetConnection();
        offerGenerator();

        setBackground('/create-lobby');
        addToHistory('/create-lobby');
        document.title = getTranslation('Create Lobby');
    },

    displayJoinLobby : function(){
        nav.hideEveryDiv();

        document.getElementById('join_classic_menu').style.display = 'block';
        document.getElementById('answer_timeout').style.display = 'none';
        document.getElementById('join_classic_lobby').style.visibility = 'hidden';
        document.getElementById('g_win_text').style.display = 'none';

        clearInterval(timeoutInterval);
        freeInputAndForms();
        resetConnection();

        setBackground('/join-lobby');
        addToHistory('/join-lobby');
        document.title = getTranslation('Join Lobby');
    },


    displayTournamentSetup : function(){
        nav.hideEveryDiv();
	    document.getElementById('tournament_setup').style.display = 'block';

        setBackground('/tournament');
        addToHistory('/tournament');
        document.title = getTranslation('Tournament');

    },

    removeTournamentSetup : function()
    {
	    document.getElementById('tournament_setup').style.display = 'none';
        freeInputAndForms();
        nav.displayPlay();
    },


    displayTournamentForm : function(){
        nav.hideEveryDiv();
		let val = document.getElementById('tournament_players_selector').value;
        localStorage.setItem('t_player_nbr', val)

        document.getElementById('tournament_nickname_menu').style.display = 'block';
        document.getElementById('form_alias').style.display = 'block';

        let i = formDuplicator(val);
        document.getElementById('submit_alias').onclick = function(event){
            parseAlias(i, event)
        };

        setBackground('/tournament-nicknames');
        addToHistory('/tournament-nicknames');
        document.title = getTranslation('Tournament - Nicknames');
    },

    removeTournamentForm : function(event){
        event.preventDefault();
        freeInputAndForms();
        document.getElementById('tournament_nickname_menu').style.display = 'none';
        document.getElementById('form_alias').style.display = 'none';

        nav.displayTournamentSetup();
    },

// < display/remove > //

    displayPlay : function(){
        nav.hideEveryDiv();

        document.getElementById('play_menu').style.display = 'block';

        setBackground('/play');
        addToHistory('/play');
        document.title = getTranslation("Play");
    },

    removePlay : function()
    {
        document.getElementById('play_menu').style.display = 'none';
        nav.displayMenu()
    },

    displayOneVsOneGameOnline : function()
    {
        nav.hideEveryDiv();
        document.getElementById('main_page').style.display = 'none';
        if (role == "host")
        {
            document.getElementById('one_vs_one_host_page').style.display = "block";
            document.getElementById('h_host_name').innerHTML = localStorage.getItem('login');
            document.getElementById('h_guest_name').innerHTML = localStorage.getItem('opponent_login');
            document.getElementById('waiting_host').style.display = "none";
        }
        else
        {
            document.getElementById('one_vs_one_guest_page').style.display = "block";
            document.getElementById('g_host_name').innerHTML = localStorage.getItem('opponent_login');
            document.getElementById('g_guest_name').innerHTML = localStorage.getItem('login');
            document.getElementById('waiting_host').style.display = "block";
            data_channel.send("ready");
        }
        document.getElementById('main_page').style.display = "none";
        document.getElementById('game_toolbar').style.display = "block";

        handleUnload('no_confirmation', true);
        initializeOnline1v1();

        setBackground('/online-game');
        addToHistory('/online-game');
        document.title = getTranslation('Online Game');
		previous_url_path = '/online-game'
    },

    displayTwoVsOneGameLocal : function()
    {
        nav.hideEveryDiv();

        document.getElementById('main_page').style.display = 'none';
        document.getElementById('game_toolbar').style.display = "block";
        document.getElementById('one_vs_two_local_page').style.display = "block";

        document.getElementById('left_side_won_text').style.display = "none";
        document.getElementById('right_side_won_text').style.display = "none";

        initializeLocal1v2();

        setBackground('/1vs2');
        addToHistory('/1vs2');
        document.title = getTranslation('1 vs 2 (local)');
    },

    displayOneVsOneGameLocal : function()
    {
        nav.hideEveryDiv();
        document.getElementById('main_page').style.display = 'none';
        document.getElementById('game_toolbar').style.display = "block";
        document.getElementById('one_vs_one_local_page').style.display = "block";

        document.getElementById('left_player_won_text').style.display = "none";
        document.getElementById('right_player_won_text').style.display = "none";

        setBackground('/1vs1');
        addToHistory('/1vs1')
        document.title = getTranslation("1 vs 1 (local)");
        initializeLocal1v1();
    },

    displayRGPD: function(){
        nav.hideEveryDiv();
        document.getElementById('rgpd_block').style.display = 'block';

        setBackground('/privacy');
        addToHistory('/privacy');
        document.title = getTranslation('Privacy policy');
    },

    hideEveryDiv: async function (){
        document.getElementById('rgpd_block').style.display = "none";
        document.getElementById('game_toolbar').style.display ='none';
        document.getElementById('online_menu').style.display = 'none';
        document.getElementById('one_vs_one_local_page').style.display = 'none';
        document.getElementById('one_vs_two_local_page').style.display = 'none';
        document.getElementById('one_vs_one_guest_page').style.display = 'none';
        document.getElementById('one_vs_one_host_page').style.display= 'none';
        document.getElementById('game_page_tournament').style.display= 'none';
        document.getElementById('play_menu').style.display = 'none';
        document.getElementById('customize_menu').style.display = 'none';
        document.getElementById('stats_menu').style.display = 'none';
        document.getElementById('settings_menu').style.display = 'none';
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
        document.getElementById('main_menu_buttons').style.display = 'none';
        document.getElementById('main_menu_page').style.display = 'none';
        document.getElementById('rgpd_block').style.display = "none";
        document.getElementById('main_page').style.display = 'block';

        let status_bars = document.querySelectorAll('.status_bar');
        status_bars.forEach( (elem) =>{
            elem.style.display="none";
        })

        let video = document.getElementById('vid_credits');
        video.style.display = "none";
        video.pause();
        video.currentTime = 0;

        document.getElementById('credit_close').style.display = "none";

        active = false;
        resetMusicAndSounds();
        freeInputAndForms();
        tournamentFinalReset();
        refreshStats();
        refreshLogin();
        removeKeyboardMonitoring();
        removeBeforeUnloadWarning();
    },

}

