let boolAudio_on;

nav.theaterCredits = async function(){
	let website = document.getElementById('main_page');
	let music_menu = document.getElementById('mgs');
	let video = document.getElementById('vid_credits');

	video.style.opacity = '0';
    video.style.display = 'block';
	await sleep(10)
	website.style.transition = 'opacity 0.5s';
	video.style.transition = 'opacity 0.5s'
    website.style.opacity = '0';

	await sleep(500);
    website.style.display = 'none';
    document.getElementById('credit_close').style.display = 'block';
	video.style.opacity = '1'
	await sleep(500)
    video.play();

	if (music_menu.muted == true)
		boolAudio_on = false;
	else{
		music_menu.muted = true;
		music_menu.pause();
		boolAudio_on = true;
	}
	video.play();
}

nav.theaterClose = async function(){
	let website = document.getElementById('main_page');
	let music_menu = document.getElementById('mgs');
	let video = document.getElementById('vid_credits');

	video.pause();
	video.currentTime = 0;
	video.style.display = 'none';
	website.style.display = 'block';
	document.getElementById('credit_close').style.display = 'none'

	website.style.display = 'block';
    website.style.transition = 'opacity 0.5s';
    website.style.opacity = '0';
	await sleep(10)
    website.style.opacity = '1';
	if (boolAudio_on == true){
		music_menu.muted = false;
		music_menu.play();
	}
}
