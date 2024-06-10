let boolAudio_on;

nav.theaterCredits = function(){
	let website = document.getElementById('main_page');
	let music_menu = document.getElementById('mgs');
	let cross_exit = document.getElementById('credit_close');
	let video = document.getElementById('vid_credits');

	website.style.transition = 'opacity 0.5s';
    website.style.opacity = '0';


    setTimeout(() => {
        website.style.display = 'none';
        video.style.display = 'block';
        cross_exit.style.display = 'block';
        video.play();
    }, 500);

	if (music_menu.muted == true)
		boolAudio_on = false;
	else{
		music_menu.muted = true;
		music_menu.pause();
		boolAudio_on = true;
	}
	video.play();
	if (pushHistory == true)
		history.pushState(null, null, getTranslation('/credits'));
	else{
		history.replaceState(null, null, getTranslation('/credits'));
		pushHistory = true;
	}
	document.title = getTranslation('Credits');
}

nav.theaterClose = function(){
	let website = document.getElementById('main_page');
	let music_menu = document.getElementById('mgs');
	let cross_exit = document.getElementById('credit_close');
	let video = document.getElementById('vid_credits');

	video.pause();
	video.currentTime = 0;
	video.style.display = 'none';
	website.style.display = 'block';
	cross_exit.style.display = 'none'

	website.style.display = 'block';
    website.style.transition = 'opacity 0.5s';
    website.style.opacity = '0';

    setTimeout(() => {
        website.style.opacity = '1';
    }, 10);
	if (boolAudio_on == true){
		music_menu.muted = false;
		music_menu.play();
	}
	if (pushHistory == true)
		history.pushState(null, null, getTranslation('/home'));
	else{
		history.replaceState(null, null, getTranslation('/home'));
		pushHistory = true;
	}
	document.title = getTranslation('Home');
}
