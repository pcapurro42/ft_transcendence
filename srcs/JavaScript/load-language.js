let lang = localStorage.getItem("language");

if (lang == "en")
{
    for (let i = 0; i != en.length; i++)
        document.getElementById(en[i][0]).innerHTML = en[i][1];
}

if (lang == "fr")
{
    for (let i = 0; i != fr.length; i++)
        document.getElementById(fr[i][0]).innerHTML = fr[i][1];
}