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
				return;
			}
			else if (RTC_o.iceConnectionState === 'checking'){
				console.error("checking");
				return;
			}
			else if (RTC_o.iceConnectionState === 'new')
				displayStatusBarAlert(getTranslation("Peer Connection Timeout"));
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
