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
    let texts = document.getElementsByClassName("text");
    console.log(texts);
    for (let i = 0; i != texts.length; i++)
    {
        if (color == "white")
            texts[i].classList.add("text-white"), texts[i].classList.remove("text-black");
        else
            texts[i].classList.add("text-black"), texts[i].classList.remove("text-white");
    }
    console.log("ok");
    console.log(texts);
}

function refreshDisplay()
{
    if (high_contrast_colors == true)
        setBackground("black"), setText("white");
    else
        setBackground("white"), setText("black");
}