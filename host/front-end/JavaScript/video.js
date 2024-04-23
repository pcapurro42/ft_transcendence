let boolAudio_on;

function theaterCredits(){
	let website = document.getElementById('main_menu_page');
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
	if (boolAudio_on == true)
		document.getElementById('credits_song').play();
}

function theaterClose(){
	let website = document.getElementById('main_menu_page');
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
		document.getElementById('credits_song').pause();
		music_menu.muted = false;
		music_menu.play();
	}
}
