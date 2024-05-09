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

	// document.getElementById('create_classic_lobby').removeAttribute('disabled');

	let	create_btn = document.getElementById("create_classic_lobby");
	create_btn.style.display = 'block';
	create_btn.style = 'text-center'; // i had to put this for the item to be centered despite already having it inside class.
	create_btn.onclick = () => data_channel.send('lobby ok');

}
