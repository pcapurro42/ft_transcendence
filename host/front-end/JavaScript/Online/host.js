function readGuestMsg(event){
	console.log(event.data);
}

function hostConnectionHandler(){
	console.log('test');
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));
	document.getElementById('create_classic_lobby').removeAttribute('disabled');
	data_channel.onopen = function(){
		data_channel.onmessage = event => readGuestMsg(event);
		data_channel.send('Hello from host!');
	}
}
