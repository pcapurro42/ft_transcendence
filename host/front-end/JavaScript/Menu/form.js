
function parse_alias(nbr, event){
	event.preventDefault(); // Empêche retour main_menu quand on submit

	const regex = /^[A-Za-z0-9\-_]+$/;
 	let inputs = document.querySelectorAll('#parent_form input');
	let err = document.querySelectorAll('#parent_form .invalid-feedback');

	for(let i = 0; i < inputs.length; i++){
		if ((inputs[i].value.length >= 4 && inputs[i].value.length <= 15) && regex.test(inputs[i].value)) {
			sessionStorage.setItem('alias_' + i, inputs.value);
			err[i].style.display = 'none';

    	}
		else{
			err[i].style.display = 'block';
		}
	}
		if (isDuplicateNicknames(inputs) == true){
			document.getElementById('duplicate_nick').style.display = 'block';
		}
		else
			document.getElementById('duplicate_nick').style.display = 'none';
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

function parse_offersAnswers(str){
	const regex = /^[A-Za-z0-9+\/=\r\n]+$/;
	if(regex.test(str) == false)
		return false;

	let tmp = JSON.parse(atob(str));
	if (!tmp.iceCandidates || !tmp.type || !tmp.sdp)
		return false;
	return true;
}
