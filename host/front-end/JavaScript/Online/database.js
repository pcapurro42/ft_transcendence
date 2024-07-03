async function storeOnlineStats(gameStat){
	const endpoint = 'https://hostname:8080/backend/store-stats/'; //ICI
	let hashLogin = localStorage.getItem('hashLogin');
    let token = localStorage.getItem('token');

	let body = JSON.stringify({hashLogin:hashLogin, token:token, ballDistance:gameStat['ballDistance'], ballReturned:gameStat['ballReturned'], ballReceived:gameStat['ballReceived'], bonusTaken:gameStat['bonusTaken'], bonusTotal:gameStat['bonusTotal'], gamesPlayedNb:gameStat['gamesPlayedNb'], gameHistory:gameStat['gameHistory'], loseGameNb:gameStat['loseGameNb'], wonGamesNb:gameStat['wonGamesNb']});

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
	if (response['login'] == "Anon"){
		localStorage.setItem('data_anonymize', 'true');
		localStorage.setItem('login', getTranslation('Anonymous'));
	}
	else{
		localStorage.setItem('data_anonymize', 'false');
		localStorage.setItem('login', response['login']);
	}
	setAuthsState();
}

async function retrieveUserInfo(){
	const endpoint = "https://hostname:8080/backend/retrieve-user/"
    let hashLogin = localStorage.getItem('hashLogin');
	let login = localStorage.getItem('login');
    let token = localStorage.getItem('token');
    let body = JSON.stringify({ hashLogin: hashLogin, login:login, token: token});
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
		document.getElementById('login_btn').style.display = 'block';
		return;
	}
	let userInfo = await response.text();
    userInfo = JSON.parse(userInfo);
    userInfo = userInfo[0].fields;
	if (!parseDbResponse(userInfo)){
        displayStatusBarWarning(getTranslation('Database wrong content'));
		return;
	}
	retrieveOnlineStats(userInfo);
	refreshLogin();
}

function parseDbResponse(response){

    if (typeof(response['ballDistance']) !== "number"
		|| typeof(response['ballReturned']) !== "number"
		|| typeof(response['ballReceived']) !== "number"
		|| typeof(response['bonusTaken']) !== "number"
		|| typeof(response['bonusTotal']) !== "number"
		|| typeof(response['gamesPlayedNb']) !== "number"
		|| (typeof(response['gameHistory']) !== "object" && typeof(response['gameHistory']) != 'string')
		|| typeof(response['loseGameNb']) !== "number"
		|| typeof(response['wonGamesNb']) !== "number")
        return false;

	gameHistJson = response['gameHistory'];
	gameHistJson = JSON.parse(gameHistJson);
	if (gameHistJson != null)
		for (const [key, value] of Object.entries(gameHistJson)){
			if (key == 'data'){
				let bool = true;
				gameHistJson.data.forEach(element => {
					if (Array.isArray(element)){
						element.forEach(elem => {
							if (typeof(element) != 'number' && !gameHistoryParse(element)){
								bool = false;
							}
						});
					}
					if (typeof(element) != 'number' && !gameHistoryParse(element)){
						bool = false;
					}
				});
				if (bool)
					continue
				else
					return false;
			}
			if ((typeof(key) != 'number' && !gameHistoryParse(key)) || (typeof(value) != 'number' && !gameHistoryParse(value))){
				return false;
			}
		}
	return true;
}
