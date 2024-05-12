async function game1_announce(g){
	console.log('test game announce');
	tournamentResetBlocks();
	fillNicknames(nicknames);
	g -= 1;
	let x = document.getElementById('Roundof16').querySelectorAll('.game_nbr');
	let nicks = document.getElementById('Roundof16').querySelectorAll('.nicks');

	x[g].style.visibility='visible';
	nicks[g].style.visibility='visible';

	await sleep (100);

	x[g].classList.add('display-1');
	x[g].style.opacity = '0';
	x[g].style.transition = 'opacity 1s';
	x[g].style.visibility = 'visible';
	x[g].style.display = 'block';

	nicks[g].classList.add('display-4');
	nicks[g].style.opacity = '0';
	nicks[g].style.transition = 'opacity 1s';
	nicks[g].style.visibility = 'block';


	await sleep(100);

	x[g].style.opacity = '1';

	await sleep (2000);

	nicks[g].style.opacity = '1';

	await sleep (3000);

	x[g].style.opacity = '0';
	nicks[g].style.opacity = '0';

	await sleep(1000);
	x[g].style.visibility = 'hidden';
	nicks[g].style.visibility = 'hidden';
	x[g].classList.remove('.display-1');
	nicks[g].classList.remove('.display-1');
	nicks[g].style.transition = '';
	x[g].style.transition = '';

};
