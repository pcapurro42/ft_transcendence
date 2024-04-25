let user_info = localStorage.getItem('user_info');
let loginName = user_info ? JSON.parse(user_info).login : "null";

let fr = [
    ["LOG IN WITH 42", "SE CONNECTER AVEC 42"],
    ["LOG OUT", "SE DÉCONNECTER"],

    ["Enable/Disable menu music", "Activer/désactiver la musique du menu"],

    ["Center logo title: 'Tactical Tennis Action, Metal Gear: Pong'", "Logo titre central: 'Tactical Tennis Action, Metal Gear: Pong'"],

    ["Play", "Jouer"],
    ["Customize", "Personnaliser"],
    ["Settings", "Options"],
    ["Credits", "Crédits"],

    ["Create a game", "Créer une partie"],
    ["Join a game", "Rejoindre une partie"],
    ["Create a tournament", "Créer un tournoi"],
    ["Join a tournament", "Rejoindre un tournoi"],

    ["MGS 1 - Duel", "MGS 1 - Duel"],

    ["Language", "Langue"],
    ["Sound volume", "Volume du son"],
    ["Music volume", "Volume de la musique"],
    ["Text size", "Taille du texte"],
    ["Image description", "Description de l'image"],
    ["High contrast", "Haut contraste"],

    ["Game theme", "Musique du jeu"],
    ["Game map", "Carte du jeu"],

    ["– None –", "– Aucun –"],

    ["Normal game", "Partie normale"],
    ["Tournament", "Tournoi"],
    ["Against AI", "Contre l'IA"],

    ["Enabled", "Activé"],
    ["Disabled", "Désactivé"],

    ["Back", "Retour"],
    ["Yes", "Oui"],
    ["No", "Non"],

    ["Normal", "Normal"],
    ["Large", "Grand"]
];
