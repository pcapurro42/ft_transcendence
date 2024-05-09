function readHostMsg(event){
	console.log(event.data);

	if (event.data === 'lobby ok'){
		document.getElementById("join_classic_lobby").style.display = 'block';
		document.getElementById("join_classic_lobby").style = 'text-center'; // i had to put this for the item to be centered despite already having it inside class.

	}
}

async function guestConnectionHandler(){
	displayStatusBarSuccess(getTranslation("Peer Connection Success"));
	data_channel.onerror = function(error) {
    	console.error("Data Channel Error:", error);
	};
	data_channel.onmessage = event => readHostMsg(event);
	data_channel.send('Hello from guest!');


	let countdown = document.getElementById('answer_timeout');
	countdown.innerHTML = getTranslation("Waiting Lobby Creation");

	let	join_btn = document.getElementById("join_classic_lobby");
	join_btn.onclick = () => data_channel.send('lobby_ok');
}
