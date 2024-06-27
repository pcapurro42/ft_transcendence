function hideAchievement()
{
    document.getElementById('konami_toast').style.display = "none";
    // ...
}

function setAchievementColors(toast)
{
    if (high_contrast == "true")
    {
        document.getElementById(toast).style.backgroundColor = "black";
        document.getElementById(toast + "_body").style.borderColor = "white";
        document.getElementById(toast + "_header").style.backgroundColor = "black";
        document.getElementById(toast + "_header").style.borderColor = "white";
        document.getElementById(toast + "_symbol").setAttribute('src', './Materials/images/menu/ach_symbol_w.png');
    }
    else
    {
        document.getElementById(toast).style.backgroundColor = "white";
        document.getElementById(toast + "_body").style.borderColor = "black";
        document.getElementById(toast + "_header").style.backgroundColor = "white";
        document.getElementById(toast + "_header").style.borderColor = "black";
        document.getElementById(toast + "_symbol").setAttribute('src', './Materials/images/menu/ach_symbol_b.png');
    }
}

function displayAchievement(achievement)
{
    document.getElementById('achiev_sound').play().catch(error=> console.error(getTranslation('Enable Sounds Error')));

    let toast = null;
    if (achievement == "konami")
    {
        toast = "konami_toast";
        document.getElementById(toast).style.display = "block";
        new bootstrap.Toast(document.getElementById(toast)).show();
    }
    else if (achievement == "first local game")
    {
        toast = "first_game_toast";
        document.getElementById(toast).style.display = "block";
        new bootstrap.Toast(document.getElementById(toast)).show();
    }
    setAchievementColors(toast);
}

function detectKonamiCode(event)
{
    let key = event.key;

    if (keys_register == null)
        keys_register = [];
    keys_register.push(key);

    if (keys_register.length >= 10)
    {
        for (let i = 0; i != keys_register.length; i++)
        {
            if (keys_register[i] == 'ArrowUp' && keys_register.length - i >= 10)
            {
                if (keys_register[i + 1] == 'ArrowUp' && keys_register[i + 2] == 'ArrowDown' && keys_register[i + 3] == 'ArrowDown' && keys_register[i + 4] == 'ArrowLeft' && keys_register[i + 5] == 'ArrowRight' && keys_register[i + 6] == 'ArrowLeft' && keys_register[i + 7] == 'ArrowRight' && keys_register[i + 8] == 'b' && keys_register[i + 9] == 'a' && keys_register[i + 10] == 'Enter')
                {
                    if (localStorage.getItem('konami_code') != "true")
                        displayAchievement("konami"), localStorage.setItem('konami_code', "true");
                    keys_register = [];
                    return ;
                }
            }
        }
    }
}
