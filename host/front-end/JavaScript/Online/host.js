function readGuestMsg(event){
	console.log(event.data);
}

function hostConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));

	data_channel.onerror = function(error) {
    	console.error("Data Channel Error:", error);
	};
	data_channel.onmessage = event => readGuestMsg(event);
	data_channel.send('Hello from host!');

	let	create_btn = document.getElementById("create_classic_lobby");
	create_btn.style.visibility = 'visible';
	create_btn.onclick = () => {
		displayGamePage_classic();
		data_channel.send('lobby ok');
	}
}
