function readHostMsg(event){
	console.log(event.data);
}

async function guestConnectionHandler(){
	console.log('test');
	data_channel.onerror = function(error) {
    	console.error("Data Channel Error:", error);
	};

	displayStatusBarSuccess(getTranslation("Peer Connection Success"));

	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = "You're pretty good.";

		// console.log('hello from dc event');
		data_channel.onmessage = event => readHostMsg(event);
		data_channel.send('Hello from guest!');

}
