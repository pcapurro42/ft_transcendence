user_info = localStorage.getItem('user_info');
loginName = user_info? JSON.parse(user_info).login : "null";

let en = [
    ["LOG IN WITH 42", "LOG IN WITH 42"],
    ["LOG OUT", "LOG OUT"],

    ["Enable/Disable menu music", "Enable/Disable menu music"],

    ["Center logo title: 'Tactical Tennis Action, Metal Gear: Pong'", "Center logo title: 'Tactical Tennis Action, Metal Gear: Pong'"],

    ["Play", "Play"],
    ["Customize", "Customize"],
    ["Settings", "Settings"],
    ["Credits", "Credits"],

    ["Create a game", "Create a game"],
    ["Join a game", "Join a game"],
    ["Create a tournament", "Create a tournament"],
    ["Join a tournament", "Join a tournament"],

    ["MGS 1 - Duel", "MGS 1 - Duel"],

    ["Language", "Language"],
    ["Sound volume", "Sound volume"],
    ["Music volume", "Music volume"],
    ["Text size", "Text size"],
    ["Image description", "Image description"],
    ["High contrast", "High contrast"],

    ["Game theme", "Game theme"],
    ["Game map", "Game map"],

    ["– None –", "– None –"],

    ["Normal game", "Normal game"],
    ["Tournament", "Tournament"],
    ["Against AI", "Against AI"],

    ["Enabled", "Enabled"],
    ["Disabled", "Disabled"],

    ["Back", "Back"],
    ["Yes", "Yes"],
    ["No", "No"],

    ["Normal", "Normal"],
    ["Large", "Large"]
];