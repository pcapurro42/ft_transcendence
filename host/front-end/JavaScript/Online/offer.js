async function gatherIceCandidates_o(){

	return new Promise(resolve => {

		let candidate_o = [];

		RTC_o.onicecandidate = function(event){
			if (event.candidate)
				candidate_o.push(event.candidate);
			else
				resolve(candidate_o);
		}
	})
}


async function offerGenerator(){
	try{
		RTC_o = new RTCPeerConnection(getIceConfig());
		data_channel = RTC_o.createDataChannel('mgpDataChannel');

		let  sdp_offer = await RTC_o.createOffer();
		await RTC_o.setLocalDescription(sdp_offer);

		let candidates = await gatherIceCandidates_o();

		let jsonOffer = {
			sdp: sdp_offer.sdp,
			type: sdp_offer.type,
			iceCandidates: candidates,
		}
		let offer = JSON.stringify(jsonOffer)
		sendOffer(offer)
		RTC_o.onconnectionstatechange = function(event){
			if (RTC_o.connectionState =='connected')
			 	data_channel.onopen = () => hostConnectionHandler();
		}
	}
	catch(error){
		console.error(`Error: ${error}`);
		document.getElementById('invitation_code').value = `Error: ${error}`;
	}
}

async function sendOffer(offer){
	const endpoint = 'https://127.0.0.1:8080/backend/signal/'; //ICI
    const login = localStorage.getItem('login');

	const request = await fetch(endpoint, {
        method: 'POST',
		credentials: 'include',
		headers: {
            'Content-Type': 'application/json',
			'X-CSRFToken': csrfToken
        },
		body : JSON.stringify({
				'login' : login,
				'offer' : offer,
		}),
	})

	let response = await request.text();

    if (!response){
		displayStatusBarAlert(getTranslation('Connection Init Failed'));
		resetConnection();
		displayMenu();
        return;
    }
	document.getElementById('invitation_code').value = response;
}


async function fetchAnswer(){
	const endpoint = 'https://127.0.0.1:8080/backend/signal/getAnswer/'; //ICI
    const login = localStorage.getItem('login');
	let code = document.getElementById('invitation_code').value;

	document.getElementById('init_p2p').setAttribute('disabled', true);
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
		document.getElementById('init_p2p').removeAttribute('disabled');
		return;
	}
	let response = await request.json();
	sessionStorage.setItem('opponent_login', response['login']);
	initConnection(response['answer']);

}

async function initConnection(answer){

	try{

		answer = JSON.parse(answer);
		if (parse_offersAnswers(answer) == false || answer.type == 'offer'){
			displayStatusBarAlert(getTranslation('Wrong Code Format'));
			resetConnection();
			displayMenu();
       		return;
		}
		await RTC_o.setRemoteDescription(new RTCSessionDescription(answer));

		for (let candidate of answer.iceCandidates)
			await RTC_o.addIceCandidate(candidate);

	}
	catch(error){
		console.error(`${error}`);
		displayStatusBarAlert(getTranslation("Peer Connection Alert"));
	}

}
