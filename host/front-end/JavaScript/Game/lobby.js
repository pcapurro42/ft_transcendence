document.getElementById("cpy_btn").onclick = cpyGameId;
document.getElementById("cpy_btn_reminder").onclick = cpyGameId;

function cpyGameId(){
	let content = document.getElementById("peer_offer");

	navigator.clipboard.writeText(content.value);
	displayStatusBar(getTranslation("Succesfully copied to clipboard."));
}
