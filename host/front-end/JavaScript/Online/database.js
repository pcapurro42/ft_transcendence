async function storeOnlineStats(){
	const endpoint = 'https://127.0.0.1:8080/backend/store-stats/'; //ICI
	let login = localStorage.getItem('login');
    let token = localStorage.getItem('token');

	let body = JSON.stringify({login:login, token:token, ballDistance:ballDistance, ballReturned:ballReturned, ballReceived:ballReceived, bonusTaken:bonusTaken, bonusTotal:bonusTotal, gamesPlayedNb:gamesPlayedNb, gameHistory:gameHistory, loseGameNb:loseGameNb, wonGamesNb:wonGamesNb});

	const request = await fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-type' : 'application/json',
			'X-CSRFToken' : csrfToken,
		},
		body: body
	});
	if (request.status == 500)
		displayStatusBarAlert(getTranslation("Statistic Storage Error"));
}

function retrieveOnlineStats(response){
	ballDistance = +response['ballDistance'];
	ballReturned = +response['ballReturned'];
	ballReceived = +response['ballReceived'];
	bonusTaken = +response['bonusTaken'];
	bonusTotal = +response['bonusTotal'];
	gamesPlayedNb = +response['gamesPlayedNb'];
	gameHistory = response['gameHistory'];
	loseGameNb = +response['loseGameNb'];
	wonGamesNb = +response['wonGamesNb'];
}

async function retrieveUserInfo(){
	const endpoint = "https://127.0.0.1:8080/backend/retrieve-user/"
    let login = localStorage.getItem('login');
    let token = localStorage.getItem('token');
    let body = JSON.stringify({ login: login, token: token });
    const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type' : 'application/json',
            'X-CSRFToken' : csrfToken,
        },
        body : body
    })
    if (response.status != 200){
		localStorage.setItem('status', 'not connected')
        displayStatusBarAlert(getTranslation('42 Security Disconnection'));
		refreshLogin();
		return;
	}
	let userInfo = await response.text();
    userInfo = JSON.parse(userInfo);
    userInfo = userInfo[0].fields;
	retrieveOnlineStats(userInfo)
}
