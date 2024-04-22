let credits_btn = document.getElementById('credits_btn');
let cross_exit = document.getElementById('credit_close');
let video = document.getElementById('vid_credits');

let boolAudio_on;

credits_btn.onclick = theaterCredits;

video.onended = theaterClose;
cross_exit.onclick = theaterClose;

function theaterCredits(){
	let website = document.getElementById('main_menu_page');
	let music_menu = document.getElementById('mgs');

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
}



function theaterClose(){
	let website = document.getElementById('main_menu_page');
	let music_menu = document.getElementById('mgs');

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
}
