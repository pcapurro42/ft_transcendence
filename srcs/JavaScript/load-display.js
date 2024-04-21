function setBackground(color)
{
    let background = document.getElementById("background");
    if (color == "white")
        background.style.setProperty("background-color", "white");
    else
        background.style.setProperty("background-color", "black");
}

function setMaterials(color)
{
    materials = document.getElementsByClassName("modal-content");

    for (let i = 0; i != materials.length; i++)
    {
        if (color == "white")
            materials[i].style["background-color"] = "white", materials[i].style["border"] = "black 2px solid";
        else
            materials[i].style["background-color"] = "black", materials[i].style["border"] = "white 2px solid";
    }
}

function setImages(color)
{
    let images = document.getElementsByClassName("image");

    for (let i = 0; i != images.length; i++)
    {
        if (color == "black")
            images[i].style.filter="invert(100%)";
    }
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
}

function refreshDisplay()
{
    if (high_contrast == "true")
        setBackground("black"), setText("white"), setMaterials("black"), setImages("white");
    else
        setBackground("white"), setText("black"), setMaterials("white"), setImages("black");
}