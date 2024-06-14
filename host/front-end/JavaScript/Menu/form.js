
function parse_alias(nbr, event){
	event.preventDefault(); // Empêche retour main_menu quand on submit

	const regex = /^[A-Za-z0-9\-_]+$/;
 	let inputs = document.querySelectorAll('#parent_form input');
	let err = document.querySelectorAll('#parent_form .invalid-feedback');
	let msg_err = document.getElementById('invalid-alias-msg')
	let bool = true;
	let alias_array = [];

	for(let i = 0; i < inputs.length; i++){
		if ((inputs[i].value.length >= 4 && inputs[i].value.length <= 15) && regex.test(inputs[i].value)) {
			err[i].style.display = 'none';

    	}
		else{
			err[i].style.display = 'block';
			document.getElementById('duplicate_nick').style.display = 'none';
			bool = false;
		}
		alias_array.push(inputs[i].value);
	}

	if(bool == true){
		msg_err.style.display = 'none';
		if (isDuplicateNicknames(inputs) == true){
			document.getElementById('duplicate_nick').style.display = 'block';
		}
		else{
			document.getElementById('duplicate_nick').style.display = 'none';
			originalNicknames = shuffleArray(alias_array);
			addToHistory('/tournament-game');
			previous_url_path = window.location.pathname;
			document.title = getTranslation('Tournament Game');
			startTournament(originalNicknames, nbr);
			return;
		}
	}
	else
		msg_err.style.display='block';
	return null;
}

function parseInvitationCode(code){
	const regex = /^[A-Za-z0-9\_]+$/;
	return regex.test(code);
}

function isDuplicateNicknames(nicknames){
	for (let i = 0; i < nicknames.length - 1; i++){
		for (let c = i + 1; c < nicknames.length; c++){
			if (nicknames[i].value == nicknames[c].value)
				return true;
		}
	}
	return false;
}

function parse_offersAnswers(strJson){

	if (!strJson.iceCandidates || !strJson.type || !strJson.sdp)
		return false;
	return true;
}
