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

async function answerGenerator(){
	let offer = document.getElementById('paste_peer_offer').value;

	try{
		if (parse_offersAnswers(offer) == false)
			throw("Error: offer not b64.");

		offer = JSON.parse(atob(offer));
		if(offer.type != 'offer'){
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
		document.getElementById('peer_answer').value = btoa(JSON.stringify(jsonAnswer));
		answerTimeout();
	}
	catch(error){
		console.error(`Error: ${error}`);
		displayStatusBarAlert(getTranslation("Wrong Code Format"));
	}

}

function answerTimeout(){
	let answerTimeout = 60;

	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = `${answerTimeout}` + getTranslation("Answer Timeout")
	countdown.style.display = 'block';

	let submit_offer = document.getElementById('submit_offer');
	submit_offer.setAttribute('disabled', true);


	timeoutInterval = setInterval(function() {
		answerTimeout--;
		countdown.innerHTML = `${answerTimeout}` + getTranslation("Answer Timeout")
		if (answerTimeout == 0){
			countdown.innerHTML = getTranslation("Code Expired")
			displayStatusBarAlert(getTranslation("Peer Connection Timeout"));
			freeInputAndForms();
			submit_offer.removeAttribute('disabled');
			RTC_a = null;
			clearInterval(timeoutInterval);
		}
	}, 1000);
}
