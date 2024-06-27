async function gatherIceCandidatesA(){

	return new Promise(resolve => {

		let candidate_a = [];

		RTC_a.onicecandidate = function(event){
			if (event.candidate)
				candidate_a.push(event.candidate);
			else
				resolve(candidate_a);
	}
	})
}

async function fetchOffer(){
	const endpoint = 'https://hostname:8080/backend/signal/getOffer/';
	let code = document.getElementById('paste_inv_code').value;

	try{

		if (parseInvitationCode(code) == false){
			displayStatusBarWarning(getTranslation('Wrong Code Guest'));
			return;
		}

		document.getElementById('submit_inv_code').setAttribute('disabled', true);

		const request = await fetch(endpoint, {
    	    method: 'POST',
			credentials: 'include',
			headers: {
    	        'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
    	    },
			body : JSON.stringify({
				code: code,
				'login' : login,
				hashLogin: localStorage.getItem('hashLogin'),
				token: localStorage.getItem('token'),
			}),
		})
		if (request.status == 404){
			displayStatusBarAlert(getTranslation('Peer 404'));
			document.getElementById('submit_inv_code').removeAttribute('disabled');
			return;
		}
		else if (request.status == 500){
			localStorage.setItem('status', 'not connected')
			refreshLogin();
			document.getElementById('login_btn').style.display = 'block';
			nav.displayMenu();
       		displayStatusBarAlert(getTranslation('42 Security Disconnection'));
			return;
		}
		let response = await request.text();
		response = JSON.parse(response);
		localStorage.setItem('opponent_login', response['login']);
		answerGenerator(response['offer'])
	}
	catch(error){
		document.getElementById('submit_inv_code').removeAttribute('disabled');
		console.log(error);
		displayStatusBarAlert(getTranslation('Peer fetch offer'));
	}
}

async function answerGenerator(offer){

	try{
		offer = JSON.parse(offer);

		if(offer.type != 'offer' || parseOffersAnswers(offer) == false){
			displayStatusBarAlert(getTranslation("Wrong Code Format"));
			return;
		}

		RTC_a = new RTCPeerConnection(getIceConfig());

	 	RTC_a.ondatachannel = function(event){
			data_channel = event.channel;
			data_channel.onopen = () => guestConnectionHandler();
		}

		RTC_a.onconnectionstatechange = function(event) {
			if (RTC_a.connectionState == 'connected'){
				clearInterval(timeoutInterval);
				document.getElementById('answer_timeout').textContent = "You're pretty good";
			}
		}

		await RTC_a.setRemoteDescription(new RTCSessionDescription(offer));

		for (let candidate of offer.iceCandidates){
			await RTC_a.addIceCandidate(candidate);
		}

		let answer = await RTC_a.createAnswer();
		await RTC_a.setLocalDescription(answer);

		let candidates = await gatherIceCandidatesA();

		let jsonAnswer = {
			sdp: answer.sdp,
			type: answer.type,
			iceCandidates: candidates,
		}
		sendAnswer(JSON.stringify(jsonAnswer));
		answerTimeout();
	}
	catch(error){
		console.error(`Error: ${error}`);
		displayStatusBarAlert(getTranslation("Wrong Code Format"));
	}

}

async function sendAnswer(answer){
	const endpoint = 'https://hostname:8080/backend/signal/';
	const code = document.getElementById('paste_inv_code').value;

	try{
		const request = await fetch(endpoint, {
    	    method: 'POST',
			credentials: 'include',
			headers: {
    	        'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
    	    },
			 body: JSON.stringify({
					'code' : code,
					'answer' : answer,
					'login' : localStorage.getItem('login'),
					'token': localStorage.getItem('token'),
					'hashLogin': localStorage.getItem('hashLogin'),
			}),
		})

		let response = await request.text();

    	if (!response){
			displayStatusBarAlert(getTranslation('Connection Init Failed'));
			resetConnection();
			nav.displayMenu();
    	    return;
    	}
		if (request.status == 500){
			localStorage.setItem('status', 'not connected')
			refreshLogin();
			document.getElementById('login_btn').style.display = 'block';
			nav.displayMenu();
       		displayStatusBarAlert(getTranslation('42 Security Disconnection'));
			return;
		}
		document.getElementById('invitation_code').value = response;
	}
	catch (error){
		console.log(error);
		displayStatusBarAlert(getTranslation("Peer send answer"));
	}
}

function answerTimeout(){
	let answerTimeout = 300;

	let countdown = document.getElementById('answer_timeout');
	countdown.textContent = `${answerTimeout}` + getTranslation("Answer Timeout")
	countdown.style.display = 'block';

	document.getElementById('submit_inv_code').setAttribute('disabled', true);

	timeoutInterval = setInterval(function() {
		answerTimeout--;
		countdown.textContent = `${answerTimeout}` + getTranslation("Answer Timeout")
		if (answerTimeout == 0){
			countdown.textContent = getTranslation("Code Expired")
			displayStatusBarAlert(getTranslation("Peer Connection Timeout"));
			freeInputAndForms();
			document.getElementById('submit_inv_code').removeAttribute('disabled');
			RTC_a = null;
			clearInterval(timeoutInterval);
		}
	}, 1000);
}
