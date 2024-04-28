
function parse_alias(event){
	event.preventDefault(); // Empêche retour main_menu quand on submit

	const regex = /^[A-Za-z0-9\-_]+$/;
	console.log('test')
    var input = document.getElementById('alias_input');
    var err = document.getElementById('invalid-alias');

    if ((input.value.length >= 4 && input.value.length <= 15) && regex.test(input.value)) {
		sessionStorage.setItem('alias', input.value);
    } else {
		err.style.display = 'block';
    }
}

document.getElementById('keep42').onclick = checkboxEnabler;

function checkboxEnabler(){
	let checkbox = document.getElementById('keep42');
	let input = document.getElementById('alias_input');

	if (localStorage.getItem('status') == 'connected'){
		document.getElementById('keep42');
		const user_info = JSON.parse(localStorage.getItem('user_info'));
		input.value = user_info.login;
	}
	else{
		checkbox.checked = false;
		document.getElementById('checkbox_err').style.display = "block";
		document.getElementById('alert_sound').play();

	}
}
