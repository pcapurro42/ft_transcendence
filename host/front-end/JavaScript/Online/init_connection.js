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
			if (RTC_o.connectionState === 'connected') {
				displayStatusBarSuccess(getTranslation("Peer Connection Success"));
				document.getElementById('create_classic_lobby').removeAttribute('disabled');
				return;
			}
			else if (RTC_o.connectionState === 'new' || RTC_o.connectionState === 'connecting'){

				console.error(`Connection state stuck on ${RTC_o.connectionState}`);
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
		if (RTC_a.connectionState === 'connected') {
			answerSideConnectionHandler();
			clearInterval(timeoutInterval);
		}
	}, 1000);
}

function answerSideConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));

	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = "You're pretty good.";


	let join_lobby_btn = document.getElementById('join_classic_lobby');
	join_lobby_btn.removeAttribute('disabled');



}
