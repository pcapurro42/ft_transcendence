refreshLanguage();

function getElement(lang, text)
{
    for (let i = 0; i != lang.length; i++)
    {
        if (lang[i][0] == text)
            return (lang[i][1]);
    }
}

function refreshLanguage()
{
    let lang = localStorage.getItem("language");
    let words = document.getElementsByClassName("text");

    if (lang == "en")
    {
        for (let i = 0; i != words.length; i++)
            words[i].innerHTML = getElement(en, words[i].getAttribute("data-oname"));
    }
    if (lang == "fr")
    {
        for (let i = 0; i != words.length; i++)
            words[i].innerHTML = getElement(fr, words[i].getAttribute("data-oname"));
    }
}