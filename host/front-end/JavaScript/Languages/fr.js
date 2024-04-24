let user_info = localStorage.getItem('user_info');
let loginName = user_info ? JSON.parse(user_info).login : "null";

let fr = [
    ["Welcome", `Bienvenue,`],
    ["LOG IN WITH 42", "SE CONNECTER AVEC 42"],
    ["LOG OUT", "SE DÉCONNECTER"],

    ["Enable/Disable menu music", "Activer/désactiver la musique du menu"],

    ["Center logo title: 'Tactical Tennis Action, Metal Gear: Pong'", "Logo titre central: 'Tactical Tennis Action, Metal Gear: Pong'"],

    ["Play", "Jouer"],
    ["Customize", "Personnaliser"],
    ["Settings", "Options"],
    ["Credits", "Crédits"],

    ["Language", "Langue"],
    ["Sound volume", "Volume du son"],
    ["Music volume", "Volume de la musique"],
    ["Text size", "Taille du texte"],
    ["Image description", "Description de l'image"],
    ["High contrast", "Haut contraste"],

    ["Change game theme", "Changer la musique du jeu"],
    ["Change game map", "Changer la carte du jeu"],

    ["Create a game", "Créer une partie"],
    ["Join a game", "Rejoindre une partie"],
    ["Play against AI", "Jouer contre l'IA"],
    ["Create a tournament", "Créer un tournoi"],
    ["Join a tournament", "Rejoindre un tournoi"],

    ["Back", "Retour"],
    ["Yes", "Oui"],
    ["No", "Non"],

    ["Normal", "Normal"],
    ["Large", "Grand"]
];
