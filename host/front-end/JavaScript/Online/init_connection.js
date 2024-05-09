async function initConnection(answer){

	try{

		if (answer.type === 'offer'){
			displayStatusBarAlert(getTranslation("Wrong Code Format"));
			return;
		}

		await RTC_o.setRemoteDescription(new RTCSessionDescription(answer));

		document.getElementById('submit_answer').setAttribute('disabled', true);


		for (let candidate of answer.iceCandidates)
			await RTC_o.addIceCandidate(candidate);

	}
	catch(error){
		console.error(`${error}`);
		displayStatusBarAlert(getTranslation("Peer Connection Alert"));
	}

}

function guestSideTimeout(){
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
			document.getElementById('paste_peer_offer').value = "";
			document.getElementById('peer_answer').value = "";
			submit_offer.removeAttribute('disabled');
			RTC_a = null;
			clearInterval(timeoutInterval);
		}
	}, 1000);
}
