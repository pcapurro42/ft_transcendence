let RTC_o = null;
let RTC_a = null;

function getIceConfig(){
	let iceConf = {
		iceTransportPolicy : 'all',
		bundlePolicy : 'max-compat',
	}
	return iceConf;
}

		//************************** OFFER SIDE *************************//


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
		let dataChannel = RTC_o.createDataChannel('mgpDataChan');

		let  sdp_offer = await RTC_o.createOffer();
		await RTC_o.setLocalDescription(sdp_offer);

		let candidates = await gatherIceCandidates_o();

		let jsonOffer = {
			sdp: sdp_offer.sdp,
			type: sdp_offer.type,
			iceCandidates: candidates,
		}
		console.log(jsonOffer);
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
		initConnection(JSON.parse(answer));
	}
	catch(error){
		displayStatusBarAlert(getTranslation("Wrong Code Format"));
	}
}



		//************************** ANSWER SIDE *************************//


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
	}
	catch(error){
		console.error(`Error: ${error}`);
		displayStatusBarAlert(getTranslation("Wrong Code Format"));
	}

}

