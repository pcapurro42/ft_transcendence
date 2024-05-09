function readHostMsg(event){
	console.log(event.data);
}
function guestConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));

	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = "You're pretty good.";

	data_channel.onopen = function(){
		data_channel.onmessage = event => readHostMsg(event);
		data_channel.send('Hello from guest!');
	}

}
