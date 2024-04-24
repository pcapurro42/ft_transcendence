user_info = localStorage.getItem('user_info');
loginName = user_info? JSON.parse(user_info).login : "null";

let en = [
    ["Welcome", `Welcome,<br>`],
    ["LOG IN WITH 42", "LOG IN WITH 42"],
    ["LOG OUT", "LOG OUT"],

    ["Enable/Disable menu music", "Enable/Disable menu music"],

    ["Center logo title: 'Tactical Tennis Action, Metal Gear: Pong'", "Center logo title: 'Tactical Tennis Action, Metal Gear: Pong'"],

    ["Play", "Play"],
    ["Customize", "Customize"],
    ["Settings", "Settings"],
    ["Credits", "Credits"],

    ["Language", "Language"],
    ["Sound volume", "Sound volume"],
    ["Music volume", "Music volume"],
    ["Text size", "Text size"],
    ["Image description", "Image description"],
    ["High contrast", "High contrast"],

    ["Game theme", "Game theme"],
    ["Game map", "Game map"],

    ["None", "None"],

    ["Create a game", "Create a game"],
    ["Join a game", "Join a game"],
    ["Play against AI", "Play against AI"],
    ["Create a tournament", "Create a tournament"],
    ["Join a tournament", "Join a tournament"],

    ["Back", "Back"],
    ["Yes", "Yes"],
    ["No", "No"],

    ["Normal", "Normal"],
    ["Large", "Large"]
];