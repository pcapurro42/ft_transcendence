async function initConnection(answer){

	try{

		await RTC_o.setRemoteDescription(new RTCSessionDescription(answer));

		if (answer.type === 'offer'){
			displayStatusBarAlert(getTranslation("Wrong Code Format"));
			return;
		}
		document.getElementById('submit_answer').setAttribute('disabled', true);


		for (let candidate of answer.iceCandidates)
		await RTC_o.addIceCandidate(candidate);
	displayStatusBarWarning(getTranslation("Peer Connection Warning"));

		const timeout = setTimeout(() => {
			console.log(RTC_o);
			if (RTC_o.iceConnectionState === 'connected') {
				displayStatusBarSuccess(getTranslation("Peer Connection Success"));
				document.getElementById('create_classic_lobby').removeAttribute('disabled');
				return;
			}
			else if (RTC_o.iceConnectionState === 'new' || RTC_o.iceConnectionState === 'checking'){

				console.log(`Connection state stuck on ${RTC_o.iceConnectionState}`);
				displayStatusBarAlert(getTranslation("Peer Connection Timeout"));
			}
			else{
				displayStatusBarAlert(getTranslation("Peer Connection Alert"));
				return
			}
		},5000)

	}
	catch(error){
		console.error(`Error: ${error}`);
		displayStatusBarAlert(getTranslation("Peer Connection Alert"));
	}

}

function answerSideTimeout(){
	let answerTimeout = 60;

	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = `${answerTimeout}` + getTranslation("Answer Timeout")
	countdown.style.display = 'block';

	let submit_offer = document.getElementById('submit_offer');
	submit_offer.setAttribute('disabled', true);


	const timeout = setInterval(function() {
		answerTimeout--;
		countdown.innerHTML = `${answerTimeout}` + getTranslation("Answer Timeout")
		if (answerTimeout == 0){
			countdown.innerHTML = getTranslation("Code Expired")
			displayStatusBarAlert(getTranslation("Peer Connection Timeout"));
			document.getElementById('paste_peer_offer').value = "";
			document.getElementById('peer_answer').value = "";
			submit_offer.removeAttribute('disabled');
			RTC_a = null;
			clearInterval(timeout);
		}
	}, 1000)
}
