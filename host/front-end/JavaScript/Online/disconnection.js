function resetConnection(){
    if (RTC_a != null)
        RTC_a.close();
    if (RTC_o != null)
        RTC_o.close();
    if (data_channel != null)
        data_channel.close();
    RTC_a = null;
    RTC_o = null;
    data_channel = null;
    removeEventListener('keydown', moveListener);
    removeEventListener('keyup', stopMoveListener);
}

function handleDisconnection(){
    let popup = document.getElementById('disconnectionPopup');

	popup.style.display = 'block';
    document.getElementById('alert_sound').play();

    resetConnection();
}
