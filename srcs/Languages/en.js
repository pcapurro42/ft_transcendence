user_info = localStorage.getItem('user_info');
loginName = user_info? JSON.parse(user_info).login : "null";

let en = [
    ["Welcome", `Welcome,<br>`],
    ["LOG IN WITH 42", "LOG IN WITH 42"],
    ["LOG OUT", "LOG OUT"],

    ["Play", "Play"],
    ["Customize", "Customize"],
    ["Settings", "Settings"],
    ["Credits", "Credits"]
];
