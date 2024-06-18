function getElement(lang, text)
{
    for (let i = 0; i != lang.length; i++)
    {
        if (lang[i][0] == text)
            return (lang[i][1]);
    }
}

function getTranslation(text)
{
    if (language == "en")
    {
        for (let i = 0; i != en.length; i++)
        {
            if (en[i][0] == text)
                return (en[i][1]);
        }
    }
    if (language == "fr")
    {
        for (let i = 0; i != fr.length; i++)
        {
            if (fr[i][0] == text)
                return (fr[i][1]);
        }
    }
    if (language == "es")
    {
        for (let i = 0; i != es.length; i++)
        {
            if (es[i][0] == text)
                return (es[i][1]);
        }
    }
}

function getSpecificTranslation(targetLanguage, text)
{
    if (targetLanguage == "en")
    {
        for (let i = 0; i != en.length; i++)
        {
            if (en[i][0] == text)
                return (en[i][1]);
        }
    }
    if (targetLanguage == "fr")
    {
        for (let i = 0; i != fr.length; i++)
        {
            if (fr[i][0] == text)
                return (fr[i][1]);
        }
    }
    if (targetLanguage == "es")
    {
        for (let i = 0; i != es.length; i++)
        {
            if (es[i][0] == text)
                return (es[i][1]);
        }
    }
}

function refreshLanguage()
{
    let lang = localStorage.getItem("language");
    let words = document.querySelectorAll('[data-oname]');
    let placeholders = document.querySelectorAll('[placeholder]');
    let alt_text = document.querySelectorAll('[data-alt]');
    let titles = document.querySelectorAll('[data-title]');
    let aria_label = document.querySelectorAll('[aria-label]');
    document.documentElement.lang = lang;

    if (lang == "en")
    {
        document.getElementById('language_switch').innerHTML = 'en';
        document.getElementById('language_btn_selector').selectedIndex = 0;

        for (let i = 0; i != words.length; i++)
            words[i].innerHTML = getElement(en, words[i].getAttribute("data-oname"));
        for (let i = 0; i != placeholders.length; i++)
            placeholders[i].setAttribute('placeholder', getElement(en, placeholders[i].getAttribute("data-oname")));
        for (let i = 0; i != alt_text.length; i++)
            alt_text[i].setAttribute('alt', getElement(en, alt_text[i].getAttribute('data-alt')));

        for (let i = 0; i != aria_label.length; i++)
            aria_label[i].setAttribute('aria-label', getElement(en, aria_label[i].getAttribute('data-title')));

        if (descriptive_images == "true")
        {
            for (let i = 0; i != titles.length; i++)
            {
                if (getElement(en, titles[i].getAttribute("alt")) == undefined){
                    if (getElement(en, titles[i].getAttribute("data-oname")) == undefined){
                        titles[i].setAttribute('title', getElement(en,  titles[i].getAttribute("data-title")));
                    }
                    else
                        titles[i].setAttribute('title', getElement(en, titles[i].getAttribute("data-oname")));
                }
                else
                    titles[i].setAttribute('title', getElement(en, titles[i].getAttribute('alt')));
            }
        }
    }
    if (lang == "fr")
    {
        document.getElementById('language_switch').innerHTML = 'fr';
        document.getElementById('language_btn_selector').selectedIndex = 1;

        for (let i = 0; i != words.length; i++){
            words[i].innerHTML = getElement(fr, words[i].getAttribute("data-oname"));
        }
        for (let i = 0; i != placeholders.length; i++)
            placeholders[i].setAttribute('placeholder', getElement(fr, placeholders[i].getAttribute("data-oname")));
       for (let i = 0; i != alt_text.length; i++)
            alt_text[i].setAttribute('alt', getElement(fr, alt_text[i].getAttribute('data-alt')));

        for (let i = 0; i != aria_label.length; i++)
            aria_label[i].setAttribute('aria-label', getElement(fr, aria_label[i].getAttribute('data-title')));

        if (descriptive_images == "true")
        {
            for (let i = 0; i != titles.length; i++)
            {
                if (getElement(fr, titles[i].getAttribute("alt")) == undefined){
                    if (getElement(fr, titles[i].getAttribute("data-oname")) == undefined)
                        titles[i].setAttribute('title', getElement(fr, titles[i].getAttribute("data-title")));
                    else
                        titles[i].setAttribute('title', getElement(fr, titles[i].getAttribute("data-oname")));
                }
                else
                    titles[i].setAttribute('title', getElement(fr, titles[i].getAttribute('alt')));
            }
        }
    }
    if (lang == "es")
    {
        document.getElementById('language_switch').innerHTML = 'es';
        document.getElementById('language_btn_selector').selectedIndex = 2;

        for (let i = 0; i != words.length; i++){
            words[i].innerHTML = getElement(es, words[i].getAttribute("data-oname"));
        }
        for (let i = 0; i != placeholders.length; i++)
            placeholders[i].setAttribute('placeholder', getElement(es, placeholders[i].getAttribute("data-oname")));
       for (let i = 0; i != alt_text.length; i++)
            alt_text[i].setAttribute('alt', getElement(es, alt_text[i].getAttribute('data-alt')));

        for (let i = 0; i != aria_label.length; i++)
            aria_label[i].setAttribute('aria-label', getElement(es, aria_label[i].getAttribute('data-title')));

        if (descriptive_images == "true")
        {
            for (let i = 0; i != titles.length; i++)
            {
                if (getElement(es, titles[i].getAttribute("alt")) == undefined){
                    if (getElement(es, titles[i].getAttribute("data-oname")) == undefined)
                        titles[i].setAttribute('title', getElement(es, titles[i].getAttribute("data-title")));
                    else
                        titles[i].setAttribute('title', getElement(es, titles[i].getAttribute("data-oname")));
                }
                else
                    titles[i].setAttribute('title', getElement(es, titles[i].getAttribute('alt')));
            }
        }
    }

    ARIAButtonState();
    ARIASoundsSlider();
    dropdownAddSvg();
}

function initializeLanguage()
{
    if (localStorage.getItem("language") == null)
        localStorage.setItem("language", "en"), language = "en";
    else
        language = localStorage.getItem("language");
}
