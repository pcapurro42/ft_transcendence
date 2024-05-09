function readGuestMsg(event){
	console.log(event.data);
}

function hostConnectionHandler(){
	console.log('test');
	data_channel.onerror = function(error) {
    	console.error("Data Channel Error:", error);
	};
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));
	document.getElementById('create_classic_lobby').removeAttribute('disabled');

	data_channel.onmessage = event => readGuestMsg(event);
	data_channel.send('Hello from host!');
}
