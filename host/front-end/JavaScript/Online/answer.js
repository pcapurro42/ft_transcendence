async function gatherIceCandidates_a(){

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
	const endpoint = 'https://127.0.0.1:8080/backend/signal/getOffer/'; //ICI
	let code = document.getElementById('paste_inv_code').value;

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
			'X-CSRFToken': csrfToken
        },
		body : code,
	})
	if (request.status == 404){
		displayStatusBarAlert(getTranslation('Peer 404'));
		document.getElementById('submit_inv_code').removeAttribute('disabled');
		return;
	}
	let response = await request.text();
	response = JSON.parse(response);
	sessionStorage.setItem('opponent_login', response['login']);
	answerGenerator(response['offer'])
}

async function answerGenerator(offer){

	try{
		offer = JSON.parse(offer);

		if(offer.type != 'offer' || parse_offersAnswers(offer) == false){
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
				document.getElementById('answer_timeout').innerHTML = "You're pretty good";
			}
		}

		await RTC_a.setRemoteDescription(new RTCSessionDescription(offer));

		for (let candidate of offer.iceCandidates){
			await RTC_a.addIceCandidate(candidate);
		}

		let answer = await RTC_a.createAnswer();
		await RTC_a.setLocalDescription(answer);

		let candidates = await gatherIceCandidates_a();

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
	const endpoint = 'https://127.0.0.1:8080/backend/signal/'; //ICI
    const login = localStorage.getItem('login'); //
	const code = document.getElementById('paste_inv_code').value;
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
		}),
	})

	let response = await request.text();

    if (!response){
		displayStatusBarAlert(getTranslation('Connection Init Failed'));
		resetConnection();
		nav.displayMenu();
        return;
    }
	document.getElementById('invitation_code').value = response;
}

function answerTimeout(){
	let answerTimeout = 60;

	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = `${answerTimeout}` + getTranslation("Answer Timeout")
	countdown.style.display = 'block';

	let submit_inv_code = document.getElementById('submit_inv_code');
	submit_inv_code.setAttribute('disabled', true);


	timeoutInterval = setInterval(function() {
		answerTimeout--;
		countdown.innerHTML = `${answerTimeout}` + getTranslation("Answer Timeout")
		if (answerTimeout == 0){
			countdown.innerHTML = getTranslation("Code Expired")
			displayStatusBarAlert(getTranslation("Peer Connection Timeout"));
			freeInputAndForms();
			submit_inv_code.removeAttribute('disabled');
			RTC_a = null;
			clearInterval(timeoutInterval);
		}
	}, 1000);
}
