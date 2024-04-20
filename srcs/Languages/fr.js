let user_info = localStorage.getItem('user_info');
let loginName = user_info ? JSON.parse(user_info).login : "null";

let fr = [
    ["Welcome", `Bienvenue,`],
    ["LOG IN WITH 42", "SE CONNECTER AVEC 42"],
    ["LOG OUT", "SE DÉCONNECTER"],

    ["Play", "Jouer"],
    ["Customize", "Personnaliser"],
    ["Settings", "Options"],
    ["Credits", "Crédits"]
];
