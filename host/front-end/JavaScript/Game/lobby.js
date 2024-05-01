document.getElementById("cpy_btn").onclick = cpyGameId;
function cpyGameId(){
	let content = document.getElementById("game_id");
	navigator.clipboard.writeText(content.value);

	displayStatusBar(getTranslation("Succesfully copied to clipboard."));
}
