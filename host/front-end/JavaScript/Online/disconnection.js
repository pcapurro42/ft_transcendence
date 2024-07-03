
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
    document.getElementById('init_p2p').removeAttribute('disabled');
    document.getElementById('submit_inv_code').removeAttribute('disabled');
    role="";
    document.getElementById('answer_timeout').style.display = "none";
	clearInterval(timeoutInterval);
}

function handleDisconnection(){
    if (isDisplayModal){
        document.querySelectorAll('button:not(.not-disabled), a').forEach(element => {element.setAttribute('disabled', true)});
	    document.getElementById('disconnectionPopup').style.display = 'block';
        document.getElementById('leavingPopup').style.display = 'none';
        hideSidebar();
        document.getElementById('alert_sound').play();
        stop_ping = true;
        resetConnection();
    }
}
