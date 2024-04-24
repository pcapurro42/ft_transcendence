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
    let words = document.querySelectorAll('[data-oname]');
    let titles = document.querySelectorAll('[data-title');

    if (lang == "en")
    {
        for (let i = 0; i != words.length; i++)
            words[i].innerHTML = getElement(en, words[i].getAttribute("data-oname"));

        if (descriptive_images == "true")
        {
            for (let i = 0; i != titles.length; i++)
            {
                if (getElement(en, titles[i].getAttribute("data-oname")) == undefined)
                    titles[i].setAttribute('title', getElement(en, titles[i].getAttribute("data-title")));
                else
                    titles[i].setAttribute('title', getElement(en, titles[i].getAttribute("data-oname")));
            }
        }
    }
    if (lang == "fr")
    {
        for (let i = 0; i != words.length; i++)
            words[i].innerHTML = getElement(fr, words[i].getAttribute("data-oname"));

        if (descriptive_images == "true")
        {
            for (let i = 0; i != titles.length; i++)
            {
                if (getElement(fr, titles[i].getAttribute("data-oname")) == undefined)
                    titles[i].setAttribute('title', getElement(fr, titles[i].getAttribute("data-title")));
                else
                    titles[i].setAttribute('title', getElement(fr, titles[i].getAttribute("data-oname")));
            }
        }
    }
}

function initializeLanguage()
{
    if (localStorage.getItem("language") == null)
        localStorage.setItem("language", "en"), language = "en";
    else
        language = localStorage.getItem("language");
}