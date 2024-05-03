
function getIceConfig(){
	let iceConf = {
		iceTransportPolicy : 'all',
		bundlePolicy : 'max-compat',
	}
	return iceConf;
}

async function offerGenerator(){
	console.log('test');

	let config = getIceConfig();
	let RTC = new RTCPeerConnection(config);

	let dataChannel = RTC.createDataChannel('mgpDataChan');

	let  jsonOffer = await RTC.createOffer();
    let offer = JSON.stringify(jsonOffer);;

	return offer;
}
