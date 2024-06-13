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

async function handleForbiddenPages(){
    if ((previous_url_path == getTranslation('/tournament-game') || previous_url_path == getTranslation('/online-game') || previous_url_path == getSpecificTranslation('fr', '/tournament-game') || previous_url_path == getSpecificTranslation('fr', '/online-game')) && !sessionStorage.getItem('no_confirmation')){
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
}
async function handleLocation(){

    let path;
    pushHistory = false;
    if (!originalUrl)
        path = window.location.pathname;
    else
        path = originalUrl;
    handleForbiddenPages()

    nav.hideEveryDiv();
    pushHistory = false;
    originalUrl = null;
    switch (path){
        case '':
        case '/':
        case getSpecificTranslation('fr', '/home'):
        case '/home':
            nav.displayMenu();
            return;
        case getSpecificTranslation('fr', '/play'):
        case '/play':
            nav.displayPlay();
            return;
        case getSpecificTranslation('fr', '/classic'):
        case '/classic':
            nav.displayClassicChoice()
            return;
        case getSpecificTranslation('fr', '/1vs1'):
        case '/1vs1':
            nav.displayOneVsOneGameLocal();
            return;
        case getSpecificTranslation('fr', '/1vs2'):
        case '/1vs2':
            nav.displayTwoVsOneGameLocal();
            return;
        case getSpecificTranslation('fr', '/online'):
        case '/online':
            nav.displayOneVsOneChoice();
            return;
        case getSpecificTranslation('fr', '/create-lobby'):
        case '/create-lobby':
            nav.displayOneVsOneOnlineCreateGame()
            return;
        case getSpecificTranslation('fr', '/join-lobby'):
        case '/join-lobby':
            nav.displayOneVsOneOnlineJoinGame();
            return;
        case getSpecificTranslation('fr', '/online-game'):
        case '/online-game':
            displayStatusBarWarning(getTranslation('Refresh Alert Online'))
            previous_url_path = "";
            nav.displayMenu();
            return;
        case getSpecificTranslation('fr', '/tournament'):
        case '/tournament':
            nav.displayTournamentSetup();
            return;
        case getSpecificTranslation('fr', '/tournament-nicknames'):
        case '/tournament-nicknames':
            nav.displayTournamentForm(sessionStorage.getItem('t_player_nbr'));
            return;
        case getSpecificTranslation('fr', '/tournament-game'):
        case '/tournament-game':
            previous_url_path = "";
            nav.displayMenu();
            displayStatusBarWarning(getTranslation('Refresh Alert Tournament'))
            return;
        case getSpecificTranslation('fr', '/customize'):
        case '/customize':
            nav.displayCustomize();
            return;
        case getSpecificTranslation('fr', '/statistics'):
        case '/statistics':
            nav.displayStats();
            return;
        case getSpecificTranslation('fr', '/game-history'):
        case '/game-history':
            nav.displayHistory();
            return;
        case getSpecificTranslation('fr', '/local-stats'):
        case '/local-stats':
            nav.displayLocalStats();
            return;
        case getSpecificTranslation('fr', '/online-stats'):
        case '/online-stats':
            nav.displayOnlineStats();
            return;
        case getSpecificTranslation('fr', '/settings'):
        case '/settings':
            nav.displaySettings();
            return;
        case getSpecificTranslation('fr', '/credits'):
        case '/credits':
            pushHistory = false;
            nav.displayMenu();
            return;
        case getSpecificTranslation('fr', '/privacy'):
        case '/privacy':
            nav.displayRGPD();
            return;
    }
    window.location.href = 'https://127.0.0.1:1025/404.html';
}
