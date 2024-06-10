/***********BACKWARD/FORWARD NAVIGATION************/
              /** Without history push**/
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
    pushHistory = false;
    if (!originalUrl)
        path = window.location.pathname;
    else
        path = originalUrl;
    // console.log(previous_url_path);
    // console.log(sessionStorage.getItem('no_confirmation'));
    if ((previous_url_path == getTranslation('/tournament-game') || previous_url_path == getTranslation('/online-game')) && !sessionStorage.getItem('no_confirmation')){
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

    nav.hideEveryDiv();
    pushHistory = false;
    originalUrl = null;

    switch (path){
        case '':
        case '/':
        case getTranslation('/home'):
        case '/home':
            nav.displayMenu();
            return;
        case getTranslation('/play'):
        case '/play':
            nav.displayPlay();
            return;
        case getTranslation('/classic'):
        case '/classic':
            nav.displayClassicChoice()
            return;
        case getTranslation('/1vs1'):
        case '/1vs1':
            nav.displayOneVsOneGameLocal();
            return;
        case getTranslation('/1vs2'):
        case '/1vs2':
            nav.displayTwoVsOneGameLocal();
            return;
        case getTranslation('/online'):
        case '/online':
            nav.displayOneVsOneChoice();
            return;
        case getTranslation('/create-lobby'):
        case '/create-lobby':
            nav.displayOneVsOneOnlineCreateGame()
            return;
        case getTranslation('/join-lobby'):
        case '/join-lobby':
            nav.displayOneVsOneOnlineJoinGame();
            return;
        case getTranslation('/online-game'):
        case '/online-game':
            displayStatusBarWarning(getTranslation('Refresh Alert Online'))
            previous_url_path = "";
            nav.displayMenu();
            return;
        case getTranslation('/tournament'):
        case '/tournament':
            nav.displayTournamentSetup();
            return;
        case getTranslation('/tournament-nicknames'):
        case '/tournament-nicknames':
            nav.displayTournamentForm(sessionStorage.getItem('t_player_nbr'));
            return;
        case getTranslation('/tournament-game'):
        case '/tournament-game':
            previous_url_path = "";
            nav.displayMenu();
            displayStatusBarWarning(getTranslation('Refresh Alert Tournament'))
            return;
        case getTranslation('/customize'):
        case '/customize':
            nav.displayCustomize();
            return;
        case getTranslation('/statistics'):
        case '/statistics':
            nav.displayStats();
            return;
        case getTranslation('/game-history'):
        case '/game-history':
            nav.displayHistory();
            return;
        case getTranslation('/local-stats'):
        case 'local-stats':
            nav.displayLocalStats();
            return;
        case getTranslation('/online-stats'):
        case '/online-stats':
            nav.displayOnlineStats();
            return;
        case getTranslation('/settings'):
        case '/settings':
            nav.displaySettings();
            return;
        case getTranslation('/credits'):
        case '/credits':
            nav.displayMenu();
            return;
    }
    window.location.href = 'https://127.0.0.1:1025/404.html';
}
