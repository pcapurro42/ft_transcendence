async function initConnection(answer){
	console.log("hello from initConnection")
	await RTC_o.setRemoteDescription(new RTCSessionDescription(answer));

	if (answer.type == "offer"){
		console.error('Error : offer submitted');
	}
	for (let candidate of answer.iceCandidates){
		await RTC_o.addIceCandidate(candidate);
	}

	RTC_o.oniceconnectionstatechange = function() {
		console.log(`status = ${RTC_o.iceConnectionState}`);
		if (RTC_o.iceConnectionState === 'connected') {
			console.log('Connection ok');
		}
		else
			console.log('Not connected');
	};

}
