
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

	let  jsonOffer = await RTC.createOffer();
    let offer = JSON.stringify(jsonOffer);;

	return btoa(offer);
}

function offerHandler(){
	let offer = document.getElementById('paste_peer_offer').value;
	if (parse_offersAnswers(offer) == false){
		document.getElementById('peer_answer').value = "Error: unexpected character.";
		return;
	}
	try{
		offer = atob(offer);
		answerGenerator(JSON.parse(offer));
	}
	catch(error){
		document.getElementById('peer_answer').value = "Error: code is invalid.";
		console.error(`Error: ${error}`);
	}
}

async function answerGenerator(offer){
	console.log(offer);
	let RTC = new RTCPeerConnection(getIceConfig());
	console.log("hello from answerGenerator in try");
	let test = await RTC.setRemoteDescription(new RTCSessionDescription(offer));
	let answer = await RTC.createAnswer();
	document.getElementById('peer_answer').value = btoa(JSON.stringify(answer));
}
