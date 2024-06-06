/***********Classic Buttons Navigation************/
              /** With history push**/
const nav = {

    displayClassicChoice : function()
    {
        let classic_buttons = document.getElementById('classic_buttons');
        let play_menu = document.getElementById('play_menu');

        classic_buttons.style.display = "block";
        play_menu.style.display = 'none';
        // history.pushState(getTranslation('Classic'), null, getTranslation('/classic'));
        document.title = getTranslation('Classic');
    },

    removeClassicChoice : function()
    {
        let classic_menu = document.getElementById('classic_buttons');
        classic_menu.style.display = "none";
        nav.displayPlay();
    },

    displayOneVsOneChoice: function()
    {
        nav.removeClassicChoice();

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

        // history.pushState(getTranslation('Online'), null, getTranslation('/online'));
        document.title = getTranslation('Online');
    },

    removeOneVsOneChoice: function()
    {
        one_vs_one_online_choice_menu = document.getElementById('one_vs_one_online_choice_menu');
        one_vs_one_online_choice_menu.style.display = "none";

        nav.displayClassicChoice();
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
        // history.pushState(getTranslation('Create Lobby'), null, getTranslation('/create-lobby'));
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
        // history.pushState(getTranslation('Join Lobby'), null, getTranslation('/join-lobby'));
        document.title = getTranslation('Join Lobby');
    },


    displayTournamentSetup : function(){
        let play_menu = document.getElementById('play_menu');
        play_menu.style.display = "none";
        let tournament_setup = document.getElementById('tournament_setup');
	    tournament_setup.style.display = 'block';
        // history.pushState(getTranslation('Tournament'), null, getTranslation('/tournament'));
        document.title = getTranslation('Tournament');

    },

    removeTournamentSetup : function()
    {
        let tournament_setup = document.getElementById('tournament_setup');
	    tournament_setup.style.display = 'none';
        freeInputAndForms();
        nav.displayPlay();
    },


    displayTournamentForm : function(){
		let val = document.getElementById('tournament_players_selector').value;
        sessionStorage.setItem('t_player_nbr', val)
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
        // history.pushState(null, null, getTranslation('/tournament-nicknames'));
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

        nav.displayTournamentSetup();
    },
// < DISPLAY/REMOVE > //

    displayPlay : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');
        let play_menu = document.getElementById('play_menu');

        play_menu.style.display = 'block';
        main_menu.style.display = 'none';
        // history.pushState(null, null, getTranslation('/play'));
        document.title = getTranslation("Play");
    },

    removePlay : function()
    {
        let main_menu = document.getElementById('main_menu_buttons');
        let play_menu = document.getElementById('play_menu');

        play_menu.style.display = 'none';
        nav.displayMenu()
    },

    displayOneVsOneGameOnline : function()
    {
		addBeforeUnloadWarning();
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
        // history.pushState(null, null, getTranslation('/online-game'));
		previous_url_path = window.location.pathname;
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

        // history.pushState(null, null, getTranslation('/1vs2'));
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
        // history.pushState(null, null, getTranslation('/1vs1'));
        document.title = getTranslation("1 vs 1 (local)");
        initializeLocal1v1();
    },
}

