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
		let offer = JSON.stringify(jsonOffer);
		document.getElementById('peer_offer').value = btoa(offer);
	}
	catch(error){
		console.error(`Error: ${error}`);
		document.getElementById('peer_offer').value = "Error generating offer.";
	}
}

async function submitAnswer(){
	let answer = document.getElementById('paste_peer_answer').value;
	try{
		if (parse_offersAnswers(answer) == false)
			throw("Error: answer not b64.");
		answer = atob(answer);
		RTC_o.onconnectionstatechange = function(event) {
			if (RTC_o.connectionState == 'connected')
				data_channel.onopen = () => hostConnectionHandler()
		}
		initConnection(JSON.parse(answer));
	}
	catch(error){
		displayStatusBarAlert(getTranslation("Wrong Code Format"));
	}
}

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
