document.getElementById("cpy_btn_offer").onclick = cpyGameOffer;
document.getElementById("cpy_btn_reminder").onclick = cpyGameOffer;

function cpyGameOffer(){
	let content = document.getElementById("peer_offer");

	navigator.clipboard.writeText(content.value);
	displayStatusBar(getTranslation("Succesfully copied to clipboard."));
}

document.getElementById("cpy_btn_answer").onclick = cpyGameAnswer;

function cpyGameAnswer(){
	let content = document.getElementById("peer_answer");

	navigator.clipboard.writeText(content.value);
	displayStatusBar(getTranslation("Succesfully copied to clipboard."));
}
