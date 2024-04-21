refreshDisplay();

function setBackground(color)
{
    let background = document.getElementById("background");
    if (color == "white")
        background.style.setProperty("background-color", "white");
    else
        background.style.setProperty("background-color", "black");
}

function setText(color)
{
    let text_color;

    let grey_texts = document.getElementsByClassName("text");
    let white_texts = document.getElementsByClassName("text-white");
    let black_texts = document.getElementsByClassName("text-black");

    if (grey_texts.length != 0)
        text_color = "text";
    else if (white_texts.length != 0)
        text_color = "text-white"
    else if (black_texts.length != 0)
        text_color = "black-text";

    let texts = [...white_texts, ...black_texts, ...grey_texts];

    for (let i = 0; i != texts.length; i++)
    {
        if (color == "white")
            texts[i].classList.replace(text_color, "text-white");
        else
            texts[i].classList.replace(text_color, "text-black");
    }

    console.log(texts);
}

function refreshDisplay()
{
    if (high_contrast_colors == true)
        setBackground("black"), setText("white");
    else
        setBackground("white"), setText("black");
}