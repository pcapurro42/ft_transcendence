
function getIceConfig(){
	let iceConf = {
		iceTransportPolicy : 'all',
		bundlePolicy : 'max-compat',
	}
	return iceConf;
}

async function offerGenerator(){
	let RTC = new RTCPeerConnection(getIceConfig());
	let dataChannel = RTC.createDataChannel('mgpDataChan');
	try{
		let  jsonOffer = await RTC.createOffer();
		let offer = JSON.stringify(jsonOffer);;
		document.getElementById('peer_offer').value = btoa(offer);
	}
	catch(error){
		document.getElementById('peer_offer').value = error;
	}
}

async function answerGenerator(){
	let offer = document.getElementById('paste_peer_offer').value;
	try{
		if (parse_offersAnswers(offer) == false)
			throw("Error: offer not b64.");
		offer = atob(offer);
		let answer = await getAnswer(JSON.parse(offer));
		document.getElementById('peer_answer').value = btoa(JSON.stringify(answer));
	}
	catch(error){
		document.getElementById('peer_answer').value = "Error: code is invalid.";
		console.error(`Error: ${error}`);
	}
}

async function getAnswer(offer){
	console.log(offer);
	let RTC = new RTCPeerConnection(getIceConfig());
	console.log("hello from answerGenerator in try");
	let test = await RTC.setRemoteDescription(new RTCSessionDescription(offer));
	let answer = await RTC.createAnswer();
	return answer;
}
