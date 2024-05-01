document.getElementById("cpy_btn").onclick = cpyGameId;
function cpyGameId(){
	let content = document.getElementById("game_id");
	navigator.clipboard.writeText(content.value);

	if (localStorage.getItem("language") == "fr")
		displayStatusBar("Copié dans le presse-papier avec succès.");
	else
		displayStatusBar("Succesfully copied to clipboard.");
}
