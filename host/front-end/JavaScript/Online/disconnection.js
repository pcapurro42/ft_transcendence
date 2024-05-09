function handleDisconnection(){
    let popup = document.getElementById('disconnectionPopup');

	popup.style.display = 'block';
    document.getElementById('alert_sound').play();
    RTC_a = null;
    RTC_o = null;
    data_channel = null;
}
