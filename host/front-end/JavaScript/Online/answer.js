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
		if(offer.type != 'offer')
			throw("Error: expecting 'offer' type");
		RTC_a = new RTCPeerConnection(getIceConfig());
		RTC_a.onconnectionstatechange = function(event) {
			if(RTC_a.connectionState == 'disconnected' || RTC_a.connectionState == 'failed'){
				handleDisconnection();
				return;
			}
		}
	 	RTC_a.ondatachannel = function(event){
			data_channel = event.channel;
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
		answerSideTimeout();
	}
	catch(error){
		console.error(`Error: ${error}`);
		displayStatusBarAlert(getTranslation("Wrong Code Format"));
	}

}
