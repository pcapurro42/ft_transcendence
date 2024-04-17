function findElement(lang, text)
{
    let i = 0;
    while (i != lang.length)
    {
        if (lang[i][0] == "text")
            break ;
        i++;
    }
    return (i);
}

function refreshLanguage()
{
    let lang = localStorage.getItem("language");
    let words = document.getElementsByClassName("text-white");

    if (lang == "en")
    {
        ;
    }
    if (lang == "fr")
    {
        ;
    }
}