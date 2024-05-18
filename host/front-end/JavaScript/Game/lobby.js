document.getElementById("cpy_btn_offer").onclick = cpyGameOffer;

function cpyGameOffer(){
	let content = document.getElementById("peer_offer");

	navigator.clipboard.writeText(content.value);
	displayStatusBarSuccess(getTranslation("Copy Success"));
}

document.getElementById("cpy_btn_answer").onclick = cpyGameAnswer;

function cpyGameAnswer(){
	let content = document.getElementById("peer_answer");

	navigator.clipboard.writeText(content.value);
	displayStatusBarSuccess(getTranslation("Copy Success"));
}
