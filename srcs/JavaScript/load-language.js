let lang = localStorage.getItem("language");

if (lang == "en")
{
    for (let i = 0; i != en.length; i++)
    {
        if (getElementById(en[i][0]) != null)
            document.getElementById(en[i][0]).innerHTML = en[i][1];
    }
}

if (lang == "fr")
{
    for (let i = 0; i != fr.length; i++)
    {
        if (getElementById(fr[i][0]) != null)
            document.getElementById(fr[i][0]).innerHTML = fr[i][1];
    }
}