function initializeDataAuths()
{
    if (localStorage.getItem('data_anonymize') == null)
        localStorage.setItem('data_anonymize', 'false');

    if (localStorage.getItem('data_share') == null)
        localStorage.setItem('data_share', 'false');

    setAuthsState();
}

function changeAnonymizeAuth()
{
    setAuthsState();

    if (localStorage.getItem('data_anonymize') == 'false')
        localStorage.setItem('data_anonymize', 'true');
    else
        localStorage.setItem('data_anonymize', 'false');
}

function changeShareAuth()
{
    setAuthsState();

    if (localStorage.getItem('data_share') == 'false')
        localStorage.setItem('data_share', 'true');
    else
        localStorage.setItem('data_share', 'false');
}

function setAuthsState()
{
    if (localStorage.getItem('data_anonymize') == 'true')
        document.getElementById('data_anonymize_btn').setAttribute('data-oname', getTranslation('Enabled'));
    else
        document.getElementById('data_anonymize_btn').setAttribute('data-oname', getTranslation('Disabled'));

    if (localStorage.getItem('data_share') == 'true')
        document.getElementById('data_share_btn').setAttribute('data-oname', getTranslation('Enabled'));
    else
        document.getElementById('data_share_btn').setAttribute('data-oname', getTranslation('Disabled'));
}

function deleteLocalData()
{
    localStorage.clear();
    nav.displayMenu();
	refreshSite();
}

function deleteOnlineData()
{
    // supprimer l'IP et le login correspondants de la db
    // ...
}